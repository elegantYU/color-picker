/**
 * 应该有俩入口文件，不算多，随便封装下
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const chunkNames = [
  { chunk: 'popup', name: '前置弹窗页' },
  { chunk: 'background', name: '后置背景页' },
];

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
