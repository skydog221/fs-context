import extension from "@/extension";
import { extensionManager, pluginManager } from "fs-context";

console.log(`Loading "${fsContext.extension.name} v${fsContext.extension.version}" on ${fsContext.platform}.`);
const unsupportedPlatforms = fsContext.extension.platform.filter(pf => !pluginManager.getRegistered().includes(pf));
if (unsupportedPlatforms.includes(fsContext.platform)) {
    throw new Error(`Platform ${fsContext.platform} is not supported.`);
} else if (unsupportedPlatforms.length > 0) {
    console.warn(`Unknown platform ${unsupportedPlatforms.join(", ")} received.`);
}
const env = extensionManager.createContextEnvironment(extension);
pluginManager.call(fsContext.platform, "apply", [
    extensionManager.createContextEnvironment(extension, (...args: any[]) => {
        pluginManager.call(fsContext.platform, "initExtender", [...args]);
        if (fsContext.developing) console.log("Constructing stored extender with:", args);
        extensionManager.load(env, fsContext.platform, args);
        if (fsContext.developing) {
            console.warn("Running in development mode. Don't publish it online.");
            console.log("\n--->");
            console.log("Extension data:");
            console.log("Metadata:", env.extension.metadata);
            console.log("Stored:", env.extension.stored);
            console.log("<---");
            console.log("\ngetInfo():", env.extension.stored.getInfo());
        }
    })
], env => new env.extender.stored());