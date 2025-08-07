import { ContextEnvironment, ExtensionData, ScratchRuntime } from "./stored";

/**
 * @description 指的是“ScratchMod”的加载器，不是传统意义的“模组”
 */
export interface ModLoader {
    id: string;
    obtainRuntime(this: ModLoader, environment: ContextEnvironment): ScratchRuntime;
    load(this: ModLoader, extension: ExtensionData, runtime: ScratchRuntime): void;
    unload?(this: ModLoader, extension: ExtensionData, runtime: ScratchRuntime): void;
}
export function defineModLoader(loader: ModLoader) {
    return loader;
}