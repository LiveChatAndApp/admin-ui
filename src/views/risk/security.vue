<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-select v-model="paging.query.type" :options="SecurityTypeOptions" :placeholder="$t('security.type')" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.SecurityList]" />
        <bs-button @click="handleCreate(SecurityType.CreateOrder)"
          :title="`${$t('table.add')}${$t('security.types.createOrder')}`" v-permission="[Permission.SecurityAdd]" />
        <bs-button @click="handleCreate(SecurityType.UserLogin)"
          :title="`${$t('table.add')}${$t('security.types.userLogin')}`" v-permission="[Permission.SecurityAdd]" />
        <bs-button @click="handleCreate(SecurityType.WithdrawCardNo)"
          :title="`${$t('table.add')}${$t('security.types.withdrawCardNo')}`" v-permission="[Permission.SecurityAdd]" />
      </div>

      <el-table :data="list[paging.query.type]" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')"
        border fit highlight-current-row v-permission="[Permission.SecurityList]">
        <el-table-column :label="$t('table.id')">
          <template slot-scope="scope">{{scope.row.securityId}}</template>
        </el-table-column>

        <el-table-column v-if="paging.query.type===SecurityType.CreateOrder" :label="$t('merchantList.merchant')">
          <template slot-scope="scope">{{scope.row.merchantName || scope.row.key}}</template>
        </el-table-column>
        <el-table-column v-else-if="paging.query.type===SecurityType.UserLogin" :label="$t('userList.username')">
          <template slot-scope="scope">{{scope.row.key}}</template>
        </el-table-column>
        <el-table-column v-else-if="paging.query.type===SecurityType.WithdrawCardNo" :label="$t('security.cardNo')">
          <template slot-scope="scope">{{scope.row.key}}</template>
        </el-table-column>

        <el-table-column v-if="paging.query.type===SecurityType.CreateOrder" :label="$t('security.ipList')">
          <template slot-scope="scope">{{scope.row.value}}</template>
        </el-table-column>
        <el-table-column v-if="paging.query.type===SecurityType.UserLogin" :label="$t('security.ipList')">
          <template slot-scope="scope">{{scope.row.value}}</template>
        </el-table-column>
        <el-table-column v-else-if="paging.query.type===SecurityType.WithdrawCardNo"
          :label="$t('security.cardholderName')">
          <template slot-scope="scope">{{scope.row.value}}</template>
        </el-table-column>

        <el-table-column :label="$t('timestamp.createTime')">
          <template slot-scope="scope">{{scope.row.createTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-status :status="scope.row.status" :memo="scope.row.memo"
              @on-click-submit="changeStatus(scope.row, $event)" v-permission="[Permission.SecurityUpdate]" />
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
            <bs-edit-button @click="handleModify(scope.row)" v-permission="[Permission.SecurityUpdate]" />
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form v-if="this.formData.type===SecurityType.CreateOrder" :rules="rules" ref="dataForm" :model="formData"
          label-position="left" label-width="100px">
          <el-form-item v-if="dialogType===DialogType.Create" :label="$t('merchantList.merchant')" prop="merchantId">
            <bs-select v-model="formData.merchantId" :options="merchantList" :filterable="true" :clearable="false" />
          </el-form-item>
          <el-form-item v-else :label="$t('merchantList.merchant')" prop="merchantId">{{formData.merchantName ||
          formData.merchantId}}</el-form-item>

          <el-form-item :label="$t('security.ipList')" prop="ipList">
            <bs-text-area v-model="formData.ipList" :placeholder="$t('security.ipListPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('status.status')" prop="status">
            <bs-switch v-model="formData.status" />
          </el-form-item>
          <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-text-area v-model="formData.memo" />
          </el-form-item>
          <el-form-item :label="$t('security.help.help')">
            <pre>{{$t('security.help.createOrder')}}</pre>
          </el-form-item>
        </el-form>

        <el-form v-else-if="this.formData.type===SecurityType.UserLogin" :rules="rules" ref="dataForm" :model="formData"
          label-position="left" label-width="100px">
          <el-form-item v-if="dialogType===DialogType.Create" :label="$t('userList.username')" prop="username">
            <bs-select v-model="formData.username" :options="userList" :filterable="true" :clearable="false" />
          </el-form-item>
          <el-form-item v-else :label="$t('userList.username')" prop="username">{{formData.username}}</el-form-item>

          <el-form-item :label="$t('security.ipList')" prop="ipList">
            <bs-text-area v-model="formData.ipList" :placeholder="$t('security.ipListPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('status.status')" prop="status">
            <bs-switch v-model="formData.status" />
          </el-form-item>
          <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-text-area v-model="formData.memo" />
          </el-form-item>
          <el-form-item :label="$t('security.help.help')">
            <pre>{{$t('security.help.userLogin')}}</pre>
          </el-form-item>
        </el-form>

        <el-form v-else-if="this.formData.type===SecurityType.WithdrawCardNo" :rules="rules" ref="dataForm"
          :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('security.cardNo')" prop="cardNo">
            <bs-input v-model="formData.cardNo" />
          </el-form-item>
          <el-form-item :label="$t('security.cardholderName')" prop="cardholderName">
            <bs-input v-model="formData.cardholderName" />
          </el-form-item>
          <el-form-item :label="$t('status.status')" prop="status">
            <bs-switch v-model="formData.status" />
          </el-form-item>
          <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-text-area v-model="formData.memo" />
          </el-form-item>
          <el-form-item :label="$t('security.help.help')">
            <pre>{{$t('security.help.withdrawCardNo')}}</pre>
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
import { DialogType, Permission, SecurityType, Status } from '@/definitions/constants'
import { DialogTypeOptions, findOptionById, SecurityTypeOptions, StatusOptions } from '@/definitions/options'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'
import { addSecurity, getSecurityList, updateSecurity } from '@/api/security'
import { Message } from 'element-ui'
import { getMerchantIndexingAll, getUserIndexing } from '@/api/indexing'

export default {
  name: 'security',
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
          rows: undefined,
          type: 0 // 下拉選單要給初始值，沒給的話不知何原因未造成 re-render 時好時壞
        }
      },
      rules: {
        merchantId: [...Rules.requiredChange, ...Rules.noSpace],
        username: [...Rules.requiredChange, ...Rules.noSpace, ...Rules.username],
        ipList: [...Rules.requiredBlur, ...Rules.ipList],
        cardNo: [...Rules.requiredBlur, ...Rules.cardNo2],
        cardholderName: [...Rules.noSpace, ...Rules.name],
        status: [...Rules.requiredChange],
        memo: [...Rules.requiredBlur, ...Rules.memo]
      },
      StatusOptions,
      SecurityType,
      SecurityTypeOptions,
      defaultFormData: {
        status: Status.Enabled
      },
      formData: {},
      list: [],
      merchantList: [],
      userList: []
    }
  },
  created() {
    // this.queryMerchantList()
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 因為 getMerchantIndexingAll 資料太多造成第一次 getList 取不到 this.merchantList
      // 確保已經塞回在 then 之後 再去 getList
      getMerchantIndexingAll().then(response => {
        this.merchantList = response.map(res => ({
          id: res.merchantId,
          name: `${res.merchantName} (${res.merchantId})`
        }))
      }).then(() => this.getList(true))
    },
    getList(shouldShowError) {
      // 必須有選擇才可以
      if (this.paging.query.type === undefined || this.paging.query.type === null || this.paging.query.type === '') {
        if (shouldShowError) {
          Message({
            message: this.$t('security.errors.type'),
            type: 'error',
            duration: 5 * 1000
          })
        }
        return
      }

      this.paging.isLoading = true
      getSecurityList(this.paging.query).then(response => {
        if (response && response.content) {
          response.content.forEach(res => {
            switch (res.type) {
              case SecurityType.CreateOrder:
                {
                  res.merchantId = res.key
                  const merchant = findOptionById(this.merchantList, res.key)
                  if (merchant) {
                    res.merchantName = merchant.name
                  }
                  res.ipList = res.value
                }
                break

              case SecurityType.UserLogin:
                res.username = res.key
                res.ipList = res.value
                break

              case SecurityType.WithdrawCardNo:
                res.cardNo = res.key
                break

              default:
            }
          })
        }

        this.list[this.paging.query.type] = response.content
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
      this.getList(true)
    },
    changeStatus(row, { status, memo }) {
      const data = {
        securityId: row.securityId,
        type: row.type,
        status,
        memo
      }
      updateSecurity(data).then(() => {
        this.getList()
      })
    },
    handleCreate(type) {
      this.formData = deepClone(this.defaultFormData)
      this.formData.type = type

      if (type === SecurityType.CreateOrder) {
        this.queryMerchantList()
      } else if (type === SecurityType.UserLogin) {
        this.queryUserList()
      }

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
          this.normalize()
          addSecurity(this.formData).then(() => {
            this.getList(false)
          })
          this.dialogFormVisible = false
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.normalize()
          updateSecurity(this.formData).then(() => {
            this.getList(false)
          })
          this.dialogFormVisible = false
        }
      })
    },
    normalize() {
      switch (this.formData.type) {
        case SecurityType.CreateOrder:
          this.formData.key = this.formData.merchantId
          this.formData.value = this.formData.ipList
          break

        case SecurityType.UserLogin:
          this.formData.key = this.formData.username
          this.formData.value = this.formData.ipList
          break

        case SecurityType.WithdrawCardNo:
          this.formData.key = this.formData.cardNo
          this.formData.value = this.formData.cardholderName
          break

        default:
      }
    },
    queryMerchantList() {
      getMerchantIndexingAll().then(response => {
        this.merchantList = response.map(res => ({
          id: res.merchantId,
          name: `${res.merchantName} (${res.merchantId})`
        }))
      })
    },
    queryUserList() {
      getUserIndexing().then(response => {
        this.userList = response.map(res => ({
          id: res.username,
          name: `${res.username} - ${res.merchantName} (${res.merchantId})`
        }))
      })
    }
  }
}
</script>
