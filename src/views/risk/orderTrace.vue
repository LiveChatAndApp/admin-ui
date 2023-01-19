<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-input v-model="paging.query.orderId" :placeholder="$t('payOrderList.orderId')" />
        <bs-input v-model="paging.query.ip" placeholder="IP" />
        <bs-select v-model="paging.query.merchantId" :options="merchantList" :placeholder="$t('merchantList.merchant')"
          filterable v-permission="[Permission.IndexingMerchant]" />
        <bs-input v-model="paging.query.userId" :placeholder="$t('orderTraceList.userId')" />
        <bs-date-range-picker v-model="paging.query.dates" :placeholder="$t('orderTraceList.applyDate')"
          :clearable="false" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.OrderTraceList]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.OrderTraceList]">
        <el-table-column :label="$t('payOrderList.orderId')">
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column :label="$t('merchantList.merchant')">
          <template slot-scope="scope">{{scope.row.merchantName}}</template>
        </el-table-column>
        <el-table-column :label="$t('orderTraceList.userId')">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column :label="$t('orderTraceList.ip')">
          <template slot-scope="scope">{{scope.row.ip}}</template>
        </el-table-column>
        <el-table-column label="User Agent">
          <template slot-scope="scope">{{scope.row.userAgent}}</template>
        </el-table-column>
        <el-table-column :label="$t('orderTraceList.location')">
          <template slot-scope="scope">
            <span v-if="!!scope.row.ipInfo">
              {{scope.row.isp}}
              <br />
              {{scope.row.ipInfo}}
            </span>
            <bs-detail-button v-else @click="handleIpInfo(scope.row)" v-permission="[Permission.OrderTraceList]" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('timestamp.createTime')">
          <template slot-scope="scope">{{scope.row.createTime | moment}}</template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Permission } from '@/definitions/constants'
import { getOrderTraceList } from '@/api/orderTrace'
import moment from 'moment'
import { formatDateAsEnd, formatDateAsStart } from '@/utils/format'
import { getMerchantIndexing } from '@/api/indexing'

export default {
  name: 'orderTrace',
  data() {
    return {
      Permission,
      dialogFormVisible: false,
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
          page: 0,
          rows: undefined
        }
      },
      list: [],
      merchantList: [],
      detail: undefined
    }
  },
  created() {
    this.queryMerchantList()
  },
  methods: {
    getList() {
      this.paging.isLoading = true
      getOrderTraceList(this.getQueryParams()).then(response => {
        const briefHtmlLength = 64
        if (response && response.content) {
          response.content.forEach(res => {
            if (res.html && res.html.length > briefHtmlLength) {
              res.briefHtml = res.html.substr(0, briefHtmlLength) + ' ...'
            }
          })
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
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    handleIpInfo(row) {
      this.detail = row
      this.dialogFormVisible = true
      axios
        .get('http://ip-api.com/json/' + row.ip)
        .then(response => {
          // handle success
          const data = response.data
          this.$set(row, 'isp', data.isp)
          this.$set(row, 'ipInfo', `${data.as}, ${data.city}, ${data.regionName}, ${data.country}`)
        })
        .catch(error => {
          // handle error
          console.log(error)
        })

      this.dialogFormVisible = false
    },
    queryMerchantList() {
      getMerchantIndexing().then(response => {
        this.merchantList = response.map(res => ({ id: res.merchantId, name: res.merchantName }))
      })
    },
    getQueryParams() {
      const params = {
        orderId: this.paging.query.orderId,
        ip: this.paging.query.ip,
        merchantId: this.paging.query.merchantId,
        userId: this.paging.query.userId
      }

      if (this.paging.query.dates) {
        params.startTime = formatDateAsStart(this.paging.query.dates[0])
        params.endTime = formatDateAsEnd(this.paging.query.dates[1])
        params.dates = undefined
      }

      return params
    }
  }
}
</script>

<style scoped>

</style>
