import { JWS, User } from './commons.js';

export type LoveBoxApiLoginWithPasswordResponse = User & {
    token: JWS;
};
