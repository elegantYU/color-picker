/*
 * @Date: 2020-06-06 18:12:41
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-06-06 18:14:09
 * @Description: 创建新页面
 */ 

const createTab = data => new Promise(resolve => {
  chrome.tabs.create(data, () => resolve())
})

export default createTab