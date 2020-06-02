const path = require('path')

// entry list
module.exports = {
  popup: path.resolve(__dirname, '../src/app/popup/index.js'),
  background: path.resolve(__dirname, '../src/service/index.js'),
  contentScript: path.resolve(__dirname, '../src/app/content-script/index.js'),
  style: path.resolve(__dirname, '../src/app/content-script/style.js'),
}