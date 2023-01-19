<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <bs-input v-model="paging.query.orderCode" :placeholder="$t('rechargeOrderList.orderCode')" />
      <bs-input v-model="paging.query.memberName" :placeholder="$t('rechargeOrderList.memberName')" />
      <bs-select
        v-model="paging.query.method"
        :options="ChannelOrderStatusOptions"
        :placeholder="$t('rechargeOrderList.method')"
        filterable
      />
      <bs-select
        v-model="paging.query.status"
        :options="statusOptions"
        :placeholder="$t('rechargeOrderList.status')"
        filterable
      />
      <bs-date-range-picker
        type="datetimerange"
        v-model="paging.query.dates"
        :clearable="true"
        :placeholder="$t('rechargeOrderList.createDate')"
        style="margin-bottom: 10px; vertical-align: middle;"
      />
      <bs-date-range-picker
        type="datetimerange"
        v-model="paging.query.completeDates"
        :clearable="true"
        :placeholder="$t('rechargeOrderList.completeDate')"
        style="margin-bottom: 10px; vertical-align: middle;"
      />
      <bs-search-button @click="handleSearch" v-permission="[Permission.RECHARGE_ORDER_PAGE]" />
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
      v-permission="[Permission.RECHARGE_ORDER]" 
    >
      <el-table-column :label="$t('rechargeOrderList.orderCode')">
        <template slot-scope="scope">{{ scope.row.orderCode }}</template>
      </el-table-column>
      <el-table-column :label="$t('rechargeOrderList.memberName')">
        <template slot-scope="scope">{{ scope.row.memberName }}</template>
      </el-table-column>
      <el-table-column :label="$t('rechargeOrderList.nickName')">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>
      <el-table-column :label="$t('rechargeOrderList.method')">
        <template slot-scope="scope">
          <bs-status-text :options="ChannelOrderStatusOptions" :status="scope.row.method" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('rechargeOrderList.amount')">
        <template slot-scope="scope">{{ scope.row.amount }}</template>
      </el-table-column>
      <el-table-column :label="$t('rechargeOrderList.currency')">
        <template slot-scope="scope">{{ scope.row.currency }}</template>
      </el-table-column>
      <el-table-column :label="$t('rechargeOrderList.payImage')">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.payImage"
            :src="scope.row.payImage"
            fit="contain"
            :preview-src-list="[scope.row.payImage]"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('rechargeOrderList.channelName')">
        <template slot-scope="scope">{{ scope.row.channelName }}</template>
      </el-table-column>
      <el-table-column :label="$t('rechargeOrderList.payInfo')" min-width="220px">
        <template slot-scope="scope">
          <div v-if="scope.row.method === ChannelOrderStatus.BankCard">
            <div>{{ $t('rechargeOrderList.realName') }}: {{ scope.row.channelInfo.realName }}</div>
            <div>{{ $t('rechargeOrderList.bankName') }}: {{ scope.row.channelInfo.bankName }}</div>
            <div>{{ $t('rechargeOrderList.bankAccount') }}: {{ scope.row.channelInfo.bankAccount }}</div>
          </div>
          <div v-if="scope.row.method === ChannelOrderStatus.WeChant">
            <div>{{ $t('rechargeOrderList.realName') }}: {{ scope.row.channelInfo.realName }}</div>
          </div>
          <div v-if="scope.row.method === ChannelOrderStatus.AliPay">
            <div>{{ $t('rechargeOrderList.realName') }}: {{ scope.row.channelInfo.realName }}</div>
            <div>{{ $t('rechargeOrderList.account') }}: {{ scope.row.channelInfo.bankAccount }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('rechargeOrderList.createTime')" sortable="custom" prop="_create_time" min-width="120px">
        <template slot-scope="scope">{{ scope.row.createTime | moment }}</template>
      </el-table-column>
      <el-table-column :label="$t('rechargeOrderList.completeTime')" sortable="custom" prop="_complete_time" min-width="120px">
        <template slot-scope="scope">{{ scope.row.completeTime | moment }}</template>
      </el-table-column>
      <el-table-column :label="$t('rechargeOrderList.status')">
        <template slot-scope="scope">
          <bs-status-text :options="statusOptions" :status="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" fixed="right" width="100px">
        <template slot-scope="scope" v-if="(scope.row.status === RechargeOrderStatus.Processing || scope.row.status === RechargeOrderStatus.Timeout)">
          <el-dropdown @command="(command) => { handleActions(command, scope.row) }" v-permission="[Permission.RECHARGE_ORDER_AUDIT]">
            <span class="el-dropdown-link">{{ $t('dropdown.more') }}</span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="showInfo">{{ $t('rechargeOrderList.showInfo') }}</el-dropdown-item> -->
              <el-dropdown-item v-if="scope.row.status === RechargeOrderStatus.Processing" :command="RechargeOrderStatus.Completed">{{ $t('rechargeOrderList.approve') }}</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.status === RechargeOrderStatus.Processing" :command="RechargeOrderStatus.Reject">{{ $t('rechargeOrderList.reject') }}</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.status === RechargeOrderStatus.Timeout" :command="RechargeOrderStatus.Timeout">{{ $t('rechargeOrderList.directDeposit') }}</el-dropdown-item>
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
      :title="formData.status === RechargeOrderStatus.Timeout ? $t('rechargeOrderList.directDeposit') : $t('rechargeOrderList.verify')"
      :visible.sync="otpDialogVisible"
      v-if="otpDialogVisible"
      :close-on-click-modal="false"
      :show-close="true"
      width="80%"
    >
      <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left">
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
import { getRechargeOrderList, updateRechargeOrderAudit, updateDirectDeposit } from '@/api/rechargeOrder'
import { RechargeOrderStatusOptions, ChannelOrderStatusOptions } from '@/definitions/options'
import { RechargeOrderStatus, ChannelOrderStatus } from '@/definitions/constants'
import { formatDate } from '@/utils/format'
import { getUserProfile } from '@/api/user'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'
import { Permission } from '@/definitions/constants'
import { hasAcl } from '@/utils/auth'

export default {
  name: 'rechargeOrderList',
  data() {
    return {
      Permission,
      ChannelOrderStatus,
      ChannelOrderStatusOptions,
      RechargeOrderStatus,
      statusOptions: RechargeOrderStatusOptions.filter(({ simple }) => simple),
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
    getProfile() {
      getUserProfile().then(response => {
        this.profile = response
      })
    },
    // 同意、拒絕
    handleSubmitOtp() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.handleAudit(this.formData)
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
            id: row.rechargeOrderId,
            status
          }
          this.formData = objectMerge(deepClone({}), o)
          this.otpDialogVisible = true
        }
      } catch (error) {
        //
      }
    },
    handleAudit(data) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const { status } = data
      // 同意、拒絕
      if (status === RechargeOrderStatus.Reject || status === RechargeOrderStatus.Completed) {
        updateRechargeOrderAudit(data).then(() => {
          this.getList()
          // otp modal 關閉
          this.otpDialogVisible = false
        }).catch((err) => {
          console.log('err:', err)
        }).finally(() => {
          loading.close()
        })
      } else if (status === RechargeOrderStatus.Timeout) {
        // 超時 （直接打幣）
        updateDirectDeposit(data).then(() => {
          this.getList()
          // otp modal 關閉
          this.otpDialogVisible = false
        }).catch((err) => {
          console.log('err:', err)
        }).finally(() => {
          loading.close()
        })
      }
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
      if (!hasAcl(Permission.RECHARGE_ORDER_PAGE)) return
      this.paging.isLoading = true
      getRechargeOrderList(this.getQueryParams()).then(response => {
        this.list = response.page.map((o) => {
          let payInfo = {}
          try {
            if (o.payInfo) {
              payInfo = JSON.parse(o.payInfo)
            }
          } catch (error) {
            console.log('error:', error)
          }
          return { ...o, payInfo }
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
