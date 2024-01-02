import { User } from '../types/index.js';
import { gql } from 'graphql-request';
import { GraphQLQuery } from '../../GraphQLQuery.js';

export const getMe = new GraphQLQuery<
    {
        me: User;
    },
    undefined
>(gql`
    query me {
        me {
            _id
            createdAt
            firstName
            email
            beta
            settings {
                streak
                loveGoal
                reminders {
                    day
                    meridiem
                    number
                    weekday
                    time
                }
                specialDates {
                    _id
                    name
                    date
                    dateType
                }
                notifications {
                    generalMessageRead
                    generalHeartReceived
                    marketingOffers
                    marketingOffersPush
                    marketingOffersEmail
                }
            }
            addresses {
                __typename
                firstname
                lastname
                streetAddress
                zipCode
                city
                country
                state
            }
            boxes {
                _id
                color
                companyId
                signature
                picture
                nickname
                notifications {
                    disableUntil
                    messageRead
                    heartReceived
                }
                admin {
                    __typename
                    _id
                    firstName
                    email
                }
                privacyPolicy
                pairingCode
                isConnected
                isAdmin
                hardware
                hasColor
                connectionDate
                macAddress
            }
            roles
            device {
                __typename
                _id
                appVersion
                os
            }
            profile
            reminder
            subscription {
                __typename
                subscribed
                platform
            }
            fcmToken
            language
            loveCoins
            lastSentMessage
        }
    }
`);
