import { gql } from 'graphql-request';
import { GraphQLQuery } from '../../GraphQLQuery.js';

export const getHeartsRain = new GraphQLQuery<{
    getHeartsRain: {
        _id: string;
        /**
         * box._id
         */
        sender: string;
    } | null;
}>(gql`
    query getHeartsRain {
        getHeartsRain {
            _id
            sender
            __typename
        }
    }
`);
