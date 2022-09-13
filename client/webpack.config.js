const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    // Entry point for files
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    // Output for our bundles
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
    // The `hot` option is to use the webpack-dev-server in combination with the hot module replacement API.
    //Hot Module Replacement (HMR) to update the page without a full page refresh.
      hot: 'only',
      liveReload: false,
    },
    plugins: [
      //Webpack plugin that generates our html file and inject our bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      //Inject our custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      //Creates a manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just another text editor",
        short_name: "JATE",
        description: "Just another text editor!",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
    //Added a new set of rules to handle images
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          //We use babel loadder in order to use ES6
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
