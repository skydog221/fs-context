import * as pluginManager from "./manager/plugins";
import * as extensionManager from "./manager/extensions";
import "./structs/parser/runtime/color";

import tw from "./plugins/turbowarp";
import gandi from "./plugins/gandi";
pluginManager.register(tw);
pluginManager.register(gandi);

export * from "./structs";
export * as textParser from "./structs/parser/runtime/text";
export * as colorParser from "./structs/parser/runtime/color";
export * as menuParser from "./structs/parser/runtime/menu";
export {
    pluginManager,
    extensionManager
};