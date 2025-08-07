import { BlockBuilder } from "./builder";
import { BlockType } from "./classify";

export interface Buildable<out T> {
    build(): T;
};
export type Builder<T> = Buildable<T> & {
    [K in keyof T]?: (v: T[K]) => Builder<T>;
};
export type BlockTypeSelector = {
    [T in BlockType]: (opcode: string) => BlockBuilder;
};