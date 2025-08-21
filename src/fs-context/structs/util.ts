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
export function readKeyOrSelf(key: string, data?: any) {
    if (Object.hasOwn(data, key)) {
        return data[key];
    } else return data;
}
export function deepMerge<T extends Record<string, any>>(...sources: T[]): T {
    if (sources.length === 0) {
        return {} as T;
    }
    let target = sources[0];
    for (let i = 1; i < sources.length; i++) {
        const source = sources[i];
        if (typeof source === 'object' && source !== null) {
            for (const key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                        if (typeof target[key] === 'object' && target[key] !== null && !Array.isArray(target[key])) {
                            target[key] = deepMerge(target[key], source[key]);
                        } else {
                            target[key] = { ...source[key] };
                        }
                    } else {
                        target[key] = source[key];
                    }
                }
            }
        }
    }
    return target;
}