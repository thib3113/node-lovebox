import * as RED from 'node-red';
import { TLoveBoxClientNodeCredentials } from './TLoveBoxClientNodeCredentials.js';
import { LoveBoxClient } from 'lovebox-client';

export type TLoveBoxAccountNode = RED.Node<TLoveBoxClientNodeCredentials> & {
    getClient: Promise<LoveBoxClient | undefined>;
};
