import * as REDRegistry from '@node-red/registry';
import { TechnicalNode } from './TechnicalNode';
import { TLoveBoxNodeConfig } from '../types/TLoveBoxNodeConfig.js';
import { ENodeStatus } from './ENodeStatus';
import { TSendMessage } from '../types/TSendMessage';
import type { NodeStatus } from 'node-red';

export class Node<
    TNode extends REDRegistry.Node<TCredentials> = any,
    TNodeDefinition extends TLoveBoxNodeConfig = TLoveBoxNodeConfig,
    TCredentials extends Record<string, any> = Record<string, any>
> extends TechnicalNode<TNode, TNodeDefinition, TCredentials> {
    protected lastStatus?: NodeStatus & { status: ENodeStatus };
    protected setStatus(status: ENodeStatus, text?: string) {
        let nodeStatus: REDRegistry.NodeStatus | null;
        switch (status) {
            case ENodeStatus.PENDING:
                nodeStatus = {
                    fill: 'yellow',
                    shape: 'ring'
                };
                break;
            case ENodeStatus.READY:
                nodeStatus = {
                    fill: 'green',
                    shape: 'dot'
                };
                break;
            case ENodeStatus.ERROR:
                nodeStatus = {
                    fill: 'red',
                    shape: 'dot'
                };
                break;
            case ENodeStatus.RESET:
            default:
                nodeStatus = {};
                break;
        }

        if (text && status !== ENodeStatus.RESET) {
            nodeStatus.text = text;
        }
        this.lastStatus = {
            ...nodeStatus,
            status
        };
        this.node.status(nodeStatus);
    }

    protected send(msg: TSendMessage, sendFn?: (msg: TSendMessage) => void) {
        (sendFn || this.node.send.bind(this.node))(msg);
    }
}
