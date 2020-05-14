/**
 * 应该有俩入口文件，不算多，随便封装下
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const chunkNames = require("./chunkNames");

module.exports = chunkNames.map(
  ({ chunk, name }) =>
    new HtmlWebpackPlugin({
      title: name,
      filename: `${chunk}.html`,
      template: `public/index.html`,
      chunks: ["vendor", chunk],
      chunksSortMode: "manual",
    })
);
