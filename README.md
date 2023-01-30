
## 延伸版本 野火
主要包括以下项目：

| [GitHub仓库地址](https://github.com/LiveChatAndApp)       | 说明                                                                                      
| ------------------------------------------------------------  | --------------------------------------------------------------------------
| [im-server](https://github.com/LiveChatAndApp/im-server)          | 野火社区版IM服务，野火IM的核心服务，处理所有IM相关业务。  |
| [app_server](https://github.com/LiveChatAndApp/app_server)       | Demo应用服务，模拟客户的应用服登陆处理逻辑及部分二次开发示例。 |
| [admin-ui](https://github.com/LiveChatAndApp/admin-ui)       | Demo应用服务，基於vue admin element 的 admin 管理介面。 |
| [admin-api](https://github.com/LiveChatAndApp/im-admin)       | Demo应用服务，admin 後台 api 開發。 |
| [android-chat](https://github.com/LiveChatAndApp/Android) | 野火IM Android SDK源码和App源码。 |
| [ios-chat](https://github.com/LiveChatAndApp/ios)             | 野火IM iOS SDK源码和App源码。|

<img src="https://github.com/LiveChatAndApp/admin-ui/blob/main/fireamdin.png" width = 50% height = 50% />



## Introduction

`vue-element-admin` is a production-ready solution for admin interfaces. Based on [Vue.js](https://github.com/vuejs/vue) and use the UI Toolkit -- [element](https://github.com/ElemeFE/element). `vue-element-admin` is a magical vue admin, it based on the newest development stack of vue, built-in i18n solution, typical templates for enterprise applications, lots of awesome features. It helps you build a large complex Single-Page Applications. I believe whatever your needs are, this project will help you.

- [Preview](http://panjiachen.github.io/vue-element-admin)

- [Documentation](https://panjiachen.github.io/vue-element-admin-site/#/)

- [Gitter](https://gitter.im/vue-element-admin/discuss)

- [Wiki](https://github.com/PanJiaChen/vue-element-admin/wiki)

- [Donate](https://panjiachen.github.io/vue-element-admin-site/#/donate)

**vue-element-admin is a admin interfaces integration solution, which is not suitable for secondary development as a base template.**

 - Base template recommends using: [vueAdmin-template](https://github.com/PanJiaChen/vueAdmin-template)  
 - Desktop: [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

**Note: This project uses element-ui@2.3.0+ version, so the minimum compatible vue@2.5.0+**

## Preparation

You need to install [node](http://nodejs.org/) and [git](https://git-scm.com/) locally. The project is based on [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 和 [element-ui](https://github.com/ElemeFE/element). All data requests for this project are simulated using [Mock.js](https://github.com/nuysoft/Mock). It would be helpful if you have pre-existing knowledge on those.

 **This project is not a scaffolding and is more of an integrated solution.**

 **This project does not support low version browsers (e.g. IE). Please add polyfill yourself if you need them.**

 <p align="center">
  <img width="900" src="https://wpimg.wallstcn.com/a5894c1b-f6af-456e-82df-1151da0839bf.png">
</p>

## Features
```
- Login / Logout
- Permission authentication
- Multi-environment build
- Dynamic sidebar (supports multi-level routing)
- Dynamic breadcrumb
- I18n
- Customizable theme
- Tags-view(Tab page Support right-click operation)
- Rich text editor
- Markdown editor
- JSON editor
- Screenfull
- Drag and drop list
- Svg Sprite
- Dashboard
- Guide Page
- Mock data
- Echarts
- Clipboard
- 401/404 error page
- Error log
- Export excel
- Export zip
- Front-end visualization excel
- Tree Table
- Table example
- Dynamictable example
- Drag and drop table example
- Inline edit table example
- Form example
- Two-step login
- SplitPane
- Drag Dialog
- Dropzone
- Sticky
- CountTo
- Markdown to html
```

## Getting started

```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-element-admin.git

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9527.

## Build
```bash
# build for test environment
npm run build:sit

# build for production environment
npm run build:prod
```

## Advanced
```bash
# --report to build with bundle size analytics
npm run build:prod --report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/#/deploy) for more information

## Changelog
Detailed changes for each release are documented in the [release notes](https://github.com/PanJiaChen/vue-element-admin/releases).

## Online Demo
[Preview](http://panjiachen.github.io/vue-element-admin)

## Donate
If you find this project useful, you can buy author a glass of juice :tropical_drink:

![donate](https://wpimg.wallstcn.com/bd273f0d-83a0-4ef2-92e1-9ac8ed3746b9.png)

[Paypal Me](https://www.paypal.me/panfree23)

[Buy me a coffee](https://www.buymeacoffee.com/Pan)

## License

[MIT](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)

Copyright (c) 2017-present PanJiaChen
