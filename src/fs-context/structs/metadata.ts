import { ArgumentMap } from "fs-context";

export interface ExtensionMetadata<Blocks extends BlockMetadata[] = [], Menus extends MenuMetadata[] = []> {
    id: string;
    name: string;
    description: string;
    blocks: Blocks;
    menus: Menus;
}
export interface BlockMetadata<Text extends string = string, Value = any> {
    opcode: string;
    text: Text;
    action: (args: ArgumentMap<Text>) => Value;
}
export interface MenuItem<Key extends string = string, Value = any> {
    key: Key;
    value: Value;
}
export interface MenuMetadata<Name extends string = string, Items extends MenuItem[] = [], Extension extends ExtensionMetadata = ExtensionMetadata> {
    name: Name;
    items: Items;
    reportable: boolean;
    readback?: (menu: MenuMetadata<Name, Items, Extension>) => MenuItem[];
}