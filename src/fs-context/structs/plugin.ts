import { ExtensionMetadata } from "./metadata";
import { ExtensionStored, ScratchRuntime } from "./stored";

export abstract class FSContextPlugin {
    id: string = "exampleplugin";
    abstract obtainRuntime(environment: {
        window: Window,
        construtWith: any[],
        extension: {
            stored: ExtensionStored,
            metadata: ExtensionMetadata,
        }
    }): ScratchRuntime;
}