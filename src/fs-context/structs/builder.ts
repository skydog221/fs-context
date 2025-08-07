import { Builder } from "./interface";
import { BlockMetadata, ExtensionMetadata, MenuItem, MenuMetadata } from "./metadata";
import { ArgumentMap } from "./parser/compiltime";

export interface ExtensionBuilder<
    B extends BlockMetadata[] = [],
    M extends MenuMetadata[] = []
> extends Builder<ExtensionMetadata<B, M>> {
    block<N extends BlockMetadata>(md: N): ExtensionBuilder<[...B, N], M>;
    menu<N extends MenuMetadata>(md: N): ExtensionBuilder<B, [...M, N]>;
}
export interface BlockBuilder<
    Text extends string = string
> extends Builder<BlockMetadata> {
    action(a: (args: ArgumentMap<Text>) => any): BlockBuilder<Text>;
    text<NewText extends string>(t: NewText): BlockBuilder<NewText>;
}
export interface MenuBuilder<
    Name extends string = string,
    Items extends MenuItem[] = [],
    Extension extends ExtensionMetadata = ExtensionMetadata
> extends Builder<MenuMetadata<Name, Items>> {
    name<N extends string>(name: N): MenuBuilder<N, Items, Extension>;
    item<N extends MenuItem>(item: N): MenuBuilder<Name, [...Items, N], Extension>;
}