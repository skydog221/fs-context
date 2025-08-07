import { BlockType } from "./classify";

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
}