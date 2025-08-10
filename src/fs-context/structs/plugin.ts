import { ContextEnvironment, ScratchRuntime } from "fs-context/structs/stored";

/**
 * @description 指的是“ScratchMod”的加载器，不是传统意义的“模组”
 */
export interface ModLoadable {
    id: string;

    apply?(this: ModLoadable, environment: ContextEnvironment): void;
    initExtender?(this: ModLoadable, ...args: any[]): void;
    isSandboxed(this: ModLoadable, environment: ContextEnvironment, runtime: ScratchRuntime): boolean;
    obtainRuntime(this: ModLoadable, environment: ContextEnvironment, ...contextData: any[]): ScratchRuntime;
    load(this: ModLoadable, environment: ContextEnvironment, runtime: ScratchRuntime, ...contextData: any[]): void;
    unload?(this: ModLoadable, environment: ContextEnvironment, runtime: ScratchRuntime, ...contextData: any[]): void;
    expose?(this: ModLoadable, environment: ContextEnvironment): any;
}
export function defineModLoader(loader: ModLoadable) {
    return loader;
}