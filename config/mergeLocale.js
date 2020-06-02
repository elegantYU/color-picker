// 合并组件内多语言
const locales = require("../src/config.json").supportLanguages;

/**
 * pattern: 以项目根路径的相对路径，获取json文件拼接
 * fileName: 填入output.publicPath的相对路径
 */
module.exports = locales.map((lang) => ({
	pattern: `{./src/_locales/${lang}/messages.json,./src/**/_locales/${lang}/messages.json}`,
	fileName: `./_locales/${lang}/messages.json`,
}));
