import * as RED from 'node-red';

export type TLoveBoxNodeConfig = RED.NodeDef & {
    LoveBoxAccountNodeId: string;
};
