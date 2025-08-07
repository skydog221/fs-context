import { ScratchRuntime } from "../structs/stored";

declare global {
    const fsContext: {
        platform: string;
    };
    interface Window {
        Scratch: ScratchRuntime;
    }
}