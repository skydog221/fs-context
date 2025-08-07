import { KeyOfButMatch, ModLoadable } from "fs-context";

const registered: Record<string, ModLoadable> = {};
export function register(loader: ModLoadable) {
    registered[loader.id] = loader;
}
export function unregister(id: string) {
    delete registered[id];
}
export function call<
    K extends KeyOfButMatch<ModLoadable, ((...args: any[]) => any) | undefined>
>(id: string, event: K, args: Parameters<NonNullable<ModLoadable[K]>>): ReturnType<NonNullable<ModLoadable[K]>> | null {
    const loader = registered[id];
    if (loader) {
        const method: undefined | ((...args: any[]) => any) = loader[event];
        if (method) {
            return method.apply(loader, args);
        }
    }
    return null;
}