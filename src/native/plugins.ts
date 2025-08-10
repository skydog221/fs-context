import fs from "fs";
import { NativePlugin } from "fs-context/native-plugin";
import path from "path";
import { merge } from "webpack-merge";

export async function load() {
    let webpack = {};
    let eslint = [];
    const pluginsDir = path.join(__dirname, "../../plugins");
    try {
        const pluginFolders = fs.readdirSync(pluginsDir)
            .filter(file => fs.statSync(path.join(pluginsDir, file)).isDirectory());
        for (const folder of pluginFolders) {
            try {
                const nativePath = path.join(pluginsDir, folder, "dist/native/plugins", folder, "native.js");
                if (fs.existsSync(nativePath)) {
                    const plugin: NativePlugin = await import(nativePath);
                    webpack = merge(webpack, plugin.configureWebpack?.call(plugin) ?? {});
                    eslint.push(...(plugin.configureESLint?.call(plugin) ?? []));
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