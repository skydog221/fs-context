import { BlockTypeStored, InputTypeStored } from './classify';
import { ExtensionBuilder } from './builder';
import { ExtensionMetadata } from './metadata';
import { HexColorString } from './util';
import BaseScratchVM from 'scratch-vm';

export type BaseScratchRuntime = BaseScratchVM['runtime'];

export interface BlockStored {
    opcode?: string;
    blockType: BlockTypeStored;
    text: string;
    arguments?: Record<string, BlockArgumentStored>;
}
export interface BlockArgumentStored {
    type: InputTypeStored;
    defaultValue?: any;
    menu?: string;
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
    blocks: (BlockStored | '---')[];
    menus: Record<string, MenuStored>;
    color1?: HexColorString;
    color2?: HexColorString;
    color3?: HexColorString;
}
export type ExtensionStored = {
    getInfo(): ExtensionInfoStored;
    runtime?: ScratchRuntime;
} & Record<string, unknown>;
export type ScratchRuntime = null | {
    extensions: {
        unsandboxed: boolean;
        register(extension: ExtensionStored): void;
        unregister(extension: ExtensionStored): void;
    }
    translate: ScratchTranslate;
    vm: BaseScratchVM;
    runtime: BaseScratchRuntime;
}
export interface ScratchTranslateKeyDescriptor<K extends string = string> {
    id?: K;
    default: string;
    description?: string;
}
export interface ScratchTranslate {
    (key: ScratchTranslateKeyDescriptor | string): string;
    setup(store: Record<string, Record<string, string>>): void;
    get language(): string;
}
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