import { LoveBoxNode } from '../lib/LoveBoxNode.js';
import * as REDRegistry from '@node-red/registry';
import { registerNode } from '../lib/registerNode.js';
import { TLoveboxGetMessagesNode } from '../types/TLoveboxGetMessagesNode.js';
import { TLoveboxGetMessagesNodeConfig } from '../types/TLoveboxGetMessagesNodeConfig.js';
import { QUERIES } from 'lovebox-client';

class LoveboxGetMessagesNode extends LoveBoxNode<TLoveboxGetMessagesNode, TLoveboxGetMessagesNodeConfig> {
    protected async init(): Promise<void> {
        await super.init();

        this.node.on('input', async (msg) => {
            const me = await this.client.graphQlRequest(QUERIES.getMessages, {
                getMessagesInput: {
                    limit: 10,
                    skip: 0
                }
            });

            this.send({
                payload: me
            });
        });
    }
}

module.exports = (RED: REDRegistry.NodeAPI) => {
    registerNode(RED, 'lovebox-get-messages', LoveboxGetMessagesNode);
};
