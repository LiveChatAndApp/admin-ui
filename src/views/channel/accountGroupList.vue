<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-select v-model="paging.query.channelId" :options="channelList" :placeholder="$t('channelList.channelName')"
          v-permission="[Permission.IndexingChannel]" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.AccountGroupList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.AccountGroupAdd]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.AccountGroupList]">
        <el-table-column :label="$t('table.id')" a="1">
          <template slot-scope="scope">{{scope.row.accountGroupId}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountGroupList.accountGroupName2')">
          <template slot-scope="scope">{{scope.row.accountGroupName}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountGroupList.accountGroupCode2')">
          <template slot-scope="scope">{{scope.row.accountGroupCode}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountGroupList.accountCount')">
          <template slot-scope="scope">{{scope.row.accountGroupMapList.filter((el)=>el.status===1).length}} /
            {{scope.row.accountGroupMapList.length}}</template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <bs-edit-button @click="handleModify(scope.row)" v-permission="[Permission.AccountGroupUpdate]" />
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination v-if="paging.totalElements!==-1" :current-page="paging.query.page" :page-size="paging.query.size"
        :total="paging.totalElements" @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true" width="70%">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="120px">
          <el-form-item :label="$t('accountGroupList.accountGroupName2')" prop="accountGroupName">
            <bs-input v-model="formData.accountGroupName" />
          </el-form-item>
          <el-form-item :label="$t('accountGroupList.accountGroupCode2')" prop="accountGroupCode">
            <bs-input v-model="formData.accountGroupCode" />
          </el-form-item>
          <el-form-item :label="$t('accountList.channel')" prop="channelId">
            <bs-select v-model="formData.channelId" :options="channelList" :clearable="false"
              @change="onChangeChannel($event)" />
          </el-form-item>

          <el-checkbox-group v-if="channelCode===ChannelCode.BankCard"
            v-model="formData.groupedAccountIdList[channelId]">
            <el-table :data="accountList" border fit highlight-current-row>
              <el-table-column :label="$t('bankCard.cardId')">
                <template slot-scope="scope">
                  <el-checkbox :label="scope.row.accountId">{{scope.row.bankCard.cardId}}</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column :label="$t('accountList.accountName')">
                <template slot-scope="scope">{{scope.row.accountName}}</template>
              </el-table-column>
              <el-table-column :label="$t('bankCard.bankName')">
                <template slot-scope="scope">{{scope.row.bankCard.bankName}}</template>
              </el-table-column>
              <el-table-column :label="$t('bankCard.payeeCardName')">
                <template slot-scope="scope">{{scope.row.bankCard.payeeCardName}}</template>
              </el-table-column>
              <el-table-column :label="$t('bankCard.payeeCardNo')">
                <template slot-scope="scope">{{scope.row.bankCard.payeeCardNo}}</template>
              </el-table-column>
              <el-table-column :label="$t('accountGroupList.dayMaxPayAmount')">
                <template slot-scope="scope">{{scope.row.dayMaxAmount | money}}</template>
              </el-table-column>
              <el-table-column :label="$t('accountGroupList.dayMaxPayCount')">
                <template slot-scope="scope">{{scope.row.dayMaxCount}}</template>
              </el-table-column>
              <el-table-column :label="$t('accountGroupList.bankCardType')">
                <template slot-scope="scope">{{getBankCardTypeName(scope.row.bankCard.type)}}</template>
              </el-table-column>
              <el-table-column :label="$t('accountGroupList.bankCardMemo')">
                <template slot-scope="scope">{{scope.row.bankCard.memo}}</template>
              </el-table-column>
              <el-table-column :label="$t('accountList.applicableAmount')">
                <template slot-scope="scope">
                  {{scope.row.minAmount | money}}
                  -
                  {{scope.row.maxAmount | money}}
                </template>
              </el-table-column>
              <el-table-column :label="$t('status.status')">
                <template slot-scope="scope">
                  <bs-status :status="scope.row.status" :clickable="false" />
                </template>
              </el-table-column>
            </el-table>
          </el-checkbox-group>

          <el-checkbox-group v-else v-model="checkedOptionList[channelId]">
            <el-table :data="formData.groupedNewAccountIdList.filter(o => o.channelId === channelId)" border fit
              highlight-current-row>
              <el-table-column :label="$t('accountList.catchId')">
                <template slot-scope="scope">
                  <el-checkbox :label="scope.row.accountChannelId">{{scope.row.accountChannelId}}</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column :label="$t('accountGroupList.accountName')">
                <template slot-scope="scope">{{scope.row.accountName}}</template>
              </el-table-column>
              <el-table-column :label="$t('accountGroupList.dayMaxPayAmount')">
                <template slot-scope="scope">{{scope.row.singleDayAmount | money}}</template>
              </el-table-column>
              <el-table-column :label="$t('accountGroupList.dayMaxPayCount')">
                <template slot-scope="scope">{{scope.row.singleDayCount}}</template>
              </el-table-column>
              <el-table-column :label="$t('status.status')">
                <template slot-scope="scope">
                  <bs-status :status="scope.row.status" :clickable="false" />
                </template>
              </el-table-column>
            </el-table>
          </el-checkbox-group>
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
import { ChannelCode, DialogType, Permission, Status } from '@/definitions/constants'
import { BankCardTypeOptions, DialogTypeOptions, findOptionById, StatusOptions } from '@/definitions/options'
import { addAccountGroup, getAccountGroupList, updateAccountGroup } from '@/api/accountGroup'
import { deepClone, objectMerge } from '@/utils'
import {
  // getAccountChannelList,
  getAccountGroupChannelList
} from '@/api/account'
import { moneyToDollar } from '@/utils/money'
import { Rules } from '@/definitions/fieldCheck'
import { getWithdrawChannelList } from '@/api/withdrawChannel'
import { getChannelIndexing } from '@/api/indexing'

export default {
  name: 'accountGroupList',
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
          page: 0,
          rows: undefined
        }
      },
      rules: {
        accountGroupName: [...Rules.requiredBlur, ...Rules.accountGroupName],
        channelId: [...Rules.requiredChange],
        accountGroupCode: [...Rules.accountGroupCode]
      },
      ChannelCode,
      StatusOptions,
      defaultFormData: {
        accountIdList: [],
        groupedAccountIdList: [],
        groupedNewAccountIdList: []
      },
      formData: {},
      list: [],
      quotaList: [],
      channelList: [],
      accountList: [],
      channelCode: '',
      checkedOptionList: [] // checkbox 一定要用[] 不可以用 {}...不然會錯誤
    }
  },
  created() {
    this.queryChannelList(false)
  },
  methods: {
    getList() {
      this.paging.isLoading = true

      const channel = findOptionById(this.channelList, this.paging.query.channelId)
      if (channel) {
        this.paging.query.channelCode = channel.channelCode
      } else {
        this.paging.query.channelCode = undefined
      }

      getAccountGroupList(this.paging.query).then(response => {
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
    changeStatus(row) {},
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    handleCreate() {
      this.formData = deepClone(this.defaultFormData)
      this.queryChannelList(true)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Create
      // 需要清空讓編輯與新增時 accountChannellist 可以重新 render
      this.checkedOptionList = []
    },
    async handleModify(row) {
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.queryChannelList(true)
      // 需要清空讓編輯與新增時 accountChannellist 可以重新 render
      this.checkedOptionList = []
      row.accountGroupMapList.forEach(accountGroupMap => {
        if (!this.formData.groupedAccountIdList[accountGroupMap.channelId]) {
          this.formData.groupedAccountIdList[accountGroupMap.channelId] = []
        }
        this.formData.groupedAccountIdList[accountGroupMap.channelId].push(accountGroupMap.accountChannelId)
      })

      this.dialogFormVisible = true
      this.dialogType = DialogType.Update
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const data = this.normalizeDataForm()
          if (data.hasOwnProperty('chennelList')) {
            delete data['chennelList']
          }
          addAccountGroup(data).then(() => {
            this.dialogFormVisible = false
            this.getList()
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateAccountGroup(this.normalizeDataForm()).then(() => {
            this.dialogFormVisible = false
            this.getList()
          })
        }
      })
    },
    normalizeDataForm() {
      const chennelList = []
      let accountGroupChennelList = []

      this.checkedOptionList.forEach((o, index) => {
        if (o.length > 0) {
          chennelList.push(index)
          accountGroupChennelList = [...accountGroupChennelList, ...o]
        }
      })
      const { accountGroupCode, accountGroupName, accountGroupId } = this.formData
      return {
        accountGroupId,
        accountGroupCode,
        accountGroupName,
        chennelList: chennelList.length > 0 ? chennelList : undefined,
        accountGroupChennelList: accountGroupChennelList.length > 0 ? accountGroupChennelList : undefined
      }
    },
    normalizeAccountIdList() {
      this.formData.accountList = Object.keys(this.formData.groupedAccountIdList).map(channelId => ({
        channelId,
        accountIdList: this.formData.groupedAccountIdList[channelId]
      }))
    },
    queryChannelList(shouldInit) {
      getChannelIndexing().then(response => {
        this.channelList = response.map(res => ({
          id: res.channelId,
          name: res.channelName,
          channelCode: res.channelCode
        }))

        if (response && !this.paging.query.channelId) {
          const channel = response.find(channel => channel.channelCode === ChannelCode.AliPay)
          if (channel) {
            // 造成每次add 或 update 下拉選單錯誤
            // this.paging.query.channelId = channel.channelId
          }
        }

        if (shouldInit) {
          response.forEach(res => {
            if (this.formData.groupedAccountIdList[res.channelId] === undefined) {
              this.formData.groupedAccountIdList[res.channelId] = []
            }
          })

          if (this.channelList) {
            this.formData.channelId = this.channelList[0].id
            this.formData.channelCode = this.channelList[0].channelCode
            this.queryAccountList({
              channelId: this.formData.channelId,
              channelCode: this.channelList[0].channelCode,
              statusList: [Status.Enabled],
              paging: false
            })
          }
        } else {
          this.getList()
        }
      })
    },
    onChangeChannel(channelId) {
      const channelCode = findOptionById(this.channelList, channelId).channelCode

      const query = {
        channelId,
        channelCode,
        statusList: [Status.Enabled],
        paging: false
      }

      switch (channelCode) {
        case ChannelCode.Withdraw:
          this.queryWithdrawChannelList(query)
          break

        case ChannelCode.BankGate:
        case ChannelCode.AliPay:
        case ChannelCode.BankCard:
        default:
          this.queryAccountList(query)
      }
      this.formData.channelId = channelId
      this.formData.channelCode = channelCode
    },
    queryAccountList(query) {
      const { channelId, accountGroupId } = this.formData
      // getAccountChannelList(query).then(response => {
      //   this.normalizeResponse(response, query)
      // })
      getAccountGroupChannelList({ channelId, accountGroupId }).then(response => {
        this.normalizeResponse(response, query)
      })
    },
    queryWithdrawChannelList(query) {
      getWithdrawChannelList(query).then(response => {
        this.normalizeResponse(response, query)
      })
    },
    normalizeResponse(response, query) {
      const { channelId } = query
      this.channelId = channelId
      this.channelCode = findOptionById(this.channelList, query.channelId).channelCode

      // 假設已經存在 key 就不在做一次
      if (this.checkedOptionList.hasOwnProperty(channelId)) {
        return
      }

      let { canUseChannel = [] } = response
      const { alreadyUseChannel = [] } = response
      // 濾出屬於該渠道有勾選的資料
      const checkedList = alreadyUseChannel.map(o => {
        return o.accountChannelId
      })
      // 目前有勾選的資料 list
      this.checkedOptionList[channelId] = checkedList

      canUseChannel = canUseChannel.map(o => {
        return {
          ...o,
          singleDayAmount: moneyToDollar(o.singleDayAmount),
          singleDayCount: o.singleDayCount,
          channelId: query.channelId
        }
      })
      const copyList = [...this.formData.groupedNewAccountIdList, ...canUseChannel]
      const selectedChannel = copyList.reduce((item, o) => {
        // 2.將重複的 accountChannelId 去除
        const c = item.filter(g => {
          return g.accountChannelId === o.accountChannelId
        })
        // 代表沒有重複
        if (c.length === 0) {
          item = [...item, o]
        }
        return item
      }, [])
      this.$set(this.formData, 'groupedNewAccountIdList', selectedChannel)

      // this.accountList = response.map(account => {
      //   account.dayMaxAmount = moneyToDollar(account.dayMaxAmount)
      //   account.minAmount = moneyToDollar(account.minAmount)
      //   account.maxAmount = moneyToDollar(account.maxAmount)
      //   return account
      // })
    },
    getBankCardTypeName(type) {
      return findOptionById(BankCardTypeOptions, type).name
    }
  }
}
</script>
