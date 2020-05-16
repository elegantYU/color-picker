const merge = require('webpack-merge')
const config = require('./webpack.base')

module.exports = merge(config, {
  watch: true,
  watchOptions: {
    aggregateTimeout: 500, // milliseconds
    poll: 500,
    ignored: ['node_modules'],
  }
})