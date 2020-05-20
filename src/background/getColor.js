// 从local中获取上次点击所得color， 若无，则#fff

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('命令', message, sender)
  if (message.command === 'lastColor') {
    sendResponse(['#333', 'rgb(255, 255, 255)'])
  }

  return true;
})