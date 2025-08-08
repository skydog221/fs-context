import { ContextEnvironment, ScratchRuntime } from "fs-context";

/**
 * @description 指的是“ScratchMod”的加载器，不是传统意义的“模组”
 */
export interface ModLoadable {
    id: string;

    context?(this: ModLoadable, environment: ContextEnvironment, executor: (args: any[]) => void): void;
    obtainRuntime(this: ModLoadable, environment: ContextEnvironment, ...contextData: any[]): ScratchRuntime;
    load(this: ModLoadable, environment: ContextEnvironment, runtime: ScratchRuntime, ...contextData: any[]): void;
    unload?(this: ModLoadable, environment: ContextEnvironment, runtime: ScratchRuntime, ...contextData: any[]): void;
}
export function defineModLoader(loader: ModLoadable) {
    return loader;
}