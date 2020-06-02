/*
 * @Date: 2020-06-01 10:50:08
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-06-02 17:20:33
 * @Description: 服务层接口（指background）
 */

import { createInstance, startCapture, slideGetColors, getActiveTab } from "./captureScreen";
import { saveColor, getLastColor } from './historyColor'

const COMMANDS = new Map([
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
  ['destory', (sendResponse, data, tab) => saveColor(data, tab).then(() => sendResponse(true))],
  ['lastColor', (sendResponse) => getLastColor().then((_) => sendResponse(_))],
]);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { command, data } = message;
  const { tab } = sender

	COMMANDS.get(command)(sendResponse, data, tab);

	return true;
});
