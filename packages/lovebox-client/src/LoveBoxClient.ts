import { createDebugger } from './utils.js';
import axios from 'axios';
import { LOVEBOX_API_HOST, LOVEBOX_API_URL } from './constants.js';
import { LoveBoxApiLoginWithPasswordResponse } from './lovebox/types/responses.js';
import { GraphQLClient, Variables } from 'graphql-request';
import { BoxSettings, PRIVACY_POLICIES } from './lovebox/types/commons.js';
import { getMe } from './lovebox/queries/getMe.js';
import { LoveBoxApiSendPixNoteResponse } from './lovebox/queries/sendPixNote.js';
import { GraphQLQuery } from './GraphQLQuery.js';
import { sendMessage } from './lovebox/queries/index.js';

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

    public async listBoxes(): Promise<Array<BoxSettings>> {
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
    }): Promise<LoveBoxApiSendPixNoteResponse['sendPixNote']> {
        let deviceId = senderDeviceId || '';
        let recipient = boxId || '';
        if (!boxId || !senderDeviceId) {
            const me = await this.getMe();

            deviceId = senderDeviceId ?? me.device._id;
            recipient = boxId ?? me.boxes.find((b) => b.hasColor)?._id ?? '';

            if (!deviceId) {
                throw new Error('fail to extract deviceId');
            }

            if (!recipient) {
                throw new Error('fail to extract boxId');
            }
        }

        return (
            await this.graphQlRequest(sendMessage, {
                base64: picture,
                recipient,
                contentType: [],
                options: {
                    framesBase64: frames ?? null,
                    deviceId
                }
            })
        ).sendMessage;
    }
}
