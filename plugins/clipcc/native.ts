import { definePlugin } from "../../src/native/structs/plugin";
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ZipWebpackPlugin from "zip-webpack-plugin";
import packageJson from "../../package.json";

export default definePlugin({
    platform: "clipcc",
    configureWebpack() {
        return {
            output: {
                module: true,
                library: {
                    type: "commonjs2",
                    export: "default"
                }
            },
            experiments: {
                outputModule: true
            },
            externals: {
                "clipcc-extension": "ClipCCExtension"
            },
            externalsType: "global",
            plugins: [
                new CopyWebpackPlugin({
                    patterns: [{
                        from: path.resolve("src/extension/l10n"),
                        to: path.resolve("dist/locales")
                    }, {
                        from: path.resolve("src/extension/assets"),
                        to: path.resolve("dist/assets")
                    }, {
                        from: path.resolve("src/extension/info.json"),
                        to: path.resolve("dist/info.json")
                    }]
                }),
                new ZipWebpackPlugin({
                    path: path.resolve("dist"),
                    filename: `${packageJson.extension.id}@${packageJson.extension.version}`,
                    extension: "ccx"
                })
            ]
        };
    }
});