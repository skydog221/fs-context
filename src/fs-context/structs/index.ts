import { blockTypes } from "./enum";
import { BlockTypeSelector, Builder } from "./interface";
import { BlockMetadata, MenuMetadata } from "./metadata";

export class Extension {
    id: string = "";
    name: string = "";
    description: string = "";

    blocks: BlockMetadata[] = [];
    menus: MenuMetadata[] = [];
}
export const blockType = new Proxy({}, {
    get(_, prop) {
        if (prop in blockTypes) {
            return (opcode: string): Builder<BlockMetadata> => {
                let text: string = "";
                return {
                    text<T extends string>(t: T) {
                        text = t;
                        return this as Builder<BlockMetadata<T>>;
                    },
                    build() {
                        return {
                            opcode,
                            text
                        }
                    },
                };
            };
        }
    }
}) as BlockTypeSelector;