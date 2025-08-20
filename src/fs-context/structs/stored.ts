import { BlockTypeStored, InputTypeStored } from './classify';
import { ExtensionBuilder } from './builder';
import { ExtensionMetadata } from './metadata';
import { HexColorString } from './util';
import ScratchRuntime from "scratch-vm";


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
export { ScratchRuntime };
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