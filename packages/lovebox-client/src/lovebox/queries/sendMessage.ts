import { GraphQLQuery } from '../../GraphQLQuery.js';
import { gql } from 'graphql-request';
import { Message, MESSAGE_TYPES, PRIVACY_POLICIES } from '../types/index.js';

export type LoveBoxApiSendMessageResponse = {
    sendMessage: Message & { type: MESSAGE_TYPES.COLOR_PICTURE };
};

export const sendMessage = new GraphQLQuery<
    LoveBoxApiSendMessageResponse,
    {
        base64: string;
        recipient: string;
        contentType: [];
        options: {
            framesBase64: null | Array<string>;
            deviceId: string;
            privacyPolicy?: PRIVACY_POLICIES;
        };
    }
>(gql`
    mutation sendMessage(
        $channel: ChannelsTypes
        $appVersion: String
        $base64: String
        $recipient: String
        $date: Date
        $options: JSON
        $contentType: [String]
        $timezone: Int
    ) {
        sendMessage(
            channel: $channel
            appVersion: $appVersion
            base64: $base64
            recipient: $recipient
            date: $date
            contentType: $contentType
            timezone: $timezone
            options: $options
        ) {
            _id
            channel
            type
            recipient
            url
            date
            status {
                label
                __typename
            }
            statusList {
                label
                date
                __typename
            }
            senderUser {
                _id
                firstName
                email
                __typename
            }
            privacyPolicy
            addedLoveCoins
            base64
            heartsSent
            commentsCount
            __typename
        }
    }
`);
