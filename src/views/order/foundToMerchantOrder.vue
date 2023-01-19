<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-input v-model="paging.query.orderId" :placeholder="$t('foundToCofferOrder.orderId')" />
        <bs-select v-model="paging.query.status" :options="statusOptions" :placeholder="$t('payOrderList.status')" />
        <bs-select v-if="isSuperAdmin()" v-model="paging.query.merchantId" :options="merchantList"
          :placeholder="$t('merchantList.merchant')" />
        <bs-date-range-picker v-model="paging.query.dates" :clearable="true"
          :placeholder="$t('payOrderList.applyDate')" />
        <bs-date-range-picker v-model="paging.query.updateDates" :clearable="true"
          :placeholder="$t('payOrderList.successDate')" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.FoundToMerchantOrderList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.FoundToMerchantOrderAdd]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.FoundToMerchantOrderList]">
        <el-table-column :label="$t('merchantList.merchant')">
          <template slot-scope="scope">{{scope.row.merchantName}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToMerchantOrder.orderId')">
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToMerchantOrder.payeeCardName')">
          <template slot-scope="scope">{{scope.row.payeeCardName}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToMerchantOrder.bankName')">
          <template slot-scope="scope">
            <el-button @click="showCardDetail(scope.row)">{{scope.row.bankName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('foundToMerchantOrder.amount')">
          <template slot-scope="scope">{{scope.row.amount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToMerchantOrder.fee')">
          <template slot-scope="scope">{{scope.row.fee | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToMerchantOrder.creator')">
          <template slot-scope="scope">{{scope.row.creator}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToMerchantOrder.createTime')">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToMerchantOrder.updateTime')">
          <template slot-scope="scope">{{scope.row.updateTime}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToMerchantOrder.operator')">
          <template slot-scope="scope">{{scope.row.operator}}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <el-tag :type="statusOptions[scope.row.status].color">{{statusOptions[scope.row.status].name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 0 && isSuperAdmin()" @click="handleCommit(scope.row)" size="mini"
              type="primary" v-permission="[Permission.FoundToMerchantOrderStatusUpdate]">{{$t('table.finish')}}
            </el-button>
            <el-button v-if="scope.row.status === 0" @click="handleCancel(scope.row)" size="mini" type="primary"
              v-permission="[Permission.FoundToMerchantOrderStatusUpdate]">{{$t('table.cancel')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('merchantList.merchant')" prop="merchantId">
            <bs-select v-if="isSuperAdmin()" v-model="formData.merchantId" :options="merchantList"
              @change="onMerchantChange($event)" />
            <span>{{$store.getters.user.merchantName}}</span>
          </el-form-item>
          <el-form-item :label="$t('merchantList.balance')">{{balance | money}}</el-form-item>
          <el-form-item :label="$t('foundToMerchantOrder.amount')" prop="amount">
            <bs-input v-model="formData.amount" @change="onClickComputeFee" />
          </el-form-item>
          <el-form-item :label="$t('foundToMerchantOrder.fee')">{{formData.rateFixedAmount | money}}</el-form-item>
          <el-form-item :label="$t('foundToMerchantOrder.payeeCardName')" prop="payeeCardName">
            <bs-input v-model="formData.payeeCardName" />
            <br />
            <bs-select v-model="formData.bankCardId" :options="bankCardOptions" @change="onSelectBankCard($event)"
              :placeholder="$t('foundToMerchantOrder.bankCard')" />
          </el-form-item>
          <el-form-item :label="$t('foundToMerchantOrder.bankName')" prop="bankName">
            <bs-bank-select v-model="formData.bankName" />
          </el-form-item>
          <el-form-item :label="$t('foundToMerchantOrder.branchName')" prop="branchName">
            <bs-input v-model="formData.branchName" />
          </el-form-item>
          <el-form-item :label="$t('foundToMerchantOrder.payeeCardNo')" prop="payeeCardNo">
            <bs-input v-model="formData.payeeCardNo" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="dialogFormVisible=false" />
          <bs-submit-button v-if="dialogType===DialogType.Create" @click="createData" />
        </div>
      </el-dialog>

      <el-dialog :title="selectedRow.orderId" :visible.sync="dialogShowDetail" v-if="dialogShowDetail"
        :close-on-click-modal="false" :show-close="true">
        <el-form :model="selectedRow" label-position="left" label-width="100px">
          <el-form-item :label="$t('foundToMerchantOrder.payeeCardName')">{{selectedRow.payeeCardName}}</el-form-item>
          <el-form-item :label="$t('foundToMerchantOrder.bankName')">{{selectedRow.bankName}}</el-form-item>
          <el-form-item :label="$t('foundToMerchantOrder.branchName')">{{selectedRow.branchName}}</el-form-item>
          <el-form-item :label="$t('foundToMerchantOrder.payeeCardNo')">{{selectedRow.payeeCardNo}}</el-form-item>
          <el-form-item :label="$t('foundToMerchantOrder.amount')">{{selectedRow.amount | money}}</el-form-item>
          <el-form-item :label="$t('foundToMerchantOrder.fee')">
            <bs-input
              v-if="hasAcl(Permission.FoundToMerchantOrderFeeUpdate)&&selectedRow.status===FoundToMerchantOrderStatus.Created"
              v-model="selectedRow.rateFixedAmount" />
            <div v-else>{{selectedRow.rateFixedAmount | money}}</div>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" v-permission="[Permission.FoundToMerchantOrderFeeUpdate]">
          <bs-cancel-button v-if="selectedRow.status===FoundToMerchantOrderStatus.Created"
            @click="dialogShowDetail=false" />
          <bs-submit-button v-if="selectedRow.status===FoundToMerchantOrderStatus.Created"
            @click="updateFoundToMerchantOrderFee" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { BankCardType, DialogType, Permission, UserLevel } from '@/definitions/constants'
import { moneyToDollar, moneyToCent } from '@/utils/money'
import {
  addFoundToMerchantOrder,
  getFoundToMerchantOrderList,
  updateFoundToMerchantOrderStatus,
  updateFoundToMerchantOrderFee
} from '@/api/foundToMerchantOrder'
import { getMerchantList } from '@/api/merchant'
import { deepClone } from '@/utils'
import { DialogTypeOptions } from '@/definitions/options'
import { Rules } from '@/definitions/fieldCheck'
import { Message } from 'element-ui'
import { getMerchantProfile } from '@/api/profile'
import { getMerchantIndexing, getMostUsedBankCardIndexing } from '@/api/indexing'
import moment from 'moment'
import { formatDateAsEnd, formatDateAsStart } from '@/utils/format'
import { hasAcl } from '@/utils/auth'
import { FoundToMerchantOrderStatus } from '../../definitions/constants'
import { isSuperAdminLevel } from '@/utils/user'

export default {
  name: 'foundToCofferOrder',
  data() {
    return {
      Permission,
      dialogFormVisible: false,
      dialogShowDetail: false,
      DialogType,
      dialogType: 0,
      DialogTypeOptions,
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
      rules: {
        merchantId: [...Rules.requiredChange],
        amount: [
          ...Rules.requiredBlur,
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (parseFloat(value) + parseFloat(this.formData.rateFixedAmount) > this.balance) {
                callback(this.$t('foundToMerchantOrder.rules.amount'))
              } else {
                callback()
              }
            }
          },
          ...Rules.payAmount
        ],
        payeeCardName: [...Rules.requiredBlur, ...Rules.name],
        payeeCardNo: [...Rules.requiredBlur, ...Rules.cardNo],
        bankName: [...Rules.requiredBlur, ...Rules.name],
        branchName: [...Rules.requiredBlur, ...Rules.name]
      },
      UserLevel,
      defaultFormData: {
        merchantId: undefined,
        amount: 0,
        rateFixedAmount: 0
      },
      formData: {},
      FoundToMerchantOrderStatus,
      statusOptions: [
        { id: FoundToMerchantOrderStatus.Created, name: this.$t('foundToMerchantOrder.statusOptions.created') },
        {
          id: FoundToMerchantOrderStatus.Finished,
          name: this.$t('foundToMerchantOrder.statusOptions.finished'),
          color: 'success'
        },
        {
          id: FoundToMerchantOrderStatus.Canceled,
          name: this.$t('foundToMerchantOrder.statusOptions.canceled'),
          color: 'danger'
        }
      ],
      list: [],
      merchantList: [],
      bankCardList: [],
      bankCardOptions: [],
      balance: 0,
      selectedRow: {}
    }
  },
  mounted() {
    this.getList()
    if (this.isSuperAdmin()) {
      this.queryMerchantList()
    }
  },
  methods: {
    hasAcl,
    getList() {
      if (this.paging.query.dates && this.paging.query.updateDates) {
        Message({
          message: this.$t('payOrderList.error.dates'),
          type: 'error',
          duration: 5 * 1000
        })
        return
      }

      this.paging.isLoading = true
      getFoundToMerchantOrderList(this.getQueryParams()).then(response => {
        if (response && response.content) {
          response.content.forEach(order => {
            order.amount = moneyToDollar(order.amount)
            order.rateFixedAmount = moneyToDollar(order.rateFixedAmount)
            order.fee = moneyToDollar(order.fee)
            order.bankName = `${order.bankName} (${order.payeeCardNo.substr(-4, order.payeeCardNo.length)})`
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
      this.balance = 0
      this.formData = deepClone(this.defaultFormData)
      if (!this.isSuperAdmin()) {
        this.formData.merchantId = this.$store.getters.user.merchantId
        getMerchantProfile().then(response => {
          this.balance = moneyToDollar(response.balance)
        })
      }
      this.dialogFormVisible = true
      this.dialogType = DialogType.Create

      if (!this.isSuperAdmin()) {
        this.queryBankCardList(this.formData.merchantId)
      }
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const data = deepClone(this.formData)
          data.amount = moneyToCent(data.amount)
          data.rateFixedAmount = moneyToCent(data.rateFixedAmount)

          this.paging.isLoading = true
          addFoundToMerchantOrder(data)
            .then(() => {
              this.paging.isLoading = false
              this.getList()
            })
            .catch(() => {
              this.paging.isLoading = false
            })
          this.dialogFormVisible = false
        }
      })
    },
    handleCommit(row) {
      this.paging.isLoading = true
      updateFoundToMerchantOrderStatus({ orderId: row.orderId, status: this.statusOptions[1].id })
        .then(() => {
          this.paging.isLoading = false
          this.getList()
        })
        .catch(() => {
          this.paging.isLoading = false
        })
    },
    handleCancel(row) {
      this.paging.isLoading = true
      updateFoundToMerchantOrderStatus({ orderId: row.orderId, status: this.statusOptions[2].id })
        .then(() => {
          this.paging.isLoading = false
          this.getList()
        })
        .catch(() => {
          this.paging.isLoading = false
        })
    },
    isSuperAdmin() {
      return isSuperAdminLevel(this.$store)
    },
    queryMerchantList() {
      getMerchantIndexing().then(response => {
        this.merchantList = response.map(res => ({ id: res.merchantId, name: res.merchantName }))
      })
    },
    onMerchantChange(merchantId) {
      this.queryMerchantBalance(merchantId)
      this.queryBankCardList(merchantId)
    },
    queryMerchantBalance(merchantId) {
      getMerchantList({ merchantId, paging: false }).then(response => {
        this.balance = moneyToDollar(response.balance)
      })
    },
    queryBankCardList(merchantId) {
      this.$set(this.formData, 'bankCardId', undefined)
      getMostUsedBankCardIndexing({ merchantId, type: BankCardType.PaymentCard }).then(response => {
        this.bankCardList = response
        this.bankCardOptions = response.map(bankCard => ({ id: bankCard.bankCardId, name: bankCard.cardId }))
      })
    },
    showCardDetail(row) {
      this.selectedRow = row
      this.dialogShowDetail = true
    },
    onSelectBankCard(bankCardId) {
      const bankCard = this.bankCardList.find(bc => bc.bankCardId === bankCardId)
      if (!bankCard) {
        return
      }

      this.formData.payeeCardName = bankCard.payeeCardName
      this.formData.payeeCardNo = bankCard.payeeCardNo
      this.formData.bankName = bankCard.bankName
      this.formData.branchName = bankCard.branchName
    },
    onClickComputeFee() {
      this.formData.amount = parseFloat(this.formData.amount).toFixed(2)
      const amount = parseFloat(this.formData.amount)
      if (amount && amount > 0) {
        const rateFixedAmount = this.computeFee(amount)

        if (rateFixedAmount + amount > this.balance) {
          const adjustedFee = this.computeFeeFromBalance(this.balance)
          const adjustedAmount = this.balance - adjustedFee
          this.formData.amount = adjustedAmount.toFixed(2)
          this.formData.rateFixedAmount = adjustedFee
        } else {
          this.formData.rateFixedAmount = rateFixedAmount
        }
      } else {
        this.formData.rateFixedAmount = 0
      }
    },
    computeFeeFromBalance(balance) {
      const rateFixedAmount = balance - balance / 1.002
      return parseFloat(rateFixedAmount.toFixed(2))
    },
    computeFee(amount) {
      const rateFixedAmount = amount * 0.002
      return parseFloat(rateFixedAmount.toFixed(2))
    },
    onFeeChange(rateFixedAmount) {
      this.formData.rateFixedAmount = parseFloat(rateFixedAmount).toFixed(2)
    },
    getQueryParams() {
      const params = {
        ...this.paging.query
      }

      if (params.dates) {
        params.startTime = formatDateAsStart(this.paging.query.dates[0])
        params.endTime = formatDateAsEnd(this.paging.query.dates[1])
        params.dates = undefined
      }

      if (params.updateDates) {
        params.startUpdateTime = formatDateAsStart(this.paging.query.updateDates[0])
        params.endUpdateTime = formatDateAsEnd(this.paging.query.updateDates[1])
        params.updateDates = undefined
      }

      return params
    },
    updateFoundToMerchantOrderFee() {
      const clone = deepClone(this.selectedRow)
      clone.rateFixedAmount = moneyToCent(this.selectedRow.rateFixedAmount)
      updateFoundToMerchantOrderFee(clone)
        .then(() => {
          this.paging.isLoading = false
          this.dialogShowDetail = false
          this.getList()
        })
        .catch(() => {
          this.paging.isLoading = false
        })
    }
  }
}
</script>
