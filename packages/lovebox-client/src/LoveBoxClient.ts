import { createDebugger } from './utils.js';
import axios from 'axios';
import { DEFAULT_OLED_BASE64, LOVEBOX_API_HOST, LOVEBOX_API_URL, OLED_PICTURE_BYTES, OLED_PICTURE_MAX_FRAME } from './constants.js';
import { LoveBoxApiLoginWithPasswordResponse } from './lovebox/types/responses.js';
import { GraphQLClient, Variables } from 'graphql-request';
import { BoxSettings, mongoId } from './lovebox/types/commons.js';
import { GraphQLQuery } from './GraphQLQuery.js';
import { deleteMessage, getMessages, sendMessage, sendMessageV1, getMe } from './lovebox/queries/index.js';

export type GraphQLClientRequestHeaders = Headers | Array<Array<string>> | Record<string, string>;

const debug = createDebugger('LoveboxClient');

export type LoveBoxTokenAuthentication = {
    token: string;
};
export type LoveBoxEmailPasswordAuthentication = { email: string; password: string };
export type LoveBoxClientAuthentication = LoveBoxTokenAuthentication | LoveBoxEmailPasswordAuthentication;

export class LoveBoxClient {
    readonly #auth?: LoveBoxEmailPasswordAuthentication;

    #token?: string;
    #graphQLClient: GraphQLClient;

    constructor(auth: LoveBoxClientAuthentication) {
        debug('construct');

        this.#graphQLClient = new GraphQLClient(`${LOVEBOX_API_URL}/v1/graphql`, {
            requestMiddleware: (request) => ({
                ...request,
                headers: {
                    ...request.headers,
                    Authorization: this.#token ? `Bearer ${this.#token}` : ''
                }
            })
        });

        if (this.isEmailPasswordConfiguration(auth)) {
            this.#auth = auth;
        } else {
            this.#token = auth.token;
        }
    }

    private isEmailPasswordConfiguration(config: LoveBoxClientAuthentication): config is LoveBoxEmailPasswordAuthentication {
        return !!(config as LoveBoxEmailPasswordAuthentication).password;
    }

    public async login(): Promise<void> {
        if (!this.#auth) {
            throw new Error('login not possible when not configured with email/password');
        }
        debug('login');
        const loginResponse = await axios.post<LoveBoxApiLoginWithPasswordResponse>(
            '/v1/auth/loginWithPassword',
            {
                email: this.#auth.email,
                password: this.#auth.password
            },
            {
                baseURL: LOVEBOX_API_URL,
                headers: {
                    'Content-Type': 'application/json',
                    Host: LOVEBOX_API_HOST
                }
            }
        );
        debug('login answer with code %o, %s', loginResponse.status, loginResponse.statusText);

        this.#token = loginResponse.data.token;
    }

    public rawGraphQLRequest<T>(gqlRequest: string, variables?: Variables, headers?: GraphQLClientRequestHeaders): Promise<T> {
        return this.#graphQLClient.request<T>(gqlRequest, variables, headers);
    }

    public async graphQlRequest<TResponse, TVariables extends Variables | undefined>(
        endpoint: GraphQLQuery<TResponse, TVariables>,
        variables: TVariables,
        headers?: GraphQLClientRequestHeaders
    ): Promise<TResponse> {
        debug('start graphqlRequest %o', endpoint.name);
        const response = await this.rawGraphQLRequest<TResponse>(endpoint.gql, variables, headers);
        debug('response from graphqlRequest %o', endpoint.name);

        return response;
    }

    public async getMe() {
        return (await this.graphQlRequest(getMe, undefined)).me;
    }

    public async listBoxes(): Promise<Array<BoxSettings> | undefined> {
        return (await this.getMe()).boxes;
    }

    /**
     *
     * @param picture base64url of the picture ( will be used on the app )
     * @param frames base64url if animation . picture need to be "image/gif" base64, frames "image/png" ( will be used on the lovebox )
     * @param boxId the _id of the box
     * @param senderDeviceId the _id of the device
     */
    public async sendPicture({
        picture,
        frames,
        boxId,
        senderDeviceId
    }: {
        picture: string;
        frames?: Array<string>;
        boxId?: string;
        senderDeviceId?: string;
    }): Promise<(typeof sendMessage.__response)['sendMessage']> {
        const { box, device } = await this.getDefaultBoxAndSender(boxId, senderDeviceId, true);

        return (
            await this.graphQlRequest(sendMessage, {
                base64: picture,
                recipient: box,
                contentType: [],
                options: {
                    framesBase64: frames ?? null,
                    deviceId: device
                }
            })
        ).sendMessage;
    }

    public async deleteMessage(messageId: mongoId): Promise<(typeof deleteMessage.__response)['deleteMessage']> {
        return (
            await this.graphQlRequest(deleteMessage, {
                messageId
            })
        ).deleteMessage;
    }

    /**
     * This function will not check the hasColor if it can skip API call
     * you need to check it before
     *
     * @param deviceId
     * @param boxId
     * @param hasColor
     * @private
     */
    private async getDefaultBoxAndSender(
        deviceId?: string,
        boxId?: string,
        hasColor?: boolean
    ): Promise<{
        box: string;
        device: string;
    }> {
        if (boxId && deviceId) {
            return {
                box: boxId,
                device: deviceId
            };
        }

        const me = await this.getMe();

        const device = deviceId ?? me.device?._id;

        if (!device) {
            throw new Error('fail to extract deviceId');
        }

        const checkHasColorParams = (box: BoxSettings) => box.hasColor === (hasColor ? true : null);

        if (boxId && hasColor !== undefined && !me?.boxes?.some((b) => b._id === boxId && checkHasColorParams(b))) {
            throw new Error(`boxId in parameters doesn't match hasColor needed : (${hasColor.toString()})`);
        }

        const box = boxId ?? me?.boxes?.find(checkHasColorParams)?._id ?? '';

        if (!box) {
            throw new Error('fail to extract boxId');
        }

        return {
            device,
            box
        };
    }

    /**
     * works only on Black and white loveBox
     * @param bytes an array of a multiple of 1024 bytes . Works with common anode => 0 light on / 1 light off . 64 rows by 128 columns, each row is subsidised by bits . 1024 bytes per frames (max 3 frames)
     * @param frames
     * @param boxId
     * @param senderDeviceId
     */
    public async sendOLEDPicture({
        bytes,
        boxId,
        senderDeviceId
    }: {
        bytes: Array<number>;
        boxId?: string;
        senderDeviceId?: string;
    }): Promise<(typeof sendMessageV1.__response)['sendMessageV1']> {
        const { box, device } = await this.getDefaultBoxAndSender(boxId, senderDeviceId, false);

        const maxBytes = OLED_PICTURE_BYTES * OLED_PICTURE_MAX_FRAME;
        if (bytes.length % OLED_PICTURE_BYTES !== 0 || bytes.length > maxBytes || bytes.some((b) => b > 255 || b < 0)) {
            throw new Error(`Bytes buffer seems incorrect . need to contain a multiple of ${OLED_PICTURE_BYTES} bytes, max ${maxBytes}`);
        }

        return (
            await this.graphQlRequest(sendMessageV1, {
                base64: DEFAULT_OLED_BASE64,
                bytes: [...bytes],
                recipient: box,
                options: {
                    deviceId: device,
                    premium: bytes.length > OLED_PICTURE_BYTES
                }
            })
        ).sendMessageV1;
    }

    async getMessage(skip = 0, limit = 10) {
        return (
            await this.graphQlRequest(getMessages, {
                getMessagesInput: {
                    limit,
                    skip
                }
            })
        ).getMessages;
    }
}
