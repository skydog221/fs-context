import extension from "@/extension";
import { extensionManager, pluginManager } from "fs-context";

console.log("---");
console.log(`Loading extension ${fsContext.extension.name}@${fsContext.extension.author}-v${fsContext.extension.version} on platform "${fsContext.platform}".`);
const unsupportedPlatforms = fsContext.extension.platform.filter(pf => !pluginManager.getRegistered().includes(pf));
if (unsupportedPlatforms.includes(fsContext.platform)) {
    throw new Error(`Platform ${fsContext.platform} is not supported.`);
} else if (unsupportedPlatforms.length > 0) {
    console.warn(`Unknown platform ${unsupportedPlatforms.join(", ")} received.`);
}

const env = extensionManager.createContextEnvironment(extension);
if (fsContext.developing) {
    console.warn("Running in development mode.");
    console.log("Extension metadata:", env.extension.metadata);
    console.log("Stored extension:", env.extension.stored);
    console.log("getInfo():", env.extension.stored.getInfo());
}
console.log("---");
extensionManager.load(env, fsContext.platform);
