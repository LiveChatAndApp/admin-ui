<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <div class="filter-container">
        <bs-select v-model="paging.query.statusList" :options="AccountStatusOptions"
                   :placeholder="$t('status.status')"/>
        <bs-search-button @click="handleSearch" v-permission="[Permission.AccountList]"/>
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')"
                border fit highlight-current-row class="report-table"
                v-permission="[Permission.RiskWy]">
        <el-table-column :label="$t('accountList.catchId')">
          <template slot-scope="scope">{{scope.row.catchId}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountList.accountName')">
          <template slot-scope="scope">{{scope.row.accountName}}</template>
        </el-table-column>
        <el-table-column :label="$t('agentList.balance')">
          <template slot-scope="scope">{{scope.row.balance | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('agentList.freezeAmount')">
          <template slot-scope="scope">{{scope.row.frozenAmount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountList.enableStatusTime')">
          <template slot-scope="scope">{{scope.row.enableStatusTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('riskStatus.riskStatus')">
          <template slot-scope="scope">
            <bs-risk-status v-if="scope.row.riskStatus !== undefined" :status="scope.row.riskStatus"
                            @on-click-submit="onChangeRiskStatus(scope.row, $event)"/>
          </template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-account-status v-if="scope.row.status !== undefined" :status="scope.row.status"
                               @on-click-submit="onChangeStatus(scope.row, $event)"/>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <bs-spinning-button :title="$t('riskWy.login')" @click="onClickLogin(scope.row)"
                                v-permission="[Permission.RiskWyLogin]"/>
            <bs-spinning-button :title="$t('riskWy.queryOrder')" @click="onClickQueryOrder(scope.row)"
                                v-permission="[Permission.RiskWyQueryOrder]"/>
            <bs-spinning-button :title="$t('riskWy.queryBalance')" @click="onClickQueryBalance(scope.row)"
                                v-permission="[Permission.RiskWyQueryBalance]"/>
          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>

</template>

<script>
  import { AccountCode, ChannelCode, DialogType, Permission } from '@/definitions/constants'
  import { AccountStatusOptions, DialogTypeOptions } from '@/definitions/options'
  import { getAccountList, updateAccount } from '@/api/account'
  import { Rules } from '@/definitions/fieldCheck'
  import { loginWy, queryWyBalance, queryWyOrder } from '@/api/wyRisk'
  import { formatDateAsEnd, formatDateAsStart } from '@/utils/format'
  import { showSuccess } from '@/utils/executionMessage'
  import { sprintf } from 'sprintf-js'
  import { moneyToDollar } from '@/utils/money'

  export default {
    name: 'accountBalance',
    data() {
      return {
        Permission,
        dialogFormVisible: false,
        DialogType,
        dialogType: 0,
        DialogTypeOptions,
        defaultFormData: {
          refreshBalance: undefined
        },
        paging: {
          isLoading: false,
          totalElements: null,
          query: {
            channelCode: ChannelCode.BankGate,
            accountCode: AccountCode.BankGate.WyPay
          }
        },
        AccountStatusOptions,
        formData: {},
        list: [],
        rules: {
          refreshBalance: [
            ...Rules.payAmount
          ]
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.paging.isLoading = true
        getAccountList(this.paging.query).then(response => {
          response.content.forEach(res => {
            res.balance = moneyToDollar(res.balance)
            res.frozenAmount = moneyToDollar(res.frozenAmount)
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
      onChangeRiskStatus(row, { status, memo }) {
        const data = {
          accountId: row.accountId,
          riskStatus: status,
          memo
        }
        updateAccount(data).then(() => {
          this.getList()
        })
      },
      onChangeStatus(row, { status, memo }) {
        const data = {
          accountId: row.accountId,
          status,
          memo
        }
        updateAccount(data).then(() => {
          this.getList()
        })
      },
      onClickLogin(row) {
        loginWy(row).then(() => {
          this.getList()
        })
      },
      onClickQueryOrder(row) {
        const params = {
          accountId: row.accountId,
          startTime: formatDateAsStart(new Date()),
          endTime: formatDateAsEnd(new Date())
        }
        queryWyOrder(params).then(response => {
          showSuccess(sprintf(this.$t('riskWy.queryOrderSuccess'), (response ? response.length : 0)))
        })
      },
      onClickQueryBalance(row) {
        queryWyBalance(row).then(response => {
          showSuccess(sprintf(this.$t('riskWy.queryBalanceSuccess'), response.balance))
        })
      }
    }
  }
</script>
