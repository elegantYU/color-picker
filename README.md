## color-picker
> 在下独立开发的第二款浏览器插件

开发流程，移步[我的博客](https://elegantyu.github.io/)

> ~~等商店用户破500就开源~~
> 
> 哈哈哈哈

----
### 技术要点

#### webpack

开发之基石，基本配置都一样，由于插件开发及打包的特殊性，配置了同步版本及合并各模块中国际化文件的脚本。

#### react

了解了react生命周期hooks，react-router-dom的使用，propTypes对于props内容的约定，及装饰器的使用(装饰器这东西写出来就有高级那味儿了)。

下版本再加入group-transition动画，移动鼠标dom渲染也可以尝试使用canvas替换。

#### content-script & popup & background 通信

三处脚本的数据交换可谓是插件开发的关键点，也是最容易混乱的地方，后续要整合下事件流
