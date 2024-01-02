import { GraphQLQuery } from '../../GraphQLQuery.js';
import { mongoId } from '../types/index.js';
import { gql } from 'graphql-request';

export type LoveBoxApiDeleteMessageResponse = {
    deleteMessage: true;
};

export const deleteMessage = new GraphQLQuery<
    LoveBoxApiDeleteMessageResponse,
    {
        messageId: mongoId;
    }
>(gql`
    mutation deleteMessage($messageId: String!) {
        deleteMessage(messageId: $messageId)
    }
`);
