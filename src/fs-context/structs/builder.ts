import { ArgumentMap, BlockMetadata, Builder, ExtensionMetadata, MenuItem, MenuMetadata } from "fs-context";

export interface ExtensionBuilder<
    B extends BlockMetadata[] = [],
    M extends MenuMetadata[] = []
> extends Builder<ExtensionMetadata<B, M>, ExtensionBuilder<B, M>> {
    block<N extends BlockMetadata>(md: N): ExtensionBuilder<[...B, N], M>;
    menu<N extends MenuMetadata>(md: N): ExtensionBuilder<B, [...M, N]>;
}
export interface BlockBuilder<
    Text extends string = string,
    Value = any
> extends Builder<BlockMetadata<Text, Value>, BlockBuilder<Text, Value>> {
    action<NewValue>(a: (args: ArgumentMap<Text>) => NewValue): BlockBuilder<Text, NewValue>;
    text<NewText extends string>(t: NewText): BlockBuilder<NewText, Value>;
}
export interface MenuBuilder<
    Name extends string = string,
    Items extends MenuItem[] = [],
    Extension extends ExtensionMetadata = ExtensionMetadata
> extends Builder<MenuMetadata<Name, Items>, MenuBuilder<Name, Items, Extension>> {
    name<N extends string>(name: N): MenuBuilder<N, Items, Extension>;
    item<K extends string, V, N extends MenuItem<K, V>>(key: K, value: V): MenuBuilder<Name, [...Items, N], Extension>;
}