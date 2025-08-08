import { textParser } from "fs-context";
import { ExtensionBuilder, BlockBuilder, MenuBuilder } from "./builder";
import { blockTypes, BlockType } from "./classify";
import { BlockTypeSelector } from "./interface";
import { BlockMetadata, MenuMetadata, MenuItem } from "./metadata";
import { ArgumentMap } from "./parser/compiltime";

export function extension<B extends BlockMetadata[] = [], M extends MenuMetadata[] = []>(id: string): ExtensionBuilder<B, M> {
    let name = "Example extension";
    let description = "This is a example extension";
    let allowSandbox = true;
    const blocks: B = [] as unknown as B;
    const menus: M = [] as unknown as M;
    return {
        id(v) {
            id = v;
            return this;
        },
        name(v) {
            name = v;
            return this;
        },
        description(v) {
            description = v;
            return this;
        },
        blocks(v) {
            blocks.push(...v);
            return this;
        },
        menus(v) {
            menus.push(...v);
            return this;
        },
        menu<N extends MenuMetadata>(md: N): ExtensionBuilder<B, [...M, N]> {
            menus.push(md);
            return this as unknown as ExtensionBuilder<B, [...M, N]>;
        },
        block<N extends BlockMetadata>(md: N): ExtensionBuilder<[...B, N], M> {
            blocks.push(md);
            return this as unknown as ExtensionBuilder<[...B, N], M>;
        },
        allowSandbox(v) {
            allowSandbox = v;
            return this;
        },
        build() {
            return {
                id,
                name,
                description,
                blocks,
                menus,
                allowSandbox
            };
        }
    }
};
export const blockType = new Proxy({}, {
    get(_, prop) {
        if (blockTypes.includes(prop as BlockType)) {
            let blockType = prop as BlockType;
            return <T extends string, V>(opcode: string): BlockBuilder<T, V> => {
                let text = "" as unknown as T;
                let action = (_: any) => {
                    return undefined as unknown as V;
                };
                return {
                    opcode(v) {
                        opcode = v;
                        return this;
                    },
                    action<NV>(v: ((args: ArgumentMap<T>) => V & NV)) {
                        action = v;
                        return this as unknown as BlockBuilder<T, NV>;
                    },
                    text<NT extends string>(t: NT & T) {
                        text = t;
                        return this as unknown as BlockBuilder<NT, V>;
                    },
                    type(v) {
                        blockType = v;
                        return this;
                    },
                    build() {
                        return {
                            opcode,
                            text,
                            action,
                            type: blockType,
                            parts() {
                                return textParser.toParts(text);
                            }
                        }
                    },
                    parts(v) {
                        text = textParser.toMetadata(v()) as T;
                        return this;
                    }
                };
            };
        }
    }
}) as BlockTypeSelector;
export function menu<N extends string, I extends MenuItem[]>(name: N): MenuBuilder<N, I> {
    let reportable: boolean = true;
    let readback: ((menu: MenuMetadata<N, I>) => MenuItem[]) | undefined = undefined;
    const items = [] as unknown as I;
    return {
        name<NN extends string>(v: NN) {
            name = v as unknown as N;
            return this as unknown as MenuBuilder<NN, I>;
        },
        item<K extends string, V, NI extends MenuItem = MenuItem<K, V>>(key: K, value: V): MenuBuilder<N, [...I, NI]> {
            items.push({ key, value });
            return this as unknown as MenuBuilder<N, [...I, NI]>;
        },
        reportable(v) {
            reportable = v;
            return this;
        },
        readback(v) {
            readback = v;
            return this;
        },
        items(v) {
            items.push(...v);
            return this;
        },
        build() {
            return {
                name,
                items,
                reportable,
                readback
            }
        }
    }
}