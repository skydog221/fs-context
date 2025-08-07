import { BlockType } from "./enum";
import { BlockMetadata } from "./metadata";

export type Builder<T> = {
    build(): T;
} & {
    [K in keyof T]?: (v: T[K]) => Builder<T>;
}
export type BlockTypeSelector = {
    [T in BlockType]: (opcode: string) => Builder<BlockMetadata>;
}