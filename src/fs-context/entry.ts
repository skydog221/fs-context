import extension from "@/extension";
import { extensionManager } from "fs-context";

const env = extensionManager.createContextEnvironment(extension);
extensionManager.load(env, fsContext.platform);
