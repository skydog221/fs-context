import * as pluginManager from "./manager/plugins";
import * as extensionManager from "./manager/extensions";

import tw from "@plugin/tw";
import gandi from "@plugin/gandi";
pluginManager.register(tw);
pluginManager.register(gandi);

export * from "./structs";
export * as textParser from "./structs/parser/runtime/text";
export * as colorParser from "./structs/parser/runtime/color";
export * as menuParser from "./structs/parser/runtime/menu";
export * as numberParser from "./structs/parser/runtime/number";
export * as argumentTypeParser from "./structs/parser/runtime/argumentType";
export * as blockTypeParser from "./structs/parser/runtime/blockType";
export {
    pluginManager,
    extensionManager
};