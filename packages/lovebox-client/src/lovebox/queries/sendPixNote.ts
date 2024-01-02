import { Message } from '../types/index.js';
import { gql } from 'graphql-request';
import { GraphQLQuery } from '../../GraphQLQuery.js';

export const sendPixNote = new GraphQLQuery<
    {
        sendPixNote: Message;
    },
    {
        base64: string | null;
        recipient: string;
        contentType: ['Image'];
        options: {
            framesBase64: null | Array<string>;
            deviceId: string;
        };
    }
>(gql`
    mutation sendPixNote($base64: String, $recipient: String, $date: Date, $options: JSON, $contentType: [String]) {
        sendPixNote(base64: $base64, recipient: $recipient, date: $date, options: $options, contentType: $contentType) {
            _id
            type
            recipient
            url
            date
            status {
                label
                __typename
            }
            base64
            __typename
        }
    }
`);
