// 转换日期，若无日期使用当日
const nowDate = (time) => {
  const date = time ? new Date(time) : new Date();
  return date.toLocaleDateString();
};

/**
 * storage现有字段
 * colorGroup：{ date: [{ url, title, color }]}
 * @param {string} key  object key
 * @param {string} date 转化后的date
 */
// 传入 all 或者当天日期
const getLocalData = (key) =>
  new Promise((resolve) => {
    chrome.storage.sync.get([key], (result) => {
      resolve(result);
    });
  });

// 存储color 并关闭页面cp
const saveColor = ({ color }, tab) =>
  new Promise((resolve) => {
    const today = nowDate();
    const KEY = "colorGroup";
    const { title, url, id } = tab;

    getLocalData(KEY).then((_) => {
      const isEmpty = Object.keys(_).length;
      const data = { title, url, color };
      let result = "";
      if (!isEmpty) {
        result = {};
        result[KEY] = {};
        result[KEY][today] = [data];
      } else {
        result = Object.assign(_, _[today].push(data));
      }

      chrome.storage.sync.set({ KEY: result });
      chrome.tabs.sendMessage(id, { command: "destory" });
      resolve();
    });
  });

// 获取最近的一个颜色
const getLastColor = () =>
  new Promise((resolve) => {
    getLocalData("colorGroup").then((colorGroup) => {
      console.log("colorGroup", colorGroup);
      const isColors = Object.keys(colorGroup).length;
      if (isColors) {
        const groups = Object.values(colorGroup).slice(-1);
        const color = groups.slice(-1).color;
        resolve(color);
      } else {
        resolve("rgb(255, 255, 255)");
      }
    });
  });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { command, data } = message;
  const { tab } = sender;

  if (command === "getHistory") {
    getLocalData().then((_) => sendResponse(_));
  } else if (command === "destory") {
    // 根据指定tabid关闭
    saveColor(data, tab).then(() => sendResponse(true));
  } else if (command === "lastColor") {
    getLastColor().then((_) => sendResponse(_));
  }

  return true;
});
