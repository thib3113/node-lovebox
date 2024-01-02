import { GraphQLQuery } from '../../GraphQLQuery.js';
import { mongoId } from '../types/index.js';
import { gql } from 'graphql-request';

export const deleteMessage = new GraphQLQuery<
    {
        // always true
        deleteMessage: true;
    },
    {
        messageId: mongoId;
    }
>(gql`
    mutation deleteMessage($messageId: String!) {
        deleteMessage(messageId: $messageId)
    }
`);
