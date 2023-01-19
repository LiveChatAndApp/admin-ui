<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-select v-model="paging.query.merchantId" :options="merchantList"
          :placeholder="$t('merchantList.merchant')" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.BannedIpList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.BannedIpAdd]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.BannedIpList]">
        <el-table-column :label="$t('merchantList.merchant')">
          <template slot-scope="scope">{{getMerchantName(scope.row.merchantId)}}</template>
        </el-table-column>
        <el-table-column label="IP">
          <template slot-scope="scope">{{scope.row.ip}}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-status :status="scope.row.status" @on-click-submit="changeStatus(scope.row, $event)" />
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
            <bs-edit-button @click="handleModify(scope.row)" v-permission="[Permission.BannedIpUpdate]">
              {{$t('table.edit')}}</bs-edit-button>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('merchantList.merchant')" prop="merchantId">
            <bs-select v-model="formData.merchantId" :options="merchantList" :clearable="false" />
          </el-form-item>
          <el-form-item label="IP" prop="ip">
            <bs-input v-model="formData.ip" />
          </el-form-item>
          <el-form-item :label="$t('status.status')" prop="status">
            <bs-select v-model="formData.status" :options="StatusOptions" :clearable="false" />
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
import { DialogType, Permission, Status } from '@/definitions/constants'
import { addBannedIpList, getBannedIpList, updateBannedIpList } from '@/api/bannedIp'
import { getMerchantIndexing } from '@/api/indexing'
import { DialogTypeOptions, findOptionById, StatusOptions } from '@/definitions/options'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'

export default {
  name: 'bannedIp',
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
        merchantId: [...Rules.requiredChange],
        ip: [...Rules.requiredBlur, ...Rules.ipList],
        status: [...Rules.requiredChange],
        memo: [...Rules.memo]
      },
      StatusOptions,
      defaultFormData: {
        status: Status.Enabled
      },
      formData: {},
      list: [],
      merchantList: []
    }
  },
  created() {
    getMerchantIndexing().then(response => {
      this.merchantList = response.map(res => ({ id: res.merchantId, name: res.merchantName }))
    })

    this.getList()
  },
  methods: {
    getList() {
      this.paging.isLoading = true
      getBannedIpList(this.paging.query).then(response => {
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
      updateBannedIpList(data).then(this.getList)
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
          addBannedIpList(this.formData).then(() => {
            this.getList()
          })
          this.dialogFormVisible = false
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateBannedIpList(this.formData).then(() => {
            this.getList()
          })
          this.dialogFormVisible = false
        }
      })
    },
    getMerchantName(merchantId) {
      const option = findOptionById(this.merchantList, merchantId)
      return option ? option.name : merchantId
    }
  }
}
</script>
