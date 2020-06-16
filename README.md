## color-picker
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0) [![chrome web store](https://img.shields.io/chrome-web-store/v/lkfniiefogmonnkjeaceppmeakpagfmg.svg)](https://chrome.google.com/webstore/detail/lkfniiefogmonnkjeaceppmeakpagfmg) [![extension downloads](https://img.shields.io/chrome-web-store/users/lkfniiefogmonnkjeaceppmeakpagfmg.svg?label=users)](https://chrome.google.com/webstore/detail/lkfniiefogmonnkjeaceppmeakpagfmg) [![time tracker](https://wakatime.com/badge/github/elegantYU/color-picker.svg)](https://wakatime.com/badge/github/elegantYU/color-picker)

> 在下独立开发的第二款浏览器插件

开发流程，移步[我的博客](https://elegantyu.github.io/2020/06/07/webpack+react/)

> ~~等商店用户破500就开源~~
> 
> 哈哈哈哈 淦

谷歌商店：[下载地址](https://chrome.google.com/webstore/detail/lkfniiefogmonnkjeaceppmeakpagfmg)

不能翻墙地址：[下载地址](https://github.com/elegantYU/color-picker/releases/tag/1.4.0)

----
## 功能设计

- [x] 页面截图后根据鼠标坐标分析canvas像素点
- [x] 快捷键启动识别
- [x] 点击复制当前Hex格式颜色
- [x] 保存7天内点击后的颜色


## 技术要点

### webpack

开发之基石，基本配置都一样，由于插件开发及打包的特殊性，配置了同步版本及合并各模块中国际化文件的脚本。

### react

了解了react生命周期hooks，react-router-dom的使用，propTypes对于props内容的约定，及装饰器的使用(装饰器这东西写出来就有高级那味儿了)。

下版本再加入group-transition动画，移动鼠标dom渲染也可以尝试使用canvas替换。

### content-script & popup & background 通信

三处脚本的数据交换可谓是插件开发的关键点，也是最容易混乱的地方，后续要整合下事件流
