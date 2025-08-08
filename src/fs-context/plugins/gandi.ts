import { defineModLoader } from "fs-context/structs/plugin";

declare const window: Window & {
    tempExt: any;
};
export default defineModLoader({
    id: "gandi",
    obtainRuntime(_, ...args) {
        return args[0];
    },
    apply(env) {
        window.tempExt = {
            Extension: env.extender.stored,
            info: {
                extensionId: env.extension.metadata.id
            }
        };
    },
    load() { },
    isSandboxed() {
        return false;
    },
});