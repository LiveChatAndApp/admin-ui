export default {
  menu: {
    name: '菜單名稱',
    parentID: '父菜單ID',
    parent: '父菜單',
    order: '排序',
    editormenu: '编辑',
    editorRole: '權限'
  },
  route: {
    dashboard: '首页',

    merchant: '商户管理',
    merchantList: '商户列表',
    agentList: '代理管理',

    payChannel: '支付渠道管理',
    payChannelList: '支付渠道列表',

    withdrawChannel: '代付管理',

    payOrder: '支付订单管理',
    withdrawOrder: '代付订单管理',

    system: '系統管理',

    recharge: '充值管理',

    sensitiveWord: '敏感词管理',
    sensitiveWordList: '敏感词列表',
    sensitiveWordHit: '敏感词命中',

    group: '群组管理',
    groupList: '群组管理',

    permission: '权限管理',
    role: '角色列表',
    acl: '權限列表',
    log: '日志列表',
    adminInfo: '帳號資訊',

    merchantLog: '商户操作日志',
    merchantBalanceLog: '商户账变日志',
    bulletin: '公告管理',
    blackWhiteList: '黑白名单',
    whiteList: '白名单',

    channel: '渠道管理',
    channelList: '渠道列表',
    accountList: '账号列表',
    accountGroupList: '渠道组列表',
    accountAllocation: '渠道组分配',
    bankCardList: '银行卡列表',
    withdrawChannelList: '代付渠道列表',
    receiptCardAccount: '存款卡列表',
    withdrawChannelBankCodeList: '代付银行列表',
    withdrawBankCardBlackList: '代付银行卡黑名单',

    order: '订单管理',
    payOrderList: '收款订单',

    foundToMerchantOrder: '资金结算',
    wyOrderList: '网易原始订单',
    bankCardOrderList: '银行卡订单',

    report: '报表管理',

    dailyReport: '经营报表',

    dailyRechargeReport: '充值报表',
    dailyWithdrawReport: '提款报表',

    merchantReport: '商户报表',
    merchantWithdrawReport: '商户提款报表',
    merchantRechargeReport: '商户充值报表',

    agentReport: '代理报表',
    agentReportDetail: '代理报表明细',
    redoReport: '重制报表',

    risk: '风控管理',
    accountBalance: '账号余额',
    accountReport: '账号额度',
    riskMerchantReport: '商户配额',
    foundToCofferOrder: '资金下发',
    merchantChargeOrder: '人工账变',
    security: 'IP管理',
    riskConfig: '风控参数',
    riskWy: '网易风控',
    merchantUser: '商户账号',
    bannedIp: 'IP限制',
    payPage: '付款跳转',
    orderTrace: '用户来源',

    user: '用户管理',
    userList: '用户列表',
    inviteCode: '邀请码',
    defaultFriends: '默认好友',
    memberOperateLog: '用户日志',
    fundingExchange: '资金进出',
    fundingDetail: '资金明细',
    adminList: '帳號列表',

    // 消息管理 - (消息列表)
    message: '消息管理',
    messageList: '消息列表',

    // 聊天管理
    chatroom: '聊天室管理',
    chatroomList: '聊天室管理',

    // 财务管理 - (充值订单、提现订单、资金明细)
    finance: '财务管理',
    rechargeOrderList: '充值订单',
    withdrawOrderList: '提现订单',
    memberBalanceLog: '资金明细',
    rechargeChannelList: '充值渠道',

    // 後台管理 - (系統日誌、菜單列表)
    backend: '后台管理',
    operateLog: '系统日志',
    menu: '菜單列表',
    backendUserList: '后台用户',
    userProfile: '账号资讯',

    profile: '用户信息',
    merchantProfile: '商户信息',

    version: '资讯',
    versionInfo: '资讯'
  },
  dropdown: {
    more: '更多'
  },
  rechargeChannelList: {
    id: '序号',
    account: '账号',
    paymentMethod: '收款方式',
    channelName: '渠道名称',
    payChannelName: '收款渠道名称',
    info: '收款人信息',
    realName: '姓名',
    bankName: '银行名称',
    bankAccount: '银行账号',
    qrCodeImage: '收款码',
    status: '状态',
    placeholder: {
      memo: '备注（仅后台可见）'
    },
    message: {
      delete: {
        title: '操作确认',
        content: '是否刪除?'
      }
    }
  },
  withdrawOrderList: {
    orderCode: '订单编号',
    userId: '用户ID',
    memberName: '用户账号',
    nickName: '昵称',
    channel: '提现渠道',
    accountInfo: '账号信息',
    amount: '提现金额',
    currency: '货币',
    createTime: '提交时间',
    completeTime: '完成时间',
    createDate: '提交',
    completeDate: '完成',
    status: '订单状态',
    showInfo: '查看账号信息',
    approve: '同意',
    reject: '拒绝',
    bankCardNumber: '银行名称',
    name: '真实姓名',
    bankName: '银行账号',
    orderStatus: {
      pending: '待审核',
      completed: '已完成',
      reject: '已拒绝',
      cancel: '用户取消'
    },
    message: {
      approve: {
        title: '操作确认',
        content: '是否同意？'
      },
      reject: {
        title: '操作确认',
        content: '是否拒绝？'
      }
    }
  },
  channelOrderStatus: {
    bankCard: '银行卡',
    weChant: '微信',
    aliPay: '支付宝'
  },
  rechargeOrderList: {
    account: '账号',
    realName: '姓名',
    bankName: '银行名称',
    bankAccount: '银行账号',
    orderCode: '订单编号',
    userId: '用户ID',
    memberName: '用户账号',
    nickName: '昵称',
    channel: '提现渠道',
    payInfo: '收款人信息',
    channelName: '渠道名称',
    payImage: '付款截图',
    amount: '充值金额',
    currency: '货币',
    createTime: '提交时间',
    completeTime: '完成时间',
    createDate: '提交',
    completeDate: '完成',
    status: '订单状态',
    showInfo: '查看账号信息',
    approve: '同意',
    reject: '拒绝',
    bankCardNumber: '银行名称',
    name: '真实姓名',
    method: '充值方式',
    verify: '审核',
    directDeposit: '直接打币',
    orderStatus: {
      create: '订单成立',
      pending: '待审核',
      completed: '已完成',
      reject: '已拒绝',
      cancel: '用户取消',
      timeout: '订单超时'
    },
    message: {
      approve: {
        title: '操作确认',
        content: '是否同意？'
      },
      reject: {
        title: '操作确认',
        content: '是否拒绝？'
      }
    }
  },
  backendUserList: {
    nickname: '用户昵称',
    username: '用户账号',
    loginTime: '最后登录时间',
    updateTime: '最后更新时间',
    loginIp: '最后登录IP',
    resetPassword: '重置密码',
    changeNickname: '修改昵称',
    password: '用户密码',
    role: '角色',
    addSuccessTitle: '用户新增成功',
    resetPasswordSuccessTitle: '用户重置密码成功',
    passwordPlaceholder: '如为空值，系统将随机产生密码',
    emptyRoles: '请先至角色列表新增角色',
    userAccount: '用户账号',
    loginUrl: '登录网址',
    loginUsername: '登录账号',
    loginPassword: '初始密码',
    phone: '手机号',
    email: '电子邮箱',
    chatMemberName: '聊天账号',
    chatNickName: '聊天昵称'
  },
  // 消息列表
  messageList: {
    content: '内容',
    chatType: '会话类型',
    messageType: '消息类型',
    account1: '用户账号/群ID',
    account2: '用户账号/群ID',
    senderAccount: '发送者账号',
    senderNickname: '发送者昵称',
    receiverAccount: '接收者账号/群ID',
    receiverNickname: '接收者昵称/群组名称',
    revert: '撤回',
    placeholder: {
      content: '请输入搜索内容'
    },
    message: {
      maxRangeDays: '查询期间不可超过30天',
      emptyDates: '时间必填',
      revert: {
        title: '操作确认',
        content: '是否执行撤回？'
      }
    }
  },
  // 会话类型
  chatTypeStatus: {
    single: '单聊',
    group: '群组',
    chatroom: '聊天室',
    channel: '频道'
  },
  // 消息类型
  messageTypeStatus: {
    content: '文本',
    voice: '语音',
    image: '图片',
    doc: '文件',
    video: '视频',
    group: '建群',
    groupAdd: '群加人',
    other: '其它'
  },
  // 聊天室管理
  chatroomList: {
    createChat: '创建聊天室',
    cid: '聊天室ID',
    chatAvatar: '聊天室头像',
    onlineCount: '在线人数',
    chatName: '聊天室名称',
    status: '聊天室状态',
    operate: '操作',
    moreInfo: '查看消息',
    checkOnline: '查看在线用户',
    destroyChat: '解散聊天室',
    avatar: '头像',
    username: '用户账号',
    nickname: '昵称',
    gender: '性别',
    joinTime: '加入时间',
    chatMember: '聊天室用户',
    sort: '顺序',
    message: {
      destroy: {
        title: '操作确认',
        content: '是否解散?'
      }
    }
  },
  chatStatus: {
    destroy: '已解散',
    normal: '正常'
  },
  // 系统日志
  operateLog: {
    authId: '操作行为',
    authName: '请求方法',
    operate: '操作',
    creatorIp: 'IP地址',
    userName: '操作账号',
    aclOne: '请求大项目',
    aclTwo: '请求项目',
    aclThree: '请求子项目',
    before: '原值',
    after: '新值',
    creatorLocation: '地理位置',
    message: {
      maxRangeDays: '查询期间不可超过7天',
      emptyDates: '操作时间必填',
      noDataToDownload: '查无资料，无法下载'
    }
  },
  // 用户日志
  memberOperateLog: {
    authId: '操作行为',
    creatorIp: 'IP地址',
    memberName: '账号',
    nickName: '昵称',
    operate: '操作',
    equipment: '操作设备',
    uid: '用户ID',
    userOperate: '操作权限',
    creatorLocation: '地理位置',
    operateTime: '操作时间',
    phone: '手机号',
    message: {
      maxRangeDays: '查询期间不可超过7天',
      emptyDates: '操作时间必填',
      noDataToDownload: '查无资料，无法下载'
    }
  },
  // 操作行为選單
  authIdOptions: {
    login: '用户登录',
    loginFail: '用户登录失败',
    logout: '用户登出'
  },
  // 资金明细
  memberBalanceLog: {
    userId: '用户ID',
    memberName: '用户账号',
    type: '账单类型',
    memberBalanceId: '流水编号',
    nickname: '昵称',
    currency: '交易货币',
    trade: '交易',
    amount: '交易金额',
    beforeBalance: '交易前余额',
    afterBalance: '交易后余额',
    beforeFreeze: '交易前冻结金额',
    freezeAmount: '冻结金额',
    afterFreeze: '交易后冻结金额',
    tradeTime: '交易时间'
  },
  // 资金明细-帳單類型
  memberBalanceTypeOptions: {
    manualRecharge: '手动充值',
    manualWithdraw: '手动提取',
    recharge: '充值',
    withdraw: '提现',
    transfer: '转账',
    redEnvelopeSend: '发红包',
    redEnvelopeReceive: '收红包',
    redEnvelopeRefund: '红包退款',
    checkInReward: '签到奖励',
    withdrawRefused: '提现拒绝',
    applyWithdraw: '提现申请'
  },
  confirmDialog: {
    warning: '警告',
    confirm: '确定',
    cancel: '取消',
    executionSucceeded: '执行成功',
    executionFailed: '执行失败',
    hint: '提示'
  },
  rules: {
    json: '必须为JSON格式',
    required: '必要栏位',
    id: 'ID不能包含特殊字符',
    name: '名称不能包含特殊字符',
    nameLength: '名称须介于 2 到 20 个字符',
    username: '账户只能包含英文和数字',
    usernameLength: '账户须介于 4 到 20 个字符',
    passwordLength: '密码须介于 8 到 20 个字符',
    password: '密码不能输入英文/数字以外字符',
    amount: '必须为数字',
    count: '必须为正整数',
    minPayAmount: '必须小于单笔最高与单日限额',
    maxPayAmount: '必须大于单笔最低且小于单日限额',
    dayMaxPayAmount: '必须大于单笔最低与单笔最高',
    mobile: '不能输入数字以外字符',
    mobileLength: '手机号码格式不正确',
    email: '电子邮件格式不正确',
    paymentCode: '不能输入英文/数字/符号-_.以外字符',
    paymentCodeLength: '支付编码须介于 4 到 15 个字符',
    rate: '必须为数字',
    url: '网址格式不正确',
    accountGroupName: '名称不能包含特殊字符',
    accountGroupName2: '渠道组名称须介于 4 到 20 个字符',
    accountGroupCodeLength: '渠道代码须介于 4 到 20 个字符',
    channelNameLength: '渠道名称须介于 2 到 20 个字符',
    cardNo: '卡号必须为数字',
    bankCode: '银行联行码不能包含特殊字符',
    bankAreaCode: '银行地区码必须为数字',
    ip: 'IP格式不正确（只能输入一组IP）',
    ipList: 'IP格式不正确',
    usbType: 'U盾必须为数字',
    memo: '不能包含特殊字符{}[\]:;"\'<>\\/',
    memoLength: '备注须介于 1 到 50 个字符',
    minAmountLength: '单笔限额下限须介于 1 ~ 100,000,000',
    maxAmountLength: '单笔限额上限须介于 1 ~ 100,000,000',
    minGTRMaxAmount: '下限金额不得高于上限金额',
    dayMaxAmountLength: '单日限额须介于 1 ~ 100,000,000',
    dayMaxAmountLength2: '单日达标金额须介于 1 ~ 100,000,000',
    dayMaxCountLength: '单日限额须大于 0',
    dayMaxCountLength2: '单日达标笔数须介于 1 ~ 100,000,000',
    dayMaxCountLength3: '单日限笔须介于 1 ~ 100,000,000',
    amountLength: '金额须介于 1 到 1,000,000',
    accountNameLength: '姓名须介于 2 到 20 个字符',
    cardNoLength: '卡号须介于 16 到 19 个字符',
    branchName: '分行名称须介于 2 到 20 个字符',
    bankProvince: '省份须介于 2 到 20 个字符',
    bankCity: '城市称须介于 2 到 20 个字符',
    costRateLength: '成本百分比须介于 0 ~ 100',
    costFixedAmountLength: '成本须介于 0 ~ 100,000,000',
    // 不加上欄位
    noSpecialCharacters: '不能包含特殊字符',
    noSpecialCharactersAndNum: '不能包含特殊字符與数字',
    oneToTwentyLength: '须介于 1 到 20 个字符',
    oneToTenLength: '须介于 1 到 10 个字符',
    oneToTwelveLength: '须介于 1 到 12 个字符',
    oneToThirtyLength: '须介于 1 到 30 个字符',
    oneToFiftyLength: '须介于 1 到 50 个字符',
    oneToOneHundredLength: '须介于 1 到 100 个字符',
    twoToTenLength: '须介于 2 到 10 个字符',
    twoToTwelveLength: '须介于 2 到 12 个字符',
    twoToTwentyLength: '须介于 2 到 20 个字符',
    fourToTwentyLength: '须介于 4 到 20 个字符',
    fourToFifteenLength: '须介于 4 到 15 个字符',
    eightToTwentyLength: '须介于 8 到 20 个字符',
    sixToEightLength: '须介于 6 到 8 个字符',
    sixteenToNineteenLength: '须介于 16 到 19 个字符',
    twelveLengthEnNum: '必须是 12 码英文/数字',
    noChinese: '不能包含中文',
    onlyEnAndNum: '不能输入英文/数字以外字符',
    onlyEnAndNumAndSymbol: '不能输入英文/数字/符号`~!@#$%^&*()-_=+[{]}|;:\'",<.>/?以外字符',
    onlyZhEnNumSymbol: '不能输入中文/英文/数字/符号-_. 以外字符',
    onlyNumber: '必须是数字',
    onlyEnglish: '必须是英文',
    formatNotCorrect: '格式不正确',
    timeHHMM: '时间格式错误',
    noSpace: '不能包含空白键',
    plzEnterIpUrl: '请输入IP位置或网域名称',
    emptyStartTime: '开始时间必填',
    accountOrPasswordErr: '用户账号或密码不正确',
    requiredField: '必填栏位',
    aclistEmpty: '至少要勾选一个权限',
    headTailSpace: '头尾不能空白',
    oneToTenLengthWords: '字数须介于 1 到 10 个字元',
    oneToTwentyLengthWords: '字数须介于 1 至 20 字元',
    fourToTwentyLengthWords: '字数须介于 4 至 20 字元',
    greaterThanNumber: '必须大於{num}',
    i18nTextV1: '不能包含~!@#$%^&*()_-+=|\:;"\'[]{}/<>,.?符号字符',
    noTwoSpaces: '不可连续输入空白键',
    noEmptySpace: '不能為空白'
  },
  navbar: {
    logout: '登出'
  },
  login: {
    title: '管理系统',
    login: '登录',
    username: '用户账号',
    password: '用户密码',
    checkcode: '验证码'
  },
  dialog: {
    create: '添加',
    update: '更新'
  },
  status: {
    status: '状态',
    enabled: '启用',
    disabled: '禁用',
    allStatus: '请选择',
    memoNotEmpty: '备注不可留白',
    cancellation: '注销',
    pending: '待审核',
    checking: '确认中',
    successed: '成功',
    failed: '失败'
  },
  LoginStatus: {
    inhibit: '禁止',
    allow: '允許'
  },
  accountStatus: {
    disabled: '下架',
    enabled: '启用',
    reachedLimit: '达标',
    underRiskControl: '风控',
    suspended: '禁用',
    cooling: '冷却',
    coolingAmount: '冷却金额',
    changeMessage: '更新状态'
  },
  riskStatus: {
    riskStatus: '登录状态',
    loggedOut: '未登录',
    loggedIn: '已登录',
    loggingId: '登录中'
  },
  catchMode: {
    title: '小工具模式',
    webBrowser: 'WebBrowser',
    selenium: 'Selenium'
  },
  notifyStatus: {
    created: '未通知',
    notifying: '通知中',
    succeeded: '成功',
    failed: '失败',
    notifyError: '通知异常'
  },
  timestamp: {
    updateTime: '更新时间',
    update: '更新',
    updater: '更新人',
    createTime: '创建时间',
    create: '创建',
    creator: '创建人',
    time: '时间'
  },
  dateTimePicker: {
    startTime: '开始时间',
    endTime: '结束时间',
    rules: {
      range: '结束时间必须要晚于开始时间'
    }
  },
  userLevel: {
    brandAdmin: '品牌管理员',
    merchant: '商户',
    normalAdmin: '普通管理员',
    superAdmin: '超级管理员',
    generalAgent: '品牌专员'
  },
  channelType: {
    channelType: '渠道类型',
    pc: '电脑网站支付',
    wapQr: '手机网站支付（扫码）',
    faceQr: '当面付（扫码）',
    wap: '手机网站支付',
    face: '当面付',
    auth: '预授权'
  },
  button: {
    systemBusy: '系统繁忙，请至少%d秒后再刷新！',
    refreshBalance: '刷新余额',
    resetting: '重新设定',
    copy: '复制'
  },
  dashboard: {
    date: '日期',
    activeMemberCount: '當日活跃用户数',
    addMemberCount: '當日新增用户数',
    memberGrandTotalCount: '当前系统总用户数',
    addGroupCount: '當日新建群个数',
    groupGrandTotalCount: '当前系统群总数',
    messageCount: '當日发送消息数',
    top10ActiveGroup: 'Top10活跃群组',
    rank: '排名',
    memberName: '用户账号',
    nickname: '昵称',
    count: '消息数量',
    top10ActiveMember: 'Top10活跃用户数',
    groupId: '群组ID',
    groupName: '群组名称'
  },
  role: {
    roleName: '角色名称',
    level: '用户层级',
    acl: '权限',
    viewAcl: '查看权限',
    createTitle: '建立角色',
    updateTitle: '更新角色',
    rules: {
      level: '用户层级不可以留白'
    }
  },
  channelList: {
    channelName: '渠道名称',
    channelCode: '支付编码',
    settlement: '结算周期',
    discountStatus: '优惠状态',
    rules: {
      settlementSum: '结算周期百分比和必须是100%'
    }
  },
  payOrderList: {
    merchantUserId: '商户用户账号',
    orderId: '平台订单号',
    merchantOrderNo: '商户订单号',
    channelOrderNo: '渠道订单号',
    amount: '订单金额',
    actualAmount: '实付金额',
    discountAmount: '随机减免',
    channelName: '收款渠道',
    instName: '收款银行',
    accountName: '收款账号',
    transactionAmount: '结算金额',
    fee: '手续费',
    createTime: '申请时间',
    successTime: '完成时间',
    status: '订单状态',
    channelRemark: '渠道通知备註',
    notify: '通知',
    notifyStatus: '通知状态',
    applyDate: '申请',
    successDate: '完成',
    notifyCount: '通知次数',
    lastNotifyTime: '最后通知时间',
    notifyReturnData: '通知的返回信息',
    notifyUrl: '通知地址',
    buyerLogonId: '付款用户',
    buyerUserId: '用户ID',
    buyerUserName: '用户名',
    servicefee: '服務費',
    channelNotifyUrl: '渠道通知网址',
    thirdVendor: '金流商',
    statusOptions: {
      created: '创建中',
      // notYetOpenPage: '未支付',
      notYetOpenPage: '发起订单',
      openedPage: '待支付',
      scannedQrCode: '支付中',
      paid: '支付完成',
      completed: '处理完成',
      closedOnNotYetOpenPage: '订单关闭',
      closedOnOpenedPage: '订单关闭',
      closedOnScannedQrCode: '订单关闭',
      closedOnCreate: '创建失败'
    },
    checkPaidProcessOptions: {
      title: '确认支付方式',
      fromNotify: '主动回调',
      manuallyRefresh: '手动刷新'
    },
    error: {
      dates: '申请时间和完成时间不可同时选择',
      maxRangeDays: '查询期间不可超过90天',
      emptyDates: '申请时间和完成时间必须择ㄧ选择'
    },
    trade: {
      close: '未付款交易超时关闭，或支付完成后全额退款',
      success: '交易支付成功',
      finish: '交易结束，不可退款',
      wait: '支付中 - 用户正在付款中',
      notExistNotOpen: '支付中 - 用户还未访问付款页面',
      notExistNotScan: '支付中 - 用户还未扫码或唤醒支付宝付款'
    },
    refresh: {
      successMsg: '刷新成功，订单状态尚无进度',
      successMsgFrom: '刷新成功，订单状态由',
      successMsgTo: '更新为',
      fail: '刷新失败'
    }
  },
  foundToMerchantOrder: {
    orderId: '结算单号',
    payeeCardName: '收款人姓名',
    bankCard: '银行卡',
    bankName: '银行名称',
    branchName: '支行名称',
    payeeCardNo: '卡号',
    amount: '结算金额',
    fee: '手续费',
    computeFee: '计算手续费',
    createTime: '申请时间',
    updateTime: '完成时间',
    operator: '审核人',
    creator: '申请人',
    statusOptions: {
      created: '等待结算',
      finished: '结算完成',
      canceled: '取消结算'
    },
    rules: {
      amount: '金额+手续费没有大于可用余额'
    }
  },
  merchantChargeOrder: {
    orderId: '账变单号',
    amount: '账变金额',
    reason: '原因',
    reasonPlaceholder: '请输入原因',
    statusOptions: {
      created: '待审核',
      finished: '处理完成',
      canceled: '取消'
    }
  },
  wyOrderList: {
    orderNo: '网易订单号',
    createTime: '第一次入库时间',
    updateTime: '第二次入库时间',
    chargeTime: 'WY 订单成立时间',
    chargeFailReason: 'WY 错误信息',
    statusOptions: {
      paying: '已提交充值处理',
      paid: '充值成功'
    },
    matched: '匹配状态',
    matchedOptions: {
      matched: '已匹配',
      unmatched: '未匹配'
    }
  },
  bankCardOrderList: {
    orderNo: '银行卡订单号',
    chargeTime: '银行卡订单成立时间',
    payeeCardNo: '转入卡号',
    payerCardNo: '转出卡号',
    payerCardName: '转出账户',
    payerBankName: '转出银行',
    transferType: '转账方式',
    transferTypeOptions: {
      internetBanking: '网银转账'
    },
    matchedOptions: {
      matched: '已匹配',
      matchedManually: '手动匹配',
      unmatched: '未匹配'
    }
  },
  accountList: {
    orderOriginationUrl: '订单发起URL',
    orderQueryUrl: '订单查询URL',
    balanceQueryUrl: '余额查询URL',
    vendorName: '金流商',
    thirdMerchantId: '金流方商戶ID',
    thirdMerchantSign: '金流方验证密钥',
    thirdMerchantName: '金流方商戶名称',
    thirdPublicKey: '金流方公钥',
    thirdPrivateKey: '金流方私钥',
    payAmount: '单笔限额',
    singleFixedAmount: '单笔固定限额',
    dayMaxAmount: '单日限额',
    dayMaxCount: '单日限笔',
    param: '參數',
    channel: '渠道',
    catchId: '编号',
    catchPassword: '小工具密码',
    accountName: '账号名称',
    enableStatusTime: '启用日期',
    accountCode: '账号代码',
    aliUid: '阿里UID',
    appId: 'APPID',
    publicKey: '支付公钥',
    privateKey: '支付私钥',
    loginUsername: '登录账号',
    loginPassword: '登录密码',
    transactionPassword: '支付密码',
    securityQuestion: '安全问答',
    question: '问题',
    answer: '答案',
    mobile: '手机号码',
    bootServer: 'Boot Server',
    cost: '成本',
    applicableAmount: '适用金额',
    pcType: '签约产品（PC）',
    wapType: '签约产品（WAP）',
    catalog: '商品目录',
    minPayAmount: '单笔最低金额',
    maxPayAmount: '单笔最高金额',
    dayMaxPayAmount: '单日达标金额',
    dayMaxPayCount: '单日达标笔数',
    specifiedAmounts: '指定金额',
    bankCard: '绑定银行卡',
    gateway: '转跳域名',
    isGateUsed: '是否使用Gate',
    addInBatch: '批量上传',
    downloadAddInBatchTemplate: '模板下载',
    testAccountForPc: '测单PC',
    testAccountForWap: '测单WAP',
    reportData: '下載報表',
    testAccountTitle: '已生成测试单: ',
    testAccountContent: '请去订单列表查询状态',
    defaultThirdUrl: '系统将自动使用金流商预设的接口URL',
    thirdChannelCode: '三方渠道编号',
    connectStatus: '连线状态',
    traceStatus: '追踪状态',
    keyErr: {
      allEmpty: '金流方公私钥与验证密钥择一',
      bothEmpty: '支付公私钥与第三方密钥择一',
      publicKeyEmpty: '请输入支付公钥',
      privateKeyEmpty: '请输入支付私钥'
    },
    rules: {
      typeEmpty: '至少要选一个签约产品',
      inclusive: '除当面付和预先冻结以外，至少要选一个签约产品',
      exclusive: '当面付和预先冻结不可同时勾选',
      accountChannelListEmpty: '至少添加一个渠道',
      channelEmpty: '渠道不能为空',
      dayMaxLargerThanMax: '单日限额不可以小于单笔最高限额',
      minLargerThanMax: '单笔最高限额不可以小于单笔最小限额',
      withdrawConfirmUrlEmpty: '代付认证地址不可留白',
      rateNotNumber: '费率必须是整数或小数',
      minMaxAmountNotNumber: '单笔限额必须是数字',
      singleFixedAmountNotNumber: '单笔固定限额必须是数字',
      singleFixedAmountNotBetween: '单笔固定限额须介于单笔限额上下限內',
      singleFixedAmountNotDuplicate: '单笔固定限额不可输入重复金额',
      dayMaxAmountNotNumber: '单日限额必须是数字',
      dayMaxCountNotNumber: '单日限笔必须是整数',
      servicefeeNotNumber: '限笔必须是正数',
      settlementIdEmpty: '請选择结算',
      minAmountLength: '单笔限额下限须介于 1 到 1,000,000',
      maxAmountLength: '单笔限额上限须介于 1 到 1,000,000',
      minGTRMaxAmount: '下限金额不得高于上限金额',
      dayMaxAmountLength: '单日限额须介于 1 到 1,000,000',
      dayMaxCountLength: '单日限笔须介于 1 到 1000',
      duplicateChannel: '不可选择相同渠道',
      thirdChannelCodeEmpty: '三方渠道编号不可空白',
      thirdChannelCodeSpace: '三方渠道编号头尾不能空白'
    },
    errors: {
      channelId: '渠道不可留白'
    }
  },
  accountGroupList: {
    accountGroupName: '组名称',
    accountGroupName2: '渠道组名称',
    accountName: '账号名称',
    accountGroupCode: '组代码',
    accountGroupCode2: '渠道组代码',
    accountCount: '账号数量（启用 / 全部）',
    dayMaxPayAmount: '达标金额',
    dayMaxPayCount: '达标笔数',
    availableAmount: '剩余可用配额',
    totalDayMaxAmount: '当日总配额',
    totalTodayAmount: '当日已使用配额',
    totalAvailableAmount: '当日剩余可用配额',
    bankCardType: '类型',
    bankCardMemo: '备注'
  },
  accountAllocation: {
    status: '商户状态'
  },
  withdrawBankCardBlackList: {

  },
  withdrawChannelList: {
    withdrawChannel: '代付渠道',
    accountName: '账号名称',
    catchId: '代付渠道编码',
    vendorName: '金流商',
    channelMerchantId: '金流方商户ID',
    channelMerchantName: '金流方商户名称',
    orderOriginationUrl: '订单发起URL',
    orderQueryUrl: '订单查询URL',
    balanceQueryUrl: '余额查询URL',
    thirdMerchantSign: '金流方验证密钥',
    cost: '成本',
    openTime: '渠道可用时段',
    balance: '余额',
    memo: '备注',
    refreshBalance: '更新',
    createTestOrder: '发起代付测单',
    bankProvince: '银行所在省份',
    bankCity: '银行所在城市',
    testWithdrawChannel: '测单',
    publicKey: '金流方公钥',
    privateKey: '金流方私钥',
    payAmount: '单笔限额',
    dayMaxAmount: '单日限额',
    dayMaxCount: '单日限笔',
    channelTime: '渠道可用时段',
    bank: '代付银行',
    serviceFeeType: ' 代付手续费',
    serviceFeeTypeA: '从余额扣除手续费',
    serviceFeeTypeB: '从出款金额扣除手续费',
    openDay: '渠道可用星期',
    dayMaxPayAmount: '单日限额',
    dayMaxPayCount: '单日限笔',
    withdrawSetting: '代付设定',
    preCatchBalance: '可用额度',
    minAmount: '最低金额',
    maxAmount: '最高金额',
    resetting: '重新设定',
    defaultThirdUrl: '系统将自动使用金流商预设的接口URL',
    channelExtra: '额外配置参数',
    connectStatus: '连线状态',
    traceStatus: '追踪状态',
    emptyBankChannelList: '依上游开放的银行为主',
    emptyBalanceQueryUrl: '上游不提供查询余额接口',
    keyErr: {
      allEmpty: '金流方公私钥与验证密钥择一',
      bothEmpty: '支付公私钥与第三方密钥择一',
      publicKeyEmpty: '请输入支付公钥',
      privateKeyEmpty: '请输入支付私钥'
    }
  },
  withdrawChannelBankCodeList: {
    withdrawBank: '代付银行',
    withdrawBankCode: '代付银行代码'
  },
  bankCard: {
    add: '新增银行卡',
    manager: '存款卡管理',
    cardId: '卡编号',
    bankName: '银行名称',
    payeeCardName: '账户姓名',
    payeeCardNo: '银行卡号',
    bankArea: '地区名称',
    branchName: '分行名称',
    bankCardOrder: '银行卡订单管理',
    loginUsername: '银行登录账号',
    loginPassword: '银行登录密码',
    transactionPassword: '交易密码',
    usbPassword: 'U盾密码',
    usbType: 'U盾类型',
    usbTypes: {
      tmp: '暂定'
    },
    postType: '支付类型',
    mobile: '手机号码',
    type: '卡类型',
    types: {
      receiptCard: '存款卡',
      transferCard: '中转卡',
      safeCard: '安全卡',
      paymentCard: '付款卡'
    },
    isToBindAccount: '绑定账号',
    accountName: '账号名称',
    accountCatchId: '账号编号',
    accountStatus: '账号状态'
  },
  auth: {
    code: '權限名稱',
    name: '權限代码',
    type: '權限類型'
  },
  admin: {
    username: '账号',
    nickname: '昵称',
    role: '角色名称',
    loginTime: '最後登入时间',
    ip: '最後登入IP',
    google: '谷歌验证',
    operator: '操作',
    password: '密码',
    changeNickname: '编辑昵称'
  },
  logList: {
    methodName: '请求方法',
    request: '参数',
    before: '更新前',
    after: '更新后',
    merchantName: '商户名称',
    creator: '操作人账号',
    operatingTime: '操作时间',
    aclName: '请求方法',
    aclOne: '请求大项目',
    aclTwo: '请求项目',
    aclThree: '请求子项目',
    error: {
      maxRangeDays: '查询期间不可超过90天',
      dateRequire: '查询期间必填'
    }
  },
  merchantBalanceLog: {
    orderId: '单号',
    amount: '账变金额',
    beforeBalance: '账变前余额',
    afterBalance: '账变后余额',
    beforeFreezeAmount: '账变前不可用余额',
    afterFreezeAmount: '账变后不可用余额',
    reason: '类型',
    memo: '原因',
    reasons: {
      payActualAmount: '支付宝收款实付金额',
      payDiscountAmount: '支付宝收款优惠金额',
      payFee: '支付宝收款手续费',

      withdrawActualAmount: '代付付款实付金额',
      withdrawDiscountAmount: '代付付款优惠金额',
      withdrawFee: '代付付款手续费',
      revertWithdrawActualAmount: '补回代付付款实付金额',
      revertWithdrawDiscountAmount: '补回代付付款优惠金额',
      revertWithdrawFee: '补回代付付款手续费',

      freezeWithdrawActualAmount: '冻结代付付款实付金额',
      freezeWithdrawDiscountAmount: '冻结代付付款优惠金额',
      freezeWithdrawFee: '冻结代付付款手续费',

      foundToMerchantAmount: '结算金额',
      revertFoundToMerchantAmount: '补回结算金额',
      foundToMerchantFee: '结算手续费',
      revertFoundToMerchantFee: '补回结算与手续费',

      manuallyChangeAddBalance: '人工加币',
      manuallyChangeSubtractBalance: '人工扣币'
    },
    reasonsGroup: {
      pay: '充值',
      discount: '优惠补助',
      fee: '服务费',
      withdraw: '提现',
      revertWithdraw: '提现补回',
      revertDiscount: '优惠补助补回',
      revertFee: '服务费补回',
      manuallyIncrease: '人工加币',
      manuallyDecrease: '人工减币',
      servicesfee: '手续費'
    }
  },
  bulletin: {
    content: '内容'
  },
  security: {
    type: '类型',
    ipList: 'IP列表',
    ipListPlaceholder: 'IP列表用逗号分隔',
    cardNo: '卡号',
    cardholderName: '持卡人姓名',
    types: {
      createOrder: '商户接口 - 白名单',
      userLogin: '系统用户 - 黑名单',
      withdrawCardNo: '代付卡号 - 黑名单'
    },
    help: {
      help: '帮助',
      createOrder: '商户接口（含支付和代付）\n类型：白名单\n预设挡住所有的IP，只有在白名单里面的IP才可以通过',
      userLogin: '系统用户登录\n类型：黑名单\n预设允许所有IP通过，只有在黑名单里面的IP才会被挡住',
      withdrawCardNo: '代付卡号\n类型：黑名单\n预设在申请代付订单时，允许所有卡号，只有在黑名单里面的卡号才会被挡住'
    },
    errors: {
      type: '必须选择一个类型'
    }
  },
  riskConfig: {
    key: '参数',
    value: '值',
    keys: {
      alipayCoolingAmount: '支付宝冷却金额',
      accountSelectingTodayLeastAmount: '账号轮询规则 - 当日最少收款账号数',
      orderSuccessRate: '订单成功率',
      paidSuccessRate: '付款成功率',
      bankGateWyPay: '网关排程: WYPAY',
      clientIpVerification: 'Client IP 验证',
      banRequestIpDifferentFromClientIp: '禁止请求IP不同于Client IP'
    }
  },
  riskWy: {
    login: '登录',
    queryOrder: '查询订单',
    queryBalance: '查询余额',
    queryOrderSuccess: '成功查询到%d笔订单',
    queryBalanceSuccess: '成功查询到余额: %d 元'
  },
  merchantUser: {
    assignedAccountList: '当前分配账号',
    backupAssignedAccountList: '临时分配账号',
    count: '使用次数',
    amount: '总金额'
  },
  payPage: {
    html: '跳转内容',
    status: {
      unpaid: '待支付',
      paid: '已支付',
      expired: '已过期'
    }
  },
  orderTraceList: {
    userId: '商户用户ID',
    ip: 'IP',
    location: '地区'
  },
  settlement: {
    name: '结算方式',
    belong: '权归属',
    D0: 'd0',
    D1: 'd1'
  },
  accountBalance: {
    amount: '当日累积金额',
    count: '当日累积笔数',
    balance: '当日可用余额',
    frozenAmount: '当日不可用余额',
    withdrawalCount: '提款次数',
    catchUpdateTime: '最后同步时间'
  },
  foundToCofferOrder: {
    orderId: '订单ID',
    accountFrom: '转出账号',
    accountTo: '转入',
    amount: '金额',
    status: {
      created: '发起',
      processing: '进行中',
      succeeded: '完成',
      failed: '失败',
      declined: '审核拒绝'
    },
    type: '转账方式',
    types: {
      alipayToAlipay: '支付宝转至支付宝',
      alipayToBankCard: '支付宝转至银行卡'
    },
    notBindBankCard: '未绑定银行卡'
  },
  accountReport: {
    availableAmount: '剩余可用配额',
    availableCount: '剩余可用笔数',
    orderSuccessRate: '订单成功率',
    paidSuccessRate: '付款成功率',
    totalPayAmount: '累计付款',
    totalWithdrawAmount: '累计收款',
    frozenAmount: '冻结金额',
    dayMaxAmount: '达标金额',
    todayWithdrawAmount: '今日收款',
    todayPayAmount: '今日付款',
    dayMaxCount: '达标笔数',
    successCount: '成功笔数',
    orderTotalCount: '订单总数',
    failedOrderCount: '失败订单',
    didNotOpenOrderCount: '未访问订单',
    didNotScanOrderCount: '未扫码订单',
    dayAvailableAmount: '今日剩余可用配额',
    dayAvailableCount: '今日剩余可用笔数',
    dayLimitCount: '今日限制笔数',
    dayLimitAmount: '今日限制金额',
    merchantName: '商户名称',
    doingCount: '支付中/付款中订单',
    closeCount: '已关闭订单',
    error: {
      emptyDates: '开始时间与结束时间为必填'
    }
  },
  merchantReport: {
    rules: {
      channelId: '请选择渠道'
    }
  },
  agentList: {
    agentId: '代理ID',
    agentName: '代理名称',
    parentAgentName: '上级代理',
    merchantCount: '商户数量',
    rate: '费率',
    loginIp: '登录IP',
    lastLoginTime: '最后登录时间',
    addSuccessTitle: '代理账户新增成功',
    balance: '可用余额',
    freezeAmount: '不可用余额'
  },
  merchantList: {
    merchantId: '商户ID',
    username: '商户ID',
    merchant: '商户名称',
    agent: '代理',
    status: '状态',
    discountStatus: '优惠状态',
    createTime: '创建时间',
    channelRate: '渠道费率',
    balance: '可用余额',
    freezeAmount: '不可用余额',
    merchantStatus: '商户状态',
    payAmount: '单笔限额',
    payAmountFrom: '从',
    payAmountTo: '至',
    dayMaxAmount: '单日限额',
    dayMaxCount: '单日限笔',
    mobile: '手机号码',
    email: '电子信箱',
    adminAccount: '管理员用户',
    managerAccount: '管理者账号',
    adminPassword: '管理员用户密码',
    managerPassword: '管理者密码',
    managerNickname: '管理者昵称',
    requestKey: 'Request Key',
    responseKey: 'Response Key',
    rate: '费率',
    chargefee: '手续费',
    servicefee: '服务费',
    settlement: '结算',
    addSuccessTitle: '商户用户新增成功',
    loginUrl: '登录网址',
    loginUsername: '登录账号',
    loginPassword: '初始密码',
    regenerate: '重新产生',
    rateFixedAmountPlaceholder: '固定金额',
    nicknamePlaceholder: '如为空值，预设与商户名称相同',
    marchantIdPlaceholder: '请输入12码英文、数字',
    isBackendLogin: '是否后台可登',
    updateIsBackendLogin: '更新是否后台可登',
    backendLoginTurnOn: '改为启用后，该商户所有账号将可以登入后台，确定变更状态?',
    backendLoginTurnOff: '改为禁用后，该商户所有账号将无法登入后台，确定变更状态?',
    resetPassword: '重置密码',
    rules: {
      dayMaxLargerThanMax: '单日限额不可以小于单笔最高限额',
      minLargerThanMax: '单笔最高限额不可以小于单笔最小限额',
      withdrawConfirmUrlEmpty: '代付认证地址不可留白',
      rateNotNumber: '费率必须是整数或小数',
      minMaxAmountNotNumber: '单笔限额必须是整数',
      dayMaxAmountNotNumber: '单日限额必须是整数',
      dayMaxCountNotNumber: '单日限笔必须是整数',
      servicefeeNotNumber: '限笔必须是正数',
      channelEmpty: '至少要选择一笔渠道',
      settlementIdEmpty: '請选择结算',
      minAmountLength: '单笔限额下限须介于 1 到 1,000,000',
      maxAmountLength: '单笔限额上限须介于 1 到 1,000,000',
      minGTRMaxAmount: '下限金额不得高于上限金额',
      dayMaxAmountLength: '单日限额须介于 1 到 1,000,000',
      dayMaxCountLength: '单日限额须介于 0 到 10'
    }
  },
  userList: {
    userId: '用户ID',
    nickname: '昵称',
    account: '用户账号',
    username: '账号',
    password: '密码',
    registrationIP: '注册IP',
    fromIp: 'IP归属地',
    addFriends: '添加好友',
    status: '登陆状态',
    permission: '建群权限',
    admin: '管理员',
    createTime: '注册时间',
    updateTime: '最后活跃',
    loginErrorCount: '登录错误次数',
    registration: '注册',
    userInfo: '用户信息',
    source: '注册来源',
    time: '时间',
    fromIpAndAddress: '归属地',
    balance: '余额',
    login: '登陆',
    createGroup: '建群',
    channel: '渠道',
    withdraw: '提存',
    avatar: '头像',
    gender: '性別',
    man: '男',
    woman: '女',
    secret: '保留',
    addUser: '添加用户',
    batchAddUser: '批量添加用户',
    save: '保存',
    userDetail: '用户详情',
    friendsAndChatHistory: '好友/聊天记录',
    log: '日志',
    clearLogErrors: '清除登录错误次数',
    sendMessage: '发送消息',
    passwordPlaceholder: '无需修改请留空',
    editPassword: '修改密码',
    withdrawPassword: '修改交易密码',
    personalFriend: '个人好友',
    group: '群',
    send: '发送',
    enterMessage: '请输入消息',
    chatHistory: '聊天记录',
    addFriendsTime: '添加好友时间',
    deleteFriend: '删除好友',
    clearHistory: '清空聊天记录',
    noChecked: '免验证通过',
    needChecked: '需要对方验证通过',
    pass: '免验证直接通过',
    checkedMessage: '验证消息',
    addFriendsDescription: '添加好友，免验证通过将不展示验证消息；邀请入群直接通过。',
    recharge: '手动充值',
    manualWithdraw: '手动提取',
    amountPlaceholder: '请输入增减金额（正整数）',
    amountDesc: '增减金额',
    checkedIp: '查IP',
    inhibitLogin: '批量禁止管理员登陆',
    allowLogin: '批量允许管理员登陆',
    inhibitCreateGroup: '批量禁止所有人建群',
    allowCreateGroup: '批量允许所有人建群',
    allowAdminCreateGroup: '批量允許管理员建群',
    operationTitle: '操作确认',
    clearLoginErrorDesc: '清除错误登录次数后，玩家可以正常登录，确认此操作？',
    deleteUserDesc: '注销账号后，所有信息都将无法恢复，确认是否注销？',
    type: '类型',
    inhibitLoginText: '确定批量禁止管理员登陆？',
    allowLoginText: '确定批量允许管理员登陆？',
    inhibitCreateGroupText: '确定批量禁止所有人建群？',
    allowCreateGroupText: '确定批量允许所有人建群？',
    allowAdminCreateGroupText: '确定批量允許管理员建群？',
    user: '普通用户',
    mobile: '手机号',
    email: '邮箱',
    noBalance: '用户余额不足',
    systemDefaultValue: '如为空值，系统自动产生',
    retractMessage: '自定义撤回消息数量',
    clearCount: '清空数量',
    clearAll: '清空所有',
    clear100: '近100条',
    custom: '自定义',
    clean: '开始清空',
    deleteFriendText: '确定要删除该好友吗？',
    notRegistration: '尚未注册完成',
    adminChatHistory: '管理员聊天记录',
    isAdmin: '是',
    notAdmin: '否',
    normalType: '一般',
    blacked: '黑名单',
    block: '拉黑',
    freeze: '冻结',
    wallet: '钱包',
    totalBalance: '总额'
  },
  inviteCode: {
    inviteCode: '邀请码',
    registrationNumber: '注册人数',
    defaultFriend: '预设好友',
    defaultGroup: '预设群',
    defaultFriendAndGroup: '预设好友/群',
    addInviteCode: '新增邀请码',
    InviteCodeDialog: '添加邀请码',
    defaultUserId: '预设好友(用户账号)',
    welcome: '预设好友欢迎词',
    addAllFriends: '添加所有预设好友',
    addByTurn: '轮询使用(用户注册后只添加一个预设好友，多个预设好友轮询添加)',
    groupMessage: '群信息',
    type: '类型',
    userInfo: '用户信息',
    welcomeMessage: '欢迎词',
    using: '使用中',
    defaultFriendPlaceholder: '新用户登陆后，预设好友发来的提示语',
    userIdPlaceholder: '用户账号',
    memoPlaceholder: '邀请码备注信息（仅后台可见）',
    defaultFriendMode: '预设好友模式',
    createTime: '最新用户注册时间',
    registration: '注册',
    userId: '用户账号',
    friend: '好友',
    group: '群',
    uidAndGroupId: '用户账号/群ID',
    uidAndGroupIdPlaceholder: '用户账号或群ID',
    defaultType: '预设类型',
    groupId: '群ID',
    groupName: '群名称',
    deleteFriendText: '确定删除预设好友？',
    deleteGroupText: '确定删除预设群？',
    inviteCodeTip: '支持数字及英文字母，建议配置纯数字，配置后不可修改',
    mobile: '手机号',
    nickname: '昵称',
    username: '账号',
    needUserId: '必须要有预设好友',
    errorGroupId: '群ID错误',
    operationTitle: '操作确认'
  },
  defaultFriends: {
    message: '用户/群信息',
    allRegistrants: '所有新注册用户',
    addDefaultMember: '添加预设好友',
    defaultMemberSettings: '全局默认好友设置',
    welcomeMessage: '欢迎词',
    type: '类型',
    inviteCodeMember: '使用邀请码注册的用户',
    allDefaultFriends: '全局默认好友',
    deleteFriendGroupText: '确定删除预设好友/群？',
    inviteCode: '邀请码',
    nickname: '昵称',
    username: '账号',
    mobile: '手机号',
    groupId: '群组ID',
    groupName: '群组名称',
    friend: '好友',
    group: '群',
    uidAndGroupId: '用户账号/群ID',
    uidAndGroupIdPlaceholder: '用户账号或群ID',
    defaultFriendPlaceholder: '新用户登陆后，预设好友发来的提示语',
    defaultFriendMode: '预设好友模式',
    addAllFriends: '添加所有预设好友',
    addByTurn: '轮询使用(用户注册后只添加一个预设好友，多个预设好友轮询添加)',
    defaultFriend: '预设好友',
    defaultGroup: '预设群',
    defaultType: '预设类型',
    errorGroupId: '群ID错误',
    operationTitle: '操作确认',
    userId: '用户账号',
    defaultFriendAndGroup: '预设好友/群'
  },
  sensitiveWordList: {
    sensitiveWord: '敏感词',
    add: '添加敏感词',
    save: '保存',
    sensitiveWordPlaceholder: '请输入敏感词'
  },
  sensitiveWordHit: {
    senderUid: '发送者账号',
    senderNickName: '发送者昵称',
    receiverUid: '接收者账号/群ID',
    receiverNickName: '接收者昵称/群名称',
    createTime: '时间',
    content: '消息内容',
    chatType: '消息类型',
    clear: '清空',
    single: '单聊',
    group: '群组',
    chatRoom: '聊天室',
    channel: '频道'
  },
  groupList: {
    groupId: '群ID',
    groupName: '群组名称',
    groupImage: '头像',
    managerId: '群主账号',
    managerName: '群主昵称',
    memberCount: '人数',
    muteType: '发言状态',
    privateChat: '私聊状态',
    modifyGroup: '编辑群组',
    checkedMessage: '查看消息',
    checkedGroupMember: '查看群成员',
    addGroupMember: '添加群成员',
    delete: '解散',
    mute: '禁言',
    unmute: '取消禁言',
    allowChat: '自由发言',
    muted: '禁言中',
    muteNormal: '禁言普通成员',
    prohibitPrivateChat: '禁止私聊',
    allowPrivateChat: '允许私聊',
    createGroup: '创建群组',
    save: '保存',
    tip: `变更群主，原群主成员类型将被设为“会员”`,
    deleteText: '确定要解散群组吗？',
    nicknamePlaceholder: '昵称/用户账号',
    memberName: '用户账号',
    nickName: '昵称',
    memberType: '成员类型',
    gender: '性别',
    member: '成员',
    admin: '管理员',
    groupAdmin: '群主',
    cannotDeleteGroupAdmin: '不可删除群主',
    groupNamePlaceholder: '请输入群组名称',
    noMember: '请选择成员',
    createTime: '注册时间',
    create: '创建',
    clear: '清空',
    add: '加入',
    status: '群状态',
    normal: '正常',
    disbanded: '已解散',
    chooseMember: '请选择用户',
    groupType: '群组类型',
    normalType: '一般',
    broadcast: '广播',
    enterPlaceholder: '請輸入訊息......',
    submit: '发送'
  },
  gender: {
    secret: '保留',
    man: '男',
    woman: '女'
  },
  dailyReport: {
    date: '日期',
    alipayAmount: '用户充值金额',
    alipayFee: '充值手续费',
    withdrawAmount: '用户提现金额',
    withdrawFee: '提款手续费',
    totalFee: '总手续费',
    chargeAmount: '人工调整金额',
    balance: '可用余额',
    thirdVendor: '金流商',
    vendor: '金流商',
    channelName: '收款渠道',
    merchantName: '商户名称',
    queryHint: '查看选择日期至今日的报表'
  },
  agentReport: {
    amount: '订单金额',
    successTime: '完成时间',
    rateDifference: '费率',
    rateFixedAmountDifference: '费率固定金额',
    feeDifference: '佣金'
  },
  agentReportDetail: {
    feeDifference: '佣金'
  },
  redoReport: {
    oldValue: '旧数值',
    newValue: '新数值',
    redo: '重制',
    filter: '筛选'
  },
  version: {
    component: '元件',
    version: '资讯'
  },
  table: {
    search: '搜索',
    add: '新增',
    batchAdd: '批次添加',
    id: '序号',
    actions: '操作',
    edit: '编辑',
    delete: '删除',
    cancel: '取消',
    confirm: '确定',
    copy: '复制',
    detail: '查看',
    agree: '同意',
    finish: '完成',
    decline: '拒绝',
    refresh: '刷新',
    processing: '处理中',
    memo: '备注',
    loading: '给我一点时间',
    subtotal: '小计',
    total: '总计',
    export: '导出',
    multipleAdd1: '将文件拖到此处，或',
    multipleAdd2: '点击上传',
    multipleAddTip: '只能上传CSV文件，且不超过2MB',
    refreshTime: '刷新时间',
    refreshConnect: '连线刷新',
    reject: '驳回',
    pass: '通过'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  tagsView: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  logout: {
    message: '你已被登出，可以取消继续留在该页面，或者重新登录',
    title: '确定登出',
    confirm: '重新登录',
    cancel: '取消'
  },
  wy: {
    titleRisk: '网易风控'
  },
  week: {
    Sun: '星期日',
    Mon: '星期一',
    Tue: '星期二',
    Wed: '星期三',
    Thu: '星期四',
    Fri: '星期五',
    Sat: '星期六'
  },
  placeholder: {
    singleMinAmount: '最低金额',
    singleMaxAmount: '最高金额',
    amount: '金额'
  },
  recaptcha: {
    text: '验证码',
    error: 'Invalid recaptcha code'
  },
  label: {
    delete: '删除'
  },
  message: {
    noDataToDownload: '查无资料，无法下载'
  },
  blackWhiteList: {
    redisSetting: '设定Redis',
    merchantName: '商户名称',
    blackWhiteList: '黑白名单',
    blackList: '黑名单',
    whiteList: '白名单',
    ipPlaceholder: '请输入IP位置或网域名称'
  },
  otp: {
    codePlaceholder: 'OTP验证码',
    otpCodeHint1: '1.账号尚未绑定则不需填写OTP验证码',
    otpCodeHint2: '2.重置OTP验证码由管理者进行操作',
    otpStatus: 'OTP状态',
    bindOtp: '绑定OTP',
    scanTip: '请用Authenticator扫描QR Code',
    bindOtpPlaceholder: '输入手机取得之OTP验证码',
    isBinded: '已绑定',
    resetOtp: '重置OTP',
    resetOtpConfirm: '确定重置此账号的OTP ?',
    plzBindOtp: '请先绑定OTP'
  },
  userProfile: {
    username: '用户账号',
    roleName: '角色名称',
    lastLoginIp: '最后登录IP',
    lastLoginTime: '最后登录时间',
    resetPassword: '重置密码',
    password: '用户密码',
    nickname: '用户昵称',
    changeNickname: '修改昵称'
  },
  tips: {
    default: '预设'
  },
  connectStatusOptions: {
    good: '良好',
    error: '异常',
    timeout: '超时'
  },
  httpLog: {
    log: '日志',
    orderId: '订单号',
    submitRequest: '下单请求',
    submitResponse: '下单响应',
    submitTime: '下单时间',
    queryRequest: '查单请求',
    queryResponse: '查单响应',
    queryTime: '最新查单时间',
    callbackRequest: '回调接收内容',
    callbackTime: '回调接收时间'
  }
}
