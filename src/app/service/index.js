/*
 * @Date: 2020-06-02 17:01:30
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-06-05 00:00:07
 * @Description: popup 与 content-script 的封装接口
 */

//  content-script popup 与background主动通信
const sendMessage = (options) =>
	new Promise((resolve, reject) => {
		chrome.runtime.sendMessage(options, (result) => {
			if (chrome.runtime.lastError) {
				console.log("[Chrome Runtime Error]:", chrome.runtime.lastError.message);
				return reject();
			}
			resolve(result);
		});
	});

// 开始截屏
const startCapture = (data) => sendMessage({ command: "startCapture", data });

// 滑动获取颜色
const slideFetch = (data) => sendMessage({ command: "slideFetch", data });

// 点击上传颜色
const destory = (data) => sendMessage({ command: "destory", data });

// 上次颜色
const lastColor = () => sendMessage({ command: "lastColor" });

// 创建
const create = () => sendMessage({ command: "create" });

// 检测页面是否可用
const activeTab = () => sendMessage({ command: "activeTab" });

// 获取近7天的采集数据
const lastSevenDay = () => sendMessage({ command: "lastSevenDay" });

export { startCapture, slideFetch, destory, lastColor, create, activeTab, lastSevenDay };
