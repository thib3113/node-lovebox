import { gql } from 'graphql-request';
import { GraphQLQuery } from '../../GraphQLQuery.js';

export const sendTestingRemoteNotification = new GraphQLQuery<{ sendTestingRemoteNotification: true }>(gql`
    mutation {
        sendTestingRemoteNotification
    }
`);
