import { LoveBoxNode } from '../lib/LoveBoxNode.js';
import * as REDRegistry from '@node-red/registry';
import { registerNode } from '../lib/registerNode.js';
import { TLoveboxRawRequestNode } from '../types/TLoveboxRawRequestNode.js';
import { TLoveboxRawRequestNodeConfig } from '../types/TLoveboxRawRequestNodeConfig.js';
import { ENodeStatus } from '../lib/ENodeStatus.js';

class LoveboxRawRequestNode extends LoveBoxNode<TLoveboxRawRequestNode, TLoveboxRawRequestNodeConfig> {
    protected async init(): Promise<void> {
        await super.init();

        this.node.on('input', async (msg) => {
            if (!msg.payload) {
                return;
            }

            const { variables } = msg as { variables?: Record<string, any> };

            try {
                const res = await this.client.rawGraphQLRequest(msg.payload as string, variables ?? {});

                this.send({
                    payload: res
                });
            } catch (e) {
                this.node.error(e);
                this.setStatus(ENodeStatus.ERROR, 'error');
            }
        });
    }
}

module.exports = (RED: REDRegistry.NodeAPI) => {
    registerNode(RED, 'lovebox-raw-request', LoveboxRawRequestNode);
};
