import { Linter } from "eslint";
import fs from "fs";
import { NativePlugin } from "fs-context/native-plugin";
import path from "path";
import { Configuration } from "webpack";

export function load() {
    const webpack: Record<string, Configuration> = {};
    const eslint: Linter.Config[] = [];
    const pluginsDir = path.join(__dirname, "../../plugins");
    try {
        const pluginFolders = fs.readdirSync(pluginsDir)
            .filter(file => fs.statSync(path.join(pluginsDir, file)).isDirectory());
        for (const folder of pluginFolders) {
            try {
                const nativePath = path.resolve("dist/native/plugins", folder, "native.js");
                if (fs.existsSync(nativePath)) {
                    const { default: plugin }: { default: NativePlugin } = require(nativePath);
                    webpack[plugin.platform] = plugin.configureWebpack?.call(plugin) ?? {};
                    eslint.push(...(plugin.configureESLint?.call(plugin) ?? []));
                    console.log(`Plugin ${folder} loaded successfully.`);
                } else {
                    webpack[folder] = {};
                    console.warn(`Found plugin ${folder} not found native.ts.`);
                }
            } catch (err) {
                console.error(`Failed to load plugin from ${folder}:`, err);
            }
        }
    } catch (err) {
        console.warn("Failed to read plugin folder:", err);
    }
    return { webpack, eslint };
}