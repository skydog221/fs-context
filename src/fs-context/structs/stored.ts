import { BlockType, ExtensionBuilder, ExtensionMetadata } from "fs-context";

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
    menus: Record<string, MenuStored>;
}
export type ExtensionStored = {
    getInfo(): ExtensionInfoStored;
    runtime?: ScratchRuntime;
} & Record<string, unknown>;
export interface BaseScratchRuntime {
    extensions: {
        unsandboxed: boolean;
        register(extension: ExtensionStored): void;
    }
}
export type ScratchRuntime = BaseScratchRuntime | null;
export interface ContextEnvironment {
    window: Window;
    extension: ExtensionData;
    extender: ExtenderData;
}
export interface ExtenderData {
    stored: new () => ExtensionStored;
    metadata: ExtensionBuilder;
}
export interface ExtensionData {
    stored: ExtensionStored;
    metadata: ExtensionMetadata;
}