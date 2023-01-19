<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-select
          v-model="paging.query.channelId"
          :options="channelList"
          :placeholder="$t('channelList.channelName')"
          disabled
        />
        <bs-date-range-picker v-model="paging.query.dates" :clearable="true" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.RiskReportMerchantList]" />
        <bs-export-button
          @click="handleExport"
          v-permission="[Permission.RiskReportMerchantListCsv]"
        />
      </div>

      <el-table
        :data="list"
        v-loading="paging.isLoading"
        @sort-change="onSortChange"
        :element-loading-text="$t('table.loading')"
        border
        fit
        highlight-current-row
        class="report-table"
        v-permission="[Permission.RiskReportMerchantList]"
      >
        <el-table-column :label="$t('merchantList.merchantId')">
          <template slot-scope="scope">{{scope.row.merchantId}}</template>
        </el-table-column>
        <el-table-column :label="$t('merchantList.merchant')">
          <template slot-scope="scope">{{scope.row.merchantName}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountReport.availableAmount')">
          <template slot-scope="scope">{{scope.row.availableAmount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountReport.availableCount')">
          <template slot-scope="scope">{{scope.row.availableCount}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('accountReport.orderSuccessRate')"
          sortable="custom"
          prop="orderSuccessRate"
        >
          <template slot-scope="scope">{{scope.row.orderSuccessRate | percentage}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('accountReport.paidSuccessRate')"
          sortable="custom"
          prop="paidSuccessRate"
        >
          <template slot-scope="scope">{{scope.row.paidSuccessRate | percentage}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('accountReport.totalAmount')"
          sortable="custom"
          prop="totalAmount"
        >
          <template slot-scope="scope">{{scope.row.totalAmount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountReport.frozenAmount')">
          <template slot-scope="scope">{{scope.row.frozenAmount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountReport.dayMaxAmount')">
          <template slot-scope="scope">{{scope.row.dayMaxAmount | money}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('accountReport.todayAmount')"
          sortable="custom"
          prop="todayAmount"
        >
          <template slot-scope="scope">{{scope.row.todayAmount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountReport.dayMaxCount')">
          <template slot-scope="scope">{{scope.row.dayMaxCount}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('accountReport.successCount')"
          sortable="custom"
          prop="successOrderCount"
        >
          <template slot-scope="scope">{{scope.row.successOrderCount}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('accountReport.orderTotalCount')"
          sortable="custom"
          prop="totalOrderCount"
        >
          <template slot-scope="scope">{{scope.row.totalOrderCount}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('accountReport.failedOrderCount')"
          sortable="custom"
          prop="failedOrderCount"
        >
          <template slot-scope="scope">{{scope.row.failedOrderCount}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('accountReport.didNotOpenOrderCount')"
          sortable="custom"
          prop="didNotOpenOrderCount"
        >
          <template slot-scope="scope">{{scope.row.didNotOpenOrderCount}}</template>
        </el-table-column>
        <el-table-column
          :label="$t('accountReport.didNotScanOrderCount')"
          sortable="custom"
          prop="didNotScanOrderCount"
        >
          <template slot-scope="scope">{{scope.row.didNotScanOrderCount}}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-status
              v-if="scope.row.status!==undefined&&scope.$index<list.length-2"
              :status="scope.row.status"
              :clickable="false"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Permission } from '@/definitions/constants'
import { exportRiskReportMerchantList, getRiskReportMerchantList } from '@/api/riskReport'
import { Message } from 'element-ui'
import moment from 'moment'
import { formatDateAsEnd, formatDateAsStart } from '@/utils/format'

export default {
  name: 'merchantReport',
  data() {
    return {
      Permission,
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          dates: [
            moment()
              .subtract(7, 'day')
              .toDate(),
            moment().toDate()
          ],
          channelId: 1
        }
      },
      list: [],
      channelList: [{ id: 1, name: '支付宝' }]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.paging.isLoading = true
      getRiskReportMerchantList(this.getQueryParams()).then(response => {
        this.list = response.content

        if (this.list.length > 0) {
          const subsummary = response.subsummary
          subsummary.merchantId = this.$t('table.subtotal')
          this.list.push(subsummary)

          const summary = response.summary
          summary.merchantId = this.$t('table.total')
          this.list.push(summary)
        }

        this.paging.totalElements = response.totalElements
        this.paging.isLoading = false
      })
    },
    handleSearch() {
      this.getList()
    },
    handleExport() {
      if (this.paging.query.channelId === undefined) {
        Message({
          message: this.$t('merchantReport.rules.channelId'),
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      if (!this.list || this.list.length === 0) {
        this.$message({
          message: this.$t('message.noDataToDownload'),
          type: 'error'
        })
        return
      }
      exportRiskReportMerchantList(this.getQueryParams())
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
      if (column.prop) {
        this.paging.query.sort = `${column.prop},${column.order === 'ascending' ? 'ASC' : 'DESC'}`
        this.getList()
      }
    }
  }
}
</script>

<style>
.report-table tr:nth-last-child(2) {
  background-color: #f9f9f9;
}

.report-table tr:last-child {
  background-color: #f3f3f3;
}
</style>
