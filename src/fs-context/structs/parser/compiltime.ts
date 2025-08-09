import { InputType, InputTypeCast } from "../classify";
import { DeepReadonly, FixStringName } from "../util";

export type FullArg = `[${string}${`:${InputType}` | ""}${`=${string}` | ""}]`;
export type FindName<A extends FullArg> = FixStringName<
    A extends `[${infer N}:${string}=${string}]`
    ? N
    : A extends `[${infer N}:${string}]`
    ? N
    : A extends `[${infer N}=${string}]`
    ? N
    : A extends `[${infer N}]`
    ? N
    : never
>;
export type FindType<A extends FullArg> = FixStringName<
    A extends `[${string}:${infer T}=${string}]`
    ? FixStringName<T> extends InputType ? T : "string"
    : A extends `[${string}:${infer T}]`
    ? FixStringName<T> extends InputType ? T : "string"
    : "string"
>;
export type FindValue<A extends FullArg> = FixStringName<
    A extends `[${string}:${string}=${infer V}]`
    ? V
    : A extends `[${string}=${infer V}]`
    ? V
    : ""
>;
export type FindArgumentTexts<T extends string> =
    T extends `${string}[${infer A}]${string}`
    ? [`[${A}]`, ...FindArgumentTexts<T extends `${string}[${string}]${infer B}` ? B : "">]
    : [];
export type ArgumentMap<T extends string, L extends Record<string, any>> = DeepReadonly<{
    [K in FindArgumentTexts<T>[number]as FindName<K>]:
    // FindType<K> extends keyof L ?
    // L[FindType<K>] :
    InputTypeCast[FindType<K>];
}>;