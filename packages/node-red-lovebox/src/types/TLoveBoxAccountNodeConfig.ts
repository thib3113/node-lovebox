import { TLoveBoxNodeConfig } from './TLoveBoxNodeConfig.js';

export type TLoveBoxAccountNodeConfig = TLoveBoxNodeConfig & {
    port: number;
    address: string;
    allowedIPs?: string;
    autoReplyToPing?: boolean;
};
