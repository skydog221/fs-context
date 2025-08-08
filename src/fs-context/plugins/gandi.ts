import { defineModLoader } from "fs-context/structs/plugin";

declare const window: Window & {
    tempExt: any;
};
export default defineModLoader({
    id: "gandi",
    context(_, executor) {
        window.tempExt = {
            extension: class {
                constructor(...args: any[]) {
                    executor(args);
                }
            }
        }
    },
    obtainRuntime(_, ...contextData) {
        return contextData[0];
    },
    load() { }
});