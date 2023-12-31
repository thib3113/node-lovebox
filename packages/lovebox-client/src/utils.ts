import debugConstructor, { Debugger } from 'debug';
import { pkg } from './pkg.js';

export const createDebugger = (name: string): Debugger => {
    return debugConstructor(pkg.name + (name ? `:${name}` : ''));
};

export type MakeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
