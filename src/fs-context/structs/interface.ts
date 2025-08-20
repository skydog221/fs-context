import { BlockBuilder } from './builder';
import { BlockType } from './classify';

export interface Buildable<out T> {
    build(): T;
};
export type Builder<T, ChainNext = Builder<T, any>> = Buildable<T> & {
    [K in keyof T]: (v: T[K]) => ChainNext;
};
export type BuilderExcludedKeys<
    T,
    K extends keyof Builder<T> = keyof Builder<T>,
    C extends BuilderExcludedKeys<T, K> = BuilderExcludedKeys<T, K, any>,
> = Omit<Builder<T, C>, K>;
export type BlockTypeSelector = {
    [T in BlockType]: <L extends Record<string, any>, T extends string = string, V = any>(opcode: string) => BlockBuilder<T, V, L>;
};