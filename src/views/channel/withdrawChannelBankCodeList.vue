<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-select v-model="paging.query.id" :options="bankList"
          :placeholder="$t('withdrawChannelBankCodeList.withdrawBank')" filterable
          v-permission="[Permission.WithdrawChannelBankCodeList]" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.WithdrawChannelBankCodeList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.WithdrawChannelBankCodeAdd]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.WithdrawChannelBankCodeList]">
        <!-- 序號 -->
        <el-table-column :label="$t('table.id')">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <!-- 代付銀行 -->
        <el-table-column :label="$t('withdrawChannelBankCodeList.withdrawBank')">
          <template slot-scope="scope">{{scope.row.bankName}}</template>
        </el-table-column>
        <!-- 建立時間 -->
        <el-table-column :label="$t('timestamp.createTime')">
          <template slot-scope="scope">{{scope.row.createTime | moment}}</template>
        </el-table-column>
        <!-- 更新時間 -->
        <!-- <el-table-column :label="$t('timestamp.updateTime')">
          <template slot-scope="scope">{{scope.row.updateTime | moment}}</template>
        </el-table-column>-->
        <!-- 狀態 -->
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-status :status="scope.row.status" :memo="scope.row.memo"
              @on-click-submit="changeStatus(scope.row, $event)"
              v-permission="[Permission.WithdrawChannelBankCodeUpdate]" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.memo')">
          <template slot-scope="scope">
            <!-- {{scope.row.memo}} -->
            <bs-ellipsis :value="scope.row.memo" :size="30" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <bs-edit-button @click="handleModify(scope.row)" v-permission="[Permission.WithdrawChannelBankCodeUpdate]">
              {{$t('table.edit')}}</bs-edit-button>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="120px">
          <!-- 代付銀行 -->
          <el-form-item :label="$t('withdrawChannelBankCodeList.withdrawBank')" prop="bankName">
            <bs-input v-model="formData.bankName" />
          </el-form-item>

          <!-- 代付銀行代碼 -->
          <!-- <el-form-item :label="$t('withdrawChannelBankCodeList.withdrawBankCode')" prop="bankCode">
            <bs-input v-model="formData.bankCode" />
          </el-form-item>-->

          <!-- 狀態 -->
          <el-form-item :label="$t('status.status')" prop="status">
            <bs-select v-model="formData.status" :options="StatusOptions" :clearable="false" />
          </el-form-item>
          <!-- 備註 -->
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
import { DialogType, Permission, Status } from '@/definitions/constants'
import { getWithdrawBanks, getWithdrawBankList, addWithdrawBank, updateWithdrawBank } from '@/api/withdrawChannel'
import { DialogTypeOptions, StatusOptions } from '@/definitions/options'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'

export default {
  name: 'withdrawChannelBankCodeList',
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
        bankName: [...Rules.requiredBlur, ...Rules.withdrawBankName],
        bankCode: [...Rules.requiredBlur, ...Rules.withdrawBankCode],
        status: [...Rules.requiredChange],
        memo: [...Rules.memo]
      },
      StatusOptions,
      defaultFormData: {
        status: Status.Enabled
      },
      formData: {},
      list: [],
      bankList: []
    }
  },
  created() {
    this.getWithdrawBanksOptions()

    this.getList()
  },
  methods: {
    getList() {
      this.paging.isLoading = true
      getWithdrawBankList(this.paging.query).then(response => {
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
    changeStatus(row, { status, memo }) {
      const data = {
        id: row.id,
        status,
        memo
      }
      updateWithdrawBank(data).then(this.getList)
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
    handleModify(row) {
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Update
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          addWithdrawBank(this.formData).then(() => {
            this.getList()
            this.getWithdrawBanksOptions()
          })

          this.dialogFormVisible = false
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const { bankName, bankCode, memo, status, accountId, id } = this.formData
          const data = {
            bankName,
            bankCode,
            memo,
            status,
            accountId,
            id
          }
          updateWithdrawBank(data).then(() => {
            this.getList()
            this.getWithdrawBanksOptions()
          })
          this.dialogFormVisible = false
        }
      })
    },
    getWithdrawBanksOptions() {
      // 更新新的下拉選單
      getWithdrawBanks().then(res => {
        if (res && res.length > 0) {
          // 代付銀行下拉選單
          this.bankList = res.map(o => {
            return {
              id: o.id,
              name: o.bankName
            }
          })
        }
      })
    }
  }
}
</script>
