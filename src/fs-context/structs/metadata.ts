import { BlockType } from "./classify";
import { ArgumentMap } from "./parser/compiltime";
import { TextPart } from "./parser/runtime/text";

export interface ExtensionMetadata<Blocks extends BlockMetadata[] = BlockMetadata[], Menus extends MenuMetadata[] = MenuMetadata[]> {
    id: string;
    name: string;
    description: string;
    blocks: Blocks;
    menus: Menus;
    allowSandbox: boolean;
}
export interface BlockMetadata<Text extends string = string, Value = any> {
    parts(): TextPart[];

    opcode: string;
    text: Text;
    type: BlockType;
    action: (args: ArgumentMap<Text>) => Value;
}
export interface MenuItem<Key extends string = string, Value = any> {
    key: Key;
    value: Value;
}
export interface MenuMetadata<Name extends string = string, Items extends MenuItem[] = MenuItem[]> {
    name: Name;
    items: Items;
    reportable: boolean;
    readback?: (menu: MenuMetadata<Name, Items>) => MenuItem[];
}