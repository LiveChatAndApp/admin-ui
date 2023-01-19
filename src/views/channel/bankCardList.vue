<template>
  <div class="app-container calendar-list-container">

    <div class="filter-container">

      <div class="filter-container">
        <bs-select v-model="paging.query.type" :options="BankCardTypeOptions" :placeholder="$t('bankCard.type')" />
        <bs-select v-model="paging.query.status" :options="BankCardStatusOptions" :placeholder="$t('status.status')" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.BankCardList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.BankCardAdd]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row style="width: 100%" v-permission="[Permission.BankCardList]">
        <el-table-column :label="$t('bankCard.cardId')">
          <template slot-scope="scope">{{scope.row.bankCard.cardId}}</template>
        </el-table-column>
        <el-table-column :label="$t('bankCard.payeeCardName')">
          <template slot-scope="scope">{{scope.row.bankCard.payeeCardName}}</template>
        </el-table-column>
        <el-table-column :label="$t('bankCard.payeeCardNo')">
          <template slot-scope="scope">{{scope.row.bankCard.payeeCardNo}}</template>
        </el-table-column>
        <el-table-column :label="$t('bankCard.bankName')">
          <template slot-scope="scope">{{scope.row.bankCard.bankName}}</template>
        </el-table-column>
        <el-table-column :label="$t('bankCard.branchName')">
          <template slot-scope="scope">{{scope.row.bankCard.branchName}}</template>
        </el-table-column>
        <el-table-column :label="$t('bankCard.bankArea')">
          <template slot-scope="scope">{{scope.row.bankCard.bankArea}}</template>
        </el-table-column>
        <el-table-column :label="$t('bankCard.type')">
          <template slot-scope="scope">
            <bs-bank-card-type :status="scope.row.bankCard.type" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('bankCard.usbType')">
          <template slot-scope="scope">
            <bs-usb-type :status="scope.row.bankCard.usbType" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-bank-card-status :status="scope.row.bankCard.status" @on-click-submit="changeStatus(scope.row, $event)"
              v-permission="[Permission.BankCardUpdate]" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.memo')">
          <template slot-scope="scope">{{scope.row.bankCard.memo}}</template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleModify(scope.row)"
              v-permission="[Permission.BankCardUpdate]">
              {{$t('table.edit')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="120px">
          <el-form-item :label="$t('bankCard.type')" prop="type">
            <bs-select v-model="formData.type" :options="BankCardTypeOptions" :placeholder="$t('bankCard.type')" />
          </el-form-item>
          <el-form-item :label="$t('bankCard.cardId')" prop="cardId">
            <bs-input v-model="formData.cardId" :disabled="dialogType===DialogType.Update" />
          </el-form-item>
          <el-form-item :label="$t('merchantList.merchant')" prop="merchantId">
            <bs-select v-model="formData.merchantId" :options="merchantList" />
          </el-form-item>
          <el-form-item :label="$t('bankCard.payeeCardName')" prop="payeeCardName">
            <bs-input v-model="formData.payeeCardName" />
          </el-form-item>
          <el-form-item :label="$t('bankCard.payeeCardNo')" prop="payeeCardNo">
            <bs-input v-model="formData.payeeCardNo" />
          </el-form-item>
          <el-form-item :label="$t('bankCard.bankName')" prop="bankName">
            <bs-bank-select v-model="formData.bankName" />
          </el-form-item>
          <el-form-item :label="$t('bankCard.branchName')" prop="branchName">
            <bs-input v-model="formData.branchName" />
          </el-form-item>
          <el-form-item :label="$t('bankCard.bankArea')" prop="bankArea">
            <bs-input v-model="formData.bankArea" />
          </el-form-item>
          <el-form-item :label="$t('bankCard.loginUsername')" prop="loginUsername">
            <bs-input v-model="formData.loginUsername" />
          </el-form-item>
          <el-form-item :label="$t('bankCard.loginPassword')" prop="loginPassword">
            <bs-input v-model="formData.loginPassword" />
          </el-form-item>
          <el-form-item :label="$t('bankCard.transactionPassword')" prop="transactionPassword">
            <bs-input v-model="formData.transactionPassword" />
          </el-form-item>
          <el-form-item :label="$t('bankCard.usbPassword')" prop="usbPassword">
            <bs-input v-model="formData.usbPassword" />
          </el-form-item>
          <el-form-item :label="$t('bankCard.usbType')" prop="usbType">
            <bs-select v-model="formData.usbType" :options="UsbTypeOptions" :placeholder="$t('bankCard.usbType')" />
          </el-form-item>
          <el-form-item :label="$t('status.status')" prop="status">
            <bs-select v-model="formData.status" :options="BankCardStatusOptions" />
          </el-form-item>
          <el-form-item :label="$t('accountList.mobile')" prop="mobile">
            <bs-input v-model="formData.mobile" />
          </el-form-item>
          <el-form-item :label="$t('bankCard.isToBindAccount')">
            <el-checkbox v-model="isToBindAccount" />
          </el-form-item>
          <el-form-item v-if="isToBindAccount" :label="$t('bankCard.accountName')" prop="accountName">
            <bs-input v-model="formData.accountName" />
          </el-form-item>
          <el-form-item v-if="isToBindAccount" :label="$t('bankCard.accountCatchId')" prop="catchId">
            <bs-input v-model="formData.catchId" />
          </el-form-item>
          <el-form-item v-if="isToBindAccount" :label="$t('accountList.bootServer')" prop="bootServer">
            <bs-input v-model="formData.bootServer" />
          </el-form-item>
          <el-form-item v-if="isToBindAccount" :label="$t('accountList.cost')" prop="cost">
            <bs-input v-model="formData.costRate" />
            % +
            <bs-input v-model="formData.costFixedAmount" />
          </el-form-item>
          <el-form-item v-if="isToBindAccount" :label="$t('accountList.minPayAmount')" prop="minAmount">
            <bs-input v-model="formData.minAmount" />
          </el-form-item>
          <el-form-item v-if="isToBindAccount" :label="$t('accountList.maxPayAmount')" prop="maxAmount">
            <bs-input v-model="formData.maxAmount" />
          </el-form-item>
          <el-form-item v-if="isToBindAccount" :label="$t('accountList.dayMaxPayAmount')" prop="dayMaxAmount">
            <bs-input v-model="formData.dayMaxAmount" />
          </el-form-item>
          <el-form-item v-if="isToBindAccount" :label="$t('accountList.dayMaxPayCount')" prop="dayMaxCount">
            <bs-input v-model="formData.dayMaxCount" />
          </el-form-item>
          <el-form-item v-if="isToBindAccount" :label="$t('accountList.gateway')" prop="gateway">
            <bs-input v-model="formData.gateway" />
          </el-form-item>
          <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-text-area v-model="formData.memo" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="dialogFormVisible=false" />
          <bs-submit-button v-if="dialogType===DialogType.Create" @click="createData" />
          <bs-submit-button v-else @click="updateData" />
        </div>
      </el-dialog>

    </div>
  </div>

</template>

<script>
  import {
    AccountStatusOptions,
    BankCardStatusOptions,
    BankCardTypeOptions,
    DialogTypeOptions,
    UsbTypeOptions
  } from '@/definitions/options'
  import { BankCardType, DialogType, Permission, Status } from '@/definitions/constants'
  import { deepClone, objectMerge } from '@/utils'
  import { moneyToCent, moneyToDollar } from '@/utils/money'
  import { Rules } from '@/definitions/fieldCheck'
  import { addBankCard, getBankCardList, updateBankCard } from '@/api/bankCard'
  import { getMerchantIndexing } from '@/api/indexing'

  export default {
    name: 'bankCard',
    data() {
      return {
        Permission,
        listFormVisible: false,
        dialogFormVisible: false,
        DialogType,
        dialogType: 0,
        DialogTypeOptions,
        paging: {
          isLoading: false,
          totalElements: null,
          query: {
            page: 0,
            rows: undefined
          }
        },
        rules: {
          accountName: [
            ...Rules.name
          ],
          catchId: [
            ...Rules.noSpecialCharacters
          ],
          mobile: [
            ...Rules.mobile
          ],
          cost: [
            {
              trigger: 'blur', validator: (rule, value, callback) => {
                if (!this.formData.costRate && !this.formData.costFixedAmount) {
                  callback(this.$t('rules.required'))
                } else if (this.formData.costRate && isNaN(parseInt(this.formData.costRate))) {
                  callback(this.$t('rules.rate'))
                } else if (this.formData.costFixedAmount && isNaN(parseInt(this.formData.costFixedAmount))) {
                  callback(this.$t('rules.rate'))
                } else {
                  callback()
                }
              }
            }
          ],
          minAmount: [
            {
              trigger: 'blur', validator: (rule, value, callback) => {
                const minAmountNumber = parseInt(value)
                const maxAmountNumber = parseInt(this.formData.maxAmount)
                const dayMaxAmountNumber = parseInt(this.formData.dayMaxAmount)
                if (minAmountNumber > maxAmountNumber || minAmountNumber > dayMaxAmountNumber) {
                  callback(this.$t('rules.minPayAmount'))
                } else {
                  callback()
                }
              }
            },
            ...Rules.payAmount
          ],
          maxAmount: [
            {
              trigger: 'blur', validator: (rule, value, callback) => {
                const minAmountNumber = parseInt(this.formData.minAmount)
                const maxAmountNumber = parseInt(value)
                const dayMaxAmountNumber = parseInt(this.formData.dayMaxAmount)
                if (maxAmountNumber < minAmountNumber || maxAmountNumber > dayMaxAmountNumber) {
                  callback(this.$t('rules.maxPayAmount'))
                } else {
                  callback()
                }
              }
            },
            ...Rules.payAmount
          ],
          dayMaxAmount: [
            {
              trigger: 'blur', validator: (rule, value, callback) => {
                const minAmountNumber = parseInt(this.formData.minAmount)
                const maxAmountNumber = parseInt(this.formData.maxAmount)
                const dayMaxAmountNumber = parseInt(value)
                if (dayMaxAmountNumber < maxAmountNumber || dayMaxAmountNumber < minAmountNumber) {
                  callback(this.$t('rules.dayMaxPayAmount'))
                } else {
                  callback()
                }
              }
            },
            ...Rules.payAmount
          ],
          dayMaxCount: [
            ...Rules.payCount
          ],
          gateway: [
            ...Rules.url
          ],
          type: [
            ...Rules.requiredChange
          ],
          cardId: [
            ...Rules.requiredBlur
          ],
          payeeCardName: [
            ...Rules.requiredBlur
          ],
          payeeCardNo: [
            ...Rules.requiredBlur
          ],
          bankName: [
            ...Rules.requiredChange
          ],
          branchName: [
            ...Rules.requiredBlur
          ],
          bankArea: [
            ...Rules.requiredBlur
          ]
        },
        AccountStatusOptions,
        BankCardStatusOptions,
        BankCardType,
        BankCardTypeOptions,
        UsbTypeOptions,
        defaultFormData: {
          type: BankCardType.ReceiptCard,
          status: Status.Enabled
        },
        formData: {},
        isToBindAccount: false,
        list: [],
        merchantList: []
      }
    },
    created() {
      this.getList()
      this.queryMerchantList()
    },
    methods: {
      getList() {
        this.paging.isLoading = true
        getBankCardList(this.paging.query).then(response => {
          if (response && response.content) {
            response.content.forEach(res => {
              if (res) {
                res.balance = moneyToDollar(res.balance)
                res.frozenAmount = moneyToDollar(res.frozenAmount)
                res.minAmount = moneyToDollar(res.minAmount)
                res.maxAmount = moneyToDollar(res.maxAmount)
                res.dayMaxAmount = moneyToDollar(res.dayMaxAmount)
                res.costFixedAmount = moneyToDollar(res.costFixedAmount)
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
      changeStatus(row, { status, memo }) {
        const data = {
          accountId: row.accountId,
          bankCardId: row.bankCardId,
          status,
          memo
        }
        updateBankCard(data).then(this.getList)
      },
      handleCreate() {
        this.formData = deepClone(this.defaultFormData)
        this.dialogFormVisible = true
        this.dialogType = DialogType.Create
      },
      handleModify(row) {
        this.formData = objectMerge(deepClone(this.defaultFormData), row)
        this.formData = objectMerge(this.formData, row.bankCard)
        this.dialogFormVisible = true
        this.dialogType = DialogType.Update
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.normalizeAmount()
            addBankCard(this.formData).then(() => {
              this.getList()
            })
            this.dialogFormVisible = false
          }
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.normalizeAmount()
            updateBankCard(this.formData).then(() => {
              this.getList()
            })
            this.dialogFormVisible = false
          }
        })
      },
      normalizeAmount() {
        if (this.formData.minAmount) {
          this.formData.minAmount = moneyToCent(this.formData.minAmount)
        }
        if (this.formData.maxAmount) {
          this.formData.maxAmount = moneyToCent(this.formData.maxAmount)
        }
        if (this.formData.dayMaxAmount) {
          this.formData.dayMaxAmount = moneyToCent(this.formData.dayMaxAmount)
        }
        if (this.formData.costFixedAmount) {
          this.formData.costFixedAmount = moneyToCent(this.formData.costFixedAmount)
        }
      },
      queryMerchantList() {
        getMerchantIndexing().then(response => {
          this.merchantList = response.map(merchant => ({
            id: merchant.merchantId,
            name: merchant.merchantName
          }))
        })
      }
    }
  }
</script>
