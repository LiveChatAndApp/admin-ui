<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-select :placeholder="$t('blackWhiteList.merchantName')" v-model="paging.query.merchantId"
          :options="merchantList" filterable v-if="isSuperAdmin()" />
        <!-- 黑白名單 -->
        <!-- <bs-select
          v-model="paging.query.type"
          :options="BlackWhiteOptions"
          :placeholder="$t('blackWhiteList.blackWhiteList')"
        />-->
        <!-- 狀態 -->
        <bs-select v-model="paging.query.status" :options="StatusOptions" :placeholder="$t('status.status')" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.BlackWhiteList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.BlackWhiteAdd]" />
        <bs-button :title="$t('blackWhiteList.redisSetting')" @click="handleRedisSetting" v-if="isSuperAdmin()" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.BlackWhiteList]">
        <el-table-column :label="$t('blackWhiteList.merchantName')" v-if="isSuperAdmin()">
          <template slot-scope="scope">{{getMerchantName(scope.row.merchantId)}}</template>
        </el-table-column>
        <el-table-column label="IP">
          <template slot-scope="scope">{{scope.row.hostIp}}</template>
        </el-table-column>
        <!-- <el-table-column :label="$t('blackWhiteList.blackWhiteList')">
          <template slot-scope="scope">{{scope.row.typeDscr}}</template>
        </el-table-column>-->
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-status :status="scope.row.status" :memo="scope.row.memo"
              @on-click-submit="changeStatus(scope.row, $event)" />
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
            <bs-edit-button @click="handleModify(scope.row)" v-permission="[Permission.BlackWhiteUpdate]">
              {{$t('table.edit')}}</bs-edit-button>

            <el-button @click="handleDelete(scope.row)" size="mini" class="filter-item remove-m-l" type="danger" v-waves
              v-permission="[Permission.BlackWhiteDelete]">{{$t('label.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('merchantList.merchant')" prop="merchantId">
            <bs-select v-model="formData.merchantId" :options="merchantList" :clearable="false"
              :disabled="dialogType!==DialogType.Create" filterable />
          </el-form-item>
          <el-form-item label="IP" prop="hostIp">
            <bs-input v-model="formData.hostIp" :placeholder="$t('blackWhiteList.ipPlaceholder')" />
          </el-form-item>
          <!-- <el-form-item :label="$t('blackWhiteList.blackWhiteList')" prop="type">
            <bs-select
              v-model="formData.type"
              :options="BlackWhiteOptions"
              :placeholder="$t('blackWhiteList.blackWhiteList')"
            />
          </el-form-item>-->
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
import { getMerchantIndexingAll } from '@/api/indexing'
import {
  getBlackWhiteList,
  addBlackWhite,
  updateBlackWhite,
  deleteBlackWhite,
  setBlackWhiteRedis
} from '@/api/blackWhite'
import { DialogTypeOptions, findOptionById, StatusOptions, BlackWhiteOptions } from '@/definitions/options'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'
import { isSuperAdminLevel } from '@/utils/user'
export default {
  name: 'whiteList',
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
        hostIp: [...Rules.requiredBlur, ...Rules.ipV2],
        type: [...Rules.requiredChange],
        status: [...Rules.requiredChange],
        memo: [...Rules.memo]
      },
      StatusOptions,
      BlackWhiteOptions,
      defaultFormData: {
        status: Status.Enabled
      },
      formData: {},
      list: [],
      merchantList: []
    }
  },
  created() {
    getMerchantIndexingAll().then(response => {
      this.merchantList = response.map(res => ({ id: res.merchantId, name: res.merchantName }))
    })

    this.getList()
  },
  methods: {
    // 設定 redis
    handleRedisSetting() {
      this.paging.isLoading = true
      setBlackWhiteRedis()
        .then(() => {
          this.getList()
        })
        .catch(() => {
          this.paging.isLoading = false
        })
    },
    // 刪除
    handleDelete(row) {
      const { id, merchantId, hostIp, type } = row
      deleteBlackWhite({ id, merchantId, hostIp, type }).then(() => {
        this.getList()
      })
    },
    isSuperAdmin() {
      return isSuperAdminLevel(this.$store)
    },
    getList() {
      this.paging.isLoading = true
      getBlackWhiteList(this.paging.query).then(response => {
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
      updateBlackWhite(data).then(this.getList)
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
          const data = {
            ...this.formData,
            type: 'W' // 目前只有白名單
          }
          addBlackWhite(data).then(() => {
            this.getList()
          })
          this.dialogFormVisible = false
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateBlackWhite(this.formData).then(() => {
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
