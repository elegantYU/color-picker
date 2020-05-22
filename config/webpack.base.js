/*
 * @Author: elegantYu
 * @Date: 2020-05-11 22:50:09
 * @LastEditTime: 2020-05-23 00:32:44
 * @总有人要背锅，那为什么不能是我
 */
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin')
const templateList = require('./moreTemplate')
const MergeLocale = require('./mergeLocale')
const entryList = require('./entryList')

module.exports = {
  mode: 'production',
  entry: entryList,
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[name].js",
    chunkFilename: 'static/js/[name].bundle.js',
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".scss", ".css"],
    // alias: {
    //   "@": path.resolve(__dirname, "src/popup"),
    //   "@bg": path.resolve(__dirname, "src/background"),
    // },
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
          "eslint-loader",
        ],
      },
      {
        test: /\.(sc|c)ss?$/,
        use: [
          'style-loader',
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
    ...templateList,
    new UglifyJsPlugin({
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      parallel: true,
      sourceMap: true,
    }),
    new CopyWebpackPlugin([
      {
        from: "public/manifest.json",
        to: "manifest.json",
        copyUnmodified: true,
      },
    ]),
    new MergeJsonWebpackPlugin({
      debug: true,
      output: {
        groupBy: [...MergeLocale],
      },
    }),
  ],
};