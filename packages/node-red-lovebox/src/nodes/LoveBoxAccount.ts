import { NodeAPI } from 'node-red';
import { TechnicalNode } from '../lib/TechnicalNode';
import { TLoveBoxAccountNode } from '../types/TLoveBoxAccountNode.js';
import { registerNode } from '../lib/registerNode';
import { TLoveBoxAccountNodeConfig } from '../types/TLoveBoxAccountNodeConfig.js';
import { TLoveBoxClientNodeCredentials } from '../types/TLoveBoxClientNodeCredentials.js';
import { LoveBoxClient } from 'lovebox-client';

const NODE_NAME = 'lovebox-account';

class LoveBoxAccountNode extends TechnicalNode<TLoveBoxAccountNode, TLoveBoxAccountNodeConfig, TLoveBoxClientNodeCredentials> {
    protected async init(): Promise<void> {
        await super.init();
        this.node.getClient = (async () => {
            const { email, password } = this.node.credentials;

            if (!email || !password) {
                this.node.error('fail to init LoveBoxClient');
                return;
            }

            try {
                const client = new LoveBoxClient({
                    email,
                    password
                });

                await client.login();
                return client;
            } catch (e) {
                this.node.error(e);
                return;
            }
        })();
    }
}

module.exports = (RED: NodeAPI) => {
    registerNode(RED, NODE_NAME, LoveBoxAccountNode, {
        credentials: {
            email: { type: 'text' },
            password: { type: 'password' }
        }
    });
};
