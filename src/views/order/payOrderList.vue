<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-select v-model="paging.query.merchantId" :options="merchantList" v-if="isSuperAdmin()" filterable
          :placeholder="$t('merchantList.merchant')" v-permission="[Permission.IndexingMerchantall]" />
        <bs-input v-model="paging.query.payOrderId" :placeholder="$t('payOrderList.orderId')" />
        <bs-input v-model="paging.query.merchantOrderNo" :placeholder="$t('payOrderList.merchantOrderNo')" />
        <bs-input v-model="paging.query.merchantUserId" :placeholder="$t('payOrderList.merchantUserId')" />
        <!-- 第三方金流商選單 -->
        <bs-select v-model="paging.query.catchId" :options="vendorList" :placeholder="$t('payOrderList.thirdVendor')"
          filterable />
        <bs-select v-model="paging.query.channelId" :options="channelList" filterable @change="queryAccountList($event)"
          :placeholder="$t('payOrderList.channelName')" v-permission="[Permission.IndexingChannelByStatus]" />
        <!-- <bs-account-select
          v-model="paging.query.accountId"
          v-if="shouldShowAccount()"
          :placeholder="$t('payOrderList.accountName')"
          style="margin-bottom: 10px; vertical-align: middle;"
        />-->
        <bs-select v-model="paging.query.accountId" :options="accountOptions" filterable
          :placeholder="$t('payOrderList.accountName')" v-permission="[Permission.AccountList]" />
        <bs-select v-model="paging.query.status" :options="payOrderStatusOptions"
          :placeholder="$t('payOrderList.status')" />
        <bs-select v-model="paging.query.notifyStatus" :options="NotifyStatusOptions"
          :placeholder="$t('payOrderList.notifyStatus')" />
        <bs-date-range-picker type="datetimerange" v-model="paging.query.dates" :clearable="true"
          :placeholder="$t('payOrderList.applyDate')" style="margin-bottom: 10px; vertical-align: middle;" />
        <bs-date-range-picker type="datetimerange" v-model="paging.query.successDates" :clearable="true"
          :placeholder="$t('payOrderList.successDate')" style="margin-bottom: 10px; vertical-align: middle;" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.PayOrderList]" />
        <bs-export-button @click="handleExport" v-permission="[Permission.PayOrderListExcel]" />
        <bs-spinning-button-nocounter v-if="isObjEmpty(refreshTimer)" :title="$t('table.refresh')"
          @click="handleRefreshAll()" :accountId="'refresher'" class="remove-m-l"
          v-permission="[Permission.PayOrderPull]" />
        <bs-spinning-button-with-counter v-else :title="$t('table.refresh')" @click="handleRefreshAll()"
          :accountId="'refresher'" v-permission="[Permission.PayOrderPull]" :timer="refreshTimer" :timers="[]"
          class="remove-m-l" :timeout="refreshTimer.time" />
        <!-- <bs-spinning-button
          :title="$t('table.refresh')"
          @click="handleRefreshAll()"
          v-permission="[Permission.PayOrderPull]"
          :timeout="refreshTime * 1000"
          class="remove-m-l"
        /> -->
        <bs-select v-model="refreshTime" :options="RefreshTimeOptions" :placeholder="$t('table.refreshTime')" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" @sort-change="onSortChange"
        :element-loading-text="$t('table.loading')" class="report-table" border fit highlight-current-row
        v-permission="[Permission.PayOrderList]" style="width: 100%">
        <!-- 商戶名稱 -->
        <el-table-column width="110%" :label="$t('merchantList.merchant')" v-if="isSuperAdmin()">
          <template slot-scope="scope">
            <bs-merchant-link :merchant-id="scope.row.merchantId">{{ scope.row.merchantName }}</bs-merchant-link>
          </template>
        </el-table-column>
        <!-- 平台訂單 -->
        <el-table-column width="110%" :label="$t('payOrderList.orderId')">
          <template slot-scope="scope">{{ scope.row.payOrderId }}</template>
        </el-table-column>
        <!-- 商戶訂單 -->
        <el-table-column width="110%" :label="$t('payOrderList.merchantOrderNo')">
          <template slot-scope="scope">{{ scope.row.merchantOrderNo }}</template>
        </el-table-column>

        <!-- 商户用户账号 -->
        <el-table-column width="110%" :label="$t('payOrderList.merchantUserId')">
          <template slot-scope="scope">{{ scope.row.merchantUserId }}</template>
        </el-table-column>

        <!-- 渠道訂單號 -->
        <!-- <el-table-column width="110%" :label="$t('payOrderList.channelOrderNo')">
          <template slot-scope="scope">{{ scope.row.channelOrderNo }}</template>
        </el-table-column>-->
        <!-- 收款渠道 -->
        <el-table-column :label="$t('payOrderList.channelName')">
          <template slot-scope="scope" v-if="scope.$index < list.length - 2">
            {{ scope.row.channelName }}
            <br />
            ({{ scope.row.channelType }})
          </template>
        </el-table-column>
        <!-- 收款帳戶 -->
        <el-table-column :label="$t('payOrderList.accountName')">
          <template slot-scope="scope">{{ scope.row.accountName }}</template>
        </el-table-column>
        <!-- 付款用戶 -->
        <!-- <el-table-column v-if="shouldShowBuyerInfo()" :label="$t('payOrderList.buyerLogonId')">
          <template slot-scope="scope">
            <span v-if="!!scope.row.extra">{{ scope.row.extra.buyerLogonId }}</span>
            <br v-if="isSuperAdmin() && !!scope.row.extra && !!scope.row.orderTrace" />
            <span
              v-if="isSuperAdmin() && !!scope.row.orderTrace"
            >{{ scope.row.orderTrace.ip }} ({{ scope.row.orderTrace.count }})</span>
          </template>
        </el-table-column>-->
        <!-- 訂單金額 -->
        <el-table-column :label="$t('payOrderList.amount')">
          <template slot-scope="scope">{{ scope.row.amount | money }}</template>
        </el-table-column>
        <!-- 實付金額 -->
        <el-table-column :label="$t('payOrderList.actualAmount')">
          <template slot-scope="scope">
            <!-- <span
              v-if="scope.$index >= list.length - 2 || getStatusOption(scope.row.status).color === 'success'"
            >
              {{
              scope.row.actualAmount | money
              }}
            </span>-->
            <span>
              {{
              scope.row.actualAmount | money
              }}
            </span>
          </template>
        </el-table-column>

        <!-- 總算金額 -->
        <!-- <el-table-column :label="$t('payOrderList.transactionAmount')">
          <template slot-scope="scope">
            <span
              v-if="scope.$index >= list.length - 2 || getStatusOption(scope.row.status).color === 'success'"
            >
              {{
              scope.row.transactionAmount | money
              }}
            </span>
          </template>
        </el-table-column>-->

        <!-- 手续费 -->
        <!-- <el-table-column :label="$t('payOrderList.fee')">
          <template slot-scope="scope">
            <span v-if="scope.$index>=list.length-2 || getStatusOption(scope.row.status).color==='success'">
              {{scope.row.fee | money}}
            </span>
          </template>
        </el-table-column>-->

        <!-- 服務費 -->
        <!-- <el-table-column :label="$t('payOrderList.servicefee')">
          <template slot-scope="scope">
            <span v-if="scope.$index>=list.length-2 || getStatusOption(scope.row.status).color==='success'">
              {{scope.row.serviceFee | money}}
            </span>
          </template>
        </el-table-column>-->
        <!-- 申請時間 -->
        <el-table-column :label="$t('payOrderList.createTime')" sortable="custom" prop="CreateTime" width="115%">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <!-- 完成時間 -->
        <el-table-column :label="$t('payOrderList.successTime')" sortable="custom" prop="SuccessTime" width="115%">
          <template slot-scope="scope">{{ scope.row.successTime }}</template>
        </el-table-column>
        <!-- 訂單狀態 -->
        <el-table-column :label="$t('payOrderList.status')">
          <template slot-scope="scope">
            <!-- 舊的style有背景與border顏色 -->
            <!-- <bs-pay-order-status color="none" v-if="scope.$index<list.length-2" :status="scope.row.status" mode="simple"/> -->
            <bs-pay-order-status-text v-if="scope.$index < list.length - 2" :status="scope.row.status" />
          </template>
        </el-table-column>
        <!-- 通知狀態 -->
        <el-table-column :label="$t('payOrderList.notifyStatus')">
          <template slot-scope="scope">
            <!-- 舊的style有背景與border顏色 -->
            <!-- <bs-notify-status v-if="scope.row.notifyStatus!==undefined && scope.$index<list.length-2"
            :status="scope.row.notifyStatus"/>-->
            <bs-notify-status-text
              v-if="scope.row.notifyStatus !== undefined && scope.$index < list.length - 2 && dontShowStatus.indexOf(scope.row.status) === -1"
              :status="scope.row.notifyStatus" />
            <!-- <span
              v-if="scope.$index < list.length - 2"
              :style="{color: scope.row.notifyStatus ? NotifyStatusOptions[scope.row.notifyStatus].hex: 'initial'}"
            >{{scope.row.notifyStatus ? NotifyStatusOptions[scope.row.notifyStatus].name : ''}}</span>-->
          </template>
        </el-table-column>
        <!-- 最後通知時間 -->
        <el-table-column :label="$t('payOrderList.lastNotifyTime')" width="110%">
          <template slot-scope="scope">{{ scope.row.lastNotifyTime }}</template>
        </el-table-column>
        <!-- user id -->
        <!-- <el-table-column label="User ID">
          <template slot-scope="scope">
            <span v-if="isSuperAdmin()">{{ scope.row.merchantUserId }}</span>
          </template>
        </el-table-column>-->
        <!-- client ip -->
        <!-- <el-table-column v-if="isSuperAdmin()" label="Client IP">
          <template slot-scope="scope">{{ scope.row.clientIp }}</template>
        </el-table-column>-->
        <!-- 操作 -->
        <el-table-column :label="$t('table.actions')" fixed="right" min-width="160%">
          <template slot-scope="scope">
            <div class="col-action">
              <el-button v-if="scope.$index < list.length - 2" size="mini" class="filter-item" type="primary" v-waves
                @click="handleDetail(scope.row)" v-permission="[Permission.PayOrderList]">{{ $t('table.detail') }}
              </el-button>
              <!-- <bs-spinning-button
                v-if="dontShowRefreshButton.indexOf(scope.row.status) !== -1"
                :title="$t('table.refresh')"
                @click="handleRefresh(scope.row, scope.$index)"
                v-permission="[Permission.PayOrderPull]"
                class="remove-m-l"
              />-->

              <!-- <bs-spinning-button-with-counter -->
              <bs-spinning-button-nocounter
                v-if="timers.find(o => o.id === scope.row.payOrderId) === undefined && dontShowRefreshButton.indexOf(scope.row.status) !== -1"
                :title="$t('table.refresh')" @click="handleRefresh(scope.row)" :accountId="scope.row.payOrderId"
                class="remove-m-l" />
              <bs-spinning-button-with-counter v-else-if="timers.find(o => o.id === scope.row.payOrderId) !== undefined"
                :title="$t('table.refresh')" @click="handleRefresh(scope.row)" :accountId="scope.row.payOrderId"
                :timer="timers.find(o => o.id === scope.row.payOrderId)" :timers="timers" class="remove-m-l" />

              <el-button v-if="scope.$index < list.length - 2 && dontShowInformButton.indexOf(scope.row.status) === -1"
                size="mini" class="filter-item remove-m-l" type="primary" v-waves @click="handleNotify(scope.row)"
                v-permission="[Permission.OrderNotify]">{{ $t('payOrderList.notify') }}</el-button>

              <bs-button v-if="isSuperAdmin() && scope.$index < list.length - 2" @click="handleHttpLog(scope.row)"
                :title="$t('httpLog.log')" v-permission="[Permission.PayOrderHttpLog]" class="remove-m-l" />
            </div>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="$t('table.detail')" :visible.sync="dialogDetailVisible" v-if="dialogDetailVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form ref="dataForm" :model="detail" label-position="left" label-width="130px">
          <el-form-item :label="$t('merchantList.merchant')">{{ detail.merchantName }}</el-form-item>
          <el-form-item :label="$t('payOrderList.orderId')">{{ detail.payOrderId }}</el-form-item>
          <el-form-item :label="$t('payOrderList.merchantOrderNo')">{{ detail.merchantOrderNo }}</el-form-item>

          <!-- 渠道订单号 -->
          <el-form-item :label="$t('payOrderList.channelOrderNo')">{{detail.channelOrderNo}}</el-form-item>

          <!-- 商户用户账号 -->
          <el-form-item :label="$t('payOrderList.merchantUserId')">{{ detail.merchantUserId }}</el-form-item>

          <!-- 組代碼 -->
          <!-- <el-form-item :label="$t('accountGroupList.accountGroupCode')">
            {{detail.accountGroupCode ? detail.accountGroupCode : ''}}
          </el-form-item>-->
          <!-- 收款渠道 -->
          <el-form-item :label="$t('payOrderList.channelName')">
            {{
            `${detail.channelName} (${detail.channelType})`
            }}
          </el-form-item>
          <!-- 收款帳號 -->
          <el-form-item :label="$t('payOrderList.accountName')">{{ detail.accountName }}</el-form-item>
          <!-- 付款用戶 -->
          <!-- <el-form-item :label="$t('payOrderList.buyerLogonId')">
            <span v-if="!!detail.extra">{{ detail.extra.buyerLogonId }}</span>
            <br v-if="isSuperAdmin() && !!detail.extra && !!detail.orderTrace" />
            <span
              v-if="isSuperAdmin() && !!detail.orderTrace"
            >{{ detail.orderTrace.ip }} ({{ detail.orderTrace.count }})</span>
          </el-form-item>-->
          <!-- 訂單金額 -->
          <el-form-item :label="$t('payOrderList.amount')">{{ detail.amount | money }}</el-form-item>

          <!-- 随机减免 -->
          <!-- <el-form-item :label="$t('payOrderList.discountAmount')">
            {{detail.discountAmount}}
          </el-form-item>-->

          <!-- 實付金額 -->
          <el-form-item :label="$t('payOrderList.actualAmount')">
            <span>{{ detail.actualAmount | money }}</span>
          </el-form-item>

          <!-- 手续费 -->
          <!-- <el-form-item :label="$t('payOrderList.fee')">
            {{detail.fee}}
          </el-form-item>-->

          <!-- 結算金額 -->
          <!-- <el-form-item :label="$t('payOrderList.transactionAmount')">
            {{
            detail.transactionAmount | money
            }}
          </el-form-item>-->
          <!-- 申請時間 -->
          <el-form-item :label="$t('payOrderList.createTime')">{{ detail.createTime }}</el-form-item>
          <!-- 完成時間 -->
          <el-form-item :label="$t('payOrderList.successTime')">{{ detail.successTime }}</el-form-item>

          <!-- 確認支付方式 -->
          <!-- <el-form-item :label="$t('payOrderList.checkPaidProcessOptions.title')">
            <bs-pay-order-check-paid-process-status :status="detail.checkPaidProcess"/>
          </el-form-item>-->

          <!-- 訂單狀態 -->
          <el-form-item :label="$t('payOrderList.status')">
            <bs-pay-order-status-text :status="detail.status" mode="simple" />
          </el-form-item>

          <!-- 通知狀態 -->
          <el-form-item :label="$t('payOrderList.notifyStatus')">
            <bs-notify-status-text v-if="dontShowStatus.indexOf(detail.notifyStatus) === -1"
              :status="detail.notifyStatus" />
          </el-form-item>

          <!-- user-agent -->
          <!-- <el-form-item v-if="isSuperAdmin()" label="User-Agent">
            <span v-if="!!detail.orderTrace">{{ detail.orderTrace.userAgent }}</span>
          </el-form-item>-->

          <!-- 渠道通知网址 -->
          <!-- <el-form-item
            v-if="isSuperAdmin()"
            :label="$t('payOrderList.channelNotifyUrl')"
          >{{ detail.channelNotifyUrl }}</el-form-item>-->

          <!-- 錯誤訊息 -->
          <!-- <el-form-item :label="$t('payOrderList.channelRemark')" v-if="isSuperAdmin()">
            <div class="textarea">{{ detail.channelRemark }}</div>
          </el-form-item>-->

          <!-- 通知的返回訊息 -->
          <el-form-item :label="$t('payOrderList.notifyReturnData')" v-if="isSuperAdmin()">{{ detail.returnData }}
          </el-form-item>

          <!-- 最後通知時間 -->
          <el-form-item :label="$t('payOrderList.lastNotifyTime')" v-if="isSuperAdmin()">{{ detail.lastNotifyTime |
          moment}}</el-form-item>

          <!-- 渠道通知備註 -->
          <el-form-item :label="$t('payOrderList.channelRemark')" v-if="isSuperAdmin()">{{ detail.channelRemark }}
          </el-form-item>
          <!-- <el-table-column :label="$t('payOrderList.channelRemark')" min-width="230%">
            <template slot-scope="scope">{{ scope.row.channelRemark }}</template>
          </el-table-column> -->
          <!-- 通知次數 -->
          <el-form-item :label="$t('payOrderList.notifyCount')" v-if="isSuperAdmin()">{{ detail.notifyCount | count}}
          </el-form-item>

          <!-- user id -->
          <!-- <el-form-item label="User ID">
            <span v-if="isSuperAdmin()">{{ detail.merchantUserId }}</span>
          </el-form-item>-->

          <!-- user ip -->
          <!-- <el-form-item label="Client IP">{{ detail.clientIp }}</el-form-item> -->

          <!-- 通知地址 -->
          <!-- <el-form-item :label="$t('payOrderList.notifyUrl')">
            <span style="word-wrap: break-word">{{detail.notifyUrl}}</span>
          </el-form-item>-->

          <!-- <el-form-item
            v-if="shouldShowBuyerInfo() && detail.channelCode === ChannelCode.AliPay"
            :label="$t('payOrderList.buyerLogonId')"
          >{{ detail.extra ? detail.extra.buyerLogonId : '' }}</el-form-item>
          <el-form-item
            v-if="shouldShowBuyerInfo() && detail.channelCode === ChannelCode.AliPay"
            :label="$t('payOrderList.buyerUserId')"
          >{{ detail.extra ? detail.extra.buyerUserId : '' }}</el-form-item>
          <el-form-item
            v-if="shouldShowBuyerInfo() && detail.channelCode === ChannelCode.AliPay"
            :label="$t('payOrderList.buyerUserName')"
          >{{ detail.extra ? detail.extra.buyerUserName : '' }}</el-form-item>
          <el-form-item
            v-if="detail.channelCode === ChannelCode.BankGate"
            :label="$t('bankCard.bankName')"
          >
            {{
            detail.bankName
            }}
          </el-form-item>
          <el-form-item
            v-if="detail.channelCode === ChannelCode.BankGate"
            :label="$t('wyOrderList.chargeTime')"
          >
            {{
            detail.chargeTime
            }}
          </el-form-item>
          <el-form-item
            v-if="detail.channelCode === ChannelCode.BankGate"
            :label="$t('wyOrderList.chargeFailReason')"
          >{{ detail.chargeFailReason }}</el-form-item>-->
          <!-- 通知地址 -->
          <el-form-item :label="$t('payOrderList.notifyUrl')">
            <span style="word-wrap: break-word">{{detail.notifyUrl}}</span>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="dialogDetailVisible = false" />
        </div>
      </el-dialog>
    </div>

    <!-- http log -->
    <el-dialog :title="$t('httpLog.log')" :visible.sync="dialogHttpLog" v-if="dialogHttpLog"
      :close-on-click-modal="false" :show-close="true" width="90%">
      <el-form ref="httpLogForm" :model="httpLogForm" label-position="left" label-width="140px">
        <el-form-item :label="$t('httpLog.orderId')">{{ httpLogForm.orderId }}</el-form-item>
        <el-form-item :label="$t('httpLog.submitRequest')">{{ httpLogForm.submitRequest }}</el-form-item>
        <el-form-item :label="$t('httpLog.submitResponse')">{{ httpLogForm.submitResponse }}</el-form-item>
        <el-form-item :label="$t('httpLog.submitTime')">{{ httpLogForm.submitTime | moment}}</el-form-item>
        <el-form-item :label="$t('httpLog.queryRequest')">{{ httpLogForm.queryRequest }}</el-form-item>
        <el-form-item :label="$t('httpLog.queryResponse')">{{ httpLogForm.queryResponse }}</el-form-item>
        <el-form-item :label="$t('httpLog.queryTime')">{{ httpLogForm.queryTime | moment }}</el-form-item>
        <el-form-item :label="$t('httpLog.callbackRequest')">{{ httpLogForm.callbackRequest }}</el-form-item>
        <el-form-item :label="$t('httpLog.callbackTime')">{{ httpLogForm.callbackTime | moment }}</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  // AccountCode,
  ChannelCodeWithoutAccount,
  NotifyStatus,
  PayOrderStatus,
  Permission,
  UserLevel
} from '@/definitions/constants'
import { exportPayOrderList, getPayOrderList, pullPayOrder } from '@/api/payOrder'
import {
  AccountChannelTypeOptions,
  NotifyStatusOptions,
  PayOrderStatusOptions,
  RefreshTimeOptions,
  findOptionById
} from '@/definitions/options'
import { Message } from 'element-ui'
import moment from 'moment'
import { notifyOrder } from '@/api/merchantNotify'
import { getAllChannelIndexing, getMerchantIndexingAll, getVendorList } from '@/api/indexing'
// import { getAccountIndexing, getAllChannelIndexing, getMerchantIndexingAll } from '@/api/indexing'
// import { showSuccess } from '@/utils/executionMessage'
import { formatDate } from '@/utils/format'
import { ChannelCode } from '../../definitions/constants'
import { getAllAccountList } from '@/api/account'
import { isSuperAdminLevel, isMerchantLevel } from '@/utils/user'
import { isObjEmpty } from '@/utils/object'
import { buildTimer, buildTimerWithRepeator, refreshTimerStatus, refreshTimerReactTo } from '@/utils/buildTimer'
import { getOrderTraceLog } from '@/api/orderTrace'

export default {
  name: 'payOrderList',
  data() {
    return {
      dialogHttpLog: false,
      httpLogForm: {},
      Permission,
      dialogDetailVisible: false,
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          dates: [
            // moment()
            //   .subtract(7, 'day')
            //   .toDate(),
            moment()
              .set('hour', 0)
              .set('minute', 0)
              .set('second', 0)
              .toDate(),
            moment()
              .set('hour', 23)
              .set('minute', 59)
              .set('second', 59)
              .toDate()
          ],
          page: 0,
          rows: undefined
        }
      },
      // dontShowStatus: [0, 3, 6, 13],
      timers: [],
      dontShowStatus: [],
      dontShowInformButton: [0, 3, 6, 7, 8, 9, 10, 11, 12, 13],
      dontShowRefreshButton: [0, 3],
      UserLevel,
      PayOrderStatus,
      payOrderStatusOptions: PayOrderStatusOptions.filter(option => option.simple),
      NotifyStatusOptions,
      NotifyStatus,
      ChannelCode,
      list: [],
      merchantList: [],
      channelList: [],
      accountList: [],
      detail: {},
      RefreshTimeOptions,
      accountOptions: [],
      refreshTime: '',
      ...refreshTimerStatus,
      refreshTotalAmountPermitted: false,
      vendorList: [] // 第三方金流商選單
    }
  },
  mounted() {
    this.queryMerchantList()
    this.queryChannelList()
    this.getAccountOption()
    this.getVendorOptions()
  },
  watch: {
    refreshTime: function(val, oldVal) {
      refreshTimerReactTo.refreshTime(val, this.$data)
    },
    refreshTimer: {
      handler: function(val, oldVal) {
        refreshTimerReactTo.refreshTimer(val, this.$data, this.getList)
      },
      deep: true
    }
  },
  methods: {
    handleHttpLog(o) {
      this.httpLogForm = {}
      const params = {
        orderId: o.payOrderId,
        type: 0 // 支付
      }
      getOrderTraceLog(params).then((response) => {
        // call api 成功才顯示
        this.httpLogForm = response || {}
        this.dialogHttpLog = true
      })
    },
    isObjEmpty,
    notEmptyString(val) {
      if (val === null || val === '' || val === undefined) {
        return false
      }
      return true
    },
    shouldShowNotify(scope) {
      const { status } = scope.row
      // 只有訂單狀態不為支付中都顯示通知狀態
      return status !== PayOrderStatus.ScannedQrCode
    },
    getAccountOption() {
      getAllAccountList().then(response => {
        if (response && response.length > 0) {
          this.accountOptions = response.map(({ accountId, accountName }) => {
            return {
              id: accountId,
              name: accountName
            }
          })
        }
      })
    },
    handleRefreshAll() {
      this.$data.repeatingRefresh = true
      this.getList()
      if (this.$data.refreshTime <= 0) {
        this.getList()
      } else {
        const timer = buildTimerWithRepeator('refresher', this.$data.refreshTime * 1000, [])
        timer.buildInstance()
        this.$data.refreshTimer = timer
      }
    },
    getList() {
      this.$data.refreshTotalAmountPermitted = false
      // 至少需要選擇一個日期
      if (!this.paging.query.dates && !this.paging.query.successDates) {
        Message({
          message: this.$t('payOrderList.error.emptyDates'),
          type: 'error',
          duration: 5 * 1000
        })
        return
      }

      // 不可同時選擇
      if (this.paging.query.dates && this.paging.query.successDates) {
        Message({
          message: this.$t('payOrderList.error.dates'),
          type: 'error',
          duration: 5 * 1000
        })
        return
      }

      const { dates, successDates } = this.paging.query
      if (dates && dates.length > 0) {
        const stateDate = moment(dates[0])
        const endDate = moment(dates[1])
        const days = endDate.diff(stateDate, 'days')
        // 查询期间不可超过90天
        if (days > 90) {
          Message({
            message: this.$t('payOrderList.error.maxRangeDays'),
            type: 'error',
            duration: 5 * 1000
          })
          return
        }
      }

      if (successDates && successDates.length > 0) {
        const stateDate = moment(successDates[0])
        const endDate = moment(successDates[1])
        const days = endDate.diff(stateDate, 'days')
        // 查询期间不可超过90天
        if (days > 90) {
          Message({
            message: this.$t('payOrderList.error.maxRangeDays'),
            type: 'error',
            duration: 5 * 1000
          })
          return
        }
      }

      this.paging.isLoading = true
      getPayOrderList(this.getQueryParams()).then(response => {
        if (response.content.length > 0) {
          response.content.forEach(res => {
            // if (res.clientExtra) {
            //   const clientExtra = JSON.parse(res.clientExtra)
            //   res.bankName = clientExtra.bankName
            //   res.chargeTime = clientExtra.chargeTime
            // }

            if (res.data) {
              const data = JSON.parse(res.data)
              res.chargeFailReason = data.chargeFailReason
            }

            const channelTypeGroup = AccountChannelTypeOptions.filter(t => t.id === res.channelType).map(t => t.group)
            if (channelTypeGroup && channelTypeGroup.length > 0) {
              res.channelType = channelTypeGroup[0]
            }
          })

          const subsummary = response.subsummary
          subsummary[this.isSuperAdmin() ? 'merchantName' : 'payOrderId'] = this.$t('table.subtotal')
          response.content.push(subsummary)

          const summary = response.summary
          summary[this.isSuperAdmin() ? 'merchantName' : 'payOrderId'] = this.$t('table.total')
          response.content.push(summary)
        }

        this.list = response.content
        this.paging.totalElements = response.totalElements
        this.paging.isLoading = false
      })
    },
    handleSizeChange(val) {
      this.paging.query.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.paging.query.page = val
      this.getList()
    },
    handleExport() {
      if (!this.list || this.list.length === 0) {
        this.$message({
          message: this.$t('message.noDataToDownload'),
          type: 'error'
        })
        return
      }
      this.paging.query.page = 0
      exportPayOrderList(this.getQueryParams())
    },
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    handleDetail(row) {
      this.detail = row
      this.dialogDetailVisible = true
    },
    handleRefresh(row, index) {
      const _data = this.$data
      const _list = _data.list
      _data.refreshTotalAmountPermitted = true
      pullPayOrder({ payOrderId: row.payOrderId, payOrderStatus: row.status }).then(response => {
        // if (response.tradeStatus === 'TRADE_CLOSED') {
        //   showSuccess(`${response.tradeStatus} - ${this.$t('payOrderList.trade.close')}`)
        // } else if (response.tradeStatus === 'TRADE_SUCCESS') {
        //   showSuccess(`${response.tradeStatus} - ${this.$t('payOrderList.trade.success')}`)
        // } else if (response.tradeStatus === 'TRADE_FINISHED') {
        //   showSuccess(`${response.tradeStatus} - ${this.$t('payOrderList.trade.finish')}`)
        // } else if (response.tradeStatus === 'WAIT_BUYER_PAY') {
        //   showSuccess(`${this.$t('payOrderList.trade.wait')}`)
        // } else if (response.subCode === 'ACQ.TRADE_NOT_EXIST') {
        //   switch (response.status) {
        //     case PayOrderStatus.Created:
        //     case PayOrderStatus.NotYetOpenPage:
        //       showSuccess(this.$t('payOrderList.trade.notExistNotOpen'))
        //       break

        //     case PayOrderStatus.OpenedPage:
        //     case PayOrderStatus.ScannedQrCode:
        //       showSuccess(`${this.$t('payOrderList.trade.notExistNotScan')}`)
        //       break
        //   }
        // } else {
        //   showSuccess(`${response.subCode} - ${response.subMsg}`)
        // }
        // row.status = response.status
        // row.successTime = response.successTime
        // row.channelOrderNo = response.channelOrderNo
        // row.channelRemark = response.channelRemark
        const timer = buildTimer(row.payOrderId, 30000, this.$data.timers)
        timer.buildInstance()
        this.$data.timers.push(timer)

        // 因為需要更新小計與總計，需再重新執行一次 query (暫時移除，因為如果單子一直進來重新 query 目前這張有可能會跑到其他頁面)
        // this.getList()

        // row.preCatchBalance = moneyToDollar(response)
        // row.balance = moneyToDollar(response)
        // 新判斷

        // const { errLog } = response
        const { newStatus, status, newInfo, errLog } = response
        // 1. 如果errLog 有錯誤顯示失敗的
        if (errLog) {
          const h = this.$createElement
          this.$message({
            message: h('p', null, [
              h(
                'span',
                { style: 'color: #F56C6C; font-size: 14px;' },
                this.$t('payOrderList.refresh.fail') + '。' + row.payOrderId
              ),
              h('p', { style: 'color: #F56C6C; font-size: 14px;' }, errLog)
            ]),
            type: 'error',
            duration: 5 * 1000
          })
          return
        }

        // 更新該筆資料
        // row.status = this.notEmptyString(newStatus) ? newStatus : row.status
        // row.successTime = this.notEmptyString(successTime) ? successTime : row.successTime
        // row.channelOrderNo = this.notEmptyString(channelOrderNo) ? channelOrderNo : row.channelOrderNo
        // row.channelRemark = this.notEmptyString(channelRemark) ? channelRemark : row.channelRemark

        // 更新成功

        // 更新原本資料
        // if (newInfo) {
        //   // newInfo 為更新後的 data: payOrderId, actualAmount, status, successTime, notifyStatus, lastNotifyTime
        //   row = { ...row, ...newInfo }
        //   // 更新 table row 作法
        //   this.$set(this.list, index, row)
        // }

        // 有更新成功
        if (this.notEmptyString(status) && this.notEmptyString(newStatus)) {
          if (status !== newStatus) {
            // 代表订单状态由 status 更新为 newStatus
            row.status = newStatus
            if (response.newInfo.successTime) {
              row.successTime = formatDate(response.newInfo.successTime)
            }
            if (response.newInfo.actualAmount && _data.refreshTotalAmountPermitted) {
              const _actualAmount = parseInt(newInfo.actualAmount)
              row.actualAmount = _actualAmount
              _list[_list.length - 1].actualAmount += _actualAmount
              _list[_list.length - 2].actualAmount += _actualAmount
              // row.actualAmount = response.newInfo.actualAmount
            }
            const originOption = findOptionById(PayOrderStatusOptions, status)
            const newOption = findOptionById(PayOrderStatusOptions, newStatus)
            const h = this.$createElement
            this.$message({
              message: h('p', null, [
                h(
                  'span',
                  { style: 'color: #67C23A; font-size: 14px;' },
                  this.$t('payOrderList.refresh.successMsgFrom')
                ),
                h('span', { style: `color: ${originOption.hex}; font-size: 14px;` }, originOption.name),
                h('span', { style: 'color: #67C23A; font-size: 14px;' }, this.$t('payOrderList.refresh.successMsgTo')),
                h('span', { style: `color: ${newOption.hex}; font-size: 14px;` }, newOption.name + '。'),
                h('p', { style: 'color: #67C23A; font-size: 14px;' }, row.payOrderId)
              ]),
              type: 'success',
              duration: 5 * 1000
            })
            return
          } else {
            // 代表订单状态尚无进度
            Message({
              message: this.$t('payOrderList.refresh.successMsg') + '。' + row.payOrderId,
              type: 'success',
              duration: 5 * 1000
            })
            return
          }
        }
      })
    },
    handleNotify(row) {
      this.paging.isLoading = true
      notifyOrder({ orderId: row.payOrderId })
        .then(() => {
          this.paging.isLoading = false
          this.getList()
        })
        .catch(() => {
          this.paging.isLoading = false
        })
    },
    getStatusOption(status) {
      for (const statusOption of PayOrderStatusOptions) {
        if (statusOption.id === status) {
          return statusOption
        }
      }
      return {}
    },
    isSuperAdmin() {
      return isSuperAdminLevel(this.$store)
    },
    shouldShowBuyerInfo() {
      return this.$store.getters.user.level !== UserLevel.GeneralAgent
    },
    isMerchant() {
      return isMerchantLevel(this.$store)
    },
    shouldShowAccount() {
      if (this.isSuperAdmin()) {
        return true
      } else {
        return (
          this.$store.getters.user.merchantId === '683741270291' ||
          this.$store.getters.user.merchantId === '751635662697'
        )
      }
    },
    shouldShowBankName(scope) {
      return scope.row.channelCode === ChannelCode.BankGate
    },
    shouldShowRefresh(scope) {
      if (scope.$index >= this.list.length - 2) {
        return false
      }
      // 只有订单状态为支付中才会显示刷新按钮
      if (scope.row.status === PayOrderStatus.ScannedQrCode) {
        return true
      }

      return false

      // if (this.getStatusOption(scope.row.status).color !== undefined) {
      //   return false
      // }
      // return scope.row.accountCode !== AccountCode.BankGate.WyPay
    },
    shouldShowNotifyButton(row) {
      return this.getStatusOption(row.status).color === 'success' && row.notifyStatus !== NotifyStatus.Succeeded
    },
    queryMerchantList() {
      getMerchantIndexingAll().then(response => {
        if (response) {
          this.merchantList = response.map(merchant => ({ id: merchant.merchantId, name: merchant.merchantName }))
        }
      })
    },
    queryChannelList() {
      getAllChannelIndexing().then(response => {
        if (response) {
          this.channelList = response
            .filter(res => !Object.values(ChannelCodeWithoutAccount).find(value => value === res.channelCode))
            .map(channel => ({ id: channel.channelId, name: channel.channelName }))
        }
      })
    },
    queryAccountList(channelId) {
      // 目前沒用到暫時 disable 該流程
      // getAccountIndexing({ channelId }).then(response => {
      //   delete this.paging.query.accountId
      //   if (response) {
      //     this.accountList = response.map(account => ({ id: account.accountId, name: account.accountName }))
      //   } else {
      //     this.accountList = []
      //   }
      // })
    },
    getQueryParams() {
      const params = {
        ...this.paging.query
      }

      if (this.paging.query.dates) {
        params.startTime = formatDate(this.paging.query.dates[0])
        params.endTime = formatDate(this.paging.query.dates[1])
        params.dates = undefined
      }

      if (this.paging.query.successDates) {
        params.successStartTime = formatDate(this.paging.query.successDates[0])
        params.successEndTime = formatDate(this.paging.query.successDates[1])
        params.successDates = undefined
      }

      return params
    },
    onSortChange(column) {
      if (column.prop) {
        this.paging.query.sort = `${column.prop},${column.order === 'ascending' ? 'ASC' : 'DESC'}`
        this.getList()
      }
    },
    getVendorOptions() {
      return getVendorList().then(response => {
        this.vendorList = response.map(({ catchId, vendorName }) => {
          return {
            id: catchId,
            name: vendorName
          }
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.report-table tr:nth-last-child(2) {
  background-color: #f9f9f9;
}

.report-table tr:last-child {
  background-color: #f3f3f3;
}

.textarea {
  line-height: 20px;
  padding-top: 7px;
}
</style>
