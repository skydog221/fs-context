const path = require("path");
const webpack = require("webpack");

const Webpackbar = require("webpackbar");

const tsconfigJson = require("./tsconfig.json");
const packageJson = require("./package.json");
const { merge } = require("webpack-merge");

module.exports = () => {
  const { webpack: webpackConfig } =
    require("./dist/native/src/native/plugins").load();
  return packageJson.extension.platform.map((platform) => {
    const filename = `[${platform}]${packageJson.extension.id}@${packageJson.extension.version}.js`;
    const base = {
      name: platform,
      entry: "fs-context/entry.ts",
      resolve: {
        extensions: [".js", ".ts"],
        alias: Object.fromEntries(
          Object.entries(tsconfigJson.compilerOptions.paths).map(
            ([key, value]) => [
              key.replace("/*", ""),
              path.resolve(__dirname, value[0].replace("/*", "")),
            ]
          )
        ),
      },
      output: {
        path: path.resolve(__dirname, "dist"),
        filename,
      },
      module: {
        rules: [
          {
            test: /\.ts$/i,
            use: "ts-loader",
            exclude: /node_modules/,
          },
        ],
      },
      plugins: [
        new Webpackbar({
          name: packageJson.extension.name.toUpperCase(),
          color: "green",
        }),
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
        new webpack.DefinePlugin({
          fsContext: JSON.stringify({
            platform,
            developing: process.env.NODE_ENV === "development",
            extension: packageJson.extension,
          }),
        }),
      ],
      /**
       * @type {import('webpack-dev-server').Configuration}
       */
      devServer: {
        port: 7777,
        setupExitSignals: false,
        webSocketServer: false,
        client: {
          logging: "none",
        },
        setupMiddlewares(mw, server) {
          server.app.get("/", (_, res) => {
            res.redirect(`/${filename}`);
          });
          return mw;
        },
        allowedHosts: "all",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers":
            "X-Requested-With, content-type, Authorization",
        },
      },
      mode: process.env.NODE_ENV,
      stats: "errors-warnings",
    };
    return merge(base, webpackConfig[platform]({ filename, base }) ?? {}, {
      plugins: [
        //pass
      ],
    });
  });
};
