import { LoveBoxNode } from '../lib/LoveBoxNode.js';
import * as REDRegistry from '@node-red/registry';
import { registerNode } from '../lib/registerNode.js';
import { TLoveboxSendPictureNode } from '../types/TLoveboxSendPictureNode.js';
import { TLoveboxSendPictureNodeConfig } from '../types/TLoveboxSendPictureNodeConfig.js';
import { NodeMessageInFlow } from '@node-red/registry';
import mime from 'mime-types';
import path from 'path';
import * as fs from 'fs';
import { ENodeStatus } from '../lib/ENodeStatus.js';
import gifFrames from 'gif-frames';

interface ILoveboxSendPictureNodeInputConfigurationMessage {
    file?: string;
    sender?: string;
    box?: string;
    mimeType?: string;
}

interface ILoveboxSendPictureNodeInputMessage extends NodeMessageInFlow, ILoveboxSendPictureNodeInputConfigurationMessage {
    filename?: string;
    payload?: Buffer | ILoveboxSendPictureNodeInputConfigurationMessage;
}

class LoveboxSendPictureNode extends LoveBoxNode<TLoveboxSendPictureNode, TLoveboxSendPictureNodeConfig> {
    protected async init(): Promise<void> {
        await super.init();

        this.node.on('input', async (msg) => {
            const message = msg as ILoveboxSendPictureNodeInputMessage;

            try {
                const options = await this.extractMessageInformations(message);

                if (!options) {
                    return;
                }

                const frames = options.contentType === 'image/gif' ? await this.extractGIFFrames(options.data) : [];

                const res = await this.client.sendPicture({
                    frames,
                    picture: `data:${options.contentType};base64,${options.data.toString('base64')}`,
                    senderDeviceId: options.sender,
                    boxId: options.box
                });

                this.send({
                    payload: res
                });
            } catch (e) {
                this.node.error(e);
                this.setStatus(ENodeStatus.ERROR, 'error');
            }
        });
    }

    private async extractMessageInformations(input: ILoveboxSendPictureNodeInputMessage): Promise<
        | {
              data: Buffer;
              contentType?: string;
              sender?: string;
              box?: string;
          }
        | undefined
    > {
        if (!input.payload) {
            this.node.error('missing payload');
            return;
        }

        /**
         * payload can be a buffer, coming from node readFile
         * or a message object
         */

        if (Buffer.isBuffer(input.payload)) {
            const contentType = input.mimeType ?? mime.lookup(path.extname(input.filename ?? ''));
            if (!contentType) {
                this.node.error('fail to extract mimeType');
                return;
            }

            return {
                contentType,
                data: input.payload,
                box: input.box,
                sender: input.sender
            };
        }

        if (typeof input.payload === 'object' && input.payload.file) {
            const data = await fs.promises.readFile(input.payload.file);
            const contentType = input.mimeType ?? mime.lookup(path.extname(input.payload.file ?? ''));
            if (!contentType) {
                this.node.error('fail to extract mimeType');
                return;
            }

            return {
                contentType,
                data,
                box: input.payload.box ?? input.box,
                sender: input.payload.sender ?? input.sender
            };
        }

        this.node.error('unrecognized input');
        return;
    }

    private async extractGIFFrames(picture: Buffer): Promise<Array<string>> {
        const framesData = await gifFrames({
            url: picture,
            frames: 'all',
            outputType: 'png'
        });

        return Promise.all(
            framesData.map(
                async (frame) =>
                    new Promise<string>((resolve, reject) => {
                        const image = frame.getImage();

                        const chunks: Array<Uint8Array> = [];

                        image.on('data', (chunk: Buffer) => {
                            chunks.push(chunk);
                        });

                        image.on('end', () => {
                            const buffer = Buffer.concat(chunks);
                            resolve(`data:image/png;base64,${buffer.toString('base64')}`);
                        });

                        image.on('error', (error: Error) => {
                            reject(error);
                        });
                    })
            )
        );
    }
}

module.exports = (RED: REDRegistry.NodeAPI) => {
    registerNode(RED, 'lovebox-send-picture', LoveboxSendPictureNode);
};
