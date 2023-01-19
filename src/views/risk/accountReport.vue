<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <!-- 商戶名稱 -->
        <bs-select v-if="isSuperAdmin()" v-model="paging.query.merchantId" :options="merchantList"
          :placeholder="$t('userList.merchantName')" filterable />
        <!-- <bs-channel-select v-model="paging.query.channelId" :clearable="true" class="filter-item" /> -->
        <bs-select v-model="paging.query.channelId" :options="channelList"
          :placeholder="$t('channelList.channelName')" />
        <bs-select v-model="paging.query.status" :options="AccountStatusOptions" :placeholder="$t('status.status')" />
        <bs-date-range-picker v-model="paging.query.dates" :clearable="true" @change="onChangePicker" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.RiskReportAccountList]" />
        <bs-export-button @click="handleExport" v-permission="[Permission.RiskReportAccountListCsv]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" @sort-change="onSortChange"
        :element-loading-text="$t('table.loading')" border fit highlight-current-row class="report-table"
        v-permission="[Permission.RiskReportAccountList]" ref="table" style="width: 100%" :cell-style="cellStyle">
        <!-- <el-table-column :label="$t('table.id')" sortable="custom" prop="catchId">
          <template slot-scope="scope">{{scope.row.catchId}}</template>
        </el-table-column>-->
        <!-- 商戶名稱 -->
        <el-table-column :label="$t('accountReport.merchantName')" v-if="isSuperAdmin()" min-width="110%">
          <template slot-scope="scope">{{scope.row.merchantName}}</template>
        </el-table-column>
        <!-- 帳號名稱 -->
        <el-table-column :label="$t('accountList.accountName')" min-width="120%">
          <template slot-scope="scope">{{scope.row.accountName}}</template>
        </el-table-column>
        <!-- 累積收款 -->
        <el-table-column
          :label="queryChannelId === 2 ? $t('accountReport.totalPayAmount') : $t('accountReport.totalWithdrawAmount')"
          sortable="custom" prop="totalAmount" min-width="120%">
          <template slot-scope="scope">{{(scope.row.totalAmount || 0) | money}}</template>
        </el-table-column>
        <!-- 今日收款 -->
        <el-table-column
          :label="queryChannelId === 2 ? $t('accountReport.todayPayAmount') : $t('accountReport.todayWithdrawAmount')"
          sortable="custom" prop="todayAmount" min-width="110%">
          <template slot-scope="scope">{{(scope.row.todayAmount || 0) | money}}</template>
        </el-table-column>
        <!-- 今日剩餘可用配額 -->
        <!-- <el-table-column
          :label="$t('accountReport.dayAvailableAmount')"
          sortable="custom"
          prop="todayRemainingAmount"
          min-width="160%"
        >
          <template slot-scope="scope">{{scope.row.todayRemainingAmount | money}}</template>
        </el-table-column>-->
        <!-- 今日剩餘可用筆數 -->
        <!-- <el-table-column :label="$t('accountReport.dayAvailableCount')" min-width="150%">
          <template slot-scope="scope">{{scope.row.todayRemainingCount | count}}</template>
        </el-table-column>-->
        <!-- 今日限制金额 -->
        <!-- <el-table-column :label="$t('accountReport.dayLimitAmount')" min-width="130%">
          <template slot-scope="scope">{{scope.row.singleDayAmount | money}}</template>
        </el-table-column>-->
        <!-- 今日限制笔数 -->
        <!-- <el-table-column :label="$t('accountReport.dayLimitCount')" min-width="130%">
          <template slot-scope="scope">{{scope.row.singleDayCount | count}}</template>
        </el-table-column>-->
        <!-- 订单成功率 -->
        <el-table-column :label="$t('accountReport.orderSuccessRate')" sortable="custom" prop="orderSuccessRate"
          min-width="120%">
          <template slot-scope="scope">{{scope.row.orderSuccessRate || '0.00%'}}</template>
        </el-table-column>
        <!-- 付款成功率 -->
        <el-table-column :label="$t('accountReport.paidSuccessRate')" sortable="custom" prop="successRate"
          min-width="120%">
          <template slot-scope="scope">{{scope.row.successRate || '0.00%'}}</template>
        </el-table-column>

        <!-- 订单总数 -->
        <el-table-column :label="$t('accountReport.orderTotalCount')" sortable="custom" prop="totalOrderCount"
          min-width="120%">
          <template slot-scope="scope">{{(scope.row.totalOrderCount || 0) | count}}</template>
        </el-table-column>
        <!-- <el-table-column :label="$t('accountReport.dayMaxAmount')">
          <template slot-scope="scope">{{scope.row.dayMaxAmount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountReport.dayMaxCount')">
          <template slot-scope="scope">{{scope.row.dayMaxCount}}</template>
        </el-table-column>-->
        <!-- 成功笔数 -->
        <el-table-column :label="$t('accountReport.successCount')" sortable="custom" prop="successCount"
          min-width="120%">
          <template slot-scope="scope">{{(scope.row.successCount || 0) | count}}</template>
        </el-table-column>
        <!-- 失败订单 -->
        <el-table-column :label="$t('accountReport.failedOrderCount')" sortable="custom" prop="failCount"
          min-width="120%">
          <template slot-scope="scope">{{(scope.row.failCount || 0) | count}}</template>
        </el-table-column>
        <!-- /支付中/付款中订单 -->
        <el-table-column :label="$t('accountReport.doingCount')" sortable="custom" prop="doingCount" min-width="170%">
          <template slot-scope="scope">{{(scope.row.doingCount || 0) | count}}</template>
        </el-table-column>
        <!-- 已关闭订单 -->
        <!-- <el-table-column
          :label="$t('accountReport.closeCount')"
          sortable="custom"
          prop="closeCount"
          min-width="120%"
        >
          <template slot-scope="scope">{{(scope.row.closeCount || 0) | count}}</template>
        </el-table-column> -->
        <el-table-column :label="$t('status.status')" fixed="right">
          <template slot-scope="scope">
            <div style="height: 28px;">
              <bs-account-status v-if="scope.row.status !== undefined" :status="scope.row.status" :clickable="false" />
            </div>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" ref="pagination" />
    </div>
  </div>
</template>

<script>
import { Permission, UserLevel } from '@/definitions/constants'
import { exportRiskAccountQuotaList, getRiskAccountQuotaList } from '@/api/riskReport'
import { getChannelIndexing } from '@/api/indexing'
import { StatusOptions, AccountStatusOptions } from '@/definitions/options'
import moment from 'moment'
import { formatDateAsEnd, formatDateAsStart } from '@/utils/format'
import { getMerchantIndexingAll } from '@/api/indexing'
import { isSuperAdminLevel } from '@/utils/user'
import { str } from '@/utils/string'
import { stringReplacer } from '@/utils/string'
export default {
  name: 'accountReport',
  data() {
    return {
      defaultDates: [moment().toDate(), moment().toDate()],
      UserLevel,
      Permission,
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          dates: [moment().toDate(), moment().toDate()],
          channelId: '',
          status: '',
          page: 0,
          // pageSize: 20,
          rows: undefined
        }
      },
      StatusOptions,
      AccountStatusOptions,
      accountOption: [],
      list: [],
      merchantList: [],
      channelList: [],
      queryChannelId: '', // 查詢後用來記住是哪個 channedId ，用來判斷是否為代付
      toNumber: ['orderSuccessRate', 'successRate']
    }
  },
  created() {
    this.paging.query.dates = this.defaultDates
    this.queryChannelList()
    const { merchantId } = this.$store.getters.user

    // 管理者帳號不用預設商戶
    if (!this.isSuperAdmin()) {
      this.paging.query.merchantId = merchantId
    } else {
      getMerchantIndexingAll().then(response => {
        this.merchantList = response.map(res => ({ id: res.merchantId, name: res.merchantName }))
      })
    }
  },
  methods: {
    cellStyle({ row, rowIndex, columnIndex }) {
      if (columnIndex === 2 && rowIndex !== this.$data.list.length - 2) {
        return 'background-color: #F2F2F2'
      } else {
        return ''
      }
    },
    onChangePicker(value) {
      if (str.isEmpty(value)) {
        // icon x 的清除需要做延遲，否則無法 update 值
        setTimeout(() => {
          this.paging.query.dates = this.defaultDates
        }, 100)
      }
    },
    isSuperAdmin() {
      return isSuperAdminLevel(this.$store)
    },
    getList(sorting = false) {
      if (!sorting) {
        delete this.paging.query.sort
        this.$refs.table.clearSort()
      } else {
        this.paging.query.sort = stringReplacer(this.paging.query.sort)
      }
      // 日期為必填
      if (!this.paging.query.dates) {
        this.$message({
          message: this.$t('accountReport.error.emptyDates'),
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      this.paging.isLoading = true

      getRiskAccountQuotaList(this.getQueryParams()).then(response => {
        this.list = response.content

        if (this.list.length > 0) {
          // 小計與總計的位置會因為是否為最高權限登入顯示的欄位不一樣
          const colName = this.isSuperAdmin() ? 'merchantName' : 'accountName'
          // 小計
          const subsummary = response.subsummary || {}
          subsummary.accountName = '-'
          subsummary[colName] = this.$t('table.subtotal')
          this.list.push(subsummary)

          // 總計
          const summary = response.summary || {}
          summary.accountName = '-'
          summary[colName] = this.$t('table.total')
          this.list.push(summary)
        }

        this.paging.totalElements = response.totalElements
        this.paging.isLoading = false
      })
    },
    handleSearch() {
      this.paging.query.page = 0
      this.queryChannelId = this.paging.query.channelId
      this.getList()
    },
    handleExport() {
      if (!this.list || this.list.length === 0) {
        this.$message({
          message: this.$t('message.noDataToDownload'),
          type: 'error'
        })
      } else {
        exportRiskAccountQuotaList(this.getQueryParams())
      }
    },
    getQueryParams() {
      const params = {
        ...this.paging.query
      }

      if (this.paging.query.dates) {
        params.startTime = formatDateAsStart(this.paging.query.dates[0])
        params.endTime = formatDateAsEnd(this.paging.query.dates[1])
        params.dates = undefined
      }
      return params
    },
    onSortChange(column) {
      // if (!column.prop || this.list.length <= 1) {
      //   return
      // }

      // // 全部 list 要扣除 總計與小計
      // const list = this.list.slice(0, this.list.length - 2)
      // // 總計欄位在最後一欄
      // const summaryList = this.list.slice(this.list.length - 1, this.list.length)
      // // 小計欄位在倒數第二欄
      // const subSummaryList = this.list.slice(this.list.length - 2, this.list.length - 1)

      // if (this.toNumber.indexOf(column.prop) === -1) {
      //   list.sort((a, b) => {
      //     return column.order === 'ascending' ? a[column.prop] - b[column.prop] : b[column.prop] - a[column.prop]
      //   })
      // } else {
      //   list.sort((a, b) => {
      //     return column.order === 'ascending' ? parseFloat(a[column.prop]) - parseFloat(b[column.prop]) : parseFloat(b[column.prop]) - parseFloat(a[column.prop])
      //   })
      // }
      // // 最後將小計與總計放到 list 最後
      // list.push(subSummaryList[0])
      // list.push(summaryList[0])
      // this.list = list
      if (column.prop) {
        this.paging.query.sort = `${column.prop},${column.order === 'ascending' ? 'ASC' : 'DESC'}`
        this.getList(true)
      }
    },
    queryChannelList() {
      getChannelIndexing().then(response => {
        this.channelList = response.map(channel => ({ id: channel.channelId, name: channel.channelName }))
      })
    },
    handleSizeChange(val) {
      this.paging.query.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.paging.query.page = val
      this.getList(true)
    }
  }
}
</script>

<style>
/* .report-table tr:nth-last-child(2) {
  background-color: #f9f9f9;
} */

.report-table tr:last-child {
  background-color: #f3f3f3;
}
</style>
