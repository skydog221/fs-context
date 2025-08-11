export type HexColorString<C extends string = string> = `#${C}`;
export type KeyOfButMatch<T, M> = keyof {
    [K in keyof T as T[K] extends M ? K : never]: never;
};
export type Empty = null | undefined | never | void;
export type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type Unquote<Text extends string> = Text extends `"${infer Inner}"` ? Inner : Text;
export type Trim<Text extends string> = Text extends ` ${infer Inner}` | `${infer Inner} ` ? Trim<Inner> : Text;
export type FixStringName<Text extends string> = Unquote<Trim<Text>>;

export type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never;
export type ToString<N extends number> = `${N}`;
export function unquote(str: string) {
    if (str.startsWith('"') && str.endsWith('"')) {
        return str.slice(1, -1);
    }
    return str;
}