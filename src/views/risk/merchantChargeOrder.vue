<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <div class="filter-container">
        <bs-input v-model="paging.query.orderId" :placeholder="$t('foundToCofferOrder.orderId')" />
        <bs-select v-model="paging.query.status" :options="statusOptions" :placeholder="$t('payOrderList.status')" />
        <bs-select v-model="paging.query.merchantId" :options="merchantList"
          :placeholder="$t('merchantList.merchant')" />
        <bs-date-range-picker v-model="paging.query.dates" :clearable="true" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.MerchantChargeOrderList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.MerchantChargeOrderAdd]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.MerchantChargeOrderList]">
        <el-table-column :label="$t('merchantList.merchant')">
          <template slot-scope="scope">{{scope.row.merchantName}}</template>
        </el-table-column>
        <el-table-column :label="$t('merchantChargeOrder.orderId')">
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column :label="$t('merchantChargeOrder.amount')">
          <template slot-scope="scope">{{scope.row.amount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToMerchantOrder.createTime')">
          <template slot-scope="scope">{{scope.row.createTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToMerchantOrder.updateTime')">
          <template slot-scope="scope">{{scope.row.updateTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToMerchantOrder.operator')">
          <template slot-scope="scope">{{scope.row.operator}}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <el-tag :type="statusOptions[scope.row.status].color">
              {{statusOptions[scope.row.status].name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <bs-button @click="handleReason(scope.row)" :title="$t('merchantChargeOrder.reason')" />
            <bs-button v-if="scope.row.status === 0" @click="handleAgree(scope.row)" :title="$t('table.agree')"
              v-permission="[Permission.MerchantChargeOrderUpdate]" />
            <bs-cancel-button v-if="scope.row.status === 0" @click="handleCancel(scope.row)"
              v-permission="[Permission.MerchantChargeOrderUpdate]" />
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('merchantList.merchant')" prop="merchantId">
            <bs-select v-model="formData.merchantId" :options="merchantList" />
          </el-form-item>
          <el-form-item :label="$t('merchantChargeOrder.amount')" prop="amount">
            <bs-input v-model="formData.amount" @change="onAmountChange($event)" />
          </el-form-item>
          <el-form-item :label="$t('merchantChargeOrder.reason')" prop="reason">
            <bs-text-area v-model="formData.reason" :placeholder="$t('merchantChargeOrder.reasonPlaceholder')" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="dialogFormVisible=false" />
          <bs-submit-button v-if="dialogType===DialogType.Create" @click="createData" />
          <bs-submit-button v-else @click="updateData" />
        </div>
      </el-dialog>

      <el-dialog :title="`${$t('merchantChargeOrder.orderId')} ${selectedOrder.orderId}`"
        :visible.sync="dialogReasonVisible" v-if="selectedOrder" :close-on-click-modal="false" :show-close="true">
        <el-form label-position="left" label-width="100px">
          <el-form-item :label="$t('merchantList.merchant')">
            {{selectedOrder.merchantName}}
          </el-form-item>
          <el-form-item :label="$t('merchantChargeOrder.amount')">
            {{selectedOrder.amount}}
          </el-form-item>
          <el-form-item :label="$t('status.status')">
            <el-tag :type="statusOptions[selectedOrder.status].color">
              {{statusOptions[selectedOrder.status].name}}
            </el-tag>
          </el-form-item>
          <el-form-item :label="$t('merchantChargeOrder.reason')">
            <pre>{{selectedOrder.reason}}</pre>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-button :title="$t('table.confirm')" @click="dialogReasonVisible=false" />
        </div>
      </el-dialog>

    </div>

  </div>

</template>

<script>
  import { DialogType, Permission } from '@/definitions/constants'
  import { moneyToCent, moneyToDollar } from '@/utils/money'
  import { deepClone } from '@/utils'
  import { DialogTypeOptions } from '@/definitions/options'
  import { Rules } from '@/definitions/fieldCheck'
  import {
    addMerchantChargeOrder,
    getMerchantChargeOrderList,
    updateMerchantChargeOrder
  } from '@/api/merchantChargeOrder'
  import { getMerchantIndexing } from '@/api/indexing'
  import moment from 'moment'
  import { formatDateAsEnd, formatDateAsStart } from '@/utils/format'

  export default {
    name: 'merchantChargeOrder',
    data() {
      return {
        Permission,
        dialogFormVisible: false,
        dialogReasonVisible: false,
        DialogType,
        dialogType: 0,
        DialogTypeOptions,
        paging: {
          isLoading: false,
          totalElements: null,
          query: {
            dates: [moment().subtract(7, 'day').toDate(), moment().toDate()],
            page: 0,
            rows: undefined
          }
        },
        rules: {
          merchantId: [
            ...Rules.requiredBlur,
            ...Rules.name
          ],
          amount: [
            ...Rules.requiredBlur,
            ...Rules.payAmount
          ],
          reason: [
            ...Rules.requiredBlur
          ]
        },
        defaultFormData: {
          merchantId: undefined,
          amount: undefined
        },
        formData: {},
        statusOptions: [
          { id: 0, name: this.$t('merchantChargeOrder.statusOptions.created') },
          { id: 1, name: this.$t('merchantChargeOrder.statusOptions.finished'), color: 'success' },
          { id: 2, name: this.$t('merchantChargeOrder.statusOptions.canceled'), color: 'danger' }
        ],
        list: [],
        merchantList: [],
        selectedOrder: undefined
      }
    },
    mounted() {
      this.getList()
      this.queryMerchantList()
    },
    methods: {
      getList() {
        this.paging.isLoading = true
        getMerchantChargeOrderList(this.getQueryParams()).then(response => {
          if (response && response.content) {
            response.content.forEach(order => {
              order.amount = moneyToDollar(order.amount)
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
      handleCreate() {
        this.formData = deepClone(this.defaultFormData)
        this.dialogFormVisible = true
        this.dialogType = DialogType.Create
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const data = deepClone(this.formData)
            data.amount = moneyToCent(data.amount)
            addMerchantChargeOrder(data).then(() => {
              this.getList()
            })
            this.dialogFormVisible = false
          }
        })
      },
      handleReason(row) {
        this.selectedOrder = row
        this.dialogReasonVisible = true
      },
      handleAgree(row) {
        this.paging.isLoading = true
        updateMerchantChargeOrder({ orderId: row.orderId, status: this.statusOptions[1].id }).then(() => {
          this.paging.isLoading = false
          this.getList()
        }).catch(() => {
          this.paging.isLoading = false
        })
      },
      handleCancel(row) {
        this.paging.isLoading = true
        updateMerchantChargeOrder({ orderId: row.orderId, status: this.statusOptions[2].id }).then(() => {
          this.paging.isLoading = false
          this.getList()
        }).catch(() => {
          this.paging.isLoading = false
        })
      },
      queryMerchantList() {
        getMerchantIndexing().then(response => {
          this.merchantList = response.map(res => ({ id: res.merchantId, name: res.merchantName }))
        })
      },
      onClickComputeFee() {
        const amount = parseFloat(this.formData.amount)
        if (amount) {
          this.formData.amount = amount.toFixed(2)
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
      }
    }
  }
</script>
