/*
 * @Author: elegantYu
 * @Date: 2020-05-11 22:50:09
 * @LastEditTime: 2020-05-14 23:23:44
 * @总有人要背锅，那为什么不能是我
 */
const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin')
const MincssExtractWebpackPlugin = require("mini-css-extract-plugin");
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin')
const VersionList = require('./syncVersion')
const MergeLocale = require('./mergeLocale')
const templateList = require('./moreTemplate')
const chunkNames = require('./chunkNames')

const entryList = chunkNames.reduce((obj, { chunk }) => {
  obj[chunk] = path.resolve(__dirname, `../src/${chunk}/index.js`)
  return obj
}, {})

module.exports = {
  mode: 'production',
  entry: entryList,
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[name]-[hash:6].js",
    chunkFilename: 'static/js/[name].bundle.js'
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@pop": path.resolve(__dirname, "src/popup"),
      "@bg": path.resolve(__dirname, "src/background"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpeg|jpg|svg)(\?t=\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              outputPath: "static/images/",
              limit: 10 * 1024,
            },
          },
        ],
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:6].min.[ext]",
              limit: 5000,
              outputPath: "static/fonts/",
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        ],
      },
      {
        test: /\.(sc|c)ss?$/,
        use: [
          MincssExtractWebpackPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: (loader) => [
                require("postcss-import")({ root: loader.resourcePath }),
              ],
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    usedExports: true, //  tree shaking 只支持import引入
    splitChunks: {
      minChunks: 1,
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new UglifyJsPlugin({
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      parallel: true,
      sourceMap: true,
    }),
    new MincssExtractWebpackPlugin({
      filename: "static/css/[name]-[contenthash:6].css",
      chunkFilename: "static/css/[id]-[contenthash:6].css",
    }),
    new CopyWebpackPlugin([
      {
        from: "public/manifest.json",
        to: "manifest.json",
        copyUnmodified: true,
      },
    ]),
    new CleanWebpackPlugin(),
    new FriendlyErrorWebpackPlugin({
      clearConsole: false
    }),
    new MergeJsonWebpackPlugin({
      debug: true,
      output: {
        groupBy: [...MergeLocale]
      }
    }),
    ...templateList,
    ...VersionList,
  ],
};