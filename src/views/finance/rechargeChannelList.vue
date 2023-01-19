<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <bs-select
        v-model="paging.query.paymentMethod"
        :options="ChannelOrderStatusOptions"
        :placeholder="$t('rechargeChannelList.paymentMethod')"
        filterable
      />
      <bs-search-button @click="handleSearch" v-permission="[Permission.RECHARGE_CHANNEL_PAGE]" />
      <bs-button :title="$t('dialog.create')" @click="handleCreate" v-permission="[Permission.RECHARGE_CHANNEL_ADD]" />
    </div>
    <el-table
      :data="list"
      v-loading="paging.isLoading"
      :element-loading-text="$t('table.loading')"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="onSortChange"
      v-permission="[Permission.RECHARGE_CHANNEL]"
    >
      <el-table-column :label="$t('rechargeChannelList.id')" width="70px">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column :label="$t('rechargeChannelList.paymentMethod')">
        <template slot-scope="scope">
          <bs-status-text :options="ChannelOrderStatusOptions" :status="scope.row.paymentMethod" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('rechargeChannelList.channelName')">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column :label="$t('rechargeChannelList.info')" width="230px">
        <template slot-scope="scope">
          <div v-if="scope.row.paymentMethod === ChannelOrderStatus.BankCard">
            <div>{{ $t('rechargeChannelList.realName') }}: {{ scope.row.info.realName }}</div>
            <div>{{ $t('rechargeChannelList.bankName') }}: {{ scope.row.info.bankName }}</div>
            <div>{{ $t('rechargeChannelList.bankAccount') }}: {{ scope.row.info.bankAccount }}</div>
          </div>
          <div v-if="scope.row.paymentMethod === ChannelOrderStatus.WeChant">
            <div>{{ $t('rechargeChannelList.realName') }}: {{ scope.row.info.realName }}</div>
            <div style="display: flex">
              <div>{{ $t('rechargeChannelList.qrCodeImage') }}:</div>
              <div style="width: 50%">
                <el-image
                  v-if="scope.row.info.qrCodeImage"
                  :src="scope.row.info.qrCodeImage"
                  fit="contain"
                  :preview-src-list="[scope.row.info.qrCodeImage]"
                />
              </div>
            </div>
          </div>
          <div v-if="scope.row.paymentMethod === ChannelOrderStatus.AliPay">
            <div>{{ $t('rechargeChannelList.realName') }}: {{ scope.row.info.realName }}</div>
            <div>{{ $t('rechargeChannelList.account') }}: {{ scope.row.info.bankAccount }}</div>
            <div style="display: flex">
              <span>{{ $t('rechargeChannelList.qrCodeImage') }}:</span>
              <div style="width: 50%">
                <el-image
                  v-if="scope.row.info.qrCodeImage"
                  :src="scope.row.info.qrCodeImage"
                  fit="contain"
                  :preview-src-list="[scope.row.info.qrCodeImage]"
                />
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('status.status')">
        <template slot-scope="scope">
          <bs-status
            :status="scope.row.status"
            @on-click-submit="changeStatus(scope.row, $event)"
            :memo="scope.row.memo"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.memo')">
        <template slot-scope="scope">
          <bs-ellipsis :value="scope.row.memo" :size="30" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('timestamp.createTime')" sortable="custom" prop="_create_time" min-width="140px">
        <template slot-scope="scope">{{ scope.row.createTime | moment }}</template>
      </el-table-column>
      <el-table-column :label="$t('timestamp.updateTime')" sortable="custom" prop="_update_time" min-width="140px">
        <template slot-scope="scope">{{ scope.row.updateTime | moment }}</template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" fixed="right" width="150px">
        <template slot-scope="scope">
          <bs-button
            :title="$t('table.edit')"
            @click="handleModify(scope.row)"
            v-permission="[Permission.RECHARGE_CHANNEL_UPDATE]"
          />
          <bs-delete-button
            @click="handleDelete(scope.row)"
            class='filter-item remove-m-l'
            v-permission="[Permission.RECHARGE_CHANNEL_DELETE]"
          />
        </template>
      </el-table-column>
    </el-table>
    <bs-pagination
      :current-page="paging.query.page"
      :page-size="paging.query.rows"
      :total="paging.totalElements"
      @on-change-page="handleCurrentChange"
      @on-change-page-size="handleSizeChange"
    />

    <el-dialog
      :title="DialogTypeOptions[dialogType].name"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      :close-on-click-modal="false"
      :show-close="true"
    >
      <el-form 
        :rules="rules"
        ref="dataForm"
        :model="formData"
        label-position="left"
        label-width="100px"
      >
        <el-form-item :label="$t('rechargeChannelList.channelName')" prop="name">
          <bs-input v-model="formData.name" :placeholder="$t('rechargeChannelList.payChannelName')" />
        </el-form-item>
        <el-form-item :label="$t('rechargeChannelList.paymentMethod')" prop="paymentMethod">
          <bs-select
            v-model="formData.paymentMethod"
            :options="ChannelOrderStatusOptions"
            :placeholder="$t('rechargeChannelList.paymentMethod')"
            :clearable="false"
            :disabled="dialogType===DialogType.Update"
          />
        </el-form-item>
        <el-form-item :label="$t('rechargeChannelList.realName')" prop="realName">
          <bs-input v-model="formData.realName" :disabled="dialogType===DialogType.Update" :placeholder="$t('rechargeChannelList.realName')" />
        </el-form-item>

        <!-- 銀行卡顯示 -->
        <el-form-item v-if="formData.paymentMethod === ChannelOrderStatus.BankCard" :label="$t('rechargeChannelList.bankName')" prop="bankName">
          <bs-input v-model="formData.bankName" :disabled="dialogType===DialogType.Update" :placeholder="$t('rechargeChannelList.bankName')" />
        </el-form-item>
        <!-- 銀行卡顯示 -->
        <el-form-item v-if="formData.paymentMethod === ChannelOrderStatus.BankCard" :label="$t('rechargeChannelList.bankAccount')" prop="bankAccount">
          <bs-input v-model="formData.bankAccount" :disabled="dialogType===DialogType.Update" :placeholder="$t('rechargeChannelList.bankAccount')" />
        </el-form-item>

        <!-- 支付寶顯示 -->
        <el-form-item v-if="formData.paymentMethod === ChannelOrderStatus.AliPay" :label="$t('rechargeChannelList.account')" prop="bankAccount">
          <bs-input v-model="formData.bankAccount" :disabled="dialogType===DialogType.Update" :placeholder="$t('rechargeChannelList.account')" />
        </el-form-item>

        <el-form-item
          :label="$t('rechargeChannelList.qrCodeImage')" 
          v-if="formData.paymentMethod !== ChannelOrderStatus.BankCard"
          prop="qrCodeFile"
        >
          <div class="input-container">
            <input
              class="file-input"
              ref="fileInput"
              type="file"
              @input="handlePreviewImage"
              accept="image/*"
            />
            <el-image
              v-if="!formData.qrCodeFile "
              :src="upload"
              fit="contain"
              @click="handleOpenFile"
              style="cursor:pointer"
            />
            <el-image
              v-if="formData.qrCodeFile"
              :src="formData.qrCodeFile"
              fit="contain"
              :preview-src-list="[formData.qrCodeFile]"
            />
            <i v-if="showDeleteIcon && dialogType===DialogType.Create" class="el-icon-delete cancel" @click="handleCancel"></i>
            <input type="text" v-model="formData.qrCodeFile" style="display: none" />
          </div>
        </el-form-item>

        <el-form-item :label="$t('rechargeChannelList.status')" prop="status">
          <bs-select v-model="formData.status" :options="StatusOptions" :clearable="false" />
        </el-form-item>

        <el-form-item :label="$t('table.memo')" prop="memo">
          <bs-text-area v-model="formData.memo" :placeholder="$t('rechargeChannelList.placeholder.memo')" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <bs-cancel-button @click="dialogFormVisible=false" />
        <bs-submit-button v-if="dialogType===DialogType.Create" @click="createData" v-permission="[Permission.RECHARGE_CHANNEL_ADD]" />
        <bs-submit-button v-else @click="updateData" v-permission="[Permission.RECHARGE_CHANNEL_UPDATE]" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRechargeChannelList, addRechargeChannel, updateRechargeChannel, deleteRechargeChannel } from '@/api/rechargeChannel'
import { ChannelOrderStatusOptions, DialogTypeOptions, StatusOptions } from '@/definitions/options'
import { ChannelOrderStatus } from '@/definitions/constants'
import { DialogType } from '@/definitions/constants'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'
import upload from '@/assets/file/upload.png'
import { Permission } from '@/definitions/constants'
import { hasAcl } from '@/utils/auth'

export default {
  name: 'rechargeChannelList',
  data() {
    const validateNull = (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        callback(new Error(this.$i18n.t('rules.required')))
      }
      callback()
    }
    return {
      Permission,
      upload,
      StatusOptions,
      DialogType,
      DialogTypeOptions,
      ChannelOrderStatus,
      ChannelOrderStatusOptions,
      dialogFormVisible: false,
      formData: {},
      defaultFormData: {},
      rules: {
        name: [...Rules.requiredBlur, ...Rules.headTailSpace, ...Rules.noSpace, { trigger: 'blur', min: 1, max: 20, message: this.$t('rules.oneToTwentyLength') }],
        paymentMethod: [...Rules.requiredBlur],
        realName: [...Rules.requiredBlur, ...Rules.headTailSpace, ...Rules.noSpace],
        bankName: [...Rules.requiredBlur, ...Rules.headTailSpace, ...Rules.noSpace],
        bankAccount: [...Rules.requiredBlur, ...Rules.headTailSpace, ...Rules.noSpace],
        status: [...Rules.requiredBlur],
        qrCodeFile: [{ required: true, trigger: ['change', 'blur'], validator: validateNull }],
        memo: [...Rules.memo]

      },
      showDeleteIcon: false,
      list: [],
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 0,
          rows: 20,
          needSort: true
        }
      }
    }
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    handleOpenFile() {
      this.$refs.fileInput.click()
    },
    serializeFormData() {
      const {
        name,
        paymentMethod,
        status,
        bankAccount,
        bankName,
        memo = '',
        realName
      } = this.formData
      const formData = new FormData()
      formData.append('name', name)
      formData.append('realName', realName)
      formData.append('status', status)
      formData.append('memo', memo)
      formData.append('paymentMethod', paymentMethod)
      if (paymentMethod === ChannelOrderStatus.BankCard) {
        formData.append('bankName', bankName)
        formData.append('bankAccount', bankAccount)
      } else if (paymentMethod === ChannelOrderStatus.WeChant) {
        formData.append('qrCodeImageFile', this.$refs.fileInput.files[0])
      } else if (paymentMethod === ChannelOrderStatus.AliPay) {
        formData.append('qrCodeImageFile', this.$refs.fileInput.files[0])
        formData.append('bankAccount', bankAccount)
      }
      return formData
    },
    handleCancel() {
      this.$refs.fileInput.value = null
      this.showDeleteIcon = false
      this.$set(this.formData, 'qrCodeFile', null)
      this.$nextTick(() => {
        this.$refs['dataForm'].validateField('qrCodeFile')
      })
    },
    handlePreviewImage(event) {
      const input = event.target
      if (input.files && input.files[0]) {
        // 顯示用
        const reader = new FileReader()
        const that = this
        reader.onload = e => {
          that.$set(that.formData, 'qrCodeFile', e.target.result)
          that.showDeleteIcon = true
          that.$refs['dataForm'].validateField('qrCodeFile')
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    updateData() {
      const { id, memo = '', name, status } = this.formData
      if (id) {
        updateRechargeChannel({ id, memo, name, status }).then(() => {
          this.dialogFormVisible = false
          this.getList()
        })
      }
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const data = this.serializeFormData()
          addRechargeChannel(data).then(() => {
            this.dialogFormVisible = false
            this.getList()
          })
        }
      })
    },
    changeStatus(row, { status, memo }) {
      const { id, name } = row
      if (id) {
        const data = { id, status, memo, name }
        updateRechargeChannel(data).then(this.getList)
      }
    },
    handleCreate() {
      this.formData = objectMerge(deepClone(this.defaultFormData), { paymentMethod: ChannelOrderStatus.BankCard, status: 1 })
      this.dialogFormVisible = true
      this.dialogType = DialogType.Create
    },
    handleDelete(row) {
      this.$confirm(
        this.$t('rechargeChannelList.message.delete.content'),
        this.$t('rechargeChannelList.message.delete.title'),
        {
          confirmButtonText: this.$t('confirmDialog.confirm'),
          cancelButtonText: this.$t('confirmDialog.cancel')
        }
      ).then(() => {
        deleteRechargeChannel(row.id).then(() => {
          this.getList()
        })
      })
    },
    handleModify(row) {
      const cloneData = { ...row, ...row.info, qrCodeFile: row.info.qrCodeImage }
      this.formData = objectMerge(deepClone(this.defaultFormData), cloneData)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Update
    },
    getQueryParams() {
      return { ...this.paging.query, page: this.paging.query.page + 1 }
    },
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    getList() {
      if (!hasAcl(Permission.RECHARGE_CHANNEL_PAGE)) return
      this.paging.isLoading = true
      getRechargeChannelList(this.getQueryParams()).then(response => {
        this.list = response.page
        this.paging.totalElements = response.total
      }).finally(() => {
        this.paging.isLoading = false
      })
    },
    handleSizeChange(val) {
      this.paging.query.rows = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.paging.query.page = val
      this.getList()
    },
    onSortChange(column) {
      if (column.prop) {
        this.paging.query.sort = `${column.prop},${column.order === 'ascending' ? 'ASC' : 'DESC'}`
        this.getList()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.file-input {
  display: none;
}
.input-container {
  width: 100%;
  max-width: 228px;
  position: relative;
  input {
    cursor: pointer;
    opacity: 1;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    max-width: 228px;
  }
  .cancel {
    position: absolute;
    right: -20px;
    top: 0;
    cursor: pointer;
  }
}
</style>
