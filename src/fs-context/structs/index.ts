import { BlockBuilder, ExtensionBuilder, MenuBuilder } from "./builder";
import { blockTypes } from "./classify";
import { BlockTypeSelector } from "./interface";
import { BlockMetadata, MenuItem, MenuMetadata } from "./metadata";

export function extension<B extends BlockMetadata[] = [], M extends MenuMetadata[] = []>(id: string): ExtensionBuilder<B, M> {
    let name = "Example extension";
    let description = "This is a example extension";
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
        menu<N extends MenuMetadata>(md: N): ExtensionBuilder<B, [...M, N]> {
            menus.push(md);
            return this as unknown as ExtensionBuilder<B, [...M, N]>;
        },
        block<N extends BlockMetadata>(md: N): ExtensionBuilder<[...B, N], M> {
            blocks.push(md);
            return this as unknown as ExtensionBuilder<[...B, N], M>;
        },
        build() {
            return {
                id,
                name,
                description,
                blocks,
                menus
            };
        }
    }
};
export const blockType = new Proxy({}, {
    get(_, prop) {
        if (prop in blockTypes) {
            return <T extends string>(opcode: string): BlockBuilder<T> => {
                let text = "";
                let action = (_: any) => { };
                return {
                    opcode(v) {
                        opcode = v;
                        return this;
                    },
                    action(v) {
                        action = v;
                        return this;
                    },
                    text(t) {
                        text = t;
                        return this;
                    },
                    build() {
                        return {
                            opcode,
                            text,
                            action
                        }
                    },
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
        item<NI extends MenuItem>(item: NI): MenuBuilder<N, [...I, NI]> {
            items.push(item);
            return this as unknown as MenuBuilder<N, [...I, NI]>;
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