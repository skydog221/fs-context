import { InputType, InputTypeCast } from "../classify";

export type FullArg = `[${string}${`:${InputType}` | ""}${`=${string}` | ""}]`;
export type FindName<A extends FullArg> = A extends `[${infer N}:${string}=${string}]`
    ? N
    : A extends `[${infer N}:${string}]`
    ? N
    : A extends `[${infer N}=${string}]`
    ? N
    : A extends `[${infer N}]`
    ? N
    : never;
export type FindType<A extends FullArg> = A extends `[${string}:${infer T extends InputType}=${string}]`
    ? T
    : A extends `[${string}:${infer T extends InputType}]`
    ? T
    : "string";
export type FindValue<A extends FullArg> = A extends `[${string}:${string}=${infer V}]`
    ? V
    : A extends `[${string}=${infer V}]`
    ? V
    : "";
export type FindArgumentTexts<T extends string> =
    T extends `${string}[${infer A}]${string}`
    ? [`[${A}]`, ...FindArgumentTexts<T extends `${string}[${string}]${infer B}` ? B : "">]
    : [];
export type ArgumentMap<T extends string> = {
    [K in FindArgumentTexts<T>[number]as FindName<K>]: InputTypeCast[FindType<K>];
};