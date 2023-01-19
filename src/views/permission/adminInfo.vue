<template>
  <div class="app-container calendar-list-container" style='flex'>
    <div style='width: 100%; margin-left:10px; float: left;'>
      <el-form ref="dataForm" :model="formData" label-position="left" label-width="100px">
        <el-form-item :label="$t('accountList.loginUsername')">
          {{ formData.username }}
        </el-form-item>
        <el-form-item :label="$t('accountList.loginUsername')">
          {{ formData.username }}
        </el-form-item>
        <el-form-item :label="$t('admin.password')">
          <bs-button :title="$t('userList.resetPassword')" @click="handleResetWithdrawPassword" />
        </el-form-item>
        <el-form-item :label="$t('admin.nickname')">
          <template>
            <span slot="noResult">{{ formData.nickname }}</span>
            <bs-button :title="$t('table.edit')" @click="handleResetWithdrawPassword" />
          </template>
        </el-form-item>
        <el-form-item :label="$t('admin.role')">
          {{ formData.roleName }}
        </el-form-item>
        <el-form-item :label="$t('admin.loginTime')">
          <template>{{ formData.loginTime | moment }}</template>
        </el-form-item>
        <el-form-item :label="$t('admin.ip')">
          {{ formData.loginIp }}
        </el-form-item>
        <el-form-item :label="$t('otp.otpStatus')">
          <bs-button :title="$t('otp.bindOtp')" @click="handleResetWithdrawPassword" />
        </el-form-item>
      </el-form>

      <el-dialog :title="$t('userList.resetWithdrawPassword')" :visible.sync="resetWithdrawPasswordDialogFormVisible"
        v-if="resetWithdrawPasswordDialogFormVisible" :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('userList.userId')">{{ formData.username }}</el-form-item>
          <el-form-item :label="$t('userList.withdrawPassword')" prop="password">
            <bs-input type="password" v-model="formData.withdrawPassword"
              :placeholder="$t('userList.passwordPlaceholder')" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="resetWithdrawPasswordDialogFormVisible = false" />
          <bs-submit-button @click="resetWithdrawPassword" />
        </div>
      </el-dialog>

      <el-dialog :title="$t('admin.changeNickname')" :visible.sync="resetWithdrawPasswordDialogFormVisible"
        v-if="resetWithdrawPasswordDialogFormVisible" :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('userList.userId')">{{ formData.username }}</el-form-item>
          <el-form-item :label="$t('userList.withdrawPassword')" prop="password">
            <bs-input type="password" v-model="formData.withdrawPassword"
              :placeholder="$t('userList.passwordPlaceholder')" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="resetWithdrawPasswordDialogFormVisible = false" />
          <bs-submit-button @click="resetWithdrawPassword" />
        </div>
      </el-dialog>

    </div>
  </div>
</template>
  
<script>
import { DialogType, Permission, Status } from '@/definitions/constants'
// import {
//     addBlackWhite,
//     updateBlackWhite,
//     deleteBlackWhite,
//     setBlackWhiteRedis
// } from '@/api/blackWhite'
import { DialogTypeOptions, findOptionById, StatusOptions } from '@/definitions/options'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'
import { isSuperAdminLevel } from '@/utils/user'
import { getAdminInfo } from '@/api/admin'
export default {
  name: 'adminInfo',
  data() {
    return {
      Permission,
      dialogFormVisible: false,
      resetWithdrawPasswordDialogFormVisible: false,
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
        merchantId: [...Rules.requiredChange],
        hostIp: [...Rules.requiredBlur, ...Rules.ipV2],
        type: [...Rules.requiredChange],
        status: [...Rules.requiredChange],
        memo: [...Rules.memo]
      },
      StatusOptions,
      // BlackWhiteOptions,
      defaultFormData: {
        status: Status.Enabled
      },
      formData: {},
      list: [],
      merchantList: []
    }
  },
  created() {
    getAdminInfo().then(response => {
      this.formData = response.info
      // this.merchantList = response.map(res => ({ id: res.merchantId, name: res.merchantName }))
    })
  },
  methods: {
    // 設定 redis
    handleRedisSetting() {
      this.paging.isLoading = true
      // setBlackWhiteRedis()
      //     .then(() => {
      //         this.getList()
      //     })
      //     .catch(() => {
      //         this.paging.isLoading = false
      //     })
    },

    isSuperAdmin() {
      return isSuperAdminLevel(this.$store)
    },
    getList() {
      this.paging.isLoading = true
      // getBlackWhiteList(this.paging.query).then(response => {
      //     this.list = response.content
      //     this.paging.totalElements = response.totalElements
      //     this.paging.isLoading = false
      // })
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
      // const data = {
      //   id: row.id,
      //   status,
      //   memo
      // }
      // updateBlackWhite(data).then(this.getList)
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
      // this.$refs['dataForm'].validate(valid => {
      //   if (valid) {
      //     const data = {
      //       ...this.formData,
      //       type: 'W' // 目前只有白名單
      //     }
      //     // addBlackWhite(data).then(() => {
      //     //     this.getList()
      //     // })
      //     this.dialogFormVisible = false
      //   }
      // })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // updateBlackWhite(this.formData).then(() => {
          //     this.getList()
          // })
          this.dialogFormVisible = false
        }
      })
    },
    getMerchantName(merchantId) {
      const option = findOptionById(this.merchantList, merchantId)
      return option ? option.name : merchantId
    },
    handleResetWithdrawPassword(row) {
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.resetWithdrawPasswordDialogFormVisible = true
    }
  }
}
</script>
