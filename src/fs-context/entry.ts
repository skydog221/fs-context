import extension from "@/extension";
import { extensionManager } from "fs-context";

console.log(`Loading extension ${fsContext.extension.name}@${fsContext.extension.author}-v${fsContext.extension.version} on platform "${fsContext.platform}".`);

const env = extensionManager.createContextEnvironment(extension);
if (fsContext.developing) {
    console.warn("Running in development mode.");
    console.log("Extension metadata:", env.extension.metadata);
    console.log("Stored extension:", env.extension.stored);
    console.log("getInfo():", env.extension.stored.getInfo());
}
extensionManager.load(env, fsContext.platform);
