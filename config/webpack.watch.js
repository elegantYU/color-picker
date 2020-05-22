const merge = require("webpack-merge");
const config = require("./webpack.base");

module.exports = merge(config, {
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000, // milliseconds
    poll: 1000,
    ignored: ["node_modules"],
  },
});
