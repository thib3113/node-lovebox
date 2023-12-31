import { LoveBoxNode } from '../lib/LoveBoxNode.js';
import * as REDRegistry from '@node-red/registry';
import { registerNode } from '../lib/registerNode.js';
import { TLoveboxConnectedUserNode } from '../types/TLoveboxConnectedUserNode.js';
import { TLoveboxConnectedUserNodeConfig } from '../types/TLoveboxConnectedUserNodeConfig.js';

class LoveboxConnectedUserNode extends LoveBoxNode<TLoveboxConnectedUserNode, TLoveboxConnectedUserNodeConfig> {
    protected async init(): Promise<void> {
        await super.init();

        this.node.on('input', async (msg) => {
            const me = await this.client.getMe();

            this.send({
                payload: me
            });
        });
    }
}

module.exports = (RED: REDRegistry.NodeAPI) => {
    registerNode(RED, 'lovebox-connected-user', LoveboxConnectedUserNode);
};
