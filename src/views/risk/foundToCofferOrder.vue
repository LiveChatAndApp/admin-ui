<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <div class="filter-container">
        <bs-input v-model="paging.query.orderId" :placeholder="$t('foundToCofferOrder.orderId')" />
        <bs-select v-model="paging.query.status" :options="statusOptions" :placeholder="$t('payOrderList.status')" />
        <bs-select v-model="paging.query.type" :options="FoundToCofferTypeOptions"
          :placeholder="$t('foundToCofferOrder.type')" />
        <bs-select v-model="paging.query.accountIdFrom" :options="accountList"
          :placeholder="$t('foundToCofferOrder.accountFrom')" />
        <bs-select v-model="paging.query.accountIdTo" :options="accountList"
          :placeholder="$t('foundToCofferOrder.accountTo')" />
        <bs-select v-model="paging.query.bankCardIdTo" :options="bankCardList"
          :placeholder="$t('foundToCofferOrder.accountTo')" />
        <bs-date-range-picker v-model="paging.query.dates" :clearable="true" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.FoundToCofferOrderList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.FoundToCofferOrderAdd]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.FoundToCofferOrderList]">
        <el-table-column :label="$t('foundToCofferOrder.orderId')">
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column :label="$t('payOrderList.channelOrderNo')">
          <template slot-scope="scope">{{scope.row.channelOrderNo}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToCofferOrder.type')">
          <template slot-scope="scope">
            <el-tag :type="getFoundToCofferTypeOption(scope.row.type).color">
              {{getFoundToCofferTypeOption(scope.row.type).name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('foundToCofferOrder.accountFrom')">
          <template slot-scope="scope">{{getAccountName(scope.row.accountIdFrom)}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToCofferOrder.accountTo')">
          <template slot-scope="scope">{{getTransferInName(scope.row)}}</template>
        </el-table-column>
        <el-table-column :label="$t('foundToCofferOrder.amount')">
          <template slot-scope="scope">{{scope.row.amount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <el-tag :type="statusOptions[scope.row.status].color">
              {{statusOptions[scope.row.status].name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('payOrderList.successTime')">
          <template slot-scope="scope">{{scope.row.successTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('table.memo')">
          <template slot-scope="scope">
            <!-- {{scope.row.memo}} -->
            <bs-ellipsis :value="scope.row.memo" :size="30" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">

            <bs-spinning-button v-if="scope.row.status===0" @click="handleAgree(scope.row)"
              :title="processing&&$t('table.processing')||$t('table.agree')" :timeout="spinningTimeout"
              v-permission="[Permission.FoundToCofferOrderStatusUpdate]" />
            <bs-button v-if="scope.row.status===0" @click="handleDecline(scope.row)" :title="$t('table.decline')"
              v-permission="[Permission.FoundToCofferOrderStatusUpdate]" />
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('foundToCofferOrder.type')" prop="type">
            <bs-select v-model="formData.type" :options="FoundToCofferTypeOptions" @change="onChangeType" />
          </el-form-item>
          <el-form-item :label="$t('foundToCofferOrder.accountFrom')" prop="accountIdFrom">
            <bs-account-select v-model="formData.accountIdFrom" @change="onChangeAccountIdFrom" />
          </el-form-item>
          <el-form-item v-if="formData.type===FoundToCofferType.AlipayToBankCard"
            :label="$t('foundToCofferOrder.accountTo')" prop="bankCardIdTo">
            <div v-if="bankCard!==undefined">
              {{$t('bankCard.cardId')}}：{{bankCard.cardId}}<br />
              {{$t('bankCard.payeeCardName')}}：{{bankCard.payeeCardName}}<br />
              {{$t('bankCard.payeeCardNo')}}：{{bankCard.payeeCardNo}}<br />
              {{$t('bankCard.bankName')}}：{{bankCard.bankName}}<br />
              {{$t('bankCard.branchName')}}：{{bankCard.branchName}}<br />
              <bs-bank-card-type :status="bankCard.type" />
              <bs-bank-card-status :status="bankCard.status" />
            </div>
            <div v-else>{{$t('foundToCofferOrder.notBindBankCard')}}</div>
          </el-form-item>
          <el-form-item v-else :label="$t('foundToCofferOrder.accountTo')" prop="accountIdTo">
            <bs-account-select v-model="formData.accountIdTo" />
          </el-form-item>
          <el-form-item :label="$t('foundToCofferOrder.amount')" prop="amount">
            <bs-input v-model="formData.amount" />
          </el-form-item>
          <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-text-area v-model="formData.memo" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-submit-button @click="createData" />
        </div>
      </el-dialog>

    </div>

  </div>

</template>

<script>
  import { BankCardType, DialogType, FoundToCofferType, Permission } from '@/definitions/constants'
  import {
    addFoundToCofferOrder,
    getFoundToCofferOrderList,
    updateFoundToCofferOrderStatus
  } from '@/api/foundToCofferOrder'
  import { moneyToCent, moneyToDollar } from '@/utils/money'
  import moment from 'moment'
  import { formatDateAsEnd, formatDateAsStart } from '@/utils/format'
  import { getAccountIndexing, getBankCardIndexing } from '@/api/indexing'
  import { DialogTypeOptions, findOptionById, FoundToCofferTypeOptions } from '@/definitions/options'
  import { deepClone } from '@/utils'
  import { Rules } from '@/definitions/fieldCheck'
  import { getBoundBankCard } from '@/api/account'

  export default {
    name: 'foundToCofferOrder',
    data() {
      return {
        Permission,
        dialogFormVisible: false,
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
          type: [
            ...Rules.requiredChange
          ],
          accountIdFrom: [
            ...Rules.requiredChange
          ],
          accountIdTo: [
            ...Rules.requiredChange
          ],
          bankCardIdTo: [
            ...Rules.requiredChange
          ],
          amount: [
            ...Rules.payAmount,
            ...Rules.requiredBlur
          ]
        },
        statusOptions: [
          { id: 0, name: this.$t('foundToCofferOrder.status.created'), color: 'info' },
          { id: 1, name: this.$t('foundToCofferOrder.status.processing') },
          { id: 2, name: this.$t('foundToCofferOrder.status.succeeded'), color: 'success' },
          { id: 3, name: this.$t('foundToCofferOrder.status.failed'), color: 'danger' },
          { id: 4, name: this.$t('foundToCofferOrder.status.declined'), color: 'danger' }
        ],
        FoundToCofferTypeOptions,
        FoundToCofferType,
        spinningTimeout: 4 * 60 * 1000,
        processing: false,
        defaultFormData: {},
        formData: {},
        list: [],
        accountList: [],
        bankCardList: [],
        bankCard: undefined
      }
    },
    mounted() {
      getAccountIndexing().then(response => {
        this.accountList = response.map(res => ({ id: res.accountId, name: res.accountName, catchId: res.catchId }))
      })

      getBankCardIndexing({ type: BankCardType.PaymentCard }).then(response => {
        this.bankCardList = response.map(res => ({ id: res.bankCardId, name: res.payeeCardName, catchId: res.catchId }))
      })

      this.getList()
    },
    methods: {
      getList() {
        this.paging.isLoading = true
        getFoundToCofferOrderList(this.getQueryParams()).then(response => {
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
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.formData.amount = moneyToCent(this.formData.amount)
            addFoundToCofferOrder(this.formData).then(() => {
              this.getList()
            })
            this.dialogFormVisible = false
          }
        })
      },
      handleAgree(row) {
        this.processing = true
        updateFoundToCofferOrderStatus({ orderId: row.orderId, status: this.statusOptions[1].id }).then(() => {
          this.processing = false
          this.getList()
        }).catch(() => {
          this.processing = false
        })
      },
      handleDecline(row) {
        updateFoundToCofferOrderStatus({ orderId: row.orderId, status: this.statusOptions[4].id }).then(this.getList)
      },
      onChangeType(type) {
        if (type === FoundToCofferType.AlipayToBankCard) {
          if (this.formData.accountIdFrom !== undefined) {
            this.queryBankCard(this.formData.accountIdFrom)
            return
          }
        }
        this.formData.bankCardIdTo = undefined
        this.bankCard = undefined
      },
      onChangeAccountIdFrom(accountIdFrom) {
        if (this.formData.type === FoundToCofferType.AlipayToBankCard) {
          if (accountIdFrom !== undefined) {
            this.queryBankCard(this.formData.accountIdFrom)
            return
          }
        }
        this.formData.bankCardIdTo = undefined
        this.bankCard = undefined
      },
      queryBankCard(accountId) {
        getBoundBankCard({ accountId }).then(bankCard => {
          if (bankCard) {
            this.formData.bankCardIdTo = bankCard.bankCardId
            this.bankCard = bankCard
          } else {
            this.formData.bankCardIdTo = undefined
            this.bankCard = undefined
          }
        })
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
      },
      getAccountName(accountId) {
        const option = findOptionById(this.accountList, accountId)
        return option ? option.catchId + ' - ' + option.name : accountId
      },
      getBankCardName(bankCardId) {
        const option = findOptionById(this.bankCardList, bankCardId)
        return option ? option.catchId + ' - ' + option.name : bankCardId
      },
      getTransferInName(row) {
        if (row.type === FoundToCofferType.AlipayToAlipay) {
          return this.getAccountName(row.accountIdTo)
        } else {
          return this.getBankCardName(row.bankCardIdTo)
        }
      },
      getFoundToCofferTypeOption(type) {
        return this.FoundToCofferTypeOptions.find(o => o.id === type)
      }
    }
  }
</script>
