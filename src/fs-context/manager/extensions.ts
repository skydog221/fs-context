import { pluginManager, textParser } from "fs-context";
import { ExtensionBuilder } from "fs-context/structs/builder";
import { ExtensionMetadata } from "fs-context/structs/metadata";
import { storeItem } from "fs-context/structs/parser/runtime/menu";
import { ExtensionStored, ContextEnvironment } from "fs-context/structs/stored";

export function createExtender(md: ExtensionMetadata): new () => ExtensionStored {
    return class implements ExtensionStored {
        [key: string]: unknown;
        runtime = null;
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
                    text: textParser.storeText(blockMd.text),
                    arguments: Object.fromEntries(blockMd.parts().map(part => [
                        part.content,
                        textParser.storeArg(part)
                    ]).filter(Boolean))
                })),
                menus: Object.fromEntries(md.menus.map(menuMd => [
                    menuMd.name,
                    {
                        items: menuMd.items.map(storeItem),
                        acceptReporters: menuMd.reportable
                    }
                ]))
            }
        }
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
export function obtainRuntime(environment: ContextEnvironment, platform: string, ...args: any[]) {
    return pluginManager.call(platform, "obtainRuntime", [environment, ...args]).data;
}
export function load(environment: ContextEnvironment, platform: string) {
    function callLoad() {
        const runtime = obtainRuntime(environment, platform, ...contextData);
        pluginManager.call(platform, "load", [environment, runtime, ...contextData]);
    }
    let contextData: any[] = [];
    const { state } = pluginManager.call(platform, "context", [environment, (args: any[]) => {
        contextData = args;
        callLoad();
    }]);
    if (!state) {
        callLoad();
    }
}