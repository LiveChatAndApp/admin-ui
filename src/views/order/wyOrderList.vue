<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <div class="filter-container">
        <bs-input v-model="paging.query.orderNo" :placeholder="$t('wyOrderList.orderNo')" />
        <bs-select v-model="paging.query.status" :options="WyOrderStatusOptions"
          :placeholder="$t('payOrderList.status')" />
        <bs-select v-model="paging.query.matched" :options="WyOrderMatchedOptions"
          :placeholder="$t('wyOrderList.matched')" />
        <bs-date-range-picker v-model="paging.query.createDates" :clearable="true"
          :placeholder="$t('wyOrderList.createTime')" />
        <bs-date-range-picker v-model="paging.query.updateDates" :clearable="true"
          :placeholder="$t('wyOrderList.updateTime')" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.WyOrderList]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')"
        class="report-table" border fit highlight-current-row v-permission="[Permission.WyOrderList]">
        <el-table-column :label="$t('wyOrderList.orderNo')">
          <template slot-scope="scope">{{scope.row.orderNo}}</template>
        </el-table-column>
        <el-table-column :label="$t('payOrderList.orderId')">
          <template slot-scope="scope">{{scope.row.payOrderId}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountList.catchId')">
          <template slot-scope="scope">{{scope.row.catchId}}</template>
        </el-table-column>
        <el-table-column :label="$t('payOrderList.accountName')">
          <template slot-scope="scope">{{scope.row.accountName}}</template>
        </el-table-column>
        <el-table-column :label="$t('bankCard.bankName')">
          <template slot-scope="scope">{{scope.row.bankName}}</template>
        </el-table-column>
        <el-table-column :label="$t('payOrderList.amount')">
          <template slot-scope="scope">{{scope.row.amount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('wyOrderList.chargeTime')">
          <template slot-scope="scope">{{scope.row.chargeTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('wyOrderList.createTime')">
          <template slot-scope="scope">{{scope.row.createTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('wyOrderList.updateTime')">
          <template slot-scope="scope">{{scope.row.updateTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('payOrderList.status')">
          <template slot-scope="scope">
            <el-tag :type="getStatusOption(scope.row.status).color">
              {{getStatusOption(scope.row.status).name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('wyOrderList.matched')">
          <template slot-scope="scope">
            <el-tag :type="getMatchedOption(scope.row.matched).color">
              {{getMatchedOption(scope.row.matched).name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <bs-detail-button @click="handleDetail(scope.row)" v-permission="[Permission.WyOrderList]" />
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="detail.orderId" :visible.sync="dialogDetailVisible" v-if="dialogDetailVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form ref="dataForm" :model="detail" label-position="left" label-width="140px">
          <el-form-item :label="$t('wyOrderList.orderNo')">
            {{detail.orderNo}}
          </el-form-item>
          <el-form-item :label="$t('payOrderList.orderId')">
            {{detail.payOrderId}}
          </el-form-item>
          <el-form-item :label="$t('accountList.catchId')">
            {{detail.catchId}}
          </el-form-item>
          <el-form-item :label="$t('payOrderList.accountName')">
            {{detail.accountName}}
          </el-form-item>
          <el-form-item :label="$t('bankCard.bankName')">
            {{detail.bankName}}
          </el-form-item>
          <el-form-item :label="$t('payOrderList.amount')">
            {{detail.amount | money}}
          </el-form-item>
          <el-form-item :label="$t('wyOrderList.chargeTime')">
            {{detail.chargeTime | moment}}
          </el-form-item>
          <el-form-item :label="$t('wyOrderList.createTime')">
            {{detail.createTime | moment}}
          </el-form-item>
          <el-form-item :label="$t('wyOrderList.updateTime')">
            {{detail.updateTime | moment}}
          </el-form-item>
          <el-form-item :label="$t('payOrderList.status')">
            <el-tag :type="getStatusOption(detail.status).color">
              {{getStatusOption(detail.status).name}}
            </el-tag>
          </el-form-item>
          <el-form-item :label="$t('wyOrderList.matched')">
            <el-tag :type="getMatchedOption(detail.matched).color">
              {{getMatchedOption(detail.matched).name}}
            </el-tag>
          </el-form-item>
          <el-form-item label="bankCard">
            {{detail.dataObject.bankCard}}
          </el-form-item>
          <el-form-item label="chargeFailReason">
            {{detail.dataObject.chargeFailReason}}
          </el-form-item>
          <el-form-item label="Data">
            {{detail.data}}
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="dialogDetailVisible=false" />
        </div>
      </el-dialog>

    </div>

  </div>

</template>

<script>
  import { Permission } from '@/definitions/constants'
  import { exportWithdrawOrderList } from '@/api/withdrawOrder'
  import { Message } from 'element-ui'
  import moment from 'moment'
  import { getWyOrderList } from '@/api/wyOrder'
  import { WyOrderMatchedOptions, WyOrderStatusOptions } from '@/definitions/options'
  import { formatDateAsEnd, formatDateAsStart } from '@/utils/format'
  import { moneyToDollar } from '@/utils/money'

  export default {
    name: 'wyOrderList',
    data() {
      return {
        Permission,
        dialogDetailVisible: false,
        paging: {
          isLoading: false,
          totalElements: null,
          query: {
            createDates: [moment().subtract(7, 'day').toDate(), moment().toDate()],
            page: 0,
            rows: undefined
          }
        },
        WyOrderMatchedOptions,
        WyOrderStatusOptions,
        list: [],
        detail: {}
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        if (this.paging.query.dates && this.paging.query.successDates) {
          Message({
            message: this.$t('payOrderList.error.dates'),
            type: 'error',
            duration: 5 * 1000
          })
          return
        }

        this.paging.isLoading = true
        getWyOrderList(this.getQueryParams()).then(response => {
          response.content.forEach(res => {
            res.amount = moneyToDollar(res.amount)
            res.dataObject = JSON.parse(res.data)
          })
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
      handleExport() {
        this.paging.query.page = 0
        exportWithdrawOrderList(this.getQueryParams())
      },
      handleDetail(row) {
        this.detail = row
        this.dialogDetailVisible = true
      },
      getStatusOption(status) {
        for (const statusOption of WyOrderStatusOptions) {
          if (statusOption.id === status) {
            return statusOption
          }
        }
      },
      getMatchedOption(matched) {
        for (const matchedOption of WyOrderMatchedOptions) {
          if (matchedOption.id === matched) {
            return matchedOption
          }
        }
      },
      getQueryParams() {
        const params = {
          ...this.paging.query
        }

        if (this.paging.query.createDates) {
          params.startCreateTime = formatDateAsStart(this.paging.query.createDates[0])
          params.endCreateTime = formatDateAsEnd(this.paging.query.createDates[1])
          params.createDates = undefined
        }

        if (this.paging.query.updateDates) {
          params.startUpdateTime = formatDateAsStart(this.paging.query.updateDates[0])
          params.endUpdateTime = formatDateAsEnd(this.paging.query.updateDates[1])
          params.updateDates = undefined
        }

        return params
      }
    }
  }
</script>
