const path = require('path')

// entry list
module.exports = {
  popup: path.resolve(__dirname, '../src/popup/index.js'),
  background: path.resolve(__dirname, '../src/background/index.js'),
  contentScript: path.resolve(__dirname, '../src/content-script/index.js'),
  style: path.resolve(__dirname, '../src/content-script/style.js'),
}