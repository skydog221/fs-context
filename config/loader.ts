import { ExtensionLoadError } from "@framework/exceptions";
import type { LoaderConfig } from "@framework/internal";
import { Extensions } from "@framework/index";
Extensions.justPlaceholder();
const config: LoaderConfig = {
    target: import("@samples/apple"),
    errorCatches: [Error, ExtensionLoadError],
    platform: ["GandiIDE"],
    mode: "debug"
};
export default config;