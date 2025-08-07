import { ContextEnvironment, ExtensionBuilder, ExtensionMetadata, ExtensionStored, pluginManager } from "fs-context";

export function createExtender(md: ExtensionMetadata): new () => ExtensionStored {
    return class implements ExtensionStored {
        constructor() {
            md.blocks.forEach(block => {
                this[block.opcode] = block.action;
            });
        }
        getInfo() {
            return {
                id: md.id,
                name: md.name,
                blocks: md.blocks.map(blockMd => ({
                    opcode: blockMd.opcode,
                    blockType: blockMd.type,
                    text: blockMd.text
                })),
                menus: Object.fromEntries(md.menus.map(menuMd => [
                    menuMd.name,
                    {
                        items: menuMd.items.map(item => ({
                            text: item.key,
                            value: item.value
                        })),
                        acceptReporters: menuMd.reportable
                    }
                ]))
            }
        }
        [key: string]: (args: any) => any;
    };
}
export function createContextEnvironment(extension: ExtensionBuilder): ContextEnvironment {
    const extenderStored = createExtender(extension.build());
    const extensionStored = new extenderStored();
    return {
        window,
        extension: {
            metadata: extension.build(),
            stored: extensionStored
        },
        extender: {
            metadata: extension,
            stored: extenderStored
        }
    };
}
export function load(extension: ExtensionBuilder, platform: string) {
    pluginManager.call(platform, "context", [createContextEnvironment(extension), (args) => {
        //pass
    }]);
}