import { GraphQLQuery } from '../../GraphQLQuery.js';
import { gql } from 'graphql-request';
import { Message, MESSAGE_TYPES } from '../types/index.js';

export const sendMessageV1 = new GraphQLQuery<
    {
        sendMessageV1: Message & { type: MESSAGE_TYPES.OLED };
    },
    {
        base64: string;
        bytes: Array<number>;
        recipient: string;
        options?: {
            pairingCode?: string;
            formattedText?: string;
            premium?: boolean;
            textOnly?: boolean;
            deviceId: string;
            textCentered?: boolean;
        };
        timezone?: number;
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
                __typename
            }
            status {
                label
                __typename
            }
            textOnly
            textCentered
            type
            url
            urlId
            addedLoveCoins
            __typename
        }
    }
`);
