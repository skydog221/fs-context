import { InputType, InputTypeCast } from "../classify";
import { DeepReadonly, FixStringName, ToString } from "../util";
import { ColorRGB } from "./runtime/color";

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
export type FixType<T extends string> = FixStringName<T> extends InputType ? FixStringName<T> : "string"
export type FindType<A extends FullArg> = FixStringName<
    A extends `[${string}:${infer T}=${string}]`
    ? FixType<T>
    : A extends `[${string}:${infer T}]`
    ? FixType<T>
    : "string"
>;
export type FindValue<A extends FullArg> =
    A extends `[${string}:${string}=${infer V}]`
    ? V
    : A extends `[${string}=${infer V}]`
    ? V
    : ""
    ;
export type FindArgumentTexts<T extends string> =
    T extends `${string}[${infer A}]${string}`
    ? [`[${A}]`, ...FindArgumentTexts<T extends `${string}[${string}]${infer B}` ? B : "">]
    : [];
export type ArgumentMap<T extends string, _L extends Record<string, any>> = DeepReadonly<{
    [K in FindArgumentTexts<T>[number]as FindName<K>]: InputTypeCast[FindType<K>];
    // FindType<K> extends keyof L ?
    // L[FindType<K>] :
}>;
export type DefaultMap<T extends string> = DeepReadonly<{
    [K in FindArgumentTexts<T>[number]as FindName<K>]: ParseValue<FindValue<K>>;
}>;
export type ParseValue<T extends string> =
    T extends `${infer N extends number}` ? N :
    T extends `"${infer S extends string}"` ? S :
    T extends `#${infer _C extends string}` ? ColorRGB :
    T extends "true" ? true :
    T extends "false" ? false :
    unknown;
export type Tuple<N extends number, T extends number[] = []> =
    T["length"] extends N ? T : Tuple<N, [...T, T["length"]]>;
export type Add<A extends number, B extends number> =
    [...Tuple<A>, ...Tuple<B>]["length"];
export type Multiply<A extends number, B extends number, Result extends any[] = []> =
    B extends 0 ? Result["length"] :
    Multiply<A, Subtract<B, 1>, [...Result, ...Tuple<A>]>;
export type Subtract<A extends number, B extends number> =
    Tuple<A> extends [...Tuple<B>, ...infer Rest] ? Rest["length"] :
    Tuple<B> extends [...Tuple<A>, ...infer Rest] ?
    `-${Rest["length"]}` extends `${infer N extends number}` ? N : never :
    never;
export type Numbers = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type HexLetters = "a" | "b" | "c" | "d" | "e" | "f";
export type HexChars = Lowercase<HexLetters> | Uppercase<HexLetters> | ToString<Numbers>;
export type HexMap2<H extends `${HexChars}${HexChars}`> = {
    [A in HexChars]: {
        [B in HexChars]: Add<Multiply<HexCharToNumber<A>, 16> & number, HexCharToNumber<B>>
    }
}[H extends `${infer A extends HexChars}${HexChars}` ? A : never][H extends `${infer A extends HexChars}${HexChars}` ? A : never];
export type HexCharToNumber<H extends HexChars> = ({
    [K in Numbers as ToString<K>]: K;
} & {
    a: 10;
    b: 11;
    c: 12;
    d: 13;
    e: 14;
    f: 15;
    A: 10;
    B: 11;
    C: 12;
    D: 13;
    E: 14;
    F: 15;
})[H];