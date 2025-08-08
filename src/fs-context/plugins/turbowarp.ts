import { defineModLoader } from "fs-context/structs/plugin";

export default defineModLoader({
    id: "tw",
    obtainRuntime(environment) {
        return environment.window.Scratch;
    },
    load(environment, runtime) {
        runtime?.extensions.register(environment.extension.stored);
    },
    isSandboxed(_, runtime) {
        return !runtime?.extensions.unsandboxed;
    },
});