const path = require("path");

const Webpackbar = require("webpackbar");

const tsconfigJson = require("./tsconfig.json");
const packageJson = require("./package.json");
const webpack = require("webpack");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
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
        filename: `${packageJson.name}.js`
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
            name: packageJson.name,
            color: "green"
        }),
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
    ],
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
    }
};