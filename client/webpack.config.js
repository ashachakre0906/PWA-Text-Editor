const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    //Entry point for files
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    //Output for all our bundles
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //Webpack plugin that generates our html file and inject our bundles
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor'
      }),
    ],
    module: {
      rules: [
        {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        },
        {   
          test: /\.m?js$/,
          exclude: /node_modules/,
          //We use babel loadder in order to use ES6
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugin: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          }
        }
      ],
    },
  };
};
