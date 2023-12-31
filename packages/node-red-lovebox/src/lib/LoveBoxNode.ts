import * as REDRegistry from '@node-red/registry';
import { TLoveBoxNodeConfig } from '../types/TLoveBoxNodeConfig.js';
import { ENodeStatus } from './ENodeStatus';
import { TSendMessage } from '../types/TSendMessage';
import { TLoveBoxAccountNode } from '../types/TLoveBoxAccountNode.js';
import { Node } from './Node';
import { LoveBoxClient } from 'lovebox-client';

export class LoveBoxNode<
    TNode extends REDRegistry.Node<TCredentials> = any,
    TNodeDefinition extends TLoveBoxNodeConfig = TLoveBoxNodeConfig,
    TCredentials extends Record<string, any> = Record<string, any>
> extends Node<TNode, TNodeDefinition, TCredentials> {
    get client(): LoveBoxClient {
        if (!this._client) {
            throw new Error(`can't retrieve _client before init`);
        }
        return this._client;
    }
    private _client?: LoveBoxClient;

    protected async init(): Promise<void> {
        await super.init();

        if (!this.definition.LoveBoxAccountNodeId) {
            this.setStatus(ENodeStatus.ERROR, 'LoveBox Account not configured');
            return;
        }

        const LoveBoxAccountNode = this.nodeRED.nodes.getNode(this.definition.LoveBoxAccountNodeId) as TLoveBoxAccountNode;

        if (!LoveBoxAccountNode) {
            this.setStatus(ENodeStatus.ERROR, 'fail to get lovebox account');
            return;
        }

        const { getClient } = LoveBoxAccountNode;
        const client = await getClient;

        if (!client) {
            this.setStatus(ENodeStatus.ERROR, 'fail to get lovebox account');
            return;
        }

        this.setStatus(ENodeStatus.RESET);

        this._client = client;
    }

    protected send(msg: TSendMessage, sendFn?: (msg: TSendMessage) => void) {
        (sendFn || this.node.send.bind(this.node))(msg);
    }
}
