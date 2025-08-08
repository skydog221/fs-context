import { ModLoadable } from "fs-context/structs/plugin";
import { KeyOfButMatch } from "fs-context/structs/util";

const registered: Record<string, ModLoadable> = {};
export function register(loader: ModLoadable) {
    registered[loader.id] = loader;
}
export function unregister(id: string) {
    delete registered[id];
}
export function getRegistered() {
    return Object.keys(registered);
}
export function read<
    K extends KeyOfButMatch<ModLoadable, ((...args: any[]) => any) | undefined>
>(id: string, key: K): ModLoadable[K] {
    return registered[id][key];
}
export function call<
    K extends KeyOfButMatch<ModLoadable, ((...args: any[]) => any) | undefined>
>(id: string, event: K, args: Parameters<NonNullable<ModLoadable[K]>>, defaultMethod?: (this: ModLoadable, ...args: Parameters<NonNullable<ModLoadable[K]>>) => ReturnType<NonNullable<ModLoadable[K]>>): {
    state: boolean;
    data: ReturnType<NonNullable<ModLoadable[K]>> | null;
} {
    const loader = registered[id];
    let methodFound = false;
    if (loader) {
        const method: undefined | ((...args: any[]) => any) = loader[event];
        if (method) {
            methodFound = true;
            return {
                state: true,
                data: method.apply(loader, args)
            };
        }
    }
    if (!methodFound && defaultMethod) {
        return {
            state: true,
            data: defaultMethod.apply(loader, args)
        };
    }
    return {
        state: false,
        data: null
    };
}