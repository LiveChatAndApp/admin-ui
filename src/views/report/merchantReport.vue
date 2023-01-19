<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-select
          v-model="paging.query.merchantId"
          :options="merchantList"
          :placeholder="$t('merchantList.merchant')"
          :clearable="merchantList.length > 1 ? true : false"
          filterable
          v-permission="[Permission.IndexingMerchantall]"
        />
        <!-- <bs-select v-model="paging.query.accountCode" :options="accountCodeList"
        :placeholder="$t('channelList.channelName')"/>-->
        <bs-select
          v-model="paging.query.catchId"
          :options="vendorList"
          :placeholder="$t('dailyReport.thirdVendor')"
          filterable
          @change="vendorChange"
        />
        <bs-select
          v-model="paging.query.channelId"
          :options="channelList"
          @change="onChangeChannelCode"
          :placeholder="$t('channelList.channelName')"
          filterable
          v-permission="[Permission.IndexingChannel]"
        />
        <bs-date-picker v-model="paging.query.date" :clearable="false" :editable="false" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.MerchantReportList]" />
        <bs-export-button @click="handleExport" v-permission="[Permission.MerchantReportListCsv]" />
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
        v-permission="[Permission.DailyReport]"
        ref="table"
      >
        <!-- 日期 -->
        <!-- <el-table-column :label="$t('dailyReport.date')">
          <template slot-scope="scope">{{scope.row.date}}</template>
        </el-table-column>-->
        <el-table-column :label="$t('merchantList.merchant')">
          <template slot-scope="scope">{{scope.row.merchantName}}</template>
        </el-table-column>

        <el-table-column
          prop="alipayAmount"
          sortable="custom"
          :label="$t('dailyReport.alipayAmount')">
          <template slot-scope="scope">{{scope.row.alipayAmount | money}}</template>
        </el-table-column>
        <!-- <el-table-column :label="$t('dailyReport.alipayFee')">
          <template slot-scope="scope">{{scope.row.alipayFee | money}}</template>
        </el-table-column>-->
        <el-table-column
          prop="withdrawAmount"
          sortable="custom"
          :label="$t('dailyReport.withdrawAmount')">
          <template slot-scope="scope">{{scope.row.withdrawAmount | money}}</template>
        </el-table-column>
        <!-- <el-table-column :label="$t('dailyReport.withdrawFee')">
          <template slot-scope="scope">{{scope.row.withdrawFee | money}}</template>
        </el-table-column>-->
        <!-- <el-table-column :label="$t('dailyReport.totalFee')">
          <template slot-scope="scope">{{scope.row.totalFee | money}}</template>
        </el-table-column>-->
        <!-- <el-table-column :label="$t('dailyReport.chargeAmount')">
          <template slot-scope="scope">{{scope.row.chargeAmount | money}}</template>
        </el-table-column>-->
        <!-- <el-table-column :label="$t('dailyReport.balance')">
          <template slot-scope="scope">{{scope.row.balance | money}}</template>
        </el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script>
import { AccountCodeList, Permission } from '@/definitions/constants'
import { exportMerchantReportListCsv, getMerchantReportList } from '@/api/report'
import moment from 'moment'
import { getChannelIndexing, getMerchantIndexingAll, getAllVendorList } from '@/api/indexing'
import { formatDateAsStart } from '@/utils/format'
import { stringReplacer } from '@/utils/string'
export default {
  name: 'merchantReport',
  data() {
    return {
      Permission,
      paging: {
        isLoading: false,
        query: {
          date: moment().toDate()
        }
      },
      list: [],
      merchantList: [],
      channelList: [], // 畫面收款渠道選單用
      channelListAll: [], // 原始全部收款渠道的資料
      accountCodeList: [],
      vendorList: []
    }
  },
  mounted() {
    getMerchantIndexingAll().then(response => {
      if (response && response.length > 0) {
        this.merchantList = response.map(res => ({ id: res.merchantId, name: res.merchantName }))
        // 剛好一筆的時候 default 就選擇
        if (response.length === 1) {
          this.paging.query.merchantId = response[0].merchantId
        }
      }
    })
    getChannelIndexing().then(response => {
      const list = response.map(res => ({ id: res.channelId, name: res.channelName }))
      this.channelList = list
      this.channelListAll = list
    })

    this.getVendorOptions()
  },
  methods: {
    vendorChange() {
      // 需要清除收款渠道
      this.$set(this.paging.query, 'channelId', undefined)
      // 如果金流商欄位有改變要濾出對應的收款渠道
      const { catchId } = this.paging.query
      if (catchId) {
        // 需要濾出對應的收款渠道
        const vendor = this.vendorList.find(o => o.id === catchId)
        if (vendor) {
          const { type } = vendor
          if (type === 1) {
            // 1:支付商
            // 濾出 channelId !==2
            this.channelList = this.channelListAll.filter(o => o.id !== 2)
          } else if (type === 2) {
            // 2:代付商
            // 濾出 channelId ===2
            this.channelList = this.channelListAll.filter(o => o.id === 2)
          } else if (type === 3) {
            // 3:支代商
            this.channelList = this.channelListAll
          }
        } else {
          this.channelList = []
        }
      } else {
        this.channelList = this.channelListAll
      }
    },
    onSortChange(column) {
      if (column.prop) {
        this.paging.query.sort = `${column.prop},${column.order === 'ascending' ? 'ASC' : 'DESC'}`
        this.getList(true)
      }
    },
    getVendorOptions() {
      return getAllVendorList().then(response => {
        this.vendorList = response.map(({ catchId, allVendorName, vendorType }) => {
          return {
            id: catchId,
            name: allVendorName,
            type: vendorType
          }
        })
      })
    },
    getList(sorting = false) {
      const { date } = this.paging.query
      if (date === null || date === undefined || date === '') {
        this.$message({
          message: this.$t('rules.emptyStartTime'),
          type: 'error'
        })
        return
      }

      this.paging.isLoading = true

      if (!sorting) {
        delete this.paging.query.sort
        this.$refs.table.clearSort()
      } else {
        this.paging.query.sort = stringReplacer(this.paging.query.sort)
      }

      getMerchantReportList(this.getQueryParams()).then(response => {
        if (response.content) {
          response.content.forEach(res => {
            res.date = moment(res.reportDay).format('YYYY-MM-DD')
          })
        }

        this.list = response.content

        if (this.list.length > 0) {
          const summary = response.summary
          // summary.date = this.$t('table.total')
          summary.merchantName = this.$t('table.total')
          this.list.push(summary)
        }

        this.paging.isLoading = false
      })
    },
    handleSearch() {
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
      exportMerchantReportListCsv(this.getQueryParams())
    },
    getQueryParams() {
      const params = {
        ...this.paging.query
      }

      if (this.paging.query.date) {
        params.date = formatDateAsStart(this.paging.query.date)
      }

      return params
    },
    onChangeChannelCode(channelCode) {
      this.$set(this.paging.query, 'accountCode', undefined)
      this.accountCodeList = AccountCodeList.filter(a => a.channelCode === channelCode).map(a => ({
        id: a.accountCode,
        name: a.accountCode
      }))
    }
  }
}
</script>

<style>
.report-table tr:last-child {
  background-color: #f3f3f3;
}
</style>
