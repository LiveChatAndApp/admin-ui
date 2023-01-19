<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <div class="filter-container">
        <bs-input v-model="paging.query.orderNo" :placeholder="$t('bankCardOrderList.orderNo')" />
        <bs-select v-model="paging.query.matched" :options="BankCardOrderMatchedOptions"
          :placeholder="$t('wyOrderList.matched')" />
        <bs-select v-model="paging.query.transferType" :options="BankCardOrderTransferTypeOptions"
          :placeholder="$t('bankCardOrderList.transferType')" />
        <bs-date-range-picker v-model="paging.query.createDates" :clearable="true"
          :placeholder="$t('wyOrderList.createTime')" />
        <bs-date-range-picker v-model="paging.query.updateDates" :clearable="true"
          :placeholder="$t('wyOrderList.updateTime')" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.BankCardOrderList]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')"
        class="report-table" border fit highlight-current-row v-permission="[Permission.BankCardOrderList]">
        <el-table-column :label="$t('bankCardOrderList.orderNo')">
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
        <el-table-column :label="$t('bankCardOrderList.payeeCardNo')">
          <template slot-scope="scope">{{scope.row.payeeCardNo}}</template>
        </el-table-column>
        <el-table-column :label="$t('payOrderList.amount')">
          <template slot-scope="scope">{{scope.row.amount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('bankCardOrderList.payerCardNo')">
          <template slot-scope="scope">{{scope.row.payerCardNo}}</template>
        </el-table-column>
        <el-table-column :label="$t('bankCardOrderList.payerCardName')">
          <template slot-scope="scope">{{scope.row.payerCardName}}</template>
        </el-table-column>
        <el-table-column :label="$t('bankCardOrderList.payerBankName')">
          <template slot-scope="scope">{{scope.row.payerBankName}}</template>
        </el-table-column>
        <el-table-column :label="$t('bankCardOrderList.chargeTime')">
          <template slot-scope="scope">{{scope.row.chargeTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('wyOrderList.createTime')">
          <template slot-scope="scope">{{scope.row.createTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('wyOrderList.updateTime')">
          <template slot-scope="scope">{{scope.row.updateTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('wyOrderList.matched')">
          <template slot-scope="scope">
            <el-tag :type="getMatchedOption(scope.row.matched).color">
              {{getMatchedOption(scope.row.matched).name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('bankCardOrderList.transferType')">
          <template slot-scope="scope">
            <el-tag :type="getTransferTypeOption(scope.row.transferType).color">
              {{getTransferTypeOption(scope.row.transferType).name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <bs-detail-button @click="handleDetail(scope.row)" v-permission="[Permission.BankCardOrderList]" />
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="detail.orderId" :visible.sync="dialogDetailVisible" v-if="dialogDetailVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form ref="dataForm" :model="detail" label-position="left" label-width="140px">
          <el-form-item :label="$t('bankCardOrderList.orderNo')">
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
          <el-form-item :label="$t('bankCardOrderList.payeeCardNo')">
            {{detail.payeeCardNo}}
          </el-form-item>
          <el-form-item :label="$t('payOrderList.amount')">
            {{detail.amount | money}}
          </el-form-item>
          <el-form-item :label="$t('bankCardOrderList.payerCardNo')">
            {{detail.payerCardNo}}
          </el-form-item>
          <el-form-item :label="$t('bankCardOrderList.payerCardName')">
            {{detail.payerCardName}}
          </el-form-item>
          <el-form-item :label="$t('bankCardOrderList.payerBankName')">
            {{detail.payerBankName}}
          </el-form-item>
          <el-form-item :label="$t('bankCardOrderList.chargeTime')">
            {{detail.chargeTime | moment}}
          </el-form-item>
          <el-form-item :label="$t('wyOrderList.createTime')">
            {{detail.createTime | moment}}
          </el-form-item>
          <el-form-item :label="$t('wyOrderList.updateTime')">
            {{detail.updateTime | moment}}
          </el-form-item>
          <el-form-item :label="$t('wyOrderList.matched')">
            <el-tag :type="getMatchedOption(detail.matched).color">
              {{getMatchedOption(detail.matched).name}}
            </el-tag>
          </el-form-item>
          <el-form-item :label="$t('bankCardOrderList.transferType')">
            <el-tag :type="getTransferTypeOption(detail.transferType).color">
              {{getTransferTypeOption(detail.transferType).name}}
            </el-tag>
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
  import { BankCardOrderMatchedOptions, BankCardOrderTransferTypeOptions } from '@/definitions/options'
  import { formatDateAsEnd, formatDateAsStart } from '@/utils/format'
  import { moneyToDollar } from '@/utils/money'
  import { getBankCardOrderList } from '@/api/bankCardOrder'

  export default {
    name: 'bankCardOrderList',
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
        BankCardOrderMatchedOptions,
        BankCardOrderTransferTypeOptions,
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
        getBankCardOrderList(this.getQueryParams()).then(response => {
          response.content.forEach(res => {
            res.amount = moneyToDollar(res.amount)
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
      getMatchedOption(matched) {
        for (const matchedOption of BankCardOrderMatchedOptions) {
          if (matchedOption.id === matched) {
            return matchedOption
          }
        }
      },
      getTransferTypeOption(transferType) {
        for (const transferTypeOption of BankCardOrderTransferTypeOptions) {
          if (transferTypeOption.id === transferType) {
            return transferTypeOption
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
