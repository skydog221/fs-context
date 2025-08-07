import { BlockType } from "./classify";
import { ExtensionMetadata } from "./metadata";

export interface BlockStored {
    opcode: string;
    blockType: BlockType;
    text: string;
}
export interface MenuItemStored {
    text: string;
    value: any;
}
export interface MenuStored {
    items: (string | MenuItemStored)[];
    acceptReporters: boolean;
}
export interface ExtensionInfoStored {
    id: string;
    name: string;
    blocks: BlockStored[];
    menus: MenuStored[];
}
export type ExtensionStored = {
    getInfo(): ExtensionInfoStored;
} & Record<string, (args: any) => any>;
export interface ScratchRuntime {
    extensions: {
        unsandboxed: boolean;
        register(extension: ExtensionStored): void;
    }
}
export interface ContextEnvironment {
    window: Window;
    construtWith: any[];
    extension: ExtensionData;
    extender: ExtenderData;
}
export interface ExtenderData {
    stored: new () => ExtensionStored;
    metadata: new () => ExtensionMetadata;
}
export interface ExtensionData {
    stored: ExtensionStored;
    metadata: ExtensionMetadata;
}