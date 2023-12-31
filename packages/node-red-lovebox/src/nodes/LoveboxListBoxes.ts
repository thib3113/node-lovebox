import { LoveBoxNode } from '../lib/LoveBoxNode.js';
import * as REDRegistry from '@node-red/registry';
import { registerNode } from '../lib/registerNode.js';
import { TLoveboxListBoxesNode } from '../types/TLoveboxListBoxesNode.js';
import { TLoveboxListBoxesNodeConfig } from '../types/TLoveboxListBoxesNodeConfig.js';

class LoveboxListBoxesNode extends LoveBoxNode<TLoveboxListBoxesNode, TLoveboxListBoxesNodeConfig> {
    protected async init(): Promise<void> {
        await super.init();

        this.node.on('input', async (msg) => {
            const boxes = await this.client.listBoxes();

            this.send({
                payload: boxes
            });
        });
    }
}

module.exports = (RED: REDRegistry.NodeAPI) => {
    registerNode(RED, 'lovebox-list-boxes', LoveboxListBoxesNode);
};
