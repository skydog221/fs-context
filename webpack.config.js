const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const Webpackbar = require("webpackbar");

const tsconfigJson = require("./tsconfig.json");
const packageJson = require("./package.json");

module.exports = packageJson.extension.platform.map(platform => {
    const filename = `[${platform}] ${packageJson.extension.name}@${packageJson.extension.version}.js`;
    return {
        name: platform,
        entry: "@/extension.ts",
        resolve: {
            extensions: [".js", ".ts"],
            alias: Object.fromEntries(
                Object.entries(tsconfigJson.compilerOptions.paths)
                    .map(([key, value]) => [key.replace("/*", ""), path.resolve(__dirname, value[0].replace("/*", ""))])
            )
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename
        },
        module: {
            rules: [
                {
                    test: /\.ts$/i,
                    use: "ts-loader",
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new Webpackbar({
                name: packageJson.extension.name.toUpperCase(),
                color: "green"
            }),
            new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
            new webpack.DefinePlugin({
                fsContext: JSON.stringify({ platform })
            })
        ],
        /**
         * @type {import('webpack-dev-server').Configuration}
         */
        devServer: {
            port: 25565,
            setupExitSignals: false,
            client: {
                logging: "none"
            },
            webSocketServer: false,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        },
        stats: "none"
    };
});