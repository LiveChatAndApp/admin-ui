# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.34](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.33...v1.0.34) (2023-01-13)


### Features

* IM-388 [DEV][财务管理/资金明细] 新增“冻结金额”栏位 ([00658f5](https://github.com/PanJiaChen/vue-element-admin/commit/00658f59a061c0c242ff5709ec969f01dc764a5f))
* IM-400[DEV/后台][用户管理/用户列表] 昵称可以包含emoji、空白键 ([8ce0d96](https://github.com/PanJiaChen/vue-element-admin/commit/8ce0d967a6b402f983220af33ace0fef45ccb15d))
* IM-406 [DEV/后台][用户管理/用户日志] 操作权限栏位应显示：昵称、账号、手机号 ([a9c4e41](https://github.com/PanJiaChen/vue-element-admin/commit/a9c4e411e69982a28ed8712270727b7bbaa73927))
* 修改文字 ([909a4c2](https://github.com/PanJiaChen/vue-element-admin/commit/909a4c2998d0e2afec1efb02c272f561d1137da5))
* 提现拒绝反款 選項開啟 ([68bbc80](https://github.com/PanJiaChen/vue-element-admin/commit/68bbc803fa830d20dc148b658278734e63d53be2))
* 用戶日誌移除 cache ([8c4d3aa](https://github.com/PanJiaChen/vue-element-admin/commit/8c4d3aa59ff0bb292e75018d5c90d3e41dcebd1d))


### Bug Fixes

* IM-390[DEV/UAT/後台][群組管理/群組管理] 添加群成員搜索欄位不清空，再點擊查看群成員時，搜索欄位會代入添加群成員搜索資料 ([27aac01](https://github.com/PanJiaChen/vue-element-admin/commit/27aac01f7324eb476b9dfe1cd9c74bbd63285050))
* IM-429[DEV後台][敏感詞管理/敏感詞命中] 發送者帳號搜尋欄位無法搜尋正確資料 ([8db68dc](https://github.com/PanJiaChen/vue-element-admin/commit/8db68dc08282b91ee6540bdb0d664231cd99b294))

### [1.0.33](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.32...v1.0.33) (2022-12-14)


### Features

*  更新i18n ([7561103](https://github.com/PanJiaChen/vue-element-admin/commit/7561103910c3215b61a04b4f022d3e9fe895b48f))
* format money ([fb481c1](https://github.com/PanJiaChen/vue-element-admin/commit/fb481c1abf0a6611472bd1f2fea9c7b4a36696ea))
* IM-222[群组管理/群组管理] 广播弹跳视窗对话输入框请挡键盘Enter输入 ([66219a1](https://github.com/PanJiaChen/vue-element-admin/commit/66219a1310c02fc2294376498fbe5b0117591863))
* IM-226 [聊天室管理/聊天室管理] 6.1聊天室管理 前端页面api串接+Layout ([091dc7f](https://github.com/PanJiaChen/vue-element-admin/commit/091dc7f4783144208e8db05bb327e87aae6259be))
* IM-227[群组管理/群组管理] 广播弹跳视窗 新增page bottom按钮 ([cc73db8](https://github.com/PanJiaChen/vue-element-admin/commit/cc73db8a6057b3c34438047680cac59028bfa3ea))
* IM-238[群组管理/群组管理] 广播的信息应显示管理者“昵称” ([a16fc3c](https://github.com/PanJiaChen/vue-element-admin/commit/a16fc3c9e9d421f82cc7449ed752801230e511a8))
* IM-238[群组管理/群组管理] 广播的信息应显示管理者“昵称” ([92dca4d](https://github.com/PanJiaChen/vue-element-admin/commit/92dca4d1161a40d549c340a68c7deb6f2d141d6a))
* IM-250 [後台/所有页面] 所有弹跳视窗“保存”按钮文字调整为“确定” ([ba72c6a](https://github.com/PanJiaChen/vue-element-admin/commit/ba72c6a6a95faa81252c94399e476c680b0b7ba4))
* IM-265[群组管理/群组管理] 广播群上传影片请直接显示影片，支持mp4和mov ([d797ee5](https://github.com/PanJiaChen/vue-element-admin/commit/d797ee538a8b4a1375de121fa262b996449abff8))
* IM-291[消息管理/消息列表] 从群组管理点击查看消息、页面跳转消息列表并自动带入的筛选条件拿掉Admin ([0db977a](https://github.com/PanJiaChen/vue-element-admin/commit/0db977a8f378073359c195a831ba92a0567b84dc))
* IM-305[后台/所有页面] 性别栏位“保密”选项统一调整名称为：保留 ([993e73c](https://github.com/PanJiaChen/vue-element-admin/commit/993e73c3ec990cc9ddb6a7b484af3f876d5aaa51))
* IM-317 [用戶管理/用戶列表] 添加用戶彈跳視窗，密碼欄位輸入英數以外字符,提示語顯示有誤 ([2c6f9a4](https://github.com/PanJiaChen/vue-element-admin/commit/2c6f9a444b53d0ea5df7e1185ed0818ee7dc1639))
* IM-320 [用戶管理/用戶列表] 添加用戶彈跳視窗，手機號欄位輸入空白鍵，提示訊息有誤 ([1e2598a](https://github.com/PanJiaChen/vue-element-admin/commit/1e2598a55004fa7cb3395f3c63bfb563968d3012))
* IM-331 [管理者后台] 用户密码加密 ([b7b5d1a](https://github.com/PanJiaChen/vue-element-admin/commit/b7b5d1a1772870619cb12154f9b3a0ef844fa114))
* IM-340[用戶管理/用戶列表] 編輯用戶彈跳視窗，修改密碼/修改交易密碼欄位輸入1個字元,提示訊息有誤 ([2676991](https://github.com/PanJiaChen/vue-element-admin/commit/267699178ecdf8fb0928722973f3a5b223d2340a))
* IM-341 [财务管理/充值订单] 新增订单状态：订单超时 ([5260005](https://github.com/PanJiaChen/vue-element-admin/commit/5260005dab1c6f3b7fcf4e62afe1de5e32e5d82c))
* update ([469176e](https://github.com/PanJiaChen/vue-element-admin/commit/469176e43101a19db50d3b94d64a4d204c26c827))
* update ([321ae18](https://github.com/PanJiaChen/vue-element-admin/commit/321ae1853c75adcbbc9496d65c0f8826dbfea304))
* update version api ([21ad242](https://github.com/PanJiaChen/vue-element-admin/commit/21ad242864fe59582a8215a625038292b02f10ae))
* 串接 API 與處理 Layout ([851576d](https://github.com/PanJiaChen/vue-element-admin/commit/851576d48344f080e8e1732f4e59108c5e27a288))
* 修復日期查詢條件 ([445573a](https://github.com/PanJiaChen/vue-element-admin/commit/445573a2d45324da6bc036e351ef42377917c3d8))
* 修復錯誤 ([ccd4890](https://github.com/PanJiaChen/vue-element-admin/commit/ccd48905dad349b0b2fffa59d42e26f326102d4f))
* 修正無法上傳同一圖片的 bug ([ca0b5e6](https://github.com/PanJiaChen/vue-element-admin/commit/ca0b5e6c8b0d8d7d8a9a137d320d78d7ad08df6a))
* 優化相關功能 ([0ecdd49](https://github.com/PanJiaChen/vue-element-admin/commit/0ecdd49b4a19bd81934279d9ee578c4cc68435af))
* 已解散只能查看訊息 ([1c0f009](https://github.com/PanJiaChen/vue-element-admin/commit/1c0f009226ec911a8b86cb236acd70a6eb7bf32e))
* 提現訂單需綁定 otp ([55846d1](https://github.com/PanJiaChen/vue-element-admin/commit/55846d1c6b029c8661a298d0ed08ab379078fb33))
* 新增排序功能 ([bae8386](https://github.com/PanJiaChen/vue-element-admin/commit/bae838638e5b97034ffc2689fc5eb05f1fac7e1a))
* 更新 prod 環境設定 ([66b8e0e](https://github.com/PanJiaChen/vue-element-admin/commit/66b8e0e13fc09b39eb9ae952ba35c47bda6db3bc))
* 權限功能 ([1b22b8f](https://github.com/PanJiaChen/vue-element-admin/commit/1b22b8f75f58ced4cadd731c69976c7fab5e5640))
* 清空一些舊的 constant ([4e8d48b](https://github.com/PanJiaChen/vue-element-admin/commit/4e8d48b6e7d1c3aeb19359a581e350474ce0e887))
* 測試 api url ([b5ff9b6](https://github.com/PanJiaChen/vue-element-admin/commit/b5ff9b63cb616d09be95a65f1b130814941ef6eb))
* 測試 api url ([06b45ea](https://github.com/PanJiaChen/vue-element-admin/commit/06b45ea03fce3ececfb882932b220cf1564e7e26))
* 用戶列表 & 邀請碼列表 & 默認好友 & 群組管理 table 圖片改為 el-image 可預覽 ([b62538c](https://github.com/PanJiaChen/vue-element-admin/commit/b62538c24251af12af7be644b7e5ce4919e5ebe4))
* 調整 format date 格式 ([68206f7](https://github.com/PanJiaChen/vue-element-admin/commit/68206f774632085233c8a07a1f69c483975cf09f))
* 資金明細的帳單類型增加提現申請 ([2987c5f](https://github.com/PanJiaChen/vue-element-admin/commit/2987c5f92ad07c092b2a9e977c29e5dec376bb9b))


### Bug Fixes

* IM-226 修復在線人數彈跳視窗 ([556fbac](https://github.com/PanJiaChen/vue-element-admin/commit/556fbacceed10d818c3a549fce6f308a86bee60d))
* ui 調整 ([7da32f5](https://github.com/PanJiaChen/vue-element-admin/commit/7da32f5f87a9c2f57d3afbe27bcc9c2d4d83273d))
* 修正欄位帶錯誤 ([0e2e8ae](https://github.com/PanJiaChen/vue-element-admin/commit/0e2e8ae1df808f16d5c5cf198ad6d963929238aa))

### [1.0.32](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.31...v1.0.32) (2022-11-22)


### Features

* 充值訂單權限 ([58b7e45](https://github.com/PanJiaChen/vue-element-admin/commit/58b7e4575ef39252c3dfcf3448cacc3f2b4591e7))
* 充值渠道權限 ([f28efe7](https://github.com/PanJiaChen/vue-element-admin/commit/f28efe78610d33465d801ae530cfdd7722e09eb6))
* 用戶日誌權限 ([87d394d](https://github.com/PanJiaChen/vue-element-admin/commit/87d394d93d6dfa51f346d2085d1db53282798ab3))
* 用户列表權限 ([8c82c38](https://github.com/PanJiaChen/vue-element-admin/commit/8c82c3813dab248a907018d7eab91cf3590ef804))
* 後台用戶權限 ([eb90e8c](https://github.com/PanJiaChen/vue-element-admin/commit/eb90e8cc55b82d9612aff147e60c1f57e11b39c5))
* 修正ADMIN_INSERT內容錯誤 ([f5385b0](https://github.com/PanJiaChen/vue-element-admin/commit/f5385b0a327e09c01882e387b419f4ec8bc32d4c))
* 帳號資訊權限 ([ec123fd](https://github.com/PanJiaChen/vue-element-admin/commit/ec123fd5cc3c9bf4fd43107a4b076ebebc4e1379))
* 敏感词管理權限 ([ae0e84d](https://github.com/PanJiaChen/vue-element-admin/commit/ae0e84d4efe8b03fad50bc5ee6146c3d3b018e43))
* 提現訂單權限 ([bd60ed0](https://github.com/PanJiaChen/vue-element-admin/commit/bd60ed014ea00efadaf0364adefe018ef87720be))
* 群组管理權限 ([10331fb](https://github.com/PanJiaChen/vue-element-admin/commit/10331fbe77f3b034e0ddb195aac0c49aa0afe11b))
* 資金明細權限 ([0692c7a](https://github.com/PanJiaChen/vue-element-admin/commit/0692c7aaf8b8af9fc3e0cdb197c070a806b1218e))
* 調整敏感詞命中參數名稱 ([27f8b9d](https://github.com/PanJiaChen/vue-element-admin/commit/27f8b9db77b0bf80af8e9b0ef1082caee65bda2c))
* 默認好友權限 ([19eba84](https://github.com/PanJiaChen/vue-element-admin/commit/19eba843fb90d686363dd55d00eb36883bfb9584))
* 邀请码權限 ([48f37e0](https://github.com/PanJiaChen/vue-element-admin/commit/48f37e02113a8778e1b14a2ad473e562738a3efb))
* IM-160 group list cache 移除 ([2bab6a5](https://github.com/PanJiaChen/vue-element-admin/commit/2bab6a5327cb30e5a7556f8652ffb698bdba6cde))
* IM-174[后台管理/后台用户] 前端栏位新增/移除 ([7c8ac72](https://github.com/PanJiaChen/vue-element-admin/commit/7c8ac72fe4938cc47cf993e12fb9e3e26907e66b))
* IM-177[用户管理/用户列表] 前端显示栏位、筛选条件调整 ([fa39b8e](https://github.com/PanJiaChen/vue-element-admin/commit/fa39b8e3e1f619a32dc9fcd2b207eff9f3a51e34))
* IM-178[群组管理/群组管理] 前端新增“群组类型”栏位 ([431b9c0](https://github.com/PanJiaChen/vue-element-admin/commit/431b9c025ea575c03fc6b24b77e4894cb1f0d27b))
* IM-183[用户管理/用户列表] 查看聊天记录-弹跳视窗 新增栏位：黑名单 ([aa306ee](https://github.com/PanJiaChen/vue-element-admin/commit/aa306eeefb3dc9bf500dbcf3ea2dd25b25bb9eee))
* IM-183[用户管理/用户列表] 查看聊天记录-弹跳视窗 新增栏位：黑名单 ([f21115e](https://github.com/PanJiaChen/vue-element-admin/commit/f21115eac628979cb1bb93d7aee4d1bb130645d6))
* IM-184[群组管理/群组管理] 广播聊天功能开发 ([77bc14d](https://github.com/PanJiaChen/vue-element-admin/commit/77bc14d481136b9556e5b21f39ec9b1be6942b20))
* IM-185 [用户管理/用户列表] 显示页面栏位调整，新增“冻结”数据 ([34f3e6f](https://github.com/PanJiaChen/vue-element-admin/commit/34f3e6f6ca065822411c2078569ec213ab74925d))
* IM-185 修正可提領金額判斷邏輯 ([7beea1f](https://github.com/PanJiaChen/vue-element-admin/commit/7beea1f5ac6cd2a0441bc6bf734fc440a89eb1b3))
* permission ([05162c2](https://github.com/PanJiaChen/vue-element-admin/commit/05162c25155023d20a6ab291bb3a24b3f5fade39))


### Bug Fixes

*  登入修正 acl ([cced8f4](https://github.com/PanJiaChen/vue-element-admin/commit/cced8f48eebf38c8fce0992b0242f922839b989e))
* groupList 修復報錯 ([1b8bfc3](https://github.com/PanJiaChen/vue-element-admin/commit/1b8bfc3c4eb1dbf6cf6d366021912acf2cffe8ca))
* IM-181[用户管理/用户列表] 昵称应可以包含特殊符号 ([357d326](https://github.com/PanJiaChen/vue-element-admin/commit/357d3260efa6fe44aa100e01327da4b76ddce9e3))

### [1.0.31](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.30...v1.0.31) (2022-11-15)


### Features

* 充值訂單狀態新增  ‘訂單成立' ([7478494](https://github.com/PanJiaChen/vue-element-admin/commit/7478494a343139c178e6f5615d96fece929411db))
* IM-160 [首页/首页] 点击活跃用户top10用户账号、活跃群组top10 群ID, 可跳转页面查看对应资料 ([b34ef66](https://github.com/PanJiaChen/vue-element-admin/commit/b34ef6601af4498aaf086cac316483323e2e4c33))
* otp 綁定與首頁修復 ([346bbf5](https://github.com/PanJiaChen/vue-element-admin/commit/346bbf5658972c7f6ff9066cc04313a2447c6e81))


### Bug Fixes

* IM-154[群组管理/群组管理] 后台变更成员类型时(成员/管理员)，App没有连动 ([b289f38](https://github.com/PanJiaChen/vue-element-admin/commit/b289f3840daaa96f2334e3276177915e0a7f4923))

### [1.0.30](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.29...v1.0.30) (2022-11-14)


### Features

* IM-155[群组管理/群组管理] 查看群成员-弹跳视窗 移除 更换群主功能 ([a595a6b](https://github.com/PanJiaChen/vue-element-admin/commit/a595a6bf9b2c24bd56d1c52a38d136ed2e492af6))
* IM-158[群組管理/群組管理] 添加好友彈跳視窗搜尋欄位 關閉後資料未清空 ([4e63690](https://github.com/PanJiaChen/vue-element-admin/commit/4e636906455daccf66b4c9f7cd1448333b3b4cfa))

### [1.0.29](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.28...v1.0.29) (2022-11-11)


### Features

* 修正"查看群成員"列表群主不可選取 ([8df3bcf](https://github.com/PanJiaChen/vue-element-admin/commit/8df3bcf055fcdf8567dbf04e11aa56cf0493a6ed))
* 群組禁言 & 私聊改成兩支 API 控制 ([3d9311e](https://github.com/PanJiaChen/vue-element-admin/commit/3d9311e6f07eb5159ef37bde4fc02909c01caa98))

### [1.0.28](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.27...v1.0.28) (2022-11-11)


### Features

* IM-122[群組管理/群組管理] 添加群成員-彈跳視窗 新Layout & IM-116 ([2d91b57](https://github.com/PanJiaChen/vue-element-admin/commit/2d91b5731aac0138226af545aeba90f5cf5ea8d9))

### [1.0.27](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.26...v1.0.27) (2022-11-10)


### Features

* 上傳圖片修改 ([7e528b6](https://github.com/PanJiaChen/vue-element-admin/commit/7e528b6c635c8cf56b330833b371f80c7f03f6cb))
* 更新顏色 ([40e40f9](https://github.com/PanJiaChen/vue-element-admin/commit/40e40f913a1486dc2ad8fd44459215d281e87b4b))
* 搜尋添加群成員列表時，先清空資料 ([f4e7bac](https://github.com/PanJiaChen/vue-element-admin/commit/f4e7bac782b2ee03f12fb8cd1a5154d0777459c6))
* IM-103 [财务管理/充值渠道] 9.4充值渠道 前端页面api串接+Layout ([5152519](https://github.com/PanJiaChen/vue-element-admin/commit/5152519db92365078b820b9dd089ae5cdf82465b))
* IM-103 修復錯 ([cb45a17](https://github.com/PanJiaChen/vue-element-admin/commit/cb45a17044abab22b813e4de59cc2802df49609c))
* IM-122[群組管理/群組管理] 添加群成員-彈跳視窗 新Layout ([730af45](https://github.com/PanJiaChen/vue-element-admin/commit/730af45ec727c90e60d3fc3033e8120c758bafdd))
* messageList 欄位增加背景色 ([590b7ab](https://github.com/PanJiaChen/vue-element-admin/commit/590b7ab2672764ea79928befd9cb4cdd7da011a5))
* update i18n ([f392fe3](https://github.com/PanJiaChen/vue-element-admin/commit/f392fe3f602f4d06f49a7f0769f3a2f0cc32f338))

### [1.0.26](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.25...v1.0.26) (2022-11-08)


### Features

* IM-117[消息管理/消息列表] 栏位名称调整 ([f6602ce](https://github.com/PanJiaChen/vue-element-admin/commit/f6602cecf1ea5400a590f11cc955d91a1f6a5237))
* IM-122[群組管理/群組管理] 添加群成員-彈跳視窗 新Layout ([9702aca](https://github.com/PanJiaChen/vue-element-admin/commit/9702aca32174254660a755065a698f968347ee08))
* IM-41 [财务管理/充值订单] 9.1充值订单 前端页面api串接+Layout ([c99c8ad](https://github.com/PanJiaChen/vue-element-admin/commit/c99c8ad3b2c19dd7b16c2476a30aa9b02f9f170d))

### [1.0.25](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.24...v1.0.25) (2022-11-07)


### Features

* 新增群ID搜尋欄位 ([b504ae1](https://github.com/PanJiaChen/vue-element-admin/commit/b504ae1921613bf4998173afcabe84a7123b7c51))

### [1.0.24](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.23...v1.0.24) (2022-11-07)


### Features

* IM-114[群組管理/群組管理] 请调整创建群组-群组名称输入框规则 ([546ca43](https://github.com/PanJiaChen/vue-element-admin/commit/546ca4398d3284badb3e827a52c3f0eceeb53147))

### [1.0.23](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.22...v1.0.23) (2022-11-07)


### Bug Fixes

* IM-104[用户管理/邀请码] 预设好友/群-弹跳视窗：欢迎词输入框规则不符合文件规格 ([aa83ae2](https://github.com/PanJiaChen/vue-element-admin/commit/aa83ae2b36e34cadb67eb5b901268ba3a15ca2c8))

### [1.0.22](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.21...v1.0.22) (2022-11-07)


### Features

* 新增創建群組 ([35fd78d](https://github.com/PanJiaChen/vue-element-admin/commit/35fd78d0a618cd7e81ad1cb3cc331455aaea6fe7))
* IM-12[群组管理/群组管理] 4.1群组管理 前端页面api串接+Layout ([31158a6](https://github.com/PanJiaChen/vue-element-admin/commit/31158a665bff4eacc1248a883069fc84918e9ee6))


### Bug Fixes

* IM-104[用户管理/邀请码] 预设好友/群-弹跳视窗：欢迎词输入框规则不符合文件规格 ([e54c4de](https://github.com/PanJiaChen/vue-element-admin/commit/e54c4ded6bd4a39c0710a9bd98820a0ceab4d5fd))

### [1.0.21](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.20...v1.0.21) (2022-11-03)


### Features

* 新增創建時間 ([b5238fc](https://github.com/PanJiaChen/vue-element-admin/commit/b5238fc15679d2824dc9489fba92e13c08e2fc0c))

### [1.0.20](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.19...v1.0.20) (2022-11-03)


### Features

* IM-10[用户管理/默认好友] 2.3默认好友 前端页面api串接+Layout ([3be90f6](https://github.com/PanJiaChen/vue-element-admin/commit/3be90f61e199c75d6e1a88fe99c348a08791eb38))

### [1.0.19](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.18...v1.0.19) (2022-11-02)


### Features

* IM-28[敏感词管理/敏感词列表] 3.1敏感词列表 前端页面api串接+Layout ([8d0ba82](https://github.com/PanJiaChen/vue-element-admin/commit/8d0ba826a189dc06ed06f1836d8ba9d375df4b5a))

### [1.0.18](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.17...v1.0.18) (2022-11-02)


### Features

* 首頁日期條件今日之後不可以選 ([c9d5ff1](https://github.com/PanJiaChen/vue-element-admin/commit/c9d5ff10077316bc9ee0c51f96daf67ace1a3bc1))
* 修正 i18n ([e4df1be](https://github.com/PanJiaChen/vue-element-admin/commit/e4df1befc30ec89a9761b5fb840051e93f0d14d8))
* IM-80 [管理者後台/首頁] 1.首頁 前端页面api串接+Layout ([7a417cf](https://github.com/PanJiaChen/vue-element-admin/commit/7a417cf3ae9c79d2cb3a4fbd03e1d06935b034e7))


### Bug Fixes

* 修復 i18n ([e71b66f](https://github.com/PanJiaChen/vue-element-admin/commit/e71b66f38d25c3b59fca53f0190683cf3498942d))

### [1.0.17](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.16...v1.0.17) (2022-11-01)

### [1.0.16](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.15...v1.0.16) (2022-10-31)


### Features

* 修正提現 ui ([f85fcaf](https://github.com/PanJiaChen/vue-element-admin/commit/f85fcafcf4024a58a2d7c36efece8126e476c199))
* 提現訂單移除提現渠道下拉選單 ([73a6530](https://github.com/PanJiaChen/vue-element-admin/commit/73a6530382f30bf4e7a77bc933ca6ab55a66a37f))
* IM-41 [财务管理/充值订单] 9.1充值订单 前端页面api串接+Layout ([8e867b2](https://github.com/PanJiaChen/vue-element-admin/commit/8e867b2fef6caaeefa8b05cf5c133ec2cb3ef1cf))
* IM-42 [财务管理/提现订单] 9.2提现订单 前端页面api串接+Layout ([981abbd](https://github.com/PanJiaChen/vue-element-admin/commit/981abbdcdffb8211f20f9481ad53299226c2cb0c))

### [1.0.15](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.14...v1.0.15) (2022-10-28)


### Features

* IM-54 [后台管理/账号资讯] 8.4账号资讯 前端页面api串接+Layout ([37f72cb](https://github.com/PanJiaChen/vue-element-admin/commit/37f72cbf9ef170bc8d6dd4dd073131e4914d27e1))

### [1.0.14](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.13...v1.0.14) (2022-10-28)


### Features

* IM-53 [后台管理/后台用户] 8.3后台用户 前端页面api串接+Layout ([5bd663e](https://github.com/PanJiaChen/vue-element-admin/commit/5bd663e436c94106fa4ee6c6dfbe68216d5c928c))


### Bug Fixes

* 修正文字 ([4bb9bfc](https://github.com/PanJiaChen/vue-element-admin/commit/4bb9bfceddfc7a3dbd606b16931a96b1803f6277))
* 修改 api 錯誤 ([ac76f2d](https://github.com/PanJiaChen/vue-element-admin/commit/ac76f2d3a1e1336081fa902b607ff218d6327403))
* 最高權限才可以修改狀態 ([c61ba32](https://github.com/PanJiaChen/vue-element-admin/commit/c61ba3290099b701041449afb609e75e618a328b))

### [1.0.13](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.12...v1.0.13) (2022-10-27)


### Features

* IM-61 [后台管理/菜单列表] 8.1菜单列表 前端页面api串接+Layout ([533c119](https://github.com/PanJiaChen/vue-element-admin/commit/533c11937a6aa4462f1e2885630e07e2b41dbc51))
* IM51[后台管理/角色列表] 8.2角色列表 前端页面api串接+Layout ([d2d6cb4](https://github.com/PanJiaChen/vue-element-admin/commit/d2d6cb472339deb18aabedecfd07ed7595212ed9))


### Bug Fixes

* 不需要判斷最高權限 ([2b6bc6f](https://github.com/PanJiaChen/vue-element-admin/commit/2b6bc6f9a5a083e18852ea1fa46a735727d20d16))
* 重置 ([f9f99c1](https://github.com/PanJiaChen/vue-element-admin/commit/f9f99c1c4e441e785ceea3e5b3c0f8cb45280271))

### [1.0.12](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.11...v1.0.12) (2022-10-26)

### [1.0.11](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.10...v1.0.11) (2022-10-25)


### Features

* IM-27 [消息管理/消息列表] 5.1消息列表 前端页面api串接+Layout ([b9c7e11](https://github.com/PanJiaChen/vue-element-admin/commit/b9c7e117cf47b01a72763f5cbb6befbb017d36ef))
* IM-52 [后台管理/系統日誌] 8.5系統日誌 前端页面api串接+Layout ([9b882ca](https://github.com/PanJiaChen/vue-element-admin/commit/9b882ca8aa9521e6a3182671d9d3bd2a7d2a1aed))
* IM-9[用户管理/邀请码] 2.2邀请码 前端页面api串接+Layout ([2d86827](https://github.com/PanJiaChen/vue-element-admin/commit/2d868273c2238c7aed7c73d35c0c62bab3dd13dd))


### Bug Fixes

* 修正日期排序 ([ed2a5ab](https://github.com/PanJiaChen/vue-element-admin/commit/ed2a5ab0526a5350b0fcf6e59709387537e513f5))
* 修復 router ([44c01c6](https://github.com/PanJiaChen/vue-element-admin/commit/44c01c6ec9993391d02715c4799bb1316f774f9b))
* 資金明細與用戶日誌功能移除用戶 id 查詢條件與欄位 ([484ad67](https://github.com/PanJiaChen/vue-element-admin/commit/484ad6749fa86f45ba163dcf28bf3a4333d61705))
* rename method name ([b40d2cc](https://github.com/PanJiaChen/vue-element-admin/commit/b40d2cc58fdf864b0b4368b7bb94a3da36526c01))

### [1.0.10](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.7...v1.0.10) (2022-10-21)


### Features

* IM-43 [用户管理/用户日志] 2.4用户日志 前端页面api串接+Layout ([d61672e](https://github.com/PanJiaChen/vue-element-admin/commit/d61672e4d4f0ef43e230e09195d73aaf9d54f3c1))
* IM-9[用户管理/邀请码] 2.2邀请码 前端页面api串接+Layout ([4a1ccec](https://github.com/PanJiaChen/vue-element-admin/commit/4a1ccec212bf437214296e9a0efa0420be670bd1))
* IN-43 [用户管理/用户日志] 2.4用户日志 前端页面api串接+Layout ([2e347e1](https://github.com/PanJiaChen/vue-element-admin/commit/2e347e1022034e39cea68fcfb1d7ca881b114d55))


### Bug Fixes

* IM-43 下載檔案亂碼問題修正 ([8fdb50b](https://github.com/PanJiaChen/vue-element-admin/commit/8fdb50b66ecc4edb652430733fd250688777422f))

### [1.0.9](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.8...v1.0.9) (2022-10-21)


### Bug Fixes

* IM-43 下載檔案亂碼問題修正 ([8fdb50b](https://github.com/PanJiaChen/vue-element-admin/commit/8fdb50b66ecc4edb652430733fd250688777422f))

### [1.0.8](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.7...v1.0.8) (2022-10-21)


### Features

* IM-43 [用户管理/用户日志] 2.4用户日志 前端页面api串接+Layout ([d61672e](https://github.com/PanJiaChen/vue-element-admin/commit/d61672e4d4f0ef43e230e09195d73aaf9d54f3c1))
* IN-43 [用户管理/用户日志] 2.4用户日志 前端页面api串接+Layout ([2e347e1](https://github.com/PanJiaChen/vue-element-admin/commit/2e347e1022034e39cea68fcfb1d7ca881b114d55))

### [1.0.7](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.6...v1.0.7) (2022-10-20)


### Features

* IM-46[用户管理/用户列表] 提存彈跳視窗，輸入數字會跳出必填欄位 ([902f129](https://github.com/PanJiaChen/vue-element-admin/commit/902f12989795efbfde07c163f37827457b3168b0))

### [1.0.6](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.5...v1.0.6) (2022-10-20)


### Features

* IM-40 [财务管理/资金明细] 9.3资金明细 前端页面api串接+Layout ([01a6511](https://github.com/PanJiaChen/vue-element-admin/commit/01a6511aa462e5c52e81b2dcbd489d09db462e15))
* IM-47[用户管理/用户列表] 手动充提对象错误，余额未增加 ([8b73df6](https://github.com/PanJiaChen/vue-element-admin/commit/8b73df6906050291189b3686e355185370a1d754))

### [1.0.5](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.4...v1.0.5) (2022-10-19)

### [1.0.4](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.3...v1.0.4) (2022-10-19)

### [1.0.3](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.2...v1.0.3) (2022-10-18)

### [1.0.2](https://github.com/PanJiaChen/vue-element-admin/compare/v1.0.1...v1.0.2) (2022-10-18)

### 1.0.1 (2022-10-17)
