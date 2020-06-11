const path = require("path");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorWebpackPlugin = require("friendly-errors-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const VersionList = require("./syncVersion");
const config = require("./webpack.base");

module.exports = merge(config, {
	plugins: [
		new FileManagerPlugin({
			onEnd: {
				delete: [path.resolve(__dirname, "../dist.zip")],
				archive: [
					{
						source: path.resolve(__dirname, "../dist"),
						destination: path.resolve(__dirname, "../dist.zip"),
					},
				],
			},
		}),
		...VersionList,
		new FriendlyErrorWebpackPlugin({
			clearConsole: false,
		}),
		new CleanWebpackPlugin(),
	],
});
