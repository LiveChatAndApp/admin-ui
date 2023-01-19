<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-date-picker v-model="paging.query.date" :clickable="false" :editable="false" />
        <span class="hint">{{ $t('dailyReport.queryHint') }}</span>
        <bs-search-button @click="handleSearch" v-permission="[Permission.REPORT_OPERATE]" />
        <bs-export-button @click="handleExport" v-permission="[Permission.REPORT_OPERATE_EXCEL]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row class="report-table" v-permission="[Permission.REPORT_OPERATE]">
        <el-table-column :label="$t('dailyReport.date')">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <!-- 充值 -->
        <el-table-column :label="$t('dailyReport.alipayAmount')">
          <template slot-scope="scope">{{ scope.row.rechargeTotal | money }}</template>
        </el-table-column>
        <!-- 提款 -->
        <el-table-column :label="$t('dailyReport.withdrawAmount')">
          <template slot-scope="scope">{{ scope.row.withdrawTotal | money }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Permission } from '@/definitions/constants'
import { exportDailyReportListCsv, getDailyReportList } from '@/api/report'
import moment from 'moment'
import { formatDateAsStartWithDate } from '@/utils/format'
import { isSuperAdminLevel } from '@/utils/user'
import { hasAcl } from '@/utils/auth'

export default {
  name: 'dailyReport',
  data() {
    return {
      Permission,
      paging: {
        isLoading: false,
        query: {
          date: moment().subtract(30, 'days').toDate()
        }
      },
      list: []
    }
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    isSuperAdmin() {
      return isSuperAdminLevel(this.$store)
    },
    getList() {
      if (!hasAcl(Permission.REPORT_OPERATE)) return

      // 日期必填
      const { date } = this.paging.query
      if (date === null || date === undefined || date === '') {
        this.$message({
          message: this.$t('rules.emptyStartTime'),
          type: 'error'
        })
        return
      }
      this.paging.isLoading = true

      getDailyReportList(this.getQueryParams()).then(response => {
        this.list = response.data

        if (this.list.length > 0) {
          const total = response.total
          total.date = this.$t('table.total')
          this.list.push(total)
        }
      }).finally(() => {
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
      exportDailyReportListCsv(this.getQueryParams())
    },
    getQueryParams() {
      const params = {
        ...this.paging.query
      }
      if (params.date) {
        params.date = formatDateAsStartWithDate(params.date)
      }

      return params
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.report-table tr:last-child {
  background-color: #f3f3f3;
}

.hint {
  display: inline-block;
  color: #909399;
  font-size: 12px;
  margin: 0 0 10px 0;
}
</style>
