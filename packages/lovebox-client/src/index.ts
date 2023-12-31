import { pkg } from './pkg.js';
import * as LoveBoxQueries from './lovebox/queries/index.js';

export * from './lovebox/types/index.js';
export * from './constants.js';
export * from './GraphQLQuery.js';
export * from './LoveBoxClient.js';

export const QUERIES = LoveBoxQueries;

export const VERSION = pkg.version;
