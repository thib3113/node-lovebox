import { pkg } from './pkg.js';
import * as QUERIES from './lovebox/queries/index.js';

export * from './lovebox/types/index.js';
export * from './constants.js';
export * from './utils.js';
export * from './GraphQLQuery.js';
export * from './LoveBoxClient.js';

export { QUERIES };

export const VERSION = pkg.version;
