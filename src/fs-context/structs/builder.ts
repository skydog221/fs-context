import { Builder } from "./interface";
import { BlockMetadata, MenuMetadata, ExtensionMetadata, MenuItem, LoaderMetadata } from "./metadata";
import { ArgumentMap, DefaultMap } from "./parser/compiltime";
import { HexColorString } from "./util";

export interface ExtensionBuilder<
    B extends BlockMetadata[] = any,
    M extends MenuMetadata[] = any,
    L extends Record<string, any> = any
> extends Builder<ExtensionMetadata<B, M, L>, ExtensionBuilder<B, M, L>> {
    separator(): ExtensionBuilder<B, M, L>;
    label(text: string): ExtensionBuilder<B, M, L>;
    block<N extends BlockMetadata>(md: N): ExtensionBuilder<[...B, N], M, L>;
    menu<N extends MenuMetadata>(md: N): ExtensionBuilder<B, [...M, N], L>;
    loader<N extends string, O>(name: N, md: LoaderMetadata<O>): ExtensionBuilder<B, M, L & { [K in N]: O }>;
    theme(color: HexColorString, offset?: number): ExtensionBuilder<B, M, L>;
}
export interface BlockBuilder<
    Text extends string = string,
    Value = any,
    Loaders extends Record<string, any> = any
> extends Builder<BlockMetadata<Text, Value, Loaders>, BlockBuilder<Text, Value, Loaders>> {
    action<NewValue>(method: (args: ArgumentMap<Text, Loaders>, defaults: DefaultMap<Text>) => NewValue): BlockBuilder<Text, NewValue, Loaders>;
    text<NewText extends string>(t: NewText): BlockBuilder<NewText, Value, Loaders>;
}
export interface MenuBuilder<
    Name extends string = string,
    Items extends MenuItem[] = [],
    Extension extends ExtensionMetadata = ExtensionMetadata
> extends Builder<MenuMetadata<Name, Items>, MenuBuilder<Name, Items, Extension>> {
    name<N extends string>(name: N): MenuBuilder<N, Items, Extension>;
    item<K extends string, V extends string, N extends MenuItem<K, V>>(key: K, value?: V): MenuBuilder<Name, [...Items, N], Extension>;
}