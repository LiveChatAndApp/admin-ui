<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <div class="filter-container">
        <bs-date-picker v-model="paging.query.date" :clearable="false" :disabledDate="disabledDate"/>
        <bs-button :title="$t('redoReport.redo')" @click="handleRedo" v-permission="[Permission.RedoReportExecute]"/>
      </div>

      <div v-if="list&&list.length>0" class="filter-container">
        <bs-date-picker v-model="filtering.date" :clearable="true" :disabledDate="disabledFilterDate"
                        @change="handleFilter"/>
        <bs-select v-model="filtering.merchantId" :options="merchantList" :clearable="true" @change="handleFilter"
                   :placeholder="$t('merchantList.merchant')"/>
      </div>

      <el-table v-for="report in filteredList" v-bind:key="report.reportDay"
                :data="report.content" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')"
                border fit highlight-current-row class="report-table">
        <el-table-column :label="convertToDateString(report.reportDay)">
          <el-table-column :label="$t('merchantList.merchant')">
            <template slot-scope="scope">{{scope.row.merchantName}}</template>
          </el-table-column>
          <el-table-column :label="$t('dailyReport.alipayAmount')">
            <el-table-column :label="$t('redoReport.oldValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.alipayAmount===scope.row.newReport.alipayAmount">{{scope.row.oldReport.alipayAmount | money}}</span>
                <el-tag v-else :type="'danger'">{{scope.row.oldReport.alipayAmount | money}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('redoReport.newValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.alipayAmount===scope.row.newReport.alipayAmount">{{scope.row.newReport.alipayAmount | money}}</span>
                <el-tag v-else>{{scope.row.newReport.alipayAmount | money}}</el-tag>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('dailyReport.alipayFee')">
            <el-table-column :label="$t('redoReport.oldValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.alipayFee===scope.row.newReport.alipayFee">{{scope.row.oldReport.alipayFee | money}}</span>
                <el-tag v-else :type="'danger'">{{scope.row.oldReport.alipayFee | money}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('redoReport.newValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.alipayFee===scope.row.newReport.alipayFee">{{scope.row.newReport.alipayFee | money}}</span>
                <el-tag v-else>{{scope.row.newReport.alipayFee | money}}</el-tag>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('dailyReport.withdrawAmount')">
            <el-table-column :label="$t('redoReport.oldValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.withdrawAmount===scope.row.newReport.withdrawAmount">{{scope.row.oldReport.withdrawAmount | money}}</span>
                <el-tag v-else :type="'danger'">{{scope.row.oldReport.withdrawAmount | money}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('redoReport.newValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.withdrawAmount===scope.row.newReport.withdrawAmount">{{scope.row.newReport.withdrawAmount | money}}</span>
                <el-tag v-else>{{scope.row.newReport.withdrawAmount | money}}</el-tag>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('dailyReport.withdrawFee')">
            <el-table-column :label="$t('redoReport.oldValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.withdrawFee===scope.row.newReport.withdrawFee">{{scope.row.oldReport.withdrawFee | money}}</span>
                <el-tag v-else :type="'danger'">{{scope.row.oldReport.withdrawFee | money}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('redoReport.newValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.withdrawFee===scope.row.newReport.withdrawFee">{{scope.row.newReport.withdrawFee | money}}</span>
                <el-tag v-else :type="'danger'">{{scope.row.newReport.withdrawFee | money}}</el-tag>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('dailyReport.totalFee')">
            <el-table-column :label="$t('redoReport.oldValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.totalFee===scope.row.newReport.totalFee">{{scope.row.oldReport.totalFee | money}}</span>
                <el-tag v-else :type="'danger'">{{scope.row.oldReport.totalFee | money}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('redoReport.newValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.totalFee===scope.row.newReport.totalFee">{{scope.row.newReport.totalFee | money}}</span>
                <el-tag v-else>{{scope.row.newReport.totalFee | money}}</el-tag>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('dailyReport.chargeAmount')">
            <el-table-column :label="$t('redoReport.oldValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.chargeAmount===scope.row.newReport.chargeAmount">{{scope.row.oldReport.chargeAmount | money}}</span>
                <el-tag v-else :type="'danger'">{{scope.row.oldReport.chargeAmount | money}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('redoReport.newValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.chargeAmount===scope.row.newReport.chargeAmount">{{scope.row.newReport.chargeAmount | money}}</span>
                <el-tag v-else>{{scope.row.newReport.chargeAmount | money}}</el-tag>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('dailyReport.balance')">
            <el-table-column :label="$t('redoReport.oldValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.balance===scope.row.newReport.balance">{{scope.row.oldReport.balance | money}}</span>
                <el-tag v-else :type="'danger'">{{scope.row.oldReport.balance | money}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('redoReport.newValue')">
              <template slot-scope="scope">
                <span v-if="scope.row.oldReport.balance===scope.row.newReport.balance">{{scope.row.newReport.balance | money}}</span>
                <el-tag v-else>{{scope.row.newReport.balance | money}}</el-tag>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>

    </div>

  </div>

</template>

<script>
  import { Permission } from '@/definitions/constants'
  import moment from 'moment'
  import { formatDateAsStart } from '@/utils/format'
  import { redoReport } from '@/api/report'
  import { deepClone } from '@/utils'

  export default {
    name: 'redoReport',
    data() {
      return {
        Permission,
        paging: {
          isLoading: false,
          query: {
            date: moment().subtract(1, 'days').toDate()
          }
        },
        filtering: {
          date: undefined,
          merchantId: undefined
        },
        list: [],
        filteredList: [],
        merchantList: []
      }
    },
    methods: {
      disabledDate(date) {
        const selected = moment(date).startOf('days')
        const now = moment().startOf('days')
        const diff = now.diff(selected, 'days')
        return diff < 1 || diff > 5
      },
      handleRedo() {
        this.paging.isLoading = true
        redoReport(this.getParams()).then(response => {
          const merchantMap = new Map()

          this.list = response.map(res => {
            const merchantIdList = []
              .concat(res.oldReport.content.map(r => r.merchantId))
              .concat(res.newReport.content.map(r => r.merchantId))
              .sort((a, b) => a < b ? -1 : a > b ? 1 : 0)
            const merchantIdSet = new Set(merchantIdList)

            const content = []
            merchantIdSet.forEach(merchantId => {
              const oldReport = res.oldReport.content.find(r => r.merchantId === merchantId)
              const newReport = res.newReport.content.find(r => r.merchantId === merchantId)
              const merchantName = oldReport ? oldReport.merchantName : newReport.merchantName
              merchantMap.set(merchantId, merchantName)
              content.push({
                merchantId,
                merchantName,
                oldReport,
                newReport
              })
            })

            content.push({
              merchantId: 'summary',
              merchantName: this.$t('table.total'),
              oldReport: res.oldReport.summary,
              newReport: res.newReport.summary
            })

            return {
              reportDay: res.reportDay,
              content
            }
          })

          this.filteredList = this.list

          const merchantList = []
          merchantMap.forEach((merchantName, merchantId) => merchantList.push({ id: merchantId, name: merchantName }))
          this.merchantList = merchantList
        }).finally(() => {
          this.paging.isLoading = false
        })
      },
      getParams() {
        const params = {
          ...this.paging.query
        }

        if (this.paging.query.date) {
          params.date = formatDateAsStart(this.paging.query.date)
        }

        return params
      },
      convertToDateString(date) {
        return moment(date).format('YYYY-MM-DD')
      },
      disabledFilterDate(date) {
        const theDate = moment(date).startOf('days')
        const selected = moment(this.paging.query.date).startOf('days')
        const now = moment().startOf('days')
        const period = now.diff(selected, 'days')
        const diff = now.diff(theDate, 'days')
        return diff < 1 || diff > period
      },
      handleFilter() {
        let filteredList = deepClone(this.list)

        if (this.filtering.date) {
          const date = moment(this.filtering.date)
          filteredList = filteredList.filter(report => date.isSame(moment(report.reportDay)), 'days')
        }

        if (this.filtering.merchantId) {
          filteredList.forEach(report => {
            report.content = report.content.filter(c => c.merchantId === this.filtering.merchantId || c.merchantId === 'summary')
          })
        }

        this.filteredList = filteredList
      }
    }
  }
</script>

<style>
  .report-table {
    margin-bottom: 50px;
  }

  .report-table tr:last-child {
    background-color: #f3f3f3;
  }
</style>
