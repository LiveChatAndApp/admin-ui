<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <bs-input v-model="paging.query.orderCode" :placeholder="$t('withdrawOrderList.orderCode')" />
      <bs-input v-model="paging.query.memberName" :placeholder="$t('withdrawOrderList.memberName')" />
      <!-- <bs-select
        v-model="paging.query.channel"
        :options="ChannelOrderStatusOptions"
        :placeholder="$t('withdrawOrderList.channel')"
        filterable
      /> -->
      <bs-select
        v-model="paging.query.status"
        :options="statusOptions"
        :placeholder="$t('withdrawOrderList.status')"
        filterable
      />
      <bs-date-range-picker
        type="datetimerange"
        v-model="paging.query.dates"
        :clearable="true"
        :placeholder="$t('withdrawOrderList.createDate')"
        style="margin-bottom: 10px; vertical-align: middle;"
      />
      <bs-date-range-picker
        type="datetimerange"
        v-model="paging.query.completeDates"
        :clearable="true"
        :placeholder="$t('withdrawOrderList.completeDate')"
        style="margin-bottom: 10px; vertical-align: middle;"
      />
      <bs-search-button @click="handleSearch" v-permission="[Permission.WITHDRAW_ORDER_PAGE]" />
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
      v-permission="[Permission.WITHDRAW_ORDER]"
    >
      <el-table-column :label="$t('withdrawOrderList.orderCode')">
        <template slot-scope="scope">{{ scope.row.orderCode }}</template>
      </el-table-column>
      <!-- <el-table-column :label="$t('withdrawOrderList.userId')">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column> -->
      <el-table-column :label="$t('withdrawOrderList.memberName')">
        <template slot-scope="scope">{{ scope.row.memberName }}</template>
      </el-table-column>
      <el-table-column :label="$t('withdrawOrderList.nickName')">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>
      <el-table-column :label="$t('withdrawOrderList.channel')">
        <template slot-scope="scope">
          <bs-status-text :options="ChannelOrderStatusOptions" :status="scope.row.channel" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('withdrawOrderList.accountInfo')" min-width="220px">
        <template slot-scope="scope">
          <div
            v-for="(value, key) in scope.row.accountInfo"
            :key="key"
          >
            {{ $t(`withdrawOrderList.${key}`) }} : {{ value }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('withdrawOrderList.amount')">
        <template slot-scope="scope">{{ scope.row.amount }}</template>
      </el-table-column>
      <el-table-column :label="$t('withdrawOrderList.currency')">
        <template slot-scope="scope">{{ scope.row.currency }}</template>
      </el-table-column>

      <el-table-column :label="$t('withdrawOrderList.createTime')" sortable="custom" prop="_create_time" min-width="140px">
        <template slot-scope="scope">{{ scope.row.createTime | moment }}</template>
      </el-table-column>
      <el-table-column :label="$t('withdrawOrderList.completeTime')" sortable="custom" prop="_complete_time" min-width="140px">
        <template slot-scope="scope">{{ scope.row.completeTime | moment }}</template>
      </el-table-column>
      <el-table-column :label="$t('withdrawOrderList.status')">
        <template slot-scope="scope">
          <bs-status-text :options="statusOptions" :status="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" fixed="right" width="100px">
        <template slot-scope="scope"  v-if="scope.row.status === WithdrawOrderStatus.Processing">
          <el-dropdown @command="(command) => { handleActions(command, scope.row) }" v-permission="[Permission.WITHDRAW_ORDER_AUDIT]">
            <span class="el-dropdown-link">{{ $t('dropdown.more') }}</span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="showInfo">{{ $t('withdrawOrderList.showInfo') }}</el-dropdown-item> -->
              <el-dropdown-item :command="WithdrawOrderStatus.Completed">{{ $t('withdrawOrderList.approve') }}</el-dropdown-item>
              <el-dropdown-item :command="WithdrawOrderStatus.Reject">{{ $t('withdrawOrderList.reject') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    <!-- otp -->
    <el-dialog
      :title="$t('rechargeOrderList.verify')"
      :visible.sync="otpDialogVisible"
      v-if="otpDialogVisible"
      :close-on-click-modal="false"
      :show-close="true"
      width="80%"
    >
      <el-form
        :rules="rules"
        ref="dataForm"
        :model="formData"
        label-position="left"
        label-width="100px"
      >
        <el-form-item :label="$t('otp.codePlaceholder')" prop="totpCode">
          <bs-input v-model="formData.totpCode" :placeholder="$t('otp.codePlaceholder')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <bs-cancel-button @click="otpDialogVisible = false" />
        <bs-submit-button @click="handleSubmitOtp" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getWithdrawOrderList, updateWithdrawOrderAudit } from '@/api/withdrawOrder'
import { WithdrawOrderStatusOptions, ChannelOrderStatusOptions } from '@/definitions/options'
import { WithdrawOrderStatus } from '@/definitions/constants'
import { formatDate } from '@/utils/format'
import { Permission } from '@/definitions/constants'
import { hasAcl } from '@/utils/auth'
import { Rules } from '@/definitions/fieldCheck'
import { deepClone, objectMerge } from '@/utils'
import { getUserProfile } from '@/api/user'

export default {
  name: 'withdrawOrderList',
  data() {
    return {
      Permission,
      WithdrawOrderStatus,
      statusOptions: WithdrawOrderStatusOptions.filter(({ simple }) => simple),
      ChannelOrderStatusOptions,
      list: [],
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 0,
          rows: 20,
          needSort: true
        }
      },
      formData: {},
      rules: {
        totpCode: [...Rules.requiredBlur]
      },
      otpDialogVisible: false
    }
  },
  created() {
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    gotoOtpPage() {
      this.$confirm(this.$t('otp.plzBindOtp'), this.$t('confirmDialog.hint'), {
        confirmButtonText: this.$t('confirmDialog.confirm'),
        cancelButtonText: this.$t('confirmDialog.cancel'),
        type: 'warning'
      })
        .then(() => {
          this.$router.push('/backend/userProfile')
        })
        .catch(() => {})
    },
    // 同意、拒絕
    handleSubmitOtp() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.handleAudit()
        }
      })
    },
    async handleActions(status, row) {
      // 先驗證是否有綁定
      let profile = null
      try {
        profile = await getUserProfile()
        // 如果還沒綁定
        if (profile && profile.isVerifyOtpKey === 0) {
          this.gotoOtpPage()
        } else if (profile && profile.isVerifyOtpKey !== 0) {
          const o = {
            id: row.withdrawOrderId,
            status
          }
          this.formData = objectMerge(deepClone({}), o)
          this.otpDialogVisible = true
        }
      } catch (error) {
        //
      }
    },
    handleAudit() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      updateWithdrawOrderAudit(this.formData).then(() => {
        this.otpDialogVisible = false
        this.getList()
      }).catch((err) => {
        console.log('err:', err)
      }).finally(() => {
        loading.close()
      })
    },
    getQueryParams() {
      const params = { ...this.paging.query, page: this.paging.query.page + 1 }

      const { dates, completeDates } = params
      // 日期參數重整
      if (dates) {
        params.createTimeGt = formatDate(this.paging.query.dates[0])
        params.createTimeLe = formatDate(this.paging.query.dates[1])
        params.dates = undefined
      }

      if (completeDates) {
        params.completeTimeGt = formatDate(this.paging.query.completeDates[0])
        params.completeTimeLe = formatDate(this.paging.query.completeDates[1])
        params.completeDates = undefined
      }
      return params
    },
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    getList() {
      if (!hasAcl(Permission.WITHDRAW_ORDER_PAGE)) return
      this.paging.isLoading = true
      getWithdrawOrderList(this.getQueryParams()).then(response => {
        this.list = response.page.map((o) => {
          let accountInfo = {}
          try {
            if (o.accountInfo) {
              accountInfo = JSON.parse(o.accountInfo)
            }
          } catch (error) {
            console.log('error:', error)
          }
          return { ...o, accountInfo }
        })
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

</style>
