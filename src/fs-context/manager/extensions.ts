import { menuParser, pluginManager, textParser } from "fs-context";
import { ExtensionBuilder } from "fs-context/structs/builder";
import { ExtensionMetadata } from "fs-context/structs/metadata";
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
                name: `${md.name}${fsContext.developing ? "(Debug)" : ""}`,
                blocks: md.blocks.map(blockMd => ({
                    opcode: blockMd.opcode,
                    blockType: blockMd.type,
                    text: textParser.storeText(blockMd.text),
                    arguments: Object.fromEntries(blockMd.parts().map(part => [
                        part.content,
                        textParser.storeArg(part)
                    ]).filter(part => Boolean(part[1])))
                })),
                menus: Object.fromEntries(md.menus.map(menuMd => [
                    menuMd.name,
                    {
                        items: menuMd.items.map(menuParser.storeItem),
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
        const isSandboxed = pluginManager.call(platform, "isSandboxed", [environment, runtime]).data;
        if (fsContext.developing) {
            console.log(`Runtime(${isSandboxed ? "S" : "Uns"}andboxed) obtained:`, runtime);
        }
        if (!environment.extension.metadata.allowSandbox && isSandboxed) {
            throw new Error(`Extension "${environment.extension.metadata.name}" doesn't allow sandboxed, but ${platform} is sandboxed.`);
        }
        environment.extension.stored.runtime = runtime;
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