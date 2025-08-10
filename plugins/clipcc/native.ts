import { definePlugin } from "fs-context/native-plugin";
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ZipWebpackPlugin from "zip-webpack-plugin";
import packageJson from "package.json";

export default definePlugin({
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
                        from: path.join(__dirname, "locales"),
                        to: path.join(__dirname, "build/locales")
                    }, {
                        from: path.join(__dirname, "assets"),
                        to: path.join(__dirname, "build/assets")
                    }, {
                        from: path.join(__dirname, "info.json"),
                        to: path.join(__dirname, "build/info.json")
                    }]
                }),
                new ZipWebpackPlugin({
                    path: path.join(__dirname, "dist"),
                    filename: `${packageJson.extension.name}@${packageJson.extension.version}`,
                    extension: "ccx"
                })
            ]
        };
    },
});