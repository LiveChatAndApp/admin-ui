import i18n from '@/lang'
import {
  AccountChannelType,
  AccountChannelTypeGroup,
  AccountStatus,
  BankCardStatus,
  BankCardType,
  CatchMode,
  DialogType,
  FoundToCofferType,
  NotifyStatus,
  PayOrderStatus,
  RiskStatus,
  SecurityType,
  SettlementClosingDay,
  UserLevel,
  WithdrawOrderStatus,
  DayStatus,
  ServiceFeeType,
  ConnStatus,
  MemberBalanceTypeStatus,
  AuthIdStatus,
  ChatTypeStatus,
  MessageTypeStatus,
  ChannelOrderStatus,
  RechargeOrderStatus,
  ChatStatus
} from '@/definitions/constants'

export const DialogTypeOptions = [
  { id: DialogType.Create, name: i18n.t('dialog.create') },
  { id: DialogType.Update, name: i18n.t('dialog.update') }
]

export const StatusOptions = [
  { id: 0, name: i18n.t('status.disabled'), color: 'danger' },
  { id: 1, name: i18n.t('status.enabled'), color: 'success' }
]

export const IsBackendLoginOptions = [
  { id: 0, name: i18n.t('status.disabled'), color: 'danger' },
  { id: 1, name: i18n.t('status.enabled'), color: 'success' }
]

export const NetworkOptions = [
  { id: 0, name: 'ETH' }
]

export const UserListstatusOptions = [
  { id: 0, name: i18n.t('status.disabled'), color: 'danger' },
  { id: 1, name: i18n.t('status.enabled'), color: 'success' },
  { id: 2, name: i18n.t('status.cancellation'), color: 'success' }
]

export const RuleStatusOptions = [
  { id: 0, name: i18n.t('LoginStatus.inhibit'), color: 'success' },
  { id: 1, name: i18n.t('LoginStatus.allow'), color: 'success' }
]

// 管理员, 1:普通用戶 2:管理員
export const AccountTypeOptions = [
  { id: 1, name: i18n.t('userList.notAdmin'), color: 'info', hex: '#FF0000' },
  { id: 2, name: i18n.t('userList.isAdmin'), color: 'success' }
]

export const ReviewStatusOptions = [
  { id: 0, name: i18n.t('status.pending'), color: '#0066FF' },
  { id: 1, name: i18n.t('status.checking'), color: '#0066FF' },
  { id: 2, name: i18n.t('status.successed'), color: 'success' },
  { id: 3, name: i18n.t('status.failed'), color: 'danger' }
]

export const DefaultMemberTypeOptions = [
  { id: 2, name: i18n.t('inviteCode.inviteCode') },
  { id: 1, name: i18n.t('defaultFriends.allRegistrants') }
]

export const GenderOptions = [
  { id: '1', name: i18n.t('gender.secret') },
  { id: '2', name: i18n.t('gender.man') },
  { id: '3', name: i18n.t('gender.woman') }
]

export const GroupMemberTypeOptions = [
  { id: 1, name: i18n.t('groupList.member') },
  { id: 2, name: i18n.t('groupList.admin') },
  { id: 3, name: i18n.t('groupList.groupAdmin') }
]

export const UserLevelOptions = [
  { id: UserLevel.SuperAdmin, name: i18n.t('userLevel.superAdmin') },
  { id: UserLevel.NormalAdmin, name: i18n.t('userLevel.normalAdmin') }
  // { id: UserLevel.BrandAdmin, name: i18n.t('userLevel.brandAdmin') },
  // { id: UserLevel.GeneralAgent, name: i18n.t('userLevel.generalAgent') }
]
export const AccountSettlementOptions = [
  { id: 0, name: 'D0', selectable: true },
  { id: 1, name: 'D1', selectable: true }
]
export const AccountStatusOptions = [
  { id: AccountStatus.Disabled, name: i18n.t('accountStatus.disabled'), color: 'danger', selectable: true, simple: false },
  { id: AccountStatus.Enabled, name: i18n.t('accountStatus.enabled'), color: 'success', selectable: true, simple: true },
  { id: AccountStatus.ReachedLimit, name: i18n.t('accountStatus.reachedLimit'), color: 'warning', selectable: true, simple: false },
  {
    id: AccountStatus.UnderRiskControl,
    name: i18n.t('accountStatus.underRiskControl'),
    color: 'warning',
    selectable: true,
    simple: false
  },
  { id: AccountStatus.Suspended, name: i18n.t('accountStatus.suspended'), color: 'warning', selectable: true, simple: true },
  { id: AccountStatus.Cooling, name: i18n.t('accountStatus.cooling'), color: 'warning', selectable: true, simple: false },
  { id: AccountStatus.CoolingAmount, name: i18n.t('accountStatus.coolingAmount'), color: 'warning', selectable: true, simple: false }
]

export const RiskStatusOptions = [
  { id: RiskStatus.LoggedOut, name: i18n.t('riskStatus.loggedOut'), color: 'danger' },
  { id: RiskStatus.LoggedIn, name: i18n.t('riskStatus.loggedIn'), color: 'success' },
  { id: RiskStatus.LoggingIn, name: i18n.t('riskStatus.loggingId') }
]

export const CatchModeOptions = [
  { id: CatchMode.WebBrowser, name: i18n.t('catchMode.webBrowser') },
  { id: CatchMode.Selenium, name: i18n.t('catchMode.selenium') }
]

export const BankCardStatusOptions = [
  { id: BankCardStatus.Enabled, name: i18n.t('accountStatus.enabled'), color: 'success', selectable: true },
  { id: BankCardStatus.ReachedLimit, name: i18n.t('accountStatus.reachedLimit'), color: 'warning', selectable: true },
  { id: BankCardStatus.Cooling, name: i18n.t('accountStatus.cooling'), color: 'warning', selectable: true },
  { id: BankCardStatus.CoolingAmount, name: i18n.t('accountStatus.coolingAmount'), color: 'warning' },
  {
    id: BankCardStatus.UnderRiskControl,
    name: i18n.t('accountStatus.underRiskControl'),
    color: 'warning',
    selectable: true
  },
  { id: BankCardStatus.Suspended, name: i18n.t('accountStatus.suspended'), color: 'warning', selectable: true },
  { id: BankCardStatus.Disabled, name: i18n.t('accountStatus.disabled'), color: 'danger', selectable: true }
]

export const BankCardTypeOptions = [
  { id: BankCardType.ReceiptCard, name: i18n.t('bankCard.types.receiptCard') },
  { id: BankCardType.TransferCard, name: i18n.t('bankCard.types.transferCard'), color: 'warning' },
  { id: BankCardType.SafeCard, name: i18n.t('bankCard.types.safeCard'), color: 'success' },
  { id: BankCardType.PaymentCard, name: i18n.t('bankCard.types.paymentCard'), color: 'danger' }
]

export const UsbTypeOptions = [{ id: 0, name: i18n.t('bankCard.usbTypes.tmp') }]

export const SettlementPercentageOptions = [
  { id: 0, name: '0%' },
  { id: 10, name: '10%' },
  { id: 20, name: '20%' },
  { id: 30, name: '30%' },
  { id: 40, name: '40%' },
  { id: 50, name: '50%' },
  { id: 60, name: '60%' },
  { id: 70, name: '70%' },
  { id: 80, name: '80%' },
  { id: 90, name: '90%' },
  { id: 100, name: '100%' }
]

export const SettlementClosingDayOptions = [
  { id: SettlementClosingDay.D0, name: 'D0' },
  { id: SettlementClosingDay.D1, name: 'D1' },
  { id: SettlementClosingDay.T0, name: 'T0' },
  { id: SettlementClosingDay.T1, name: 'T1' }
]

export const NotifyStatusOptions = [
  { id: NotifyStatus.Created, name: i18n.t('notifyStatus.created'), color: 'info', hex: '#AAAAAA' },
  { id: NotifyStatus.Notifying, name: i18n.t('notifyStatus.notifying'), hex: '#0066FF' },
  { id: NotifyStatus.Succeeded, name: i18n.t('notifyStatus.succeeded'), color: 'success', hex: '#339933' },
  { id: NotifyStatus.Failed, name: i18n.t('notifyStatus.failed'), color: 'danger', hex: '#FF0000' },
  { id: NotifyStatus.NotifyError, name: i18n.t('notifyStatus.notifyError'), color: 'danger', hex: '#FF0000' }
]

// export const NotifyStatusOptionsNew = [
//   { id: NotifyStatus.Created, name: i18n.t('notifyStatus.created'), color: '#FF0000' },
//   { id: NotifyStatus.Notifying, name: i18n.t('notifyStatus.notifying'), color: '#0066FF' },
//   { id: NotifyStatus.Succeeded, name: i18n.t('notifyStatus.succeeded'), color: '#339933' },
//   { id: NotifyStatus.Failed, name: i18n.t('notifyStatus.failed'), color: '#FF0000' }
// ]

export const AccountChannelTypeOptions = [
  { id: AccountChannelType.Pc, name: i18n.t('channelType.pc'), group: AccountChannelTypeGroup.Pc },
  { id: AccountChannelType.WapQr, name: i18n.t('channelType.wapQr'), group: AccountChannelTypeGroup.Pc },
  { id: AccountChannelType.FaceQr, name: i18n.t('channelType.faceQr'), group: AccountChannelTypeGroup.Pc },
  { id: AccountChannelType.Wap, name: i18n.t('channelType.wap'), group: AccountChannelTypeGroup.Wap },
  { id: AccountChannelType.Face, name: i18n.t('channelType.face'), group: AccountChannelTypeGroup.Wap },
  { id: AccountChannelType.Auth, name: i18n.t('channelType.auth'), group: AccountChannelTypeGroup.Wap }
]

export const MerchantBalanceLogReasonOptions = [
  { id: 0, name: i18n.t('merchantBalanceLog.reasons.payActualAmount'), color: 'success' },
  { id: 1, name: i18n.t('merchantBalanceLog.reasons.payDiscountAmount'), color: 'success' },
  { id: 2, name: i18n.t('merchantBalanceLog.reasons.payFee'), negative: true, color: 'success' },

  { id: 10, name: i18n.t('merchantBalanceLog.reasons.withdrawActualAmount'), negativeFreeze: true, color: 'success' },
  { id: 11, name: i18n.t('merchantBalanceLog.reasons.withdrawDiscountAmount'), negativeFreeze: true, color: 'success' },
  { id: 12, name: i18n.t('merchantBalanceLog.reasons.withdrawFee'), negativeFreeze: true, color: 'success' },
  {
    id: 15,
    name: i18n.t('merchantBalanceLog.reasons.revertWithdrawActualAmount'),
    negativeFreeze: true,
    color: 'danger'
  },
  {
    id: 16,
    name: i18n.t('merchantBalanceLog.reasons.revertWithdrawDiscountAmount'),
    negativeFreeze: true,
    color: 'danger'
  },
  { id: 17, name: i18n.t('merchantBalanceLog.reasons.revertWithdrawFee'), negativeFreeze: true, color: 'danger' },

  { id: 18, name: i18n.t('merchantBalanceLog.reasons.freezeWithdrawActualAmount'), negative: true, color: 'success' },
  { id: 19, name: i18n.t('merchantBalanceLog.reasons.freezeWithdrawDiscountAmount'), negative: true, color: 'success' },
  { id: 14, name: i18n.t('merchantBalanceLog.reasons.freezeWithdrawFee'), negative: true, color: 'success' },

  { id: 20, name: i18n.t('merchantBalanceLog.reasons.foundToMerchantAmount'), negative: true, color: 'success' },
  { id: 21, name: i18n.t('merchantBalanceLog.reasons.revertFoundToMerchantAmount'), color: 'danger' },
  { id: 22, name: i18n.t('merchantBalanceLog.reasons.foundToMerchantFee'), negative: true, color: 'success' },
  { id: 23, name: i18n.t('merchantBalanceLog.reasons.revertFoundToMerchantFee'), color: 'danger' },

  { id: 30, name: i18n.t('merchantBalanceLog.reasons.manuallyChangeAddBalance'), color: 'success' },
  { id: 31, name: i18n.t('merchantBalanceLog.reasons.manuallyChangeSubtractBalance'), negative: true, color: 'danger' }
]

export const MerchantBalanceLogReasonGroupOptions = [
  { id: 0, name: i18n.t('merchantBalanceLog.reasonsGroup.pay'), reasonIds: [0] },
  { id: 1, name: i18n.t('merchantBalanceLog.reasonsGroup.discount'), reasonIds: [1, 11, 19] },
  { id: 2, name: i18n.t('merchantBalanceLog.reasonsGroup.fee'), reasonIds: [2, 12, 14, 22] },
  { id: 3, name: i18n.t('merchantBalanceLog.reasonsGroup.withdraw'), reasonIds: [10, 18, 20] },
  { id: 4, name: i18n.t('merchantBalanceLog.reasonsGroup.revertWithdraw'), reasonIds: [15, 21] },
  { id: 5, name: i18n.t('merchantBalanceLog.reasonsGroup.revertDiscount'), reasonIds: [16] },
  { id: 6, name: i18n.t('merchantBalanceLog.reasonsGroup.revertFee'), reasonIds: [17, 23] },
  { id: 7, name: i18n.t('merchantBalanceLog.reasonsGroup.manuallyIncrease'), reasonIds: [30] },
  { id: 8, name: i18n.t('merchantBalanceLog.reasonsGroup.manuallyDecrease'), reasonIds: [31] },
  { id: 9, name: i18n.t('merchantBalanceLog.reasonsGroup.servicesfee'), reasonIds: [3] }
]

export const SecurityTypeOptions = [
  { id: SecurityType.CreateOrder, name: i18n.t('security.types.createOrder') },
  { id: SecurityType.UserLogin, name: i18n.t('security.types.userLogin') },
  { id: SecurityType.WithdrawCardNo, name: i18n.t('security.types.withdrawCardNo') }
]

// 提現-訂單狀態
export const WithdrawOrderStatusOptions = [
  {
    id: WithdrawOrderStatus.Processing,
    name: i18n.t('withdrawOrderList.orderStatus.pending'),
    color: 'success',
    hex: '#409EFF',
    simple: true
  },
  {
    id: WithdrawOrderStatus.Completed,
    name: i18n.t('withdrawOrderList.orderStatus.completed'),
    color: 'success',
    hex: '#339933',
    simple: true
  },
  {
    id: WithdrawOrderStatus.Reject,
    name: i18n.t('withdrawOrderList.orderStatus.reject'),
    color: 'danger',
    hex: '#FF0000',
    simple: true
  },
  {
    id: WithdrawOrderStatus.Cancel,
    name: i18n.t('withdrawOrderList.orderStatus.cancel'),
    color: 'danger',
    hex: '#FF0000',
    simple: false
  }
]

// 提現-訂單狀態
export const RechargeOrderStatusOptions = [
  {
    id: RechargeOrderStatus.Create,
    name: i18n.t('rechargeOrderList.orderStatus.create'),
    color: 'success',
    hex: '#409EFF',
    simple: true
  },
  {
    id: RechargeOrderStatus.Processing,
    name: i18n.t('rechargeOrderList.orderStatus.pending'),
    color: 'success',
    hex: '#409EFF',
    simple: true
  },
  {
    id: RechargeOrderStatus.Completed,
    name: i18n.t('rechargeOrderList.orderStatus.completed'),
    color: 'success',
    hex: '#339933',
    simple: true
  },
  {
    id: RechargeOrderStatus.Reject,
    name: i18n.t('rechargeOrderList.orderStatus.reject'),
    color: 'danger',
    hex: '#FF0000',
    simple: true
  },
  {
    id: RechargeOrderStatus.Cancel,
    name: i18n.t('rechargeOrderList.orderStatus.cancel'),
    color: 'danger',
    hex: '#FF0000',
    simple: false
  },
  {
    id: RechargeOrderStatus.Timeout,
    name: i18n.t('rechargeOrderList.orderStatus.timeout'),
    color: 'danger',
    hex: '#FF0000',
    simple: true
  }
]

// 提現、充值-渠道
export const ChannelOrderStatusOptions = [
  { id: ChannelOrderStatus.BankCard, name: i18n.t('channelOrderStatus.bankCard') },
  { id: ChannelOrderStatus.WeChant, name: i18n.t('channelOrderStatus.weChant') },
  { id: ChannelOrderStatus.AliPay, name: i18n.t('channelOrderStatus.aliPay') }
]

// export const PayOrderStatusOptions = [
//   { id: PayOrderStatus.Created, name: i18n.t('payOrderList.statusOptions.created'), simple: true },
//   { id: PayOrderStatus.NotYetOpenPage, name: i18n.t('payOrderList.statusOptions.notYetOpenPage'), redirect: 3, simple: true },
//   { id: PayOrderStatus.OpenedPage, name: i18n.t('payOrderList.statusOptions.openedPage'), redirect: 3 },
//   { id: PayOrderStatus.ScannedQrCode, name: i18n.t('payOrderList.statusOptions.scannedQrCode'), simple: true },
//   { id: PayOrderStatus.Paid, name: i18n.t('payOrderList.statusOptions.paid'), color: 'success', simple: true },
//   { id: PayOrderStatus.Completed, name: i18n.t('payOrderList.statusOptions.completed'), color: 'success', redirect: 4, simple: true },
//   {
//     id: PayOrderStatus.ClosedOnNotYetOpenPage,
//     name: i18n.t('payOrderList.statusOptions.closedOnNotYetOpenPage'),
//     color: 'info',
//     simple: true
//   },
//   {
//     id: PayOrderStatus.ClosedOnOpenPage,
//     name: i18n.t('payOrderList.statusOptions.closedOnOpenedPage'),
//     color: 'info',
//     redirect: 6
//   },
//   {
//     id: PayOrderStatus.ClosedOnScannedQrCode,
//     name: i18n.t('payOrderList.statusOptions.closedOnScannedQrCode'),
//     color: 'info',
//     redirect: 6
//   },
//   {
//     id: PayOrderStatus.ClosedOnCreate,
//     name: i18n.t('payOrderList.statusOptions.closedOnCreate'),
//     color: 'info',
//     simple: true
//   }
// ]

export const PayOrderStatusOptions = [
  {
    id: PayOrderStatus.Created,
    name: i18n.t('payOrderList.statusOptions.created'),
    simple: true,
    hex: '#CC6600'
  },
  {
    id: PayOrderStatus.NotYetOpenPage,
    name: i18n.t('payOrderList.statusOptions.notYetOpenPage'),
    redirect: 3,
    hex: '#0066FF'
  },
  { id: PayOrderStatus.OpenedPage, name: i18n.t('payOrderList.statusOptions.openedPage'), redirect: 3, hex: '#0066FF' },
  {
    id: PayOrderStatus.ScannedQrCode,
    name: i18n.t('payOrderList.statusOptions.scannedQrCode'),
    simple: true,
    hex: '#0066FF'
  },
  {
    id: PayOrderStatus.Paid,
    name: i18n.t('payOrderList.statusOptions.paid'),
    color: 'success',
    simple: true,
    hex: '#339933'
  },
  {
    id: PayOrderStatus.Completed,
    name: i18n.t('payOrderList.statusOptions.completed'),
    color: 'success',
    redirect: 4,
    simple: true,
    hex: '#339933'
  },
  {
    id: PayOrderStatus.ClosedOnNotYetOpenPage,
    name: i18n.t('payOrderList.statusOptions.closedOnNotYetOpenPage'),
    color: 'info',
    simple: false,
    hex: '#AAAAAA'
  },
  {
    id: PayOrderStatus.ClosedOnOpenPage,
    name: i18n.t('payOrderList.statusOptions.closedOnOpenedPage'),
    color: 'info',
    redirect: 6,
    hex: '#AAAAAA'
  },
  {
    id: PayOrderStatus.ClosedOnScannedQrCode,
    name: i18n.t('payOrderList.statusOptions.closedOnScannedQrCode'),
    color: 'info',
    redirect: 6,
    hex: '#AAAAAA'
  },
  {
    id: PayOrderStatus.ClosedOnCreate,
    name: i18n.t('payOrderList.statusOptions.closedOnCreate'),
    color: 'info',
    hex: '#FF0000'
  },
  {
    id: PayOrderStatus.Fail,
    name: i18n.t('payOrderList.statusOptions.closedOnCreate'),
    color: 'info',
    simple: true,
    hex: '#FF0000'
  }
]

// 新的色碼用
// export const PayOrderStatusOptionsNew = [
//   { id: PayOrderStatus.Created, name: i18n.t('payOrderList.statusOptions.created'), simple: true, color: '#CC6600' },
//   { id: PayOrderStatus.NotYetOpenPage, name: i18n.t('payOrderList.statusOptions.notYetOpenPage'), redirect: 3, color: '#0066FF' },
//   { id: PayOrderStatus.OpenedPage, name: i18n.t('payOrderList.statusOptions.openedPage'), redirect: 3, color: '#0066FF' },
//   { id: PayOrderStatus.ScannedQrCode, name: i18n.t('payOrderList.statusOptions.scannedQrCode'), color: '#0066FF', simple: true },
//   { id: PayOrderStatus.Paid, name: i18n.t('payOrderList.statusOptions.paid'), color: '#0066FF', simple: true },
//   { id: PayOrderStatus.Completed, name: i18n.t('payOrderList.statusOptions.completed'), color: '#339933', redirect: 4, simple: true },
//   {
//     id: PayOrderStatus.ClosedOnNotYetOpenPage,
//     name: i18n.t('payOrderList.statusOptions.closedOnNotYetOpenPage'),
//     color: '#000000',
//     simple: true
//   },
//   {
//     id: PayOrderStatus.ClosedOnOpenPage,
//     name: i18n.t('payOrderList.statusOptions.closedOnOpenedPage'),
//     color: '#000000',
//     redirect: 6
//   },
//   {
//     id: PayOrderStatus.ClosedOnScannedQrCode,
//     name: i18n.t('payOrderList.statusOptions.closedOnScannedQrCode'),
//     color: '#000000',
//     redirect: 6
//   },
//   {
//     id: PayOrderStatus.ClosedOnCreate,
//     name: i18n.t('payOrderList.statusOptions.closedOnCreate'),
//     color: '#FF0000'
//   },
//   {
//     id: PayOrderStatus.Fail,
//     name: i18n.t('payOrderList.statusOptions.closedOnCreate'),
//     color: '#FF0000',
//     simple: true
//   }
// ]

export const PayOrderCheckPaidProcessOptions = [
  { id: 0, name: i18n.t('payOrderList.checkPaidProcessOptions.fromNotify') },
  { id: 1, name: i18n.t('payOrderList.checkPaidProcessOptions.manuallyRefresh') }
]

export const WyOrderStatusOptions = [
  { id: 0, name: i18n.t('wyOrderList.statusOptions.paying'), color: 'info' },
  { id: 1, name: i18n.t('wyOrderList.statusOptions.paid'), color: 'success' }
]

export const WyOrderMatchedOptions = [
  { id: 0, name: i18n.t('wyOrderList.matchedOptions.unmatched'), color: 'info' },
  { id: 1, name: i18n.t('wyOrderList.matchedOptions.matched'), color: 'success' }
]

export const BankCardOrderMatchedOptions = [
  { id: 0, name: i18n.t('bankCardOrderList.matchedOptions.unmatched'), color: 'info' },
  { id: 1, name: i18n.t('bankCardOrderList.matchedOptions.matchedManually'), color: 'success' },
  { id: 2, name: i18n.t('bankCardOrderList.matchedOptions.matched'), color: 'success' }
]

export const BankCardOrderTransferTypeOptions = [
  { id: 0, name: i18n.t('bankCardOrderList.transferTypeOptions.internetBanking') }
]

export const FoundToCofferTypeOptions = [
  { id: FoundToCofferType.AlipayToAlipay, name: i18n.t('foundToCofferOrder.types.alipayToAlipay') },
  {
    id: FoundToCofferType.AlipayToBankCard,
    name: i18n.t('foundToCofferOrder.types.alipayToBankCard'),
    color: 'warning'
  }
]

export function findOptionById(options, id) {
  return options.find(option => option.id === id)
}

export function findSettlementClosingName(id) {
  return SettlementClosingDayOptions.find(settlementClosingDay => settlementClosingDay.id === id).name
}

// 週一～週日
export const DayOptions = [
  { id: DayStatus.Sun, name: i18n.t('week.Sun') },
  { id: DayStatus.Mon, name: i18n.t('week.Mon') },
  { id: DayStatus.Tue, name: i18n.t('week.Tue') },
  { id: DayStatus.Wed, name: i18n.t('week.Wed') },
  { id: DayStatus.Thu, name: i18n.t('week.Thu') },
  { id: DayStatus.Fri, name: i18n.t('week.Fri') },
  { id: DayStatus.Sat, name: i18n.t('week.Sat') }
]

// 代付手续费:['从余额扣除手续费', '从出款金额扣除手续费']
export const ServiceFeeTypeOptions = [
  { id: ServiceFeeType.TypeA, name: i18n.t('withdrawChannelList.serviceFeeTypeA') },
  { id: ServiceFeeType.TypeB, name: i18n.t('withdrawChannelList.serviceFeeTypeB') }
]

// refresh time 5秒, 10秒, 30秒, 60秒, 120秒, 300秒
export const RefreshTimeOptions = [
  { id: 5, name: '5s' },
  { id: 10, name: '10s' },
  { id: 30, name: '30s' },
  { id: 60, name: '60s' },
  { id: 120, name: '120s' },
  { id: 300, name: '300s' }
]

export const BlackWhiteOptions = [
  { id: 'W', name: i18n.t('blackWhiteList.whiteList') },
  { id: 'B', name: i18n.t('blackWhiteList.blackList') }
]

// 连线状态
// export const ConnectOptions = [
//   { id: 0, name: i18n.t('accountList.statusOptions.good'), color: 'success' },
//   { id: 1, name: i18n.t('accountList.statusOptions.error'), color: 'danger' },
//   { id: 2, name: i18n.t('accountList.statusOptions.overtime'), color: 'danger' }
// ]

// 连线状态
export const ConnectStatusOptions = [
  { id: ConnStatus.Good, name: i18n.t('connectStatusOptions.good'), color: 'success' },
  { id: ConnStatus.Timeout, name: i18n.t('connectStatusOptions.timeout'), color: 'danger' },
  { id: ConnStatus.Error, name: i18n.t('connectStatusOptions.error'), color: 'danger' }
]

// 資金明細 - 帳單類型
export const MemberBalanceTypeOptions = [
  { id: MemberBalanceTypeStatus.ManualRecharge, name: i18n.t('memberBalanceTypeOptions.manualRecharge'), simple: true },
  { id: MemberBalanceTypeStatus.ManualWithdraw, name: i18n.t('memberBalanceTypeOptions.manualWithdraw'), simple: true },
  { id: MemberBalanceTypeStatus.Recharge, name: i18n.t('memberBalanceTypeOptions.recharge'), simple: true },
  { id: MemberBalanceTypeStatus.Withdraw, name: i18n.t('memberBalanceTypeOptions.withdraw'), simple: true },
  { id: MemberBalanceTypeStatus.Transfer, name: i18n.t('memberBalanceTypeOptions.transfer'), simple: true },
  { id: MemberBalanceTypeStatus.RedEnvelopeSend, name: i18n.t('memberBalanceTypeOptions.redEnvelopeSend') },
  { id: MemberBalanceTypeStatus.RedEnvelopeReceive, name: i18n.t('memberBalanceTypeOptions.redEnvelopeReceive') },
  { id: MemberBalanceTypeStatus.RedEnvelopeRefund, name: i18n.t('memberBalanceTypeOptions.redEnvelopeRefund') },
  { id: MemberBalanceTypeStatus.CheckInReward, name: i18n.t('memberBalanceTypeOptions.checkInReward'), simple: true },
  { id: MemberBalanceTypeStatus.WithdrawRefused, name: i18n.t('memberBalanceTypeOptions.withdrawRefused'), simple: true },
  { id: MemberBalanceTypeStatus.ApplyWithdraw, name: i18n.t('memberBalanceTypeOptions.applyWithdraw'), simple: true }
]

// 操作行为選單
export const AuthIdOptions = [
  { id: AuthIdStatus.Login, name: i18n.t('authIdOptions.login') },
  { id: AuthIdStatus.LoginFail, name: i18n.t('authIdOptions.loginFail') },
  { id: AuthIdStatus.Logout, name: i18n.t('authIdOptions.logout') }
]

// 消息类型
export const MessageTypeOptions = [
  { id: MessageTypeStatus.Content, name: i18n.t('messageTypeStatus.content') },
  { id: MessageTypeStatus.Voice, name: i18n.t('messageTypeStatus.voice') },
  { id: MessageTypeStatus.Image, name: i18n.t('messageTypeStatus.image') },
  { id: MessageTypeStatus.Doc, name: i18n.t('messageTypeStatus.doc') },
  { id: MessageTypeStatus.Video, name: i18n.t('messageTypeStatus.video') },
  { id: MessageTypeStatus.Group, name: i18n.t('messageTypeStatus.group') },
  { id: MessageTypeStatus.GroupAdd, name: i18n.t('messageTypeStatus.groupAdd') },
  { id: MessageTypeStatus.Other, name: i18n.t('messageTypeStatus.other') }
]

// 会话类型
export const ChatTypeOptions = [
  { id: ChatTypeStatus.Single, name: i18n.t('chatTypeStatus.single') },
  { id: ChatTypeStatus.Group, name: i18n.t('chatTypeStatus.group') },
  { id: ChatTypeStatus.Chatroom, name: i18n.t('chatTypeStatus.chatroom') },
  { id: ChatTypeStatus.Channel, name: i18n.t('chatTypeStatus.channel') }
]

// 禁言类型(表格)
export const MuteOptions = [
  { id: 0, name: i18n.t('groupList.allowChat'), color: 'success' },
  { id: 1, name: i18n.t('groupList.muteNormal'), color: 'danger' },
  { id: 2, name: i18n.t('groupList.muted'), color: 'danger' }
]

// 禁言类型(下拉選單)
export const MuteSelectOptions = [
  { id: 0, name: i18n.t('groupList.allowChat'), color: 'success' },
  { id: 2, name: i18n.t('groupList.muted'), color: 'danger' }
]

// 会话类型
export const PrivateChatOptions = [
  { id: 0, name: i18n.t('groupList.prohibitPrivateChat'), color: 'danger' },
  { id: 1, name: i18n.t('groupList.allowPrivateChat'), color: 'success' }
]

// 群状态
export const GroupStatusOptions = [
  { id: 1, name: i18n.t('groupList.normal'), color: 'success' },
  { id: 2, name: i18n.t('groupList.disbanded'), color: 'info' }
]

// 群组类型
export const GroupTypeOptions = [
  { id: 1, name: i18n.t('groupList.normalType'), color: 'info' },
  { id: 2, name: i18n.t('groupList.broadcast'), color: 'success' }
]

// 黑名单 1:一般,2：拉黑
export const BlackedOptions = [
  { id: 1, name: i18n.t('userList.normalType'), color: 'info' },
  { id: 2, name: i18n.t('userList.block'), color: 'danger' }
]

export const ChatStatusOptions = [
  { id: ChatStatus.Destroy, name: i18n.t('chatStatus.destroy'), color: 'info' },
  { id: ChatStatus.Normal, name: i18n.t('chatStatus.normal'), color: 'success' }
]
