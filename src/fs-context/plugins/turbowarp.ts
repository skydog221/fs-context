import { defineModLoader } from "fs-context";

export default defineModLoader({
    id: "tw",
    obtainRuntime(environment) {
        return environment.window.Scratch;
    },
    load(extension, runtime) {
        runtime.extensions.register(extension.stored);
    }
});