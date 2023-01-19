<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <div class="filter-container">
        <bs-input v-model="paging.query.orderId" :placeholder="$t('payOrderList.orderId')"/>
        <bs-select v-model="paging.query.merchantId" :options="merchantList"
                   :placeholder="$t('merchantList.merchant')"/>
        <bs-date-range-picker v-model="paging.query.dates" type="daterange" :clickable="false"/>
        <bs-search-button @click="handleSearch" v-permission="[Permission.MerchantReportList]"/>
        <bs-export-button @click="handleExport" v-permission="[Permission.MerchantReportListCsv]"/>
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')"
                border fit highlight-current-row class="report-table"
                v-permission="[Permission.DailyReport]">
        <el-table-column :label="$t('agentList.agentName')">
          <template slot-scope="scope">{{scope.row.differenceAgentName}}</template>
        </el-table-column>
        <el-table-column :label="$t('merchantList.merchant')">
          <template slot-scope="scope">{{scope.row.merchantName}}</template>
        </el-table-column>
        <el-table-column :label="$t('payOrderList.orderId')">
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column :label="$t('payOrderList.successTime')">
          <template slot-scope="scope">{{scope.row.successTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('payOrderList.amount')">
          <template slot-scope="scope">{{scope.row.amount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('agentReportDetail.feeDifference')">
          <template slot-scope="scope">{{scope.row.feeDifference | money}}</template>
        </el-table-column>
      </el-table>

    </div>

  </div>

</template>

<script>
  import { Permission } from '@/definitions/constants'
  import { exportAgentReportDetailListCsv, getAgentReportDetailList } from '@/api/report'
  import moment from 'moment'
  import { getMerchantIndexing } from '@/api/indexing'
  import { formatDateAsEnd, formatDateAsStart } from '@/utils/format'

  export default {
    name: 'merchantReport',
    data() {
      return {
        Permission,
        paging: {
          isLoading: false,
          query: {
            dates: [moment().subtract(30, 'days').toDate(), moment().toDate()]
          }
        },
        list: [],
        merchantList: []
      }
    },
    mounted() {
      this.queryMerchantList()
    },
    methods: {
      getList() {
        this.paging.isLoading = true
        getAgentReportDetailList(this.getQueryParams()).then(response => {
          this.list = response.content

          if (this.list.length > 0) {
            const summary = response.summary
            summary.differenceAgentName = this.$t('table.total')
            this.list.push(summary)
          }

          this.paging.isLoading = false
        })
      },
      handleSearch() {
        this.getList()
      },
      handleExport() {
        exportAgentReportDetailListCsv(this.getQueryParams())
      },
      getQueryParams() {
        const params = {
          ...this.paging.query
        }

        if (this.paging.query.dates) {
          params.successStartDate = formatDateAsStart(this.paging.query.dates[0])
          params.successEndDate = formatDateAsEnd(this.paging.query.dates[1])
          params.dates = undefined
        }

        return params
      },
      queryMerchantList() {
        getMerchantIndexing().then(response => {
          this.merchantList = response.map(res => ({
            id: res.merchantId,
            name: res.merchantName
          }))
        })
      }
    }
  }
</script>

<style>
  .report-table tr:last-child {
    background-color: #f3f3f3;
  }
</style>
