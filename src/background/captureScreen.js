let currentCanvas = null;

// 截屏
const startCapture = (data, sendResponse) => {
  chrome.tabs.captureVisibleTab(
    {
      format: "jpeg",
      quality: 100,
    },
    (dataURI) => {
      if (chrome.runtime.lastError) {
        return sendResponse(false)
      }
      convertToCanvas(data, sendResponse, dataURI);
    }
  );
};

// 数据转化
const convertToCanvas = ({ width, height }, sendResponse, data) => {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    currentCanvas = canvas;

    sendResponse(true)
  };
  img.src = data;
};

// 滑动鼠标获取颜色数组
const slideGetColors = ({ centerX, centerY }, sendResponse) => {
  const distance = 75;
  const [originX, originY] = [centerX + distance, centerY + distance];
  let groups = [];

  // console.log("首尾坐标", centerX, centerY);

  for (let i = 0; i < 15; i++) {
    for (let idx = 0; idx < 15; idx++) {
      const color = currentCanvas
        .getContext("2d")
        .getImageData(originX + idx, originY + i, 1, 1).data || [0, 0, 0];
      const rgb = `rgb(${color[0]},${color[1]},${color[2]})`;
      groups.push(rgb);
    }
  }

  sendResponse(groups);
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { command, data } = message;
  // const { tab } = sender
  if (command === "startCapture") {
    startCapture(data, sendResponse);
  } else if (command === "slideFetch") {
    slideGetColors(data, sendResponse);
  }

  return true;
});
