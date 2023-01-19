<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <!-- <bs-select
          v-model="paging.query.bankCardNo"
          :options="bankCardNoList"
          :placeholder="$t('bankCard.payeeCardNo')"
        />-->
        <!-- 改成 input -->
        <bs-input v-model="paging.query.bankCardNo" :placeholder="$t('bankCard.payeeCardNo')" />
        <!-- <bs-select
          v-model="paging.query.status"
          :options="StatusOptions"
          :placeholder="$t('status.status')"
        />-->
        <bs-search-button @click="handleSearch" v-permission="[Permission.WithdrawBankCardBlackListList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.WithdrawBankCardBlackListAdd]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.WithdrawBankCardBlackListList]">
        <!-- 序號 -->
        <el-table-column :label="$t('table.id')">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <!-- 銀行卡號 -->
        <el-table-column :label="$t('bankCard.payeeCardNo')">
          <template slot-scope="scope">{{scope.row.bankCardNo}}</template>
        </el-table-column>
        <!-- 創建時間 -->
        <el-table-column :label="$t('timestamp.createTime')">
          <template slot-scope="scope">{{scope.row.createTime | moment}}</template>
        </el-table-column>
        <!-- 更新時間 -->
        <!-- <el-table-column :label="$t('timestamp.updateTime')">
          <template slot-scope="scope">{{scope.row.updateTime | moment}}</template>
        </el-table-column>-->
        <!-- 狀態 -->
        <!-- <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-status
              :status="scope.row.status"
              @on-click-submit="changeStatus(scope.row, $event)"
            />
          </template>
        </el-table-column>-->
        <!-- 備註 -->
        <el-table-column :label="$t('table.memo')">
          <template slot-scope="scope">
            <!-- {{scope.row.memo}} -->
            <bs-ellipsis :value="scope.row.memo" :size="30" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <!-- <bs-edit-button
              @click="handleModify(scope.row)"
              v-permission="[Permission.WithdrawBankCardWhiteListUpdate]"
            >{{$t('table.edit')}}</bs-edit-button>-->

            <el-button @click="deleteRow(scope.row)" size="mini" class="filter-item" type="danger" v-waves
              v-permission="[Permission.WithdrawBankCardBlackListDelete]">{{$t('label.delete')}}</el-button>
            <!-- <bs-cancel-button
              @click="deleteRow(scope.row)"
              v-permission="[Permission.WithdrawBankCardWhiteListUpdate]"
            >{{$t('table.edit')}}</bs-cancel-button>-->
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <!-- 銀行卡號 -->
          <el-form-item :label="$t('bankCard.payeeCardNo')" prop="bankCardNo">
            <bs-input v-model="formData.bankCardNo" />
          </el-form-item>
          <!-- 狀態 -->
          <!-- <el-form-item :label="$t('status.status')" prop="status">
            <bs-select v-model="formData.status" :options="StatusOptions" :clearable="false" />
          </el-form-item>-->
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
import {
  getAllWithdrawBankCardBlackList,
  getWithdrawBankCardBlackList,
  addWithdrawBankCardBlackList,
  deleteWithdrawBankCardBlackList,
  updateWithdrawBankCardBlackList
} from '@/api/withdrawBankCard'
import { DialogTypeOptions, StatusOptions } from '@/definitions/options'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'

export default {
  name: 'withdrawBankCardBlackList',
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
        bankCardNo: [...Rules.requiredChange, ...Rules.requiredBlur, ...Rules.cardNo2],
        status: [...Rules.requiredChange],
        memo: [...Rules.memo]
      },
      StatusOptions,
      defaultFormData: {
        status: Status.Enabled
      },
      formData: {},
      list: [],
      bankCardNoList: []
    }
  },
  created() {
    this.getBankCardNoOption()
    this.getList()
  },
  methods: {
    deleteRow(row) {
      deleteWithdrawBankCardBlackList({ id: row.id }).then(() => {
        this.getList()
      })
    },
    getBankCardNoOption() {
      getAllWithdrawBankCardBlackList().then(res => {
        if (res && res.length > 0) {
          this.bankCardNoList = res.map(o => {
            return {
              id: o.bankCardNo,
              name: o.bankName
            }
          })
        }
      })
    },
    getList() {
      this.paging.isLoading = true
      getWithdrawBankCardBlackList(this.paging.query).then(response => {
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
      updateWithdrawBankCardBlackList(data).then(this.getList)
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
          addWithdrawBankCardBlackList(this.formData).then(() => {
            this.getList()
            this.getBankCardNoOption()
          })
          this.dialogFormVisible = false
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateWithdrawBankCardBlackList(this.formData).then(() => {
            this.getList()
            this.getBankCardNoOption()
          })
          this.dialogFormVisible = false
        }
      })
    }
  }
}
</script>
