import { Configuration } from "webpack";
import { Linter } from "eslint";

export interface NativePlugin {
    platform: string;
    configureWebpack?: (this: NativePlugin) => Configuration;
    configureESLint?: (this: NativePlugin) => Linter.Config[];
}
export function definePlugin<T extends NativePlugin>(plugin: T): T {
    return plugin;
}