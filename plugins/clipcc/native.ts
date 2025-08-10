import { definePlugin } from "../../src/native/structs/plugin";
import path from "path";
import fs from "fs";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ZipWebpackPlugin from "zip-webpack-plugin";
import packageJson from "../../package.json";

export default definePlugin({
    platform: "clipcc",
    configureWebpack() {
        return ({ filename }) => ({
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
                        to: path.resolve("dist/cc/locales")
                    }, {
                        from: path.resolve("src/extension/assets"),
                        to: path.resolve("dist/cc/assets")
                    }, {
                        from: path.resolve("src/extension/info.json"),
                        to: path.resolve("dist/cc/info.json")
                    }]
                }),
                new ZipWebpackPlugin({
                    path: path.resolve("dist/cc"),
                    filename: `../${packageJson.extension.id}@${packageJson.extension.version}`,
                    extension: "ccx"
                }),
                {
                    apply(compiler) {
                        compiler.hooks.done.tap("CleanAfterBuildPlugin", () => {
                            [path.join("dist", filename), path.join("dist", "cc")].forEach(file => {
                                const fullPath = path.resolve(file);
                                if (fs.existsSync(fullPath)) {
                                    fs.unlinkSync(fullPath);
                                }
                            });
                        });
                    }
                }
            ]
        });
    }
});