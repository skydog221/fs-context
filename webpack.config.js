const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const tsconfig = require("./tsconfig.json");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    resolve: {
        extensions: [".js", ".ts"],
        alias: Object.fromEntries(
            Object.entries(tsconfig.compilerOptions.paths)
                .map(([key, value]) => [key.replace("/*", ""), path.resolve(__dirname, value[0].replace("/*", ""))])
        )
    }
};