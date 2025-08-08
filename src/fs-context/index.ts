import * as pluginManager from "./manager/plugins";
import * as extensionManager from "./manager/extensions";
import "./structs";

import tw from "./plugins/turbowarp";
import gandi from "./plugins/gandi";
pluginManager.register(tw);
pluginManager.register(gandi);

export {
    pluginManager,
    extensionManager
};