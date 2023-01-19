<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <div class="filter-container">
        <bs-select v-model="paging.query.merchantId" :options="merchantList"
          :placeholder="$t('merchantList.merchant')" />
        <bs-input v-model="paging.query.merchantUserId" placeholder="User ID" />
        <bs-date-range-picker v-model="paging.query.dates" :placeholder="$t('payOrderList.applyDate')" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.MerchantUserList]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.MerchantUserList]">
        <el-table-column :label="$t('merchantList.merchant')">
          <template slot-scope="scope">{{scope.row.merchantName}}</template>
        </el-table-column>
        <el-table-column label="User ID">
          <template slot-scope="scope">{{scope.row.merchantUserId}}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-status :status="scope.row.status" @on-click-submit="changeStatus(scope.row, $event)" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('merchantUser.assignedAccountList')">
          <template slot-scope="scope">
            <span v-if="!!scope.row.catchIdList">{{scope.row.catchIdList.join(', ')}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('merchantUser.backupAssignedAccountList')">
          <template slot-scope="scope">
            <span v-if="!!scope.row.backupCatchIdList">{{scope.row.backupCatchIdList.join(', ')}}</span>
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
            <bs-detail-button @click="handleDetail(scope.row)" v-permission="[Permission.MerchantUserReport]" />
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="$t('table.detail')" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" width="400px" :show-close="true">
        <el-table :data="report" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
          highlight-current-row v-permission="[Permission.MerchantUserReport]">
          <el-table-column :label="$t('merchantList.merchant')">
            <template slot-scope="scope">{{scope.row.catchId}}</template>
          </el-table-column>
          <el-table-column :label="$t('merchantUser.count')">
            <template slot-scope="scope">{{scope.row.count}}</template>
          </el-table-column>
          <el-table-column :label="$t('merchantUser.amount')">
            <template slot-scope="scope">{{scope.row.amount | money}}</template>
          </el-table-column>
          <el-table-column :label="$t('status.status')">
            <template slot-scope="scope">
              <bs-account-status :status="scope.row.status" :clickable="false" />
            </template>
          </el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
          <bs-button :title="$t('table.confirm')" @click="dialogFormVisible=false" />
        </div>
      </el-dialog>

    </div>

  </div>

</template>

<script>
  import { AccountStatus, Permission } from '@/definitions/constants'
  import { StatusOptions } from '@/definitions/options'
  import { getMerchantUserList, getMerchantUserReport, updateMerchantUser } from '@/api/merchantUser'
  import { getMerchantIndexing } from '@/api/indexing'
  import moment from 'moment'
  import { formatDateAsEnd, formatDateAsStart } from '@/utils/format'
  import { moneyToDollar } from '@/utils/money'

  export default {
    name: 'channelList',
    data() {
      return {
        Permission,
        dialogFormVisible: false,
        paging: {
          isLoading: false,
          totalElements: null,
          query: {
            dates: [moment().subtract(7, 'day').toDate(), moment().toDate()],
            page: 0,
            rows: undefined
          }
        },
        StatusOptions,
        list: [],
        merchantList: [],
        report: []
      }
    },
    created() {
      this.queryMerchantList()
      this.getList()
    },
    methods: {
      getList() {
        this.paging.isLoading = true
        const params = {
          merchantId: this.paging.query.merchantId,
          merchantUserId: this.paging.query.merchantUserId,
          page: this.paging.query.page,
          size: this.paging.query.size
        }
        getMerchantUserList(params).then(response => {
          this.list = this.sortList(response.content)
          this.paging.totalElements = response.totalElements
          this.paging.isLoading = false
        })
      },
      sortList(list) {
        return list.sort((a, b) => {
          if (a.status === b.status) {
            if (a.catchId > b.catchId) {
              return -1
            } else if (a.catchId < b.catchId) {
              return 1
            } else {
              return 0
            }
          } else {
            if (a.status === AccountStatus.Enabled) {
              return -1
            } else if (b.status === AccountStatus.Enabled) {
              return -1
            } else {
              if (a.catchId > b.catchId) {
                return -1
              } else if (a.catchId < b.catchId) {
                return 1
              } else {
                return 0
              }
            }
          }
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
        updateMerchantUser(data).then(this.getList)
      },
      handleSearch() {
        this.paging.query.page = 0
        this.getList()
      },
      handleDetail(row) {
        getMerchantUserReport(this.getQueryParams(row)).then(response => {
          if (response && response.length > 0) {
            response.forEach(res => {
              res.amount = moneyToDollar(res.amount)
            })
          }
          this.report = response
          this.dialogFormVisible = true
        })
      },
      queryMerchantList() {
        getMerchantIndexing().then(response => {
          this.merchantList = response.map(res => ({ id: res.merchantId, name: res.merchantName }))
        })
      },
      getQueryParams(row) {
        const params = {
          id: row.id
        }

        if (this.paging.query.dates) {
          params.startTime = formatDateAsStart(this.paging.query.dates[0])
          params.endTime = formatDateAsEnd(this.paging.query.dates[1])
          params.dates = undefined
        }

        return params
      }
    }
  }
</script>
