import { type Variables, resolveRequestDocument } from 'graphql-request';
import { parse } from 'graphql';

export class GraphQLQuery<TResponse, TVariables extends Variables | undefined = undefined> {
    public readonly __response!: TResponse;
    public readonly __query!: TVariables;

    public readonly name?: string;

    constructor(
        readonly gql: string,
        name?: string
    ) {
        const res = parse(gql);

        this.name = name ?? resolveRequestDocument(res).operationName;
    }
}
