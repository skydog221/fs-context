import { ModLoader } from "fs-context";
import { KeyOfButMatch } from "../structs/util";

const registered: Record<string, ModLoader> = {};
export function register(loader: ModLoader) {
    registered[loader.id] = loader;
}
export function unregister(loader: ModLoader) {
    delete registered[loader.id];
}
export function call<K extends KeyOfButMatch<ModLoader, (...args: any[]) => any>>(id: string, event: K, args: Parameters<ModLoader[K]>) {
    const loader = registered[id];
    if (loader) {
        const method: (...args: any[]) => any = loader[event];
        if (method) {
            method.apply(loader, args);
        }
    }
}