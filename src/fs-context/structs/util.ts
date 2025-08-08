export type HexColorString = `#${string}`;
export type KeyOfButMatch<T, M> = keyof {
    [K in keyof T as T[K] extends M ? K : never]: never;
};
export type Empty = null | undefined | never | void;
export type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
export function unquote(str: string) {
    if (str.startsWith("\"") && str.endsWith("\"")) {
        return str.slice(1, -1);
    }
    return str;
}