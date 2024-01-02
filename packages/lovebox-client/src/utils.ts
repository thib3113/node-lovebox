import debugConstructor, { Debugger } from 'debug';
import { pkg } from './pkg.js';

export const createDebugger = (name: string): Debugger => {
    return debugConstructor(pkg.name + (name ? `:${name}` : ''));
};
