import { GraphQLQuery } from '../../GraphQLQuery.js';
import { gql } from 'graphql-request';

export const checkPairingCode = new GraphQLQuery<{ checkPairingCode: boolean }, { pairingCode: string }>(gql`
    mutation checkPairingCode($pairingCode: String) {
        checkPairingCode(pairingCode: $pairingCode)
    }
`);
