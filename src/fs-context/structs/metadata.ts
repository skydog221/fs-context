import { BlockType } from "./classify";
import { ArgumentMap, DefaultMap } from "./parser/compiltime";
import { TextPart } from "./parser/runtime/text";
import { HexColorString } from "./util";

export interface ExtensionMetadata<
    Blocks extends BlockMetadata[] = BlockMetadata[],
    Menus extends MenuMetadata[] = MenuMetadata[],
    Loaders extends Record<string, any> = Record<string, any>
> {
    id: string;
    name: string;
    description: string;
    blocks: Blocks;
    menus: Menus;
    loaders: Loaders;
    allowSandbox: boolean;
    color: [HexColorString | null, HexColorString | null, HexColorString | null];
}
export interface BlockMetadata<Text extends string = string, Value = any, Loaders extends Record<string, any> = any> {
    parts(): TextPart[];

    opcode: string;
    text: Text;
    type: BlockType;
    action: (args: ArgumentMap<Text, Loaders>, defaults: DefaultMap<Text>) => Value;
}
export interface MenuItem<Key extends string = string, Value = any> {
    key: Key;
    value: Value;
}
export interface MenuMetadata<Name extends string = any, Items extends MenuItem[] = any> {
    name: Name;
    items: Items;
    reportable: boolean;
    readback?: (menu: MenuMetadata<Name, Items>) => MenuItem[];
}
export interface LoaderMetadata<Output = any> {
    (args: string): Output;
}