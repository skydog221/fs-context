import { ModLoadable } from "fs-context/structs/plugin";
import { KeyOfButMatch } from "fs-context/structs/util";

const registered: Record<string, ModLoadable> = {};
export function register(loader: ModLoadable) {
    registered[loader.id] = loader;
}
export function unregister(id: string) {
    delete registered[id];
}
export function call<
    K extends KeyOfButMatch<ModLoadable, ((...args: any[]) => any) | undefined>
>(id: string, event: K, args: Parameters<NonNullable<ModLoadable[K]>>): {
    state: boolean;
    data: ReturnType<NonNullable<ModLoadable[K]>> | null;
} {
    const loader = registered[id];
    if (loader) {
        const method: undefined | ((...args: any[]) => any) = loader[event];
        if (method) {
            return {
                state: true,
                data: method.apply(loader, args)
            }
        }
    }
    return {
        state: false,
        data: null
    }
}