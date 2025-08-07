import { ScratchRuntime } from "../structs/stored";

declare global {
    interface Window {
        Scratch: ScratchRuntime;
    }
}