import { gql } from 'graphql-request';
import { GraphQLQuery } from '../../GraphQLQuery.js';

export type LoveBoxApiGetHeartsRain = {
    getHeartsRain: {
        _id: string;
        /**
         * box._id
         */
        sender: string;
    } | null;
};

export const getHeartsRain = new GraphQLQuery<LoveBoxApiGetHeartsRain>(gql`
    query getHeartsRain {
        getHeartsRain {
            _id
            sender
            __typename
        }
    }
`);
