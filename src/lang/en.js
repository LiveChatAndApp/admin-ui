export default {
  route: {
    dashboard: 'Dashboard',

    merchant: 'Merchant',
    merchantList: 'Merchant',
    agentList: 'Agent',

    payChannel: 'Payment Channel',
    payChannelList: 'Payment Channel List',

    withdrawChannel: 'Withdraw Channel',

    payOrder: 'Payment Order',
    withdrawOrder: 'Withdraw Order',

    system: 'System',

    sensitiveWord: 'Sensitive Word',
    sensitiveWordList: 'Sensitive Word List',
    sensitiveWordHit: 'Sensitive Word Hit',

    group: 'Group',
    groupList: 'Group List',

    permission: 'Permission',
    role: 'Role List',
    acl: 'ACL List',
    log: 'Log list',
    adminInfo: 'Admin Info',
    merchantLog: 'Merchant Log list',
    merchantBalanceLog: 'Merchant Balance Log',
    bulletin: 'Bulletin',
    blackWhiteList: 'Black White List',
    whiteList: 'White List',

    channel: 'Channel',
    channelList: 'Channel List',
    accountList: 'Account List',
    accountGroupList: 'Channel Group List',
    accountAllocation: 'Account Group Allocation',
    bankCardList: 'Bank Card List',
    withdrawChannelList: 'Withdraw Channel List',
    receiptCardAccount: 'Deposit Bank Card List',
    withdrawChannelBankCodeList: 'Withdraw Bank List',
    withdrawBankCardBlackList: 'Withdraw Bank Card Black List',

    order: 'Order',
    payOrderList: 'Pay Order List',
    foundToMerchantOrder: 'Found Settlement',
    wyOrderList: 'WY Order',
    bankCardOrderList: 'Bank Card Order',

    report: 'Report',
    dailyReport: 'Operating Report',
    merchantReport: 'Merchant Report',
    agentReport: 'Agent Report',
    agentReportDetail: 'Agent Report Detail',
    redoReport: 'Redo Report',

    risk: 'Risk Management',
    accountBalance: 'Account Balance',
    accountReport: 'Account Report',
    riskMerchantReport: 'Merchant Quota',
    foundToCofferOrder: 'Found to Coffer Order',
    merchantChargeOrder: 'Merchant Charge Order',
    security: 'IP Management',
    riskConfig: 'Risk Config',
    riskWy: 'WY RiskPanel',
    merchantUser: 'Merchant User',
    bannedIp: 'Banned IP',
    payPage: 'Pay Page',
    orderTrace: 'Order Trace',

    user: 'User',
    userList: 'User List',
    inviteCode: 'Invite Code',
    defaultFriends: 'Default Friends',
    memberOperateLog: 'Member Operate Log',
    fundingExchange: 'Funding Exchange',
    fundingDetail: 'Funding Details',
    adminList: 'Admin List',

    // 消息管理 - (消息列表)
    message: 'Message Management',
    messageList: 'Message List',
    // 聊天管理
    chatroom: 'Chatroom',
    chatroomList: 'Chatroom List',

    // 财务管理 - (充值订单、提现订单、资金明细)
    finance: 'Finance',
    rechargeOrderList: 'Recharge Order List',
    withdrawOrderList: 'Withdraw Order List',
    memberBalanceLog: 'Member Balance Log',
    rechargeChannelList: 'Recharge Channel List',

    // 後台管理 - (系統日誌、菜單列表)
    backend: 'Backend Management',
    operateLog: 'Operate Log',
    menu: 'Menu',
    backendUserList: 'Backend User List',
    userProfile: 'User Profile',

    profile: 'Profile',
    merchantProfile: 'Merchant Profile',

    version: 'Information',
    versionInfo: 'Version Information'
  },
  dropdown: {
    more: 'More'
  },
  rechargeChannelList: {
    id: 'Id',
    account: 'Account',
    paymentMethod: 'Payment Method',
    channelName: 'Channel Name',
    payChannelName: 'Channel Name',
    info: 'Info',
    realName: 'Name',
    bankName: 'Bank Name',
    bankAccount: 'BankAccount',
    qrCodeImage: 'QRCode Image',
    status: 'Status',
    placeholder: {
      memo: 'Memo (only visible in the backend)'
    },
    message: {
      delete: {
        title: 'Confirm',
        content: 'Do you want to delete?'
      }
    }
  },
  backendUserList: {
    nickname: 'Nickname',
    username: 'Username',
    loginTime: 'Last Login Time',
    updateTime: 'Last Update Time',
    loginIp: 'Last Login IP',
    resetPassword: 'Reset Password',
    changeNickname: 'Change Nickname',
    password: 'Password',
    role: 'Role',
    addSuccessTitle: 'User is added successfully',
    resetPasswordSuccessTitle: 'User has reset password successfully',
    passwordPlaceholder: 'If empty, system will randomly generate',
    emptyRoles: 'Please go to role list and add new role',
    userAccount: 'User Account',
    loginUrl: 'Login Url',
    loginUsername: 'Login User Name',
    loginPassword: '初始密码',
    phone: 'Phone',
    email: 'Email',
    chatMemberName: 'Chat Member Name',
    chatNickName: 'Chat Nick Name'
  },
  // 消息列表
  messageList: {
    content: 'Content',
    chatType: 'Chat Type',
    messageType: 'Message Type',
    account1: 'Account/Group ID',
    account2: 'Account/Group ID',
    senderAccount: 'Sender Account',
    senderNickname: 'Sender Nickname',
    receiverAccount: 'Receiver Account/Group ID',
    receiverNickname: 'Receiver Nickname/Group Name',
    revert: 'Revert',
    placeholder: {
      content: 'Please enter content'
    },
    message: {
      maxRangeDays: 'The time can not over 30 days',
      emptyDates: 'Time must be chosen',
      revert: {
        title: 'Confirm',
        content: 'Do yo want execute revert？'
      }
    }
  },
  // 会话类型
  chatTypeStatus: {
    single: 'Single',
    group: 'Group',
    chatroom: 'Chatroom',
    channel: 'Channel'
  },
  // 消息类型
  messageTypeStatus: {
    content: 'Content',
    voice: 'Voice',
    image: 'Image',
    doc: 'Doc',
    video: 'Video',
    group: 'Group',
    groupAdd: 'Group Add',
    other: 'Other'
  },
  // 聊天室管理
  chatroomList: {
    createChat: 'Create Chat',
    cid: 'Chat Id',
    chatAvatar: 'Chat Avatar',
    onlineCount: 'Online Count',
    chatName: 'Chat Name',
    status: 'Status',
    operate: 'Operate',
    moreInfo: 'More Info',
    checkOnline: 'Check Online Member',
    destroyChat: 'Destroy Chat',
    avatar: 'Avatar',
    username: 'Username',
    nickname: 'Nickname',
    gender: 'Gender',
    joinTime: 'Join Time',
    chatMember: 'Chat Member',
    sort: 'Sort',
    message: {
      destroy: {
        title: 'Confirm',
        content: 'Do you want destroy?'
      }
    }
  },
  chatStatus: {
    destroy: 'Destroy',
    normal: 'Normal'
  },
  // 系统日志
  operateLog: {
    authId: 'Auth Id',
    authName: 'Method Name',
    operate: 'Operate',
    creatorIp: 'Creator Ip',
    userName: 'User Name',
    aclOne: 'Method Name One',
    aclTwo: 'Method Name Two',
    aclThree: 'Method Name Three',
    before: 'Before',
    after: 'After',
    creatorLocation: 'Creator Location',
    message: {
      maxRangeDays: 'The time can not over 7 days',
      emptyDates: 'Operate time must be chosen',
      noDataToDownload: 'No data, unable to download'
    }
  },
  // 用户日志
  memberOperateLog: {
    authId: 'Auth Id',
    creatorIp: 'Creator Ip',
    memberName: 'Member Name',
    nickName: 'Nickname',
    operate: 'Operate',
    equipment: 'Equipment',
    uid: 'UID',
    userOperate: 'User Operate',
    creatorLocation: 'Creator Location',
    operateTime: 'Operate Time',
    phone: 'Phone',
    message: {
      maxRangeDays: 'The time can not over 7 days',
      emptyDates: 'Operate time must be chosen',
      noDataToDownload: 'No data, unable to download'
    }
  },
  // 操作行为選單
  authIdOptions: {
    login: 'Login',
    loginFail: 'Login Fail',
    logout: 'Logout'
  },
  // 资金明细
  memberBalanceLog: {
    userId: 'User Id',
    memberName: 'Member Name',
    type: 'Type',
    memberBalanceId: 'Member Balance Id',
    nickname: 'Nickname',
    currency: 'Currency',
    trade: 'Trade ',
    amount: 'Amount',
    beforeBalance: 'Before Balance',
    afterBalance: 'After Balance',
    beforeFreeze: 'Before Freeze',
    freezeAmount: 'Freeze Amount',
    afterFreeze: 'After Freeze',
    tradeTime: 'Trade Time'
  },
  // 资金明细-帳單類型
  memberBalanceTypeOptions: {
    manualRecharge: 'Manual Recharge',
    manualWithdraw: 'Manual Withdraw',
    recharge: 'Recharge',
    withdraw: 'Withdraw',
    transfer: 'Transfer',
    redEnvelopeSend: 'Red Envelope Send',
    redEnvelopeReceive: 'Red Envelope Receive',
    redEnvelopeRefund: 'Red Envelope Refund',
    checkInReward: 'CheckIn Reward',
    withdrawRefused: 'Withdraw Refused',
    applyWithdraw: 'Apply Withdraw'
  },
  confirmDialog: {
    warning: 'Warning',
    confirm: 'Confirm',
    cancel: 'Cancel',
    executionSucceeded: 'Execution Succeeded',
    executionFailed: 'Execution Failed',
    hint: 'Hint'
  },
  rules: {
    json: 'Must be json',
    required: 'Required field',
    id: 'ID must not contain special symbols',
    name: 'Name must not contain special symbols',
    nameLength: 'Name must be 2 to 20 characters',
    username: 'Username must not contain special symbols',
    usernameLength: 'Username must be 4 to 20 characters',
    passwordLength: 'Password must be 8 to 20 characters',
    password: 'Only allow english and number',
    amount: 'Must be a number',
    count: 'Must be a positive integer',
    minPayAmount: 'Should be less than max pay amount and day max pay amount',
    maxPayAmount: 'Should be more than min pay amount and less than day max pay amount',
    dayMaxPayAmount: 'Should be more than min pay amount and max pay amount',
    mobile: 'Must be a number',
    mobileLength: 'Mobile format is not correct',
    email: 'Email format is not correct',
    paymentCode: 'Only allow english and number and symbol -_.',
    paymentCodeLength: 'Payment code must be 4 to 15 characters',
    rate: 'Must be a number',
    url: 'Url format is not correct',
    accountGroupName: 'Must not contain special symbols',
    accountGroupName2: 'Channel group name must be 4 to 20 characters',
    accountGroupCodeLength: 'Channel code must be 4 to 20 characters',
    channelNameLength: 'Channel name must be 2 to 20 characters',
    cardNo: 'Card No. must be digits',
    bankCode: 'Bank code must not contain special symbols',
    bankAreaCode: 'Bank area code must be digits',
    ip: 'IP format is incorrect (must be only 1 IP)',
    ipList: 'IPs format are incorrect (separated by comma)',
    usbType: 'Usb Type must be digits',
    memo: 'Only allow chinese and english and number and symbol',
    memoLength: 'Memo name must be 1 to 50 characters',
    minAmountLength: 'Min amount must be 1 to 100,000,000',
    maxAmountLength: 'Max amount must be 1 to 100,000,000',
    minGTRMaxAmount: 'Min amount cannot greater than max amount',
    dayMaxAmountLength: 'Day limit amount must be 1 to 100,000,000',
    dayMaxAmountLength2: 'Day limit amount must be 1 to 100,000,000',
    dayMaxCountLength: 'Day limit count must be greater then 0',
    dayMaxCountLength2: 'Day limit count must be 1 to 100,000,000',
    dayMaxCountLength3: 'Day limit count must be 1 to 100,000,000',
    amountLength: 'Amount must be 1 to 1,000,000',
    accountNameLength: 'Name must be 2 to 20 characters',
    cardNoLength: 'Card No must be 16 to 19 characters',
    branchName: 'Branch Name must be 16 to 19 characters',
    bankProvince: 'Bank provice must be 16 to 19 characters',
    bankCity: 'City must be 16 to 19 characters',
    costRateLength: 'Cost rate must be 0 to 100',
    costFixedAmountLength: 'Cost fixed amount must be 0 to 100,000,000',
    // 不加上欄位
    noSpecialCharacters: 'Must not contain special symbols',
    noSpecialCharactersAndNum: 'Must not contain special symbols and Number',
    oneToTwentyLength: 'Must be 1 to 20 characters',
    oneToTenLength: 'Must be 1 to 10 characters',
    oneToTwelveLength: 'Must be 1 to 12 characters',
    oneToThirtyLength: 'Must be 1 to 30 characters',
    oneToOneHundredLength: 'Must be 1 to 100 characters',
    oneToFiftyLength: 'Must be 1 to 50 characters',
    twoToTenLength: 'Must be 2 to 10 characters',
    twoToTwelveLength: 'Must be 2 to 12 characters',
    twoToTwentyLength: 'Must be 2 to 20 characters',
    fourToTwentyLength: 'Must be 4 to 20 characters',
    fourToFifteenLength: 'Must be 4 to 15 characters',
    eightToTwentyLength: 'Must be 8 to 20 characters',
    sixToEightLength: 'Must be 6 to 8 characters',
    sixteenToNineteenLength: 'Must be 16 to 19 characters',
    twelveLengthEnNum: 'Must 12 characters with english/number',
    noChinese: 'Can not includes chinese',
    onlyEnAndNum: 'Only allow english and number',
    onlyEnAndNumAndSymbol: 'Only allow english and number and symbol',
    onlyZhEnNumSymbol: 'Only allow english and number and symbol -_.',
    onlyNumber: 'Must be a number',
    onlyEnglish: 'Must be a English',
    formatNotCorrect: 'Format is not correct',
    timeHHMM: 'Time must be 00:00 to 24:00',
    noSpace: 'Can not includes space',
    plzEnterIpUrl: 'Please Enter Ip or Url',
    emptyStartTime: 'Start Time must be chosen',
    accountOrPasswordErr: 'Account or password error',
    requiredField: 'Required field',
    aclistEmpty: 'Permission must be chosen one',
    headTailSpace: 'Head and tail cannot have space',
    oneToTenLengthWords: 'The Words Must be 1 to 10 words',
    oneToTwentyLengthWords: 'The Words Must be 1 to 20 words',
    fourToTwentyLengthWords: 'The Words Must be 4 to 20 words',
    greaterThanNumber: 'Must be greater than {num}',
    i18nTextV1: 'Can not contain with ~!@#$%^&*()_-+=|\:;"\'[]{}/<>,.?',
    noTwoSpaces: 'Can not enter the space consecutively',
    noEmptySpace: 'Can not be blank'
  },
  navbar: {
    logout: 'Logout'
  },
  login: {
    title: '管理系统',
    login: 'Login',
    username: 'Username',
    password: 'Password',
    checkcode: '驗證碼'
  },
  dialog: {
    create: 'Create',
    update: 'Update'
  },
  status: {
    status: 'Status',
    enabled: 'Enabled',
    disabled: 'Disabled',
    allStatus: 'Please choose',
    memoNotEmpty: 'Memo must not be blank',
    cancellation: 'Cancellation',
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
    disabled: 'Disabled',
    enabled: 'Enabled',
    reachedLimit: 'Reached Limit',
    underRiskControl: 'Under Risk Control',
    suspended: 'Suspended',
    cooling: 'Cooling',
    coolingAmount: 'Cooling Amount',
    changeMessage: 'Change status'
  },
  riskStatus: {
    riskStatus: 'Login Status',
    loggedOut: 'Logged-Out',
    loggedIn: 'Logged-In',
    loggingId: 'Logging-In'
  },
  catchMode: {
    title: 'Catch Mode',
    webBrowser: 'WebBrowser',
    selenium: 'Selenium'
  },
  notifyStatus: {
    created: 'None',
    notifying: 'Notifying',
    succeeded: 'Succeeded',
    failed: 'Failed',
    notifyError: 'Notify Error'
  },
  timestamp: {
    updateTime: 'Update Time',
    update: 'Update',
    updater: 'Updater',
    createTime: 'Create Time',
    create: 'Create',
    creator: 'Creator',
    time: 'Time'
  },
  dateTimePicker: {
    startTime: 'Start Time',
    endTime: 'End Time',
    rules: {
      range: 'End time must be later than start time'
    }
  },
  userLevel: {
    brandAdmin: 'Brand Admin',
    merchant: 'Merchant',
    nomalAdmin: 'Normal Admin',
    superAdmin: 'Admin',
    generalAgent: 'Brand Agent'
  },
  channelType: {
    channelType: 'Channel Type',
    pc: 'PC',
    wapQr: 'Wap (QrCode)',
    faceQr: 'Face (QrCode)',
    wap: 'WAP',
    face: 'Face',
    auth: 'Auth'
  },
  button: {
    systemBusy: 'System busy, please try again %d minutes later',
    refreshBalance: 'Refresh Balance',
    resetting: 'Restting',
    copy: 'Copy'
  },
  dashboard: {
    date: 'Date',
    activeMemberCount: 'Active Member Count',
    addMemberCount: 'New Member Count',
    memberGrandTotalCount: 'Member Grand Total Count',
    addGroupCount: 'New Group Count',
    groupGrandTotalCount: 'Group Grand Total Count',
    messageCount: 'Message Count',
    top10ActiveGroup: 'Top10 Active Group List',
    rank: 'Rank',
    memberName: 'Member Name',
    nickname: 'Nickname',
    count: 'Message Count',
    top10ActiveMember: 'Top10 Active Member List',
    groupId: 'Group Id',
    groupName: 'Group Name'
  },
  brand: {
    brand: 'brand',
    brandName: '品牌名稱'
  },
  role: {
    roleName: 'Role Name',
    level: 'User Level',
    acl: 'Permissions',
    viewAcl: 'View Permissions',
    createTitle: 'Create a role',
    updateTitle: 'Update the role',
    rules: {
      level: 'Level must be chosen one'
    }
  },
  channelList: {
    channelName: 'Channel Name',
    channelCode: 'Channel Code',
    settlement: 'Settlement',
    discountStatus: 'Discount Status',
    rules: {
      settlementSum: 'Percentage of a settlement sum must be 100%'
    }
  },
  payOrderList: {
    merchantUserId: 'Merchant User Id',
    orderId: 'Order ID',
    merchantOrderNo: 'Merchant Order No.',
    channelOrderNo: 'Channel Order No.',
    amount: 'Amount',
    actualAmount: 'Actual Amount',
    discountAmount: 'Discount Amount',
    channelName: 'Channel',
    instName: 'Beneficiary Bank',
    accountName: 'Account',
    transactionAmount: 'Transaction Amount',
    fee: 'Fee',
    createTime: 'Create Time',
    successTime: 'Success Time',
    status: 'Status',
    channelRemark: 'Error Message',
    notify: 'Notify',
    notifyStatus: 'Notify Status',
    applyDate: 'Apply',
    successDate: 'Success',
    notifyCount: 'Notify Count',
    lastNotifyTime: 'Last Notify Time',
    notifyReturnData: 'Notify Return Data',
    notifyUrl: 'Notify Url',
    buyerLogonId: 'Buyer Login ID',
    buyerUserId: 'Buyer User ID',
    buyerUserName: 'Buyer User Name',
    servicefee: 'Service Fee',
    channelNotifyUrl: 'Channel Notify Url',
    thirdVendor: 'Third Vendor',
    statusOptions: {
      created: 'Created',
      notYetOpenPage: 'Not Pay Yet',
      openedPage: 'Waiting For Paying',
      scannedQrCode: 'Paying',
      paid: 'Paid',
      completed: 'Completed',
      closedOnNotYetOpenPage: 'Closed',
      closedOnOpenedPage: 'Closed',
      closedOnScannedQrCode: 'Closed',
      closedOnCreate: 'Creating Failed'
    },
    checkPaidProcessOptions: {
      title: 'Confirmed Paid',
      fromNotify: 'From Notify',
      manuallyRefresh: 'Manually Refresh'
    },
    error: {
      dates: 'Apply time and success time can not be selected at the same time',
      maxRangeDays: 'The time can not over 90 days',
      emptyDates: 'Apply time and success time must be chosen one'
    },
    trade: {
      close: 'Trade is timeout and closed',
      success: 'Trade is successful',
      finish: 'Trade is finished, no refund',
      wait: 'Paying - User is paying',
      notExistNotOpen: 'Paying - User has not opened the page',
      notExistNotScan: 'Paying - User has not scanned the QR code'
    },
    refresh: {
      successMsg: 'Refresh succeeded, the order status has no changed yet',
      successMsgFrom: 'Refresh succeeded, the order status has changed from',
      successMsgTo: 'to',
      fail: 'Refresh Fail'
    }
  },
  withdrawOrderList: {
    orderCode: 'Order No',
    userId: 'User Id',
    memberName: 'User Account',
    nickName: 'Nickname',
    channel: 'Channel',
    accountInfo: 'Account Info',
    amount: 'Amount',
    currency: 'Currency',
    createTime: 'Create Time',
    completeTime: 'Complete Time',
    createDate: 'Create ',
    completeDate: 'Complete ',
    status: 'Status',
    showInfo: 'Show Info',
    approve: 'Approve',
    reject: 'Reject',
    bankCardNumber: 'Bank Card Number',
    name: 'Name',
    bankName: 'Bank Name',
    orderStatus: {
      pending: 'Pending',
      completed: 'Completed',
      reject: 'Reject',
      cancel: 'Cancel'
    },
    message: {
      approve: {
        title: 'Confirm',
        content: 'Do you agree?'
      },
      reject: {
        title: 'Confirm',
        content: 'Do you reject?'
      }
    }
  },
  channelOrderStatus: {
    bankCard: 'Bank Card',
    weChant: 'WeChant',
    aliPay: 'AliPay'
  },
  rechargeOrderList: {
    account: 'Account',
    realName: 'Name',
    bankAccount: 'Bank Account',
    orderCode: 'Order No',
    userId: 'User Id',
    memberName: 'User Account',
    nickName: 'Nickname',
    channel: 'Channel',
    payInfo: 'Pay Info',
    channelName: 'Channel Name',
    payImage: 'Pay Image',
    amount: 'Amount',
    currency: 'Currency',
    createTime: 'Create Time',
    completeTime: 'Complete Time',
    createDate: 'Create ',
    completeDate: 'Complete ',
    status: 'Status',
    showInfo: 'Show Info',
    approve: 'Approve',
    reject: 'Reject',
    bankCardNumber: 'Bank Card Number',
    name: 'Name',
    bankName: 'Bank Name',
    method: 'Recharge Method',
    verify: 'Verify',
    directDeposit: 'Direct Deposit',
    orderStatus: {
      create: 'Create',
      pending: 'Pending',
      completed: 'Completed',
      reject: 'Reject',
      cancel: 'Cancel',
      timeout: 'Over Time'
    },
    message: {
      approve: {
        title: 'Confirm',
        content: 'Do you agree?'
      },
      reject: {
        title: 'Confirm',
        content: 'Do you reject?'
      }
    }
  },
  foundToMerchantOrder: {
    orderId: 'Order ID',
    payeeCardName: 'Payee Card Name',
    bankCard: 'Bank Card',
    bankName: 'Bank Name',
    branchName: 'Branch Name',
    payeeCardNo: 'Payee Card No.',
    amount: 'Amount',
    fee: 'Fee',
    computeFee: 'Compute Fee',
    createTime: 'Apply Time',
    updateTime: 'Finish Time',
    operator: 'Operator',
    creator: 'Creator',
    statusOptions: {
      created: 'Processing',
      finished: 'Finished',
      canceled: 'Canceled'
    },
    rules: {
      amount: 'Amount + fee must not larger than the balance'
    }
  },
  merchantChargeOrder: {
    orderId: 'Order ID',
    amount: 'Charge Amount',
    reason: 'Reason',
    reasonPlaceholder: 'Please input reason',
    statusOptions: {
      created: 'Processing',
      finished: 'Finished',
      canceled: 'Canceled'
    }
  },
  wyOrderList: {
    orderNo: 'WY Order No',
    createTime: 'First Time',
    updateTime: 'Second Time',
    chargeTime: 'WY Order Create Time',
    chargeFailReason: 'WY Charge Fail Reason',
    statusOptions: {
      paying: 'Applied Deposit',
      paid: 'Deposit Succeeded'
    },
    matched: 'Matching Status',
    matchedOptions: {
      matched: 'Matched',
      unmatched: 'Unmatched'
    }
  },
  bankCardOrderList: {
    orderNo: 'Bank Card Order No',
    chargeTime: 'Bank Card Order Create Time',
    payeeCardNo: 'Transfer In Card No.',
    payerCardNo: 'Transfer Out Card No.',
    payerCardName: 'Transfer Out Account',
    payerBankName: 'Transfer Out Bank Name',
    transferType: 'Transfer Type',
    transferTypeOptions: {
      internetBanking: 'Internet Banking'
    },
    matchedOptions: {
      matched: 'Matched',
      matchedManually: 'Matched Manually',
      unmatched: 'Unmatched'
    }
  },
  accountList: {
    orderOriginationUrl: 'Create Order URL',
    orderQueryUrl: 'Get Order URL',
    balanceQueryUrl: 'Get Balance URL',
    vendorName: 'Vendor Name',
    thirdMerchantId: 'Third Merchant Id',
    thirdMerchantSign: 'Third Merchant Key',
    thirdMerchantName: 'Third Merchant Name',
    thirdPublicKey: 'Third Public Key',
    thirdPrivateKey: 'Third Private Key',
    payAmount: 'Pay Amount',
    singleFixedAmount: 'Pay Amount Default',
    dayMaxAmount: 'Day Max Amount',
    dayMaxCount: 'Day Max Count',
    param: 'Param',
    account: 'account',
    channel: 'Channel',
    catchId: 'Catch ID',
    catchPassword: 'Catch Password',
    accountName: 'Name',
    enableStatusTime: 'Enable Status Time',
    accountCode: 'Account Code',
    aliUid: 'Ali UID',
    appId: 'APPID',
    publicKey: 'Public Key',
    privateKey: 'Private Key',
    loginUsername: 'Login Username',
    loginPassword: 'Login Password',
    transactionPassword: 'Transaction Password',
    securityQuestion: 'Security Questions',
    question: 'Question',
    answer: 'Answer',
    mobile: 'Mobile',
    bootServer: 'Boot Server',
    cost: 'Cost',
    applicableAmount: 'Applicable Amount',
    pcType: 'PC Support',
    wapType: 'WAP Support',
    catalog: 'Catalog',
    minPayAmount: 'Min Pay Amount',
    maxPayAmount: 'Max Pay Amount',
    dayMaxPayAmount: 'Day Max Pay Amount',
    dayMaxPayCount: 'Day Max Pay Count',
    specifiedAmounts: 'Specified Amounts',
    bankCard: 'Bound Bank Card',
    gateway: 'Gateway',
    isGateUsed: 'Is Gate Used',
    addInBatch: 'Add in Batch',
    downloadAddInBatchTemplate: 'Download Template',
    testAccountForPc: 'Test Account for PC',
    testAccountForWap: 'Test Account for WAP',
    testAccountTitle: 'Created Order: ',
    testAccountContent: 'Please check the order in the Order List Page',
    defaultThirdUrl: 'The system will automatically use the default URL',
    thirdChannelCode: 'Third Channel Code',
    connectStatus: 'Connect Status',
    traceStatus: 'Trace Status',
    keyErr: {
      allEmpty: 'Chosen Public、Private Key or Third Merchant Sign',
      bothEmpty: 'Chosen Public、Private Key or Third Merchant Sign',
      publicKeyEmpty: 'Please Enter Public key',
      privateKeyEmpty: 'Please Enter private key'
    },
    rules: {
      typeEmpty: 'At least select one support',
      inclusive: 'Beside Face and Freeze, at least select one support',
      exclusive: 'Face and Freeze cannot be chosen at the same time',
      accountChannelListEmpty: 'At least add one channel',
      channelEmpty: 'Channel cannot be empty',
      dayMaxLargerThanMax: 'Day max amount cannot be less than max amount',
      minLargerThanMax: 'Max amount cannot be less than min amount',
      withdrawConfirmUrlEmpty: 'Confirm Url cannot be empty',
      rateNotNumber: 'Rate must be number',
      minMaxAmountNotNumber: 'Min/Max amount must be integer',
      singleFixedAmountNotNumber: 'Single Fixed Amount amount must be integer',
      singleFixedAmountNotBetween: 'Single Fixed Amount amount must between Min/Max amount',
      singleFixedAmountNotDuplicate: 'Single Fixed Amount amount must not duplicate',
      dayMaxAmountNotNumber: 'Day max amount must be integer',
      dayMaxCountNotNumber: 'Day max count must be integer',
      servicefeeNotNumber: 'Service Fee amount must be integer',
      settlementIdEmpty: 'Please select settlement',
      minAmountLength: 'Min amount must be 1 to 1,000,000',
      maxAmountLength: 'Max amount must be 1 to 1,000,000',
      minGTRMaxAmount: 'Min amount cannot greater than max amount',
      dayMaxAmountLength: 'Day limit amount must be 1 to 1,000,000',
      dayMaxCountLength: 'Day limit count must be 1 to 1000',
      duplicateChannel: 'can not select same channel',
      thirdChannelCodeEmpty: 'Third Channel Code Can not be empty',
      thirdChannelCodeSpace: 'Third Channel Code first and last text can not be space'
    },
    errors: {
      channelId: 'Channel must be selected'
    }
  },
  accountGroupList: {
    accountGroupName: 'Group Name',
    accountGroupName2: 'Channel Group Name',
    accountName: 'Account Name',
    accountGroupCode: 'Group Code',
    accountGroupCode2: 'Channel Group Code',
    accountCount: '# of Account （Enabled / All）',
    dayMaxPayAmount: 'Day Max Pay Amount',
    dayMaxPayCount: 'Day Max Pay Count',
    availableAmount: 'Available Amount',
    totalDayMaxAmount: 'Total Day Max Amount',
    totalTodayAmount: 'Total Today Amount',
    totalAvailableAmount: 'Total Available Amount',
    bankCardType: 'Card Type',
    bankCardMemo: 'Memo'
  },
  accountAllocation: {
    status: 'Merchant Status'
  },
  withdrawBankCardBlackList: {

  },
  withdrawChannelList: {
    withdrawChannel: 'Withdraw Channel',
    accountName: 'Withdraw Channel Name',
    catchId: 'Withdraw Channel Code',
    vendorName: 'Vendor Name',
    channelMerchantId: 'Channel Merchant ID',
    channelMerchantName: 'Channel Merchant Name',
    orderOriginationUrl: 'Create Order URL',
    orderQueryUrl: 'Get Order URL',
    balanceQueryUrl: 'Get Balance URL',
    thirdMerchantSign: 'Third Merchant Sign',
    cost: 'Cost',
    openTime: 'Open Time',
    balance: 'Balance',
    memo: 'Memo',
    refreshBalance: 'Refresh',
    createTestOrder: 'Create a Testing Order',
    bankProvince: 'Bank Province',
    bankCity: 'Bank City',
    testWithdrawChannel: 'Test Withdraw Channel',
    publicKey: 'Public Key',
    privateKey: 'Private Key',
    payAmount: 'Pay Amount',
    dayMaxAmount: 'Day Max Amount',
    dayMaxCount: 'Day Max Account',
    channelTime: 'Times',
    bank: 'Banks',
    serviceFeeType: ' Service Fee',
    serviceFeeTypeA: 'Fee From Balance',
    serviceFeeTypeB: 'Fee From Withdraw',
    openDay: 'Day',
    dayMaxPayAmount: 'Day Limit Amount',
    dayMaxPayCount: 'Day Limit Account',
    withdrawSetting: 'WithDraw Setting',
    preCatchBalance: 'Available balance',
    minAmount: 'Min Amount',
    maxAmount: 'Max Amount',
    resetting: 'Resetting',
    defaultThirdUrl: 'The system will automatically use the default URL',
    channelExtra: 'Additional configuration parameters',
    connectStatus: 'Connect Status',
    traceStatus: 'Trace Status',
    emptyBankChannelList: 'The bank list depend on vendor',
    emptyBalanceQueryUrl: 'The vendor does not provide to query balance url',
    keyErr: {
      allEmpty: 'Chosen Public、Private Key or Third Merchant Sign',
      bothEmpty: 'Chosen Public、Private Key or Third Merchant Sign',
      publicKeyEmpty: 'Please Enter Public key',
      privateKeyEmpty: 'Please Enter private key'
    }
  },
  withdrawChannelBankCodeList: {
    withdrawBank: 'Withdraw Bank',
    withdrawBankCode: 'Withdraw Bank Code'
  },
  bankCard: {
    add: 'Add Deposit Bank Card',
    manager: 'Deposit Bank Card Management',
    cardId: 'Card ID',
    bankName: 'Bank Name',
    payeeCardName: 'Payee Card Name',
    payeeCardNo: 'Payee Card No',
    bankArea: 'Bank Area',
    branchName: 'Branch Name',
    bankCardOrder: 'Deposit Bank Card Order',
    loginUsername: 'Bank Login Username',
    loginPassword: 'Bank Login Password',
    transactionPassword: 'Transaction Password',
    usbPassword: 'Usb Key',
    usbType: 'Usb Type',
    usbTypes: {
      tmp: 'Tmp'
    },
    postType: 'Post Type',
    type: 'Card Type',
    mobile: 'Mobile',
    types: {
      receiptCard: 'Receipt Card',
      transferCard: 'Transfer Card',
      safeCard: 'Safe Card',
      paymentCard: 'Payment Card'
    },
    isToBindAccount: 'Bind Account',
    accountName: 'Account Name',
    accountCatchId: 'Account CatchId',
    accountStatus: 'Account Status'
  },
  auth: {
    code: 'Auth Name',
    name: 'Auth Code',
    type: 'Auth Type'
  },
  admin: {
    username: 'Username',
    nickname: 'Nickname',
    role: 'Role',
    loginTime: 'Last Login Time',
    ip: 'Last Login IP',
    google: 'Google verify',
    operator: 'Operate',
    changeNickname: 'Change Nickname'
  },
  logList: {
    methodName: 'Method Name',
    request: 'Request Parameters',
    before: 'Before Update',
    after: 'After Update',
    merchantName: 'Merchant Name',
    creator: 'Creator',
    operatingTime: 'Operating Time',
    aclName: 'Acl Name',
    aclOne: 'Method Name One',
    aclTwo: 'Method Name Two',
    aclThree: 'Method Name Three',
    error: {
      maxRangeDays: 'The time can not over 90 days',
      dateRequire: 'Date Require'
    }
  },
  merchantBalanceLog: {
    orderId: 'Order Id',
    amount: 'Amount',
    beforeBalance: 'Before Balance',
    afterBalance: 'After Balance',
    beforeFreezeAmount: 'Before Frozen Amount',
    afterFreezeAmount: 'After Frozen Amount',
    reason: 'Type',
    memo: 'Reason',
    reasons: {
      payActualAmount: 'AliPay Actual Amount',
      payDiscountAmount: 'AliPay Discount Amount',
      payFee: 'AliPay Fee',

      withdrawActualAmount: 'Withdraw Actual Amount',
      withdrawDiscountAmount: 'Withdraw Discount Amount',
      withdrawFee: 'Withdraw Fee',
      revertWithdrawActualAmount: 'Revert Withdraw Actual Amount',
      revertWithdrawDiscountAmount: 'Revert Withdraw Discount Amount',
      revertWithdrawFee: 'Revert Withdraw Fee',

      freezeWithdrawActualAmount: 'Freeze Withdraw Actual Amount',
      freezeWithdrawDiscountAmount: 'Freeze Withdraw Discount Amount',
      freezeWithdrawFee: 'Freeze Withdraw Fee',

      foundToMerchantAmount: 'Fund to Merchant Amount',
      revertFoundToMerchantAmount: 'Revert Fund to Merchant Amount',
      foundToMerchantFee: 'Fund to Merchant Fee',
      revertFoundToMerchantFee: 'Revert Fund to Merchant Fee',

      manuallyChangeAddBalance: 'Manually Add Balance',
      manuallyChangeSubtractBalance: 'Manually Subtract Balance'
    },
    reasonsGroup: {
      pay: 'Pay',
      discount: 'Discount',
      fee: 'Fee',
      withdraw: 'Withdraw',
      revertWithdraw: 'Revert Withdraw',
      revertDiscount: 'Revert Discount',
      revertFee: 'Revert Fee',
      manuallyIncrease: 'Manually Increase',
      manuallyDecrease: 'Manually Decrease'
    }
  },
  bulletin: {
    content: 'Content'
  },
  security: {
    type: 'Type',
    ipList: 'IP List',
    ipListPlaceholder: 'IP list is separated by commas',
    cardNo: 'Card No.',
    cardholderName: 'Cardholder Name',
    types: {
      createOrder: 'Create Order - Whitelist',
      userLogin: 'User Login - Blacklist',
      withdrawCardNo: 'Withdraw Card No. - Blacklist'
    },
    help: {
      help: 'Help',
      createOrder: 'Create Order (Including Pay and Withdraw)\nType: Whitelist\nBy default, it blocks all IPs except the IPs are in the Whitelist.',
      userLogin: 'User Login\nType: Blacklist\nBy default, it allows all IPs passed except the IPs are in the Blacklist.',
      withdrawCardNo: 'Withdraw Card No.\nType: Blacklist\nWhen create a withdraw order, by default, it allows all card numbers except the numbers are in the Blacklist.'
    },
    errors: {
      type: 'Type must be selected'
    }
  },
  riskConfig: {
    key: 'Key',
    value: 'Value',
    keys: {
      alipayCoolingAmount: 'Alipay Cooling Amount',
      accountSelectingTodayLeastAmount: 'Account Selecting - Today Least Amount',
      orderSuccessRate: 'Order Success Rate',
      paidSuccessRate: 'Paid Success Rate',
      bankGateWyPay: 'Bank Gate Scheduler: WYPAY',
      clientIpVerification: 'Client IP Verification',
      banRequestIpDifferentFromClientIp: 'Ban Request IP Different From Client IP'
    }
  },
  riskWy: {
    login: 'Login',
    queryOrder: 'Query Order',
    queryBalance: 'refresh Balance',
    queryOrderSuccess: 'Successfully queried %d orders',
    queryBalanceSuccess: 'Successfully queried balance: %d'
  },
  merchantUser: {
    assignedAccountList: 'Currently Assigned Accounts',
    backupAssignedAccountList: 'Temporary Assigned Accounts',
    count: 'Count',
    amount: 'Total Amount'
  },
  payPage: {
    html: 'HTML',
    status: {
      unpaid: 'Unpaid',
      paid: 'paid',
      expired: 'Expired'
    }
  },
  orderTraceList: {
    userId: 'User ID',
    ip: 'IP',
    location: 'location'
  },
  settlement: {
    name: '結算方式',
    belong: '权归属',
    D0: 'd0',
    D1: 'd1'
  },
  accountBalance: {
    amount: 'Day Amount',
    count: 'Day Count',
    balance: 'Balance',
    frozenAmount: 'Frozen Amount',
    withdrawalCount: 'Withdraw Count',
    catchUpdateTime: 'Last Update Time'
  },
  foundToCofferOrder: {
    orderId: 'Order ID',
    accountFrom: 'Transfer Out',
    accountTo: 'Transfer In',
    amount: 'Amount',
    status: {
      created: 'Created',
      processing: 'Processing',
      succeeded: 'Succeeded',
      failed: 'Failed',
      declined: 'Declined'
    },
    type: 'Transfer Type',
    types: {
      alipayToAlipay: 'Alipay To Alipay',
      alipayToBankCard: 'Alipay To BankCard'
    },
    notBindBankCard: 'Not Bind Bank Card'
  },
  accountReport: {
    availableAmount: 'Available Amount',
    availableCount: 'Available Count',
    orderSuccessRate: 'Order Success Rate',
    paidSuccessRate: 'Paid Success Rate',
    totalPayAmount: 'Total Pay Amount',
    totalWithdrawAmount: 'Total Withdraw Amount',
    frozenAmount: 'FrozenAmount',
    dayMaxAmount: 'Day Max Amount',
    todayWithdrawAmount: 'Today Withdraw Amount',
    todayPayAmount: 'Today Pay Amount',
    dayMaxCount: 'Day Max Count',
    successCount: 'Success Count',
    orderTotalCount: 'Order Total Count',
    failedOrderCount: 'Failed Order Count',
    didNotOpenOrderCount: 'Didnt Open Order Count',
    didNotScanOrderCount: 'Didnt Scan Order Count',
    dayAvailableAmount: 'Day Available Amount',
    dayAvailableCount: 'Day Available Count',
    dayLimitCount: 'Day Limit Count',
    dayLimitAmount: 'Day Limit Amount',
    merchantName: 'Merchant Name',
    doingCount: 'Doing Count',
    closeCount: 'Close Count',
    error: {
      emptyDates: 'Start time and end time are required'
    }
  },
  merchantReport: {
    rules: {
      channelId: 'Please select channel'
    }
  },
  agentList: {
    agentId: 'Agent ID',
    agentName: 'Agent',
    parentAgentName: 'Parent',
    merchantCount: 'Merchant Count',
    rate: 'Rate',
    loginIp: 'Login IP',
    lastLoginTime: 'Last Login Time',
    addSuccessTitle: 'Agent is added successfully',
    balance: 'balance',
    freezebalace: 'freeze'
  },
  merchantList: {
    merchantId: 'Merchant ID',
    username: 'Merchant ID',
    merchant: 'Merchant Name',
    agent: 'Agent',
    status: 'Status',
    discountStatus: 'Discount Status',
    createTime: 'Create Time',
    channelRate: 'Channel Rate',
    balance: 'Balance',
    freezeAmount: 'Unable Balance',
    merchantStatus: 'Merchant Status',
    payAmount: 'Min/Max Amount',
    payAmountFrom: 'From',
    payAmountTo: 'To',
    dayMaxAmount: 'Day Limit Amount',
    dayMaxCount: 'Day Limit Count',
    mobile: 'Mobile',
    email: 'Email',
    adminAccount: 'Admin Account',
    managerAccount: 'Manager Account',
    adminPassword: 'Admin Account Password',
    managerPassword: 'Manager Account Password',
    managerNickname: 'Manager Nickname',
    requestKey: 'Request Key',
    responseKey: 'Response Key',
    rate: 'Rate',
    chargefee: '手续费',
    servicefee: '服务费',
    settlement: 'Settlement',
    addSuccessTitle: 'Merchant is added successfully',
    loginUrl: 'Login Url',
    loginUsername: 'Login Username',
    loginPassword: 'Login Password',
    regenerate: 'Re-Generate',
    rateFixedAmountPlaceholder: 'Fixed amount',
    nicknamePlaceholder: 'If empty, default will by merchantName',
    marchantIdPlaceholder: 'Must be 12 characters',
    isBackendLogin: 'Is Backend Login',
    updateIsBackendLogin: 'Update Is Backend Login',
    resetPassword: 'Reset Password',
    rules: {
      dayMaxLargerThanMax: 'Day max amount cannot be less than max amount',
      minLargerThanMax: 'Max amount cannot be less than min amount',
      withdrawConfirmUrlEmpty: 'Confirm Url cannot be empty',
      rateNotNumber: 'Rate must be number',
      minMaxAmountNotNumber: 'Min/Max amount must be integer',
      dayMaxAmountNotNumber: 'Day max amount must be integer',
      dayMaxCountNotNumber: 'Day max count must be integer',
      servicefeeNotNumber: 'Service Fee amount must be integer',
      channelEmpty: 'At least select one channel',
      settlementIdEmpty: 'Please select settlement',
      minAmountLength: 'Min amount must be 1 to 1,000,000',
      maxAmountLength: 'Max amount must be 1 to 1,000,000',
      minGTRMaxAmount: 'Min amount cannot greater than max amount',
      dayMaxAmountLength: 'Day limit amount must be 1 to 1,000,000',
      dayMaxCountLength: 'Day limit count must be 0 to 10'
    }
  },
  userList: {
    userId: 'User ID',
    nickname: 'Nickname',
    account: 'User Account',
    username: 'Username',
    password: 'Password',
    registrationIP: 'Registration IP',
    fromIp: 'From IP',
    addFriends: 'Add Friends',
    status: 'Login Status',
    permission: 'Add Group Permission',
    admin: 'Administrator',
    createTime: 'Create Time',
    updateTime: 'Update Time',
    loginErrorCount: 'Login Error Count',
    registration: 'Registration Time',
    userInfo: 'User Information',
    source: 'Registration Source',
    time: 'Time',
    fromIpAndAddress: 'From Ip And Address',
    balance: 'Balance',
    login: 'Login',
    createGroup: 'Create Group',
    channel: 'Channel',
    withdraw: 'Withdraw And Recharge',
    avatar: 'Avatar',
    gender: 'Gender',
    man: 'Male',
    woman: 'Female',
    secret: 'Secret',
    addUser: 'Add User',
    batchAddUser: 'Batch Add User',
    save: 'Save',
    userDetail: 'User Detail',
    friendsAndChatHistory: 'friends And Chat History',
    log: 'Log',
    clearLogErrors: 'Clear Log Error Count',
    sendMessage: 'Send Message',
    passwordPlaceholder: 'No need to modify please leave blank',
    editPassword: 'Change Password',
    withdrawPassword: 'Change Withdraw Password',
    personalFriend: 'Personal Friend',
    group: 'Group',
    send: 'Send',
    enterMessage: 'Please enter a message',
    chatHistory: 'Chat History',
    addFriendsTime: 'Add Friends Time',
    deleteFriend: 'Delete Friend',
    clearHistory: 'Clear Chat History',
    noChecked: 'Pass without verification',
    needChecked: 'Need to be authenticated by the other party',
    pass: 'Pass without verification',
    checkedMessage: 'Verification message',
    addFriendsDescription: 'If you add a friend without verification, no verification message will be displayed; if you invite to join the group, you will pass it directly.',
    recharge: 'Recharge',
    manualWithdraw: 'Withdraw',
    amountPlaceholder: 'Please enter the increase or decrease amount (positive integer)',
    amountDesc: 'The increase or decrease amount',
    checkedIp: 'Checked IP',
    inhibitLogin: 'Batch Inhibit Admin Login',
    allowLogin: 'Batch Allow Admin Login',
    inhibitCreateGroup: 'Batch Inhibit All Create Group',
    allowCreateGroup: 'Batch Allow All Create Group',
    allowAdminCreateGroup: 'Batch Allow Admin Create Group',
    operationTitle: 'Operation Confirm',
    clearLoginErrorDesc: 'After clearing the number of incorrect logins, the player can log in normally, confirm this operation?',
    deleteUserDesc: 'After canceling the account, all information will not be recovered, confirm whether to cancel?',
    type: 'Type',
    inhibitLoginText: 'Are you sure to inhibit administrators from logging in in batches?',
    allowLoginText: 'Are you sure to allow administrators from logging in in batches?',
    inhibitCreateGroupText: 'Are you sure to inhibit everyone from creating groups in batches?',
    allowCreateGroupText: 'Are you sure to allow everyone from creating groups in batches?',
    allowAdminCreateGroupText: 'Are you sure to allow administrators from creating groups in batches?',
    user: 'User',
    mobile: 'Phone',
    email: 'Email',
    noBalance: 'Insufficient User Balance',
    systemDefaultValue: 'If it is empty, the system will automatically generate',
    retractMessage: 'Customize the number of recall messages',
    clearCount: 'Clear Count',
    clearAll: 'Clear All',
    clear100: 'clear Nearly 100',
    custom: 'Custom',
    clean: 'Clean',
    deleteFriendText: 'Are you sure you want to delete this friend?',
    notRegistration: 'Not yet registered',
    adminChatHistory: 'Admin chat history',
    isAdmin: 'YES',
    notAdmin: 'NO',
    normalType: 'Generally',
    blacked: 'Blacklist',
    block: 'Block',
    freeze: 'Freeze',
    wallet: 'Wallet',
    totalBalance: 'Total Balance:'
  },
  inviteCode: {
    inviteCode: 'Invite Code',
    registrationNumber: 'Registrants Number',
    defaultFriend: 'Default Friend',
    defaultGroup: 'Default Group',
    defaultFriendAndGroup: 'Default Friend or Group',
    addInviteCode: 'Add Invitation Code',
    InviteCodeDialog: 'Add Invitation Code',
    defaultUserId: 'Default friend (user account)',
    welcome: 'Default friend welcome message',
    addAllFriends: 'Add all default friend',
    addByTurn: 'Polling use (only one preset friend will be added after the user registers, and multiple preset friends will be added by polling)',
    groupMessage: 'Group Message',
    type: 'Type',
    userInfo: 'User Information',
    welcomeMessage: 'Welcome Message',
    using: 'Using',
    defaultFriendPlaceholder: 'After the new user logs in, the default reminder sent by the friend',
    userIdPlaceholder: 'User Account',
    memoPlaceholder: 'Invitation code remarks (only visible in the backstage)',
    defaultFriendMode: 'Default Friend Mode',
    createTime: 'Latest user registration time',
    registration: 'Registration',
    userId: 'User account',
    friend: 'Friend',
    group: 'Group',
    uidAndGroupId: 'User Account/Group ID',
    defaultType: 'Default Type',
    groupId: 'Group ID',
    groupName: 'Group Name',
    deleteFriendText: 'Are you sure to delete the default friend?',
    deleteGroupText: 'Are you sure to delete the default group?',
    inviteCodeTip: 'Support numbers and English letters, it is recommended to configure pure numbers, which cannot be modified after configuration',
    mobile: 'Phone Number',
    nickname: 'Nickname',
    username: 'Username',
    needUserId: 'Must have a default friend',
    errorGroupId: 'Group ID error',
    operationTitle: 'Operation Confirm'
  },
  defaultFriends: {
    message: 'User/Group Message',
    allRegistrants: 'All Registrants',
    addDefaultMember: 'Add Default Friend',
    defaultMemberSettings: 'Global default friend settings',
    welcomeMessage: 'Welcome Message',
    type: 'Type',
    inviteCodeMember: 'Users who registered with an invitation code',
    allDefaultFriends: 'Global Default Friend',
    deleteFriendGroupText: 'Are you sure to delete the default friend/group?',
    inviteCode: 'Invite Code',
    nickname: 'Nickname',
    username: 'Account',
    mobile: 'Mobile',
    groupId: 'Group ID',
    groupName: 'Group Name',
    friend: 'Friend',
    group: 'Group',
    uidAndGroupId: 'Account/Group ID',
    uidAndGroupIdPlaceholder: 'Account or Group ID',
    defaultFriendPlaceholder: 'After the new user logs in, the default reminder sent by the friend',
    defaultFriendMode: 'Default Friend Mode',
    addAllFriends: 'Add All Default Friend',
    addByTurn: 'Polling use (only one preset friend will be added after the user registers, and multiple preset friends will be added by polling)',
    defaultFriend: 'Default Friend',
    defaultGroup: 'Default Group',
    defaultType: 'Default Type',
    errorGroupId: 'Group ID error',
    operationTitle: 'Operation Confirm',
    userId: 'Account',
    defaultFriendAndGroup: 'Default Friend/Group'
  },
  sensitiveWordList: {
    sensitiveWord: 'Sensitive Word',
    add: 'Add Sensitive Word',
    save: 'Save',
    sensitiveWordPlaceholder: 'Please Enter Sensitive Word'
  },
  sensitiveWordHit: {
    senderUid: 'Sender Account',
    senderNickName: 'Sender Nickname',
    receiverUid: 'Receiver Account/Group ID',
    receiverNickName: 'Receiver Nickname/Group Name',
    createTime: 'Time',
    content: 'Message Content',
    chatType: 'Message Type',
    clear: 'Clear'
  },
  groupList: {
    groupId: 'Group ID',
    groupName: 'Group Name',
    groupImage: 'Avatar',
    managerId: 'Manager Account',
    managerName: 'Manager Nickname',
    memberCount: 'Number of people',
    muteType: 'Speaking Status',
    privateChat: 'Private Chat Status',
    modifyGroup: 'Modify Group',
    checkedMessage: 'View Message',
    checkedGroupMember: 'View Group Member',
    addGroupMember: 'Add Group Member',
    delete: 'Dismiss',
    mute: 'Mute',
    unmute: 'Unmute',
    allowChat: 'Free Speech',
    muted: 'Muted',
    muteNormal: 'Mute Member',
    prohibitPrivateChat: 'Prohibit Private Chat',
    allowPrivateChat: 'Allow Private Chat',
    createGroup: 'Create Group',
    save: 'Save',
    tip: `Change the group owner, the original group owner's member type will be set to "Member"`,
    deleteText: 'Are you sure you want to dismiss the group?',
    nicknamePlaceholder: 'Nickname/Account',
    memberName: 'Account',
    nickName: 'Nickname',
    memberType: 'Member Type',
    gender: 'Gender',
    member: 'Member',
    admin: 'Administrators',
    groupAdmin: 'Group Owner',
    cannotDeleteGroupAdmin: 'The group owner cannot be deleted',
    groupNamePlaceholder: 'Please enter a group name',
    noMember: 'Please select a member',
    createTime: 'Registration Time',
    create: 'Create',
    clear: 'Clear',
    add: 'Add',
    status: 'Group Status',
    normal: 'Normal',
    disbanded: 'Dismissed',
    chooseMember: 'Please select a user',
    groupType: 'Group Type',
    normalType: 'Normal',
    broadcast: 'Broadcast',
    enterPlaceholder: 'Please enter the message......',
    submit: 'Send'
  },
  gender: {
    secret: 'secret',
    man: 'Male',
    woman: 'Female'
  },
  dailyReport: {
    date: 'Date',
    alipayAmount: 'Payment Amount',
    alipayFee: 'Payment Fee',
    withdrawAmount: 'Withdraw Amount',
    withdrawFee: 'Withdraw Fee',
    totalFee: 'Total Fee',
    chargeAmount: 'Manually Adjusted Amount',
    balance: 'Available Amount',
    thirdVendor: 'Third Vendor',
    vendor: 'Vendor',
    channelName: 'Channel Name',
    merchantName: 'Merchant Name',
    queryHint: 'View the report from the selected date to today'
  },
  agentReport: {
    amount: 'Amount',
    successTime: 'Success Time',
    rateDifference: 'Rate',
    rateFixedAmountDifference: 'Fixed Rate',
    feeDifference: 'Commission'
  },
  agentReportDetail: {
    feeDifference: 'Commission'
  },
  redoReport: {
    oldValue: 'Old',
    newValue: 'New',
    redo: 'Redo',
    filter: 'Filter'
  },
  version: {
    component: 'Component',
    version: 'Version'
  },
  table: {
    search: 'Search',
    add: 'Add',
    batchAdd: 'Add Multiple',
    id: 'ID',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    copy: 'Copy',
    detail: 'Detail',
    agree: 'Agree',
    finish: 'Finish',
    decline: 'Decline',
    refresh: 'Refresh',
    processing: 'Processing',
    memo: 'Memo',
    loading: 'Please wait for a moment',
    subtotal: 'SUBTOTAL',
    total: 'TOTAL',
    export: 'Export',
    multipleAdd1: 'Drag files here, or',
    multipleAdd2: 'choose files',
    multipleAddTip: 'Only allow CSV file and no larger than 2MB',
    refreshTime: 'Refresh Time',
    refreshConnect: 'Refresh Connection',
    reject: 'Reject',
    pass: 'Pass'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  tagsView: {
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  logout: {
    message: 'You has been logged out. You can stay this page by click CANCEL, or re-login.',
    title: 'Confirm to Logout',
    confirm: 'Re-Login',
    cancel: 'Cancel'
  },
  wy: {
    titleRisk: 'wy risk'
  },
  week: {
    Sun: 'Sunday',
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Sunday'
  },
  placeholder: {
    singleMinAmount: 'Min amount',
    singleMaxAmount: 'Max amount',
    amount: 'Amount'
  },
  recaptcha: {
    text: 'Recaptcha code',
    error: 'Invalid recaptcha code'
  },
  label: {
    delete: 'delete'
  },
  message: {
    noDataToDownload: 'No data, unable to download'
  },
  blackWhiteList: {
    redisSetting: 'Redis Setting',
    merchantName: 'Merchant Name',
    blackWhiteList: 'Black WhiteList',
    blackList: 'Black List',
    whiteList: 'White List',
    ipPlaceholder: 'Please enter ip or url'
  },
  otp: {
    codePlaceholder: 'Enter the OTP verification code',
    otpCodeHint1: '1.If the account is not yet bound, no OTP verification code is required',
    otpCodeHint2: '2.Reset the OTP verification code by the administrator',
    otpStatus: 'OTP STATUS',
    bindOtp: 'bind OTP',
    scanTip: 'Please use authenticator scan QR code',
    bindOtpPlaceholder: 'Enter the OTP verification code',
    isBinded: 'binding',
    resetOtp: 'Reset OTP',
    resetOtpConfirm: 'Do yo want to reset this account\'s OTP ?',
    plzBindOtp: 'Please Bind OTP'
  },
  userProfile: {
    username: 'Username',
    roleName: 'Role Name',
    lastLoginIp: 'Last Login Ip',
    lastLoginTime: 'Last Login Time',
    resetPassword: 'Reset Password',
    password: 'Password',
    nickname: 'Nickname',
    changeNickname: 'Change Nickname'
  },
  tips: {
    default: 'default'
  },
  connectStatusOptions: {
    good: 'Good',
    error: 'Error',
    timeout: 'Timeout'
  },
  httpLog: {
    log: 'Log',
    orderId: 'Order Id',
    submitRequest: 'Submit Request',
    submitResponse: 'Submit Response',
    submitTime: 'Submit Time',
    queryRequest: 'Query Request',
    queryResponse: 'Query Response',
    queryTime: 'Query Time',
    callbackRequest: 'Callback Request',
    callbackTime: 'Callback Time'
  }
}
