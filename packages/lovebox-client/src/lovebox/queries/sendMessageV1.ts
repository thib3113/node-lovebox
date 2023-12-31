import { GraphQLQuery } from '../../GraphQLQuery.js';
import { gql } from 'graphql-request';

export const sendMessageV1 = new GraphQLQuery<
    unknown,
    {
        base64: string | null;
        recipient: string;
        options: {
            framesBase64?: Array<string> | null;
            deviceId: string;
        };
    }
>(gql`
    mutation sendMessageV1(
        $base64: String
        $bytes: [Int]
        $recipient: String
        $date: Date
        $options: JSON
        $timezone: Int
        $appVersion: String
    ) {
        sendMessageV1(
            base64: $base64
            bytes: $bytes
            recipient: $recipient
            date: $date
            options: $options
            timezone: $timezone
            appVersion: $appVersion
        ) {
            _id
            base64
            bytes
            content
            date
            frames
            gifId
            premium
            privacyPolicy
            recipient
            senderUser {
                _id
                firstName
                email
            }
            status {
                label
            }
            textOnly
            textCentered
            type
            url
            urlId
            addedLoveCoins
        }
    }
`);
