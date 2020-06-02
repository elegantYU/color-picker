/*
 * @Date: 2020-06-01 22:38:17
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-06-02 17:20:27
 * @Description: 原生chrome api封装
 */

//  background与content-script主动通信
const tabSendMessage = (tabs, options) =>
	new Promise((resolve, reject) => {
		const { id } = tabs[0];
		try {
			chrome.tabs.sendMessage(id, options);
			resolve();
		} catch (error) {
			console.log("[Chrome Tab Error]:", error);
			reject();
		}
	});

//  获取当前页面并返回页面信息
const tabCurrent = () =>
	new Promise((resolve, reject) => {
		try {
			chrome.tabs.query({ active: true }, (tabs) => resolve(tabs));
		} catch (error) {
			console.log("[Chrome Tab Error]:", error);
			reject();
		}
	});

//  tab截图api
const tabCapture = (options) =>
	new Promise((resolve, reject) => {
		try {
			chrome.tabs.captureVisibleTab(options, (dataURI) => {
				if (chrome.runtime.lastError) {
					console.log("[Chrome Tab Error]:", chrome.runtime.lastError.message);
					return reject();
				}
				resolve(dataURI);
			});
		} catch (error) {
			console.log("[Chrome Tab Error]:", error);
			reject();
		}
	});

//  获取本地数据
const localGet = (key) =>
	new Promise((resolve, reject) => {
		try {
			chrome.storage.local.get([key], (result) => resolve(result));
		} catch (error) {
			console.log("[Chrome Storage Error]", error);
			reject();
		}
	});

//  设置本地数据
const localSet = (options) =>
	new Promise((resolve, reject) => {
		try {
			chrome.storage.local.set(options);
			resolve();
		} catch (error) {
			console.log("[Chrome Storage Error]", error);
			reject();
		}
	});

export { localGet, localSet, tabCurrent, tabCapture, tabSendMessage };
