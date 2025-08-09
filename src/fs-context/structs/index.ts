import { colorParser, textParser } from "fs-context";
import { ExtensionBuilder, BlockBuilder, MenuBuilder } from "./builder";
import { blockTypes, BlockType } from "./classify";
import { BlockTypeSelector } from "./interface";
import { BlockMetadata, MenuMetadata, MenuItem, LoaderMetadata } from "./metadata";
import { ArgumentMap, DefaultMap } from "./parser/compiltime";
import { HexColorString } from "./util";

export function extension<B extends BlockMetadata[] = [], M extends MenuMetadata[] = [], L extends Record<string, LoaderMetadata> = Record<string, LoaderMetadata>>(id: string): ExtensionBuilder<B, M, L> {
    let name = "Example extension";
    let description = "This is a example extension";
    let allowSandbox = true;
    const blocks: B = [] as unknown as B;
    const menus: M = [] as unknown as M;
    const loaders: L = {} as unknown as L;
    let color1: HexColorString | null = null;
    let color2: HexColorString | null = null;
    let color3: HexColorString | null = null;
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
        loaders(v) {
            Object.assign(loaders, v);
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
        loader<N extends string, O>(name: N, md: LoaderMetadata<O>): ExtensionBuilder<B, M, L & { [K in N]: O; }> {
            loaders[name] = md as unknown as L[N];
            return this as unknown as ExtensionBuilder<B, M, L & { [K in N]: O; }>;
        },
        allowSandbox(v) {
            allowSandbox = v;
            return this;
        },
        theme(color, offset = 0.15) {
            color1 = color;
            color2 = colorParser.darken(color, offset);
            color3 = colorParser.darken(color, offset * 2);
            return this;
        },
        color(v) {
            color1 = v[0];
            color2 = v[1];
            color3 = v[2];
            return this;
        },
        build() {
            return {
                id,
                name,
                description,
                blocks,
                menus,
                loaders,
                allowSandbox,
                color: [color1, color2, color3]
            };
        }
    }
};
export const blockType = new Proxy({}, {
    get(_, prop) {
        if (blockTypes.includes(prop as BlockType)) {
            let blockType = prop as BlockType;
            return <L extends Record<string, any> = any, T extends string = string, V = any>(opcode: string): BlockBuilder<T, V, L> => {
                let text = "" as unknown as T;
                let action = (_: any, __: any) => null as unknown as V;
                return {
                    opcode(v) {
                        opcode = v;
                        return this;
                    },
                    action<NV>(v: ((args: ArgumentMap<T, L>, defaults: DefaultMap<T>) => V & NV)) {
                        action = v;
                        return this as unknown as BlockBuilder<T, NV, L>;
                    },
                    text<NT extends string>(t: NT & T) {
                        text = t;
                        return this as unknown as BlockBuilder<NT, V, L>;
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
        item<K extends string, V, NI extends MenuItem = MenuItem<K, V>>(key: K, value?: V): MenuBuilder<N, [...I, NI]> {
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
export type StoreSelf<T extends object> = {
    [K in keyof T]: T[K];
} & {
    data: T;
    read<K extends keyof T>(key: K): T[K];
    write<K extends keyof T>(key: K, value: T[K]): void;
}
export function remoteStore<T extends object>(data: T): StoreSelf<T> {
    return {
        ...data,
        data,
        read(key) {
            return data[key];
        },
        write(key, value) {
            data[key] = value;
        }
    };
}