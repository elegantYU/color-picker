/*
 * @Date: 2020-06-01 23:06:21
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-06-02 15:47:13
 * @Description: 屏幕截图background主要模块
 */

import { tabCurrent, tabSendMessage, tabCapture } from "./base";

let currentCanvas = null;

//  页面start
const createInstance = () => tabCurrent().then((tab) => tabSendMessage(tab, { command: "create" }));

//  转换canvas
const convertToCanvas = ({ width, height }, data) =>
	new Promise((resolve) => {
		const img = new Image();

		img.src = data;
		img.onload = () => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			canvas.width = width;
			canvas.height = height;
			ctx.drawImage(img, 0, 0, width, height);

			currentCanvas = canvas;
			resolve();
		};
	});

//  开始截图
const startCapture = (data) =>
	tabCapture({ format: "jpeg", quality: 100 }).then((dataURI) => convertToCanvas(data, dataURI));

//  滑动鼠标获取颜色
const slideGetColors = ({ centerX, centerY }) => {
	const DISTANCE = 75; //  实际坐标偏移量
	const CELL_NUMBER = 15; //  每行格子数量
	const [originX, originY] = [centerX + DISTANCE, centerY + DISTANCE]; //  起始X，Y坐标
	let groups = []; //  从左至右合并所有行后的颜色数组

	for (let i = 0; i < CELL_NUMBER; i++) {
		for (let idx = 0; idx < CELL_NUMBER; idx++) {
			const color = currentCanvas.getContext("2d").getImageData(originX + idx, originY + i, 1, 1)
				.data || [0, 0, 0];
			const rgb = `rgb(${color[0]},${color[1]},${color[2]})`;
			groups.push(rgb);
		}
	}

	return Promise.resolve(groups);
};

// 获取当前激活页面
const getActiveTab = () =>
	tabCurrent().then((tab) => {
		const reg = /chrome:\/\//g;
		const canUse = reg.test(tab[0].url);

		return !canUse;
	});

export { createInstance, startCapture, slideGetColors, getActiveTab };
