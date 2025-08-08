import { ScratchRuntime } from "../structs/stored";

declare global {
    const fsContext: {
        readonly platform: string;
        readonly developing: boolean;
        readonly extension: {
            readonly name: string;
            readonly version: string;
            readonly platform: string[];
            readonly author: string;
        };
    };
    interface Window {
        Scratch: ScratchRuntime;
    }
}