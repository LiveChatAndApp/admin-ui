<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <div class="filter-container">
        <bs-channel-select v-model="paging.query.channelId" :clearable="false"/>
        <bs-select v-model="paging.query.statusList" :options="AccountStatusOptions"
                   :placeholder="$t('status.status')" :multiple="true"/>
        <bs-date-picker v-model="paging.query.date"/>
        <bs-search-button @click="handleSearch" v-permission="[Permission.RiskReportAccountBalanceList]"/>
        <bs-export-button @click="handleExport" v-permission="[Permission.RiskReportAccountBalanceListExcel]"/>
      </div>

      <el-table :data="list" v-loading="paging.isLoading" @sort-change="onSortChange"
                :element-loading-text="$t('table.loading')"
                border fit highlight-current-row class="report-table"
                v-permission="[Permission.RiskReportAccountBalanceList]">
        <el-table-column :label="$t('accountList.catchId')" sortable="custom" prop="catchId">
          <template slot-scope="scope">{{scope.row.catchId}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountList.accountName')">
          <template slot-scope="scope">{{scope.row.accountName}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountBalance.amount')" sortable="custom" prop="amount">
          <template slot-scope="scope">{{scope.row.amount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountBalance.count')">
          <template slot-scope="scope">{{scope.row.count}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountBalance.balance')" sortable="custom" prop="balance">
          <template slot-scope="scope">{{scope.row.balance | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountBalance.frozenAmount')" sortable="custom" prop="frozenAmount">
          <template slot-scope="scope">{{scope.row.frozenAmount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountBalance.withdrawalCount')">
          <template slot-scope="scope">{{scope.row.withdrawalCount}}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-account-status v-if="scope.row.status !== undefined" :status="scope.row.status" :clickable="false"/>
          </template>
        </el-table-column>
        <el-table-column :label="$t('accountBalance.catchUpdateTime')" sortable="custom" prop="catchUpdateTime">
          <template slot-scope="scope">{{scope.row.catchUpdateTime}}</template>
        </el-table-column>
      </el-table>

    </div>

  </div>

</template>

<script>
  import { AccountStatus, Permission } from '@/definitions/constants'
  import { exportAccountBalanceList, getAccountBalanceList } from '@/api/riskReport'
  import { AccountStatusOptions } from '@/definitions/options'
  import moment from 'moment'
  import { formatDateAsStart } from '@/utils/format'

  export default {
    name: 'accountBalance',
    data() {
      return {
        Permission,
        paging: {
          isLoading: false,
          totalElements: null,
          query: {
            date: moment().toDate(),
            statusList: [
              AccountStatus.Enabled,
              AccountStatus.ReachedLimit,
              AccountStatus.Cooling,
              AccountStatus.CoolingAmount
            ]
          }
        },
        AccountStatusOptions,
        list: []
      }
    },
    mounted() {
    },
    methods: {
      getList() {
        this.paging.isLoading = true
        getAccountBalanceList(this.getQueryParams()).then(response => {
          this.list = response.content

          if (this.list.length > 0) {
            const summary = response.summary
            summary.catchId = this.$t('table.total')
            summary.accountName = this.list.length
            this.list.push(summary)
          }

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
      handleSearch() {
        this.paging.query.page = 0
        this.getList()
      },
      handleExport() {
        this.paging.query.page = 0
        exportAccountBalanceList(this.getQueryParams())
      },
      getQueryParams() {
        const params = {
          ...this.paging.query
        }

        params.date = formatDateAsStart(this.paging.query.date)

        return params
      },
      onSortChange(column) {
        if (!column.prop || this.list.length <= 1) {
          return
        }

        const list = this.list.slice(0, this.list.length - 1)
        const summaryList = this.list.slice(this.list.length - 1, this.list.length)
        list.sort((a, b) => {
          const aValue = a[column.prop]
          const bValue = b[column.prop]
          if (column.order === 'ascending') {
            return aValue === bValue ? 0 : aValue < bValue ? -1 : 1
          } else {
            return aValue === bValue ? 0 : aValue > bValue ? -1 : 1
          }
        })
        list.push(summaryList[0])
        this.list = list
      }
    }
  }
</script>

<style>
  .report-table tr:last-child {
    background-color: #f3f3f3;
  }
</style>
