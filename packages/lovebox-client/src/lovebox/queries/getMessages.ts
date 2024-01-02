import { GraphQLQuery } from '../../GraphQLQuery.js';
import { gql } from 'graphql-request';
import { Message } from '../types/index.js';

export type LoveBoxApiGetMessagesResponse = {
    getMessages: Array<Message>;
};

export const getMessages = new GraphQLQuery<
    LoveBoxApiGetMessagesResponse,
    {
        getMessagesInput?: { limit?: number; skip?: number };
    }
>(gql`
    query getMessages($getMessagesInput: GetMessagesInput) {
        getMessages(getMessagesInput: $getMessagesInput) {
            _id
            channel
            content
            type
            recipient
            date
            status {
                label
            }
            statusList {
                label
                date
            }
            drawing {
                base64
                rotate
            }
            base64
            bytes
            premium
            heartsSent
            isChannelMessage
            textOnly
            textCentered
            gifId
            url
            urlId
            frames
            senderUser {
                _id
                firstName
                email
            }
            privacyPolicy
            commentsCount
        }
    }
`);
