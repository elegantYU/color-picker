const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin')
const VersionList = require('./syncVersion')
const config = require('./webpack.base')

module.exports = merge(config, {
  plugins: [
    ...VersionList,
    new FriendlyErrorWebpackPlugin({
      clearConsole: false
    }),
    new CleanWebpackPlugin(),
  ]
})