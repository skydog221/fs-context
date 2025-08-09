import { menuParser, pluginManager, textParser } from "fs-context";
import { ExtensionBuilder } from "fs-context/structs/builder";
import { ExtensionMetadata } from "fs-context/structs/metadata";
import { isInternalType } from "fs-context/structs/parser/runtime/text";
import { ExtensionStored, ContextEnvironment, ExtensionInfoStored } from "fs-context/structs/stored";

export function createExtender(md: ExtensionMetadata, initer?: (...args: any[]) => void) {
    return class implements ExtensionStored {
        [key: string]: unknown;
        runtime = null;
        constructor(...args: any[]) {
            if (initer) {
                initer(...args);
            }
            md.blocks.forEach(block => {
                this[block.opcode] = (args: Record<string, any>) => {
                    const inputArgs = { ...args };
                    block.parts().forEach(part => {
                        if (part.type === "arg" && !isInternalType(part.inputType)) {
                            if (part.inputType in md.loaders) {
                                inputArgs[part.content] = md.loaders[part.inputType](inputArgs[part.content]);
                            } else {
                                console.error(`Argument "${part.content}" is using loader "${part.inputType}" but not found.`);
                                if (part.defaultValue) {
                                    inputArgs[part.content] = part.defaultValue;
                                } else {
                                    console.warn(`No default value of "${part.content}" is given.`);
                                    inputArgs[part.content] = null;
                                }
                            }
                        }
                    });
                    const defaults: Record<string, any> = {};
                    block.parts().forEach(part => {
                        if (part.type === "arg") {
                            defaults[part.content] = part.defaultValue;
                        }
                    });
                    return block.action(inputArgs, defaults);
                };
            });
        }
        getInfo() {
            const result: ExtensionInfoStored = {
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
            };
            if (md.color[0]) result.color1 = md.color[0];
            if (md.color[1]) result.color2 = md.color[1];
            if (md.color[2]) result.color3 = md.color[2];
            return result;
        }
    };
}
export function createContextEnvironment(extension: ExtensionBuilder, initer?: (...args: any[]) => void): ContextEnvironment {
    const rawExtenderStored = createExtender(extension.build());
    const rawExtensionStored = new rawExtenderStored();
    const extenderStored = createExtender(extension.build(), initer);
    return {
        window,
        extension: {
            metadata: extension.build(),
            stored: rawExtensionStored
        },
        extender: {
            metadata: extension,
            stored: extenderStored
        }
    };
}
export function load(environment: ContextEnvironment, platform: string, initData: any[]) {
    const runtime = pluginManager.call(platform, "obtainRuntime", [environment, ...initData]).data
    const isSandboxed = pluginManager.call(platform, "isSandboxed", [environment, runtime]).data;
    if (fsContext.developing) {
        console.log(`Runtime(${isSandboxed ? "" : "un"}sandboxed) obtained:`, runtime);
    }
    if (!environment.extension.metadata.allowSandbox && isSandboxed) {
        throw new Error(`Extension "${environment.extension.metadata.name}" doesn't allow sandboxed, but ${platform} is sandboxed.`);
    }
    environment.extension.stored.runtime = runtime;
    pluginManager.call(platform, "load", [environment, runtime, ...initData]);
}