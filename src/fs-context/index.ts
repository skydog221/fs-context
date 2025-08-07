import * as pluginManager from "./manager/plugins";
import tw from "./plugins/turbowarp";
import gandi from "./plugins/gandi";

pluginManager.register(tw);
pluginManager.register(gandi);

export * from "./structs";
export * from "./structs/plugin";
export { pluginManager };