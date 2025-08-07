import { BlockBuilder, BlockType } from "fs-context";

export interface Buildable<out T> {
    build(): T;
};
export type Builder<T, ChainNext extends Builder<T> = Builder<T, any>> = Buildable<T> & {
    [K in keyof T]: (v: T[K]) => ChainNext;
};
export type BlockTypeSelector = {
    [T in BlockType]: (opcode: string) => BlockBuilder;
};