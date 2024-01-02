import { JWS, User } from './commons.js';

export type LoveBoxApiLoginWithPasswordResponse = User &
    Required<Pick<User, '_id'>> & {
        token: JWS;
    };
