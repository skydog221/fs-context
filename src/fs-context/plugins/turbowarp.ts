import { defineModLoader } from "fs-context";

export default defineModLoader({
    id: "tw",
    obtainRuntime(environment) {
        return environment.window.Scratch;
    },
    load(environment, runtime) {
        runtime?.extensions.register(environment.extension.stored);
    },
});