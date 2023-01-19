<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-add-button @click="handleCreate" v-permission="[Permission.ChannelAdd]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.ChannelList]">
        <el-table-column :label="$t('table.id')">
          <template slot-scope="scope">{{scope.row.channelId}}</template>
        </el-table-column>
        <el-table-column :label="$t('channelList.channelName')">
          <template slot-scope="scope">{{scope.row.channelName}}</template>
        </el-table-column>
        <el-table-column :label="$t('channelList.channelCode')">
          <template slot-scope="scope">{{scope.row.channelCode}}</template>
        </el-table-column>

        <!-- 优惠状态 -->
        <!-- <el-table-column :label="$t('channelList.discountStatus')">
          <template slot-scope="scope">
            <bs-status :status="scope.row.discountStatus" @on-click-submit="changeDiscountStatus(scope.row, $event)"
                       :clickable="hasAcl(Permission.ChannelUpdate)"/>
          </template>
        </el-table-column>-->

        <el-table-column :label="$t('timestamp.createTime')">
          <template slot-scope="scope">{{scope.row.createTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-status :status="scope.row.status" :memo="scope.row.memo"
              @on-click-submit="changeStatus(scope.row, $event)" :clickable="hasAcl(Permission.ChannelUpdate)" />
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
            <bs-edit-button @click="handleModify(scope.row)" v-permission="[Permission.ChannelUpdate]" />
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('channelList.channelName')" prop="channelName">
            <bs-input v-model="formData.channelName" />
          </el-form-item>
          <el-form-item :label="$t('channelList.channelCode')" prop="channelCode">
            <bs-input v-model="formData.channelCode" />
          </el-form-item>

          <!-- 结算周期 -->
          <!-- <el-form-item :label="$t('channelList.settlement')" prop="settlementList">
            <ol>
              <li v-for="settlement of formData.settlementList" :key="settlement">

                <bs-select v-model="settlement.percentage1" :options="SettlementPercentageOptions"
                           width="85px" :clearable='false'/>
                <bs-select v-model="settlement.closingDay1" :options="SettlementClosingDayOptions"
                           width="70px" :clearable='false'/>

                <bs-select v-model="settlement.percentage2" :options="SettlementPercentageOptions"
                           width="85px" :clearable='false'/>
                <bs-select v-model="settlement.closingDay2" :options="SettlementClosingDayOptions"
                           width="70px" :clearable='false'/>
              </li>
            </ol>
          </el-form-item>-->

          <!-- 优惠状态 -->
          <!-- <el-form-item :label="$t('channelList.discountStatus')" prop="discountStatus">
            <bs-switch v-model="formData.discountStatus"/>
          </el-form-item>-->

          <el-form-item :label="$t('status.status')" prop="status">
            <bs-select v-model="formData.status" :options="StatusOptions" :clearable="false" />
          </el-form-item>
          <!-- <el-form-item :label="$t('table.memo')" :prop="dialogType===DialogType.Update?'memo':undefined">
            <bs-text-area v-model="formData.memo"/>
          </el-form-item>-->

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
import { addChannel, getChannelList, updateChannel } from '@/api/channel'
import {
  DialogTypeOptions,
  SettlementClosingDayOptions,
  SettlementPercentageOptions,
  StatusOptions
} from '@/definitions/options'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'
import { hasAcl } from '@/utils/auth'

export default {
  name: 'channelList',
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
        channelName: [...Rules.requiredBlur, ...Rules.channelName],
        channelCode: [...Rules.requiredBlur, ...Rules.paymentCode],
        status: [...Rules.requiredChange],
        discountStatus: [...Rules.requiredChange],
        settlementList: [{ required: true }],
        memo: [...Rules.memo]
      },
      StatusOptions,
      SettlementPercentageOptions,
      SettlementClosingDayOptions,
      defaultFormData: {
        channelId: undefined,
        channelName: undefined,
        channelCode: undefined,
        settlementList: [
          { percentage1: 0, closingDay1: 0, percentage2: 0, closingDay2: 0 },
          { percentage1: 0, closingDay1: 0, percentage2: 0, closingDay2: 0 },
          { percentage1: 0, closingDay1: 0, percentage2: 0, closingDay2: 0 }
        ],
        status: Status.Enabled,
        discountStatus: Status.Disabled
      },
      formData: {},
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    hasAcl,
    getList() {
      this.paging.isLoading = true
      getChannelList(this.paging.query).then(response => {
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
        channelId: row.channelId,
        status,
        memo
      }
      updateChannel(data).then(this.getList)
    },
    changeDiscountStatus(row, { status, memo }) {
      const data = {
        channelId: row.channelId,
        discountStatus: status,
        memo
      }
      updateChannel(data).then(this.getList)
    },
    handleCreate() {
      this.formData = deepClone(this.defaultFormData)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Create
    },
    handleModify(row) {
      // 目前沒有這個 key 了 先給 default 空陣列
      const { settlementList = [] } = row
      // settlementList 內 的 channelId 移除，目前後端沒有這個欄位
      row.settlementList = settlementList.map(({ channelId, ...item }) => {
        return item
      })
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      if (!this.formData.settlementList) {
        this.formData.settlementList = []
      }
      while (this.formData.settlementList.length < this.defaultFormData.settlementList.length) {
        this.formData.settlementList.push(
          deepClone(this.defaultFormData.settlementList[this.formData.settlementList.length])
        )
      }

      this.dialogFormVisible = true
      this.dialogType = DialogType.Update
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid && this.verifySettlementList()) {
          addChannel(this.formData).then(() => {
            this.getList()
          })
          this.dialogFormVisible = false
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid && this.verifySettlementList()) {
          updateChannel(this.formData).then(() => {
            this.getList()
          })
          this.dialogFormVisible = false
        }
      })
    },
    verifySettlementList() {
      for (const settlement of this.formData.settlementList) {
        const sum = settlement.percentage1 + settlement.percentage2
        if (sum !== 100 && sum !== 0) {
          this.$message({
            message: this.$t('channelList.rules.settlementSum'),
            type: 'warning'
          })
          return false
        }
      }
      return true
    }
  }
}
</script>
