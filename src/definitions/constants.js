import i18n from '@/lang'

export const ActionType = {
  ADD: 'add',
  DELETE: 'del',
  UPDATE: 'update'
}

export const DialogType = {
  Create: 0,
  Update: 1
}

export const Status = {
  Disabled: 0,
  Enabled: 1
}

export const RadioType = {
  Default: '1',
  Second: '2'
}

export const ClearHistoryType = {
  All: '1',
  Hundred: '2',
  Custom: '3'
}

export const RechargeWithdrawType = {
  Recharge: 1,
  Withdraw: 2
}

export const MuteType = {
  Normal: 0, // 0:正常
  MuteMember: 1, // 1:禁言普通成员
  MuteAll: 2 // 2:禁言整个群
}

export const PrivateChatType = {
  Normal: 1, // 0:正常
  Prohibit: 0 // 1: 禁止
}

export const VerifyType = {
  NeedVerify: '1',
  Pass: '2'
}

// 改成只有兩種
export const UserLevel = {
  SuperAdmin: 1, // 超级管理员
  NormalAdmin: 2 // 普通管理员
  // BrandAdmin: 3,
  // GeneralAgent: 4
}

export const AccountStatus = {
  Disabled: 0,
  Enabled: 1,
  ReachedLimit: 2,
  UnderRiskControl: 3,
  Suspended: 4,
  Cooling: 5,
  CoolingAmount: 6
}

export const CatchMode = {
  WebBrowser: 0,
  Selenium: 1
}

export const BankCardStatus = {
  Disabled: 0,
  Enabled: 1,
  ReachedLimit: 2,
  UnderRiskControl: 3,
  Suspended: 4,
  Cooling: 5,
  CoolingAmount: 6
}

export const BankCardType = {
  ReceiptCard: 0,
  TransferCard: 1,
  SafeCard: 2,
  PaymentCard: 3
}

export const SettlementClosingDay = {
  D0: 0,
  D1: 1,
  T0: 2,
  T1: 3
}

export const NotifyStatus = {
  Created: 0,
  Notifying: 1,
  Succeeded: 2,
  Failed: 3,
  NotifyError: 4
}

export const RiskStatus = {
  LoggedOut: 0,
  LoggedIn: 1,
  LoggingIn: 2
}

export const AccountChannelTypeGroup = {
  Pc: 'PC',
  Wap: 'WAP'
}

export const AccountChannelType = {
  Pc: '_PC',
  WapQr: 'WAP_QR',
  FaceQr: 'FACE_QR',
  Wap: '_WAP',
  Face: 'FACE',
  Auth: 'AUTH'
}

export const ChannelCodeWithoutAccount = {
  Withdraw: 'WITHDRAW'
}

export const ChannelCode = {
  AliPay: 'ALIPAY',
  WeChant: 'WECHAT',
  PddAliPay: 'PDD_ALIPAY',
  PddWeChat: 'PDD_WECHAT',
  BankGate: 'BANKGATE',
  BankCard: 'BANKCARD',
  Withdraw: 'WITHDRAW'
}

export const AccountCode = {
  AliPay: {
    AliPayEnterprise: 'ALIPAY_ENTERPRISE',
    Pdd: 'PDD',
    Kuaijie: 'KUAIJIE',
    Lepay: 'LEPAY'
  },
  WeChant: {
    Pdd: 'PDD',
    Kuaijie: 'KUAIJIE'
  },
  PddAliPay: {
    ZifuPdd: 'ZIFU_PDD'
  },
  PddWeChat: {
    ZifuPdd: 'ZIFU_PDD'
  },
  BankGate: {
    WyPay: 'WYPAY'
  },
  BankCard: {
    Inner: 'INNER'
  }
}

export const AccountCodeList = [
  { channelCode: ChannelCode.AliPay, accountCode: AccountCode.AliPay.AliPayEnterprise },
  { channelCode: ChannelCode.AliPay, accountCode: AccountCode.AliPay.Pdd },
  { channelCode: ChannelCode.AliPay, accountCode: AccountCode.AliPay.Kuaijie },
  { channelCode: ChannelCode.AliPay, accountCode: AccountCode.AliPay.Lepay },
  { channelCode: ChannelCode.WeChant, accountCode: AccountCode.WeChant.Pdd },
  { channelCode: ChannelCode.WeChant, accountCode: AccountCode.WeChant.Kuaijie },
  { channelCode: ChannelCode.PddAliPay, accountCode: AccountCode.PddAliPay.ZifuPdd },
  { channelCode: ChannelCode.PddWeChat, accountCode: AccountCode.PddWeChat.ZifuPdd },
  { channelCode: ChannelCode.BankGate, accountCode: AccountCode.BankGate.WyPay },
  { channelCode: ChannelCode.BankCard, accountCode: AccountCode.BankCard.Inner }
]

export const FoundToCofferType = {
  AlipayToAlipay: 0,
  AlipayToBankCard: 1
}

export const WithdrawChannelUrlType = {
  CreateOrder: 0,
  GetOrder: 1,
  GetBalance: 2
}

export const SecurityType = {
  CreateOrder: 0,
  UserLogin: 1,
  WithdrawCardNo: 2
}

export const RiskConfigType = {
  Money: 0,
  Number: 1,
  Percentage: 2,
  Json: 3
}

export const PayOrderStatus = {
  Created: 0,
  NotYetOpenPage: 1,
  OpenedPage: 2,
  ScannedQrCode: 3,
  Paid: 4,
  Completed: 5,
  ClosedOnNotYetOpenPage: 6,
  ClosedOnOpenPage: 7,
  ClosedOnScannedQrCode: 8,
  ClosedOnCreate: 9,
  Fail: 13
}

// 提現-訂單狀態
export const WithdrawOrderStatus = {
  Processing: 1,
  Completed: 2,
  Reject: 3,
  Cancel: 4
}

// 充值-訂單狀態
export const RechargeOrderStatus = {
  Create: 0,
  Processing: 1,
  Completed: 2,
  Reject: 3,
  Cancel: 4,
  Timeout: 5
}

// 提現、充值渠道
export const ChannelOrderStatus = {
  BankCard: 1,
  WeChant: 2,
  AliPay: 3
}

export const FoundToMerchantOrderStatus = {
  Created: 0,
  Finished: 1,
  Canceled: 2
}

export const RiskConfig = [
  {
    key: 'ALIPAY_COOLING_AMOUNT',
    name: i18n.t('riskConfig.keys.alipayCoolingAmount'),
    type: RiskConfigType.Money
  },
  {
    key: 'ACCOUNT_SELECTING_TODAY_LEAST_AMOUNT',
    name: i18n.t('riskConfig.keys.accountSelectingTodayLeastAmount'),
    type: RiskConfigType.Number
  },
  {
    key: 'ORDER_SUCCESS_RATE',
    name: i18n.t('riskConfig.keys.orderSuccessRate'),
    type: RiskConfigType.Percentage
  },
  {
    key: 'PAID_SUCCESS_RATE',
    name: i18n.t('riskConfig.keys.paidSuccessRate'),
    type: RiskConfigType.Percentage
  },
  {
    key: 'BANKGATE_WYPAY',
    name: i18n.t('riskConfig.keys.bankGateWyPay'),
    type: RiskConfigType.Json
  },
  {
    key: 'ALIPAY_CLIENT_IP_VERIFICATION',
    name: i18n.t('riskConfig.keys.clientIpVerification'),
    type: RiskConfigType.Number
  },
  {
    key: 'BAN_REQUEST_IP_DIFFERENT_FROM_CLIENT_IP',
    name: i18n.t('riskConfig.keys.banRequestIpDifferentFromClientIp'),
    type: RiskConfigType.Number
  }
]

// im acl 參數
const ImAcl = {
  // 首頁
  MAIN_PAGE: 'MAIN_PAGE',
  // 用戶管理
  MEMBER_MANAGEMENT: 'MEMBER_MANAGEMENT',
  // 用户列表
  MEMBER_LIST: 'MEMBER_LIST',
  // 用户列表#查询
  MEMBER_PAGE: 'MEMBER_PAGE',
  // 用户列表#新增
  MEMBER_INSERT: 'MEMBER_INSERT',
  // 用户列表#批量新增
  MEMBER_INSERT_BATCH: 'MEMBER_INSERT_BATCH',
  // 用户列表#用户明细
  MEMBER_DETAIL: 'MEMBER_DETAIL',
  // 用户列表#编辑
  MEMBER_EDIT: 'MEMBER_EDIT',
  // 用户列表#清除登陆错误次数
  MEMBER_CLEAN_LOGIN_ERROR: 'MEMBER_CLEAN_LOGIN_ERROR',
  // 用户列表#批量管理允许管理号登入
  MEMBER_MANAGER_LOGIN_BATCH: 'MEMBER_MANAGER_LOGIN_BATCH',
  // 用户列表#批量管理允许建群
  MEMBER_MANAGER_ALLOW_GROUP_BATCH: 'MEMBER_MANAGER_ALLOW_GROUP_BATCH',
  // 用户列表#批量管理允许建群
  MEMBER_MANAGER_ALLOW_GROUP: 'MEMBER_MANAGER_ALLOW_GROUP',
  // 用户列表#聊天对象
  MEMBER_CHAT_MEMBER: 'MEMBER_CHAT_MEMBER',
  // 用户列表#发送消息
  MEMBER_SENT_MESSAGE: 'MEMBER_SENT_MESSAGE',
  // 用户列表#添加好友
  MEMBER_INSERT_FRIEND: 'MEMBER_INSERT_FRIEND',
  // 用户列表#向IM服务注册用户
  MEMBER_REGISTER_IM_MEMBER: 'MEMBER_REGISTER_IM_MEMBER',
  // 用户列表#清空聊天记录
  MEMBER_CLEAN_CHAT: 'MEMBER_CLEAN_CHAT',
  // 用户列表#删除好友
  MEMBER_DELETE_FRIEND: 'MEMBER_DELETE_FRIEND',

  //  邀请码
  INVITE_CODE_LIST: 'INVITE_CODE_LIST',
  // 邀请码#查询
  INVITE_CODE_PAGE: 'INVITE_CODE_PAGE',
  // 邀请码#新增
  INVITE_CODE_INSERT: 'INVITE_CODE_INSERT',
  // 邀请码#编辑
  INVITE_CODE_EDIT: 'INVITE_CODE_EDIT',
  // 邀请码#删除
  INVITE_CODE_DELETE: 'INVITE_CODE_DELETE',
  // 邀请码#查询预设好友
  INVITE_CODE_DEFAULT_MEMBER: 'INVITE_CODE_DEFAULT_MEMBER',
  // 邀请码#查询预设群
  INVITE_CODE_DEFAULT_GROUP: 'INVITE_CODE_DEFAULT_GROUP',

  // 默认好友
  DEFAULT_MEMBER: 'DEFAULT_MEMBER',
  // 默认好友
  DEFAULT_MEMBER_MANAGEMENT: 'DEFAULT_MEMBER_MANAGEMENT',
  // 默认好友#查询
  DEFAULT_MEMBER_PAGE: 'DEFAULT_MEMBER_PAGE',
  // 默认好友#新增
  DEFAULT_MEMBER_INSERT: 'DEFAULT_MEMBER_INSERT',
  // 默认好友#编辑
  DEFAULT_MEMBER_EDIT: 'DEFAULT_MEMBER_EDIT',
  // 默认好友#全部模式
  DEFAULT_MEMBER_ALL_MODE: 'DEFAULT_MEMBER_ALL_MODE',

  // 用户日志
  MEMBER_OPERATE_LOG: 'MEMBER_OPERATE_LOG',
  // 用户操作日誌#查询
  MEMBER_OPERATE_LOG_PAGE: 'MEMBER_OPERATE_LOG_PAGE',
  // 用户操作日誌#报表
  MEMBER_OPERATE_LOG_CSV: 'MEMBER_OPERATE_LOG_CSV',

  // 敏感词管理
  SENSITIVE_WORD_MANAGEMENT: 'SENSITIVE_WORD_MANAGEMENT',
  // 敏感词列表
  SENSITIVE_WORD_LIST: 'SENSITIVE_WORD_LIST',
  // 敏感词#查询
  SENSITIVE_WORD_PAGE: 'SENSITIVE_WORD_PAGE',
  // 敏感词#新增
  SENSITIVE_WORD_CREATE: 'SENSITIVE_WORD_CREATE',
  // 敏感词#删除
  SENSITIVE_WORD_DELETE: 'SENSITIVE_WORD_DELETE',

  // 敏感词命中
  SENSITIVE_WORD_HIT: 'SENSITIVE_WORD_HIT',
  // 敏感词命中#查询
  SENSITIVE_WORD_HIT_PAGE: 'SENSITIVE_WORD_HIT_PAGE',
  // 敏感词命中#删除
  SENSITIVE_WORD_HIT_DELETE: 'SENSITIVE_WORD_HIT_DELETE',
  // 敏感词命中#清空
  SENSITIVE_WORD_HIT_DELETE_ALL: 'SENSITIVE_WORD_HIT_DELETE_ALL',

  // 群组管理
  GROUP_MANAGEMENT: 'GROUP_MANAGEMENT',
  // 群组管理
  GROUP_LIST: 'GROUP_LIST',
  // 群组管理#查询
  GROUP_PAGE: 'GROUP_PAGE',
  // 群组管理#新增
  GROUP_INSERT: 'GROUP_INSERT',
  // 群组管理#编辑
  GROUP_EDIT: 'GROUP_EDIT',
  // 群组管理#解散
  GROUP_DISSOLVE: 'GROUP_DISSOLVE',
  // 群组管理#查询成员
  GROUP_MEMBER: 'GROUP_MEMBER',
  // 群组管理#查询可添加成员
  GROUP_OUTSIDE_MEMBER: 'GROUP_OUTSIDE_MEMBER',
  // 群组管理#添加成员
  GROUP_MEMBER_INSERT: 'GROUP_MEMBER_INSERT',
  // 群组管理#编辑成员身份
  GROUP_MEMBER_EDIT: 'GROUP_MEMBER_EDIT',
  // 群组管理#删除成员
  GROUP_MEMBER_DELETE: 'GROUP_MEMBER_DELETE',
  // 群组管理#禁言群组
  GROUP_MUTE: 'GROUP_MUTE',
  // 群组管理#私聊群组
  GROUP_PRIVATRE_CHAT: 'GROUP_PRIVATRE_CHAT',
  // 群组管理#添加群管理身分
  GROUP_ADD_MANAGER: 'GROUP_ADD_MANAGER',

  // 消息管理
  MESSAGE_MANAGEMENT: 'MESSAGE_MANAGEMENT',
  // 消息列表
  MESSAGE_LIST: 'MESSAGE_LIST',
  // 消息列表#查询
  MESSAGE_PAGE: 'MESSAGE_PAGE',
  // 消息列表#撤回消息
  MESSAGE_REVERT: 'MESSAGE_REVERT',
  // 广播消息
  BROADCAST_MESSAGE: 'BROADCAST_MESSAGE',
  // 群发消息
  GROUP_MESSAGE: 'GROUP_MESSAGE',
  // 机器人管理
  ROBOT_MANAGEMENT: 'ROBOT_MANAGEMENT',
  // 机器人列表
  ROBOT_LIST: 'ROBOT_LIST',

  // 聊天室管理
  CHATROOM_MANAGEMENT: 'CHATROOM_MANAGEMENT',
  // 聊天室列表
  CHATROOM_LIST: 'CHATROOM_LIST',
  // 聊天室#查询
  CHATROOM_PAGE: 'CHATROOM_PAGE',
  // 聊天室#创建
  CHATROOM_CREATE: 'CHATROOM_CREATE',
  // 聊天室#解散
  CHATROOM_DESTROY: 'CHATROOM_DESTROY',
  // 聊天室#在线用户
  CHATROOM_ONLINE_MEMBER: 'CHATROOM_ONLINE_MEMBER',
  // 聊天室#排序
  CHATROOM_UPDATE_SORT: 'CHATROOM_UPDATE_SORT',

  // 频道管理
  CHANNEL_MANAGEMENT: 'CHANNEL_MANAGEMENT',
  // 频道列表
  CHANNEL_LIST: 'CHANNEL_LIST',

  // 報表管理
  REPORT_MANAGEMENT: 'REPORT_MANAGEMENT',
  // 经营报表
  REPORT_LIST: 'REPORT_LIST',
  // 报表管理 - 列表
  REPORT_OPERATE: 'REPORT_OPERATE',
  // 报表管理 - 经营报告Excel
  REPORT_OPERATE_EXCEL: 'REPORT_OPERATE_EXCEL',

  // 财务管理
  FINANCIAL_MANAGEMENT: 'FINANCIAL_MANAGEMENT',
  // 资金明细
  MEMBER_BALANCE_LOG: 'MEMBER_BALANCE_LOG',
  // 资金明细#查询
  MEMBER_BALANCE_LOG_PAGE: 'MEMBER_BALANCE_LOG_PAGE',

  // 充值订单
  RECHARGE_ORDER: 'RECHARGE_ORDER',
  // 充值订单#查询
  RECHARGE_ORDER_PAGE: 'RECHARGE_ORDER_PAGE',
  // 充值订单#审核
  RECHARGE_ORDER_AUDIT: 'RECHARGE_ORDER_AUDIT',

  // 提现订单
  WITHDRAW_ORDER: 'WITHDRAW_ORDER',
  // 提现订单#查询
  WITHDRAW_ORDER_PAGE: 'WITHDRAW_ORDER_PAGE',
  // 提现订单#审核
  WITHDRAW_ORDER_AUDIT: 'WITHDRAW_ORDER_AUDIT',
  // 系统操作日誌#查询
  SYSTEM_OPERATE_LOG_PAGE: 'SYSTEM_OPERATE_LOG_PAGE',
  // 系统操作日誌#报表
  SYSTEM_OPERATE_LOG_CSV: 'SYSTEM_OPERATE_LOG_CSV',

  // 收款渠道
  RECHARGE_CHANNEL: 'RECHARGE_CHANNEL',
  // 收款渠道#查询
  RECHARGE_CHANNEL_PAGE: 'RECHARGE_CHANNEL_PAGE',
  // 收款渠道#添加
  RECHARGE_CHANNEL_ADD: 'RECHARGE_CHANNEL_ADD',
  // 收款渠道#編輯
  RECHARGE_CHANNEL_UPDATE: 'RECHARGE_CHANNEL_UPDATE',
  // 收款渠道#刪除
  RECHARGE_CHANNEL_DELETE: 'RECHARGE_CHANNEL_DELETE',

  // 后台管理
  CMS_MANAGEMENT: 'CMS_MANAGEMENT',

  // 菜单列表
  AUTH_LIST: 'AUTH_LIST',
  // 系统操作日誌
  SYSTEM_OPERATE_LOG: 'SYSTEM_OPERATE_LOG',
  // 账号#查询
  ADMIN_PAGE: 'ADMIN_PAGE',
  // 账号#新增
  ADMIN_INSERT: 'ADMIN_INSERT',
  // 账号#更新
  ADMIN_UPDATE: 'ADMIN_UPDATE',
  // 账号#重置密码
  ADMIN_RESETPWD: 'ADMIN_RESETPWD',
  // 账号#踢出下线
  ADMIN_KICKOUT: 'ADMIN_KICKOUT',

  // 角色列表
  ROLE_LIST: 'ROLE_LIST',
  // 角色#查询
  ROLE_PAGE: 'ROLE_PAGE',
  // 角色#新增
  ROLE_ADD: 'ROLE_ADD',
  // 角色#更新
  ROLE_UPDATE: 'ROLE_UPDATE',

  // 账号列表
  ADMIN_LIST: 'ADMIN_LIST',

  // 账号#资讯  (isLog: true)
  ADMIN_INFO: 'ADMIN_INFO',
  // 资讯
  VERSION_GET: 'VERSION_GET'
}

export const Permission = {
  // IM-ACL_LIST
  ...ImAcl
}

// 對應 db 設定參數
export const DayStatus = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6
}

// 對應 db 設定參數
export const ServiceFeeType = {
  TypeA: 0,
  TypeB: 1
}

// 連線狀態
export const ConnStatus = {
  Good: 'GOOD',
  Timeout: 'TIMEOUT',
  Error: 'ERROR'
}

// 資金明細 - 帳單類型
export const MemberBalanceTypeStatus = {
  ManualRecharge: 1,
  ManualWithdraw: 2,
  Recharge: 3,
  Withdraw: 4,
  Transfer: 5,
  RedEnvelopeSend: 6,
  RedEnvelopeReceive: 7,
  RedEnvelopeRefund: 8,
  CheckInReward: 9,
  WithdrawRefused: 10,
  ApplyWithdraw: 11
}

//  操作行为
export const AuthIdStatus = {
  Login: 1000,
  LoginFail: 1001,
  Logout: 1002
}

// 会话类型
export const ChatTypeStatus = {
  Single: 1,
  Group: 2,
  Chatroom: 3,
  Channel: 4
}

// 消息类型
export const MessageTypeStatus = {
  Content: 1,
  Voice: 2,
  Image: 3,
  Doc: 4,
  Video: 5,
  Group: 6,
  GroupAdd: 7,
  Other: 8
}

// 聊天室状态
export const ChatStatus = {
  Destroy: 0,
  Normal: 1
}

export const GenderType = {
  Secret: '1',
  Man: '2',
  Woman: '3'
}
