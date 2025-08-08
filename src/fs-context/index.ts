import * as pluginManager from "./manager/plugins";
import * as extensionManager from "./manager/extensions";

import tw from "./plugins/turbowarp";
import gandi from "./plugins/gandi";

pluginManager.register(tw);
pluginManager.register(gandi);

export * from "./structs";
export * from "./structs/builder";
export * from "./structs/classify";
export * from "./structs/interface";
export * from "./structs/metadata";
export * from "./structs/plugin";
export * from "./structs/stored";
export * from "./structs/util";
export * from "./structs/parser/compiltime";
export * from "./structs/parser/runtime";
export {
    pluginManager,
    extensionManager
};