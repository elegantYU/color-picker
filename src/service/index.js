/*
 * @Date: 2020-06-01 10:50:08
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-06-05 15:23:34
 * @Description: 服务层接口（指background）
 */

import { createInstance, startCapture, slideGetColors, getActiveTab } from "./captureScreen";
import { saveColor, getLastColor, getLastSevenDaysColor } from "./historyColor";

const RUNTIME_COMMANDS = new Map([
	["create", () => createInstance()],
	[
		"startCapture",
		(sendResponse, data) =>
			startCapture(data)
				.then(() => sendResponse(true))
				.catch(() => sendResponse(false)),
	],
	["slideFetch", (sendResponse, data) => slideGetColors(data).then((_) => sendResponse(_))],
	["activeTab", (sendResponse) => getActiveTab().then((_) => sendResponse(_))],
	["destory", (sendResponse, data, tab) => saveColor(data, tab).then(() => sendResponse(true))],
	["lastColor", (sendResponse) => getLastColor().then((_) => sendResponse(_))],
	["lastSevenDay", (sendResponse) => getLastSevenDaysColor().then((_) => sendResponse(_))],
]);

const SHORTCUT_COMMANDS = new Map([["start-color-picker", () => createInstance()]]);

// 背景页指令监听
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const { command, data } = message;
	const { tab } = sender;

	RUNTIME_COMMANDS.get(command)(sendResponse, data, tab);

	return true;
});

// 快捷键监听
chrome.commands.onCommand.addListener((command) => {
	SHORTCUT_COMMANDS.get(command)()
});
