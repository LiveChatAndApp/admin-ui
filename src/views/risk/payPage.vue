<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <div class="filter-container">
        <bs-input v-model="paging.query.payOrderId" :placeholder="$t('payOrderList.orderId')" />
        <bs-select v-model="paging.query.status" :options="statusOptions" :placeholder="$t('status.status')" />
        <bs-date-range-picker v-model="paging.query.dates" :placeholder="$t('payOrderList.applyDate')"
          :clearable="false" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.PayPageList]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.BannedIpList]">
        <el-table-column :label="$t('payOrderList.orderId')">
          <template slot-scope="scope">{{scope.row.payOrderId}}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <el-tag :type="getStatusOption(scope.row.status).color">{{getStatusOption(scope.row.status).name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('payPage.html')">
          <template slot-scope="scope">{{scope.row.briefHtml || scope.row.html}}</template>
        </el-table-column>
        <el-table-column :label="$t('timestamp.createTime')">
          <template slot-scope="scope">{{scope.row.createTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('timestamp.updateTime')">
          <template slot-scope="scope">{{scope.row.updateTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <bs-detail-button @click="handleDetail(scope.row)" v-permission="[Permission.PayPageList]" />
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="$t('table.detail')" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form ref="dataForm" label-position="left" label-width="100px">
          <el-form-item :label="$t('payOrderList.orderId')">
            {{detail.payOrderId}}
          </el-form-item>
          <el-form-item :label="$t('status.status')">
            <el-tag :type="getStatusOption(detail.status).color">{{getStatusOption(detail.status).name}}</el-tag>
          </el-form-item>
          <el-form-item :label="$t('payPage.html')">
            {{detail.html}}
          </el-form-item>
          <el-form-item :label="$t('timestamp.createTime')">
            {{detail.createTime | moment}}
          </el-form-item>
          <el-form-item :label="$t('timestamp.updateTime')">
            {{detail.updateTime | moment}}
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-submit-button @click="dialogFormVisible=false" />
        </div>
      </el-dialog>

    </div>

  </div>

</template>

<script>
  import { Permission } from '@/definitions/constants'
  import { getPayPageList } from '@/api/payPage'
  import moment from 'moment'
  import { formatDateAsEnd, formatDateAsStart } from '@/utils/format'

  export default {
    name: 'payPage',
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
        statusOptions: [
          { id: 0, name: this.$t('payPage.status.unpaid') },
          { id: 1, name: this.$t('payPage.status.paid'), color: 'success' },
          { id: 2, name: this.$t('payPage.status.expired'), color: 'warning' }
        ],
        list: [],
        detail: undefined
      }
    },
    methods: {
      getList() {
        this.paging.isLoading = true
        getPayPageList(this.getQueryParams()).then(response => {
          const briefHtmlLength = 64
          if (response && response.content) {
            response.content.forEach(res => {
              if (res.html && res.html.length > briefHtmlLength) {
                res.briefHtml = res.html.substr(0, briefHtmlLength) + ' ...'
              }
            })
          }
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
      handleSearch() {
        this.paging.query.page = 0
        this.getList()
      },
      handleDetail(row) {
        this.detail = row
        this.dialogFormVisible = true
      },
      getStatusOption(status) {
        return this.statusOptions.find(option => option.id === status)
      },
      getQueryParams() {
        const params = {
          payOrderId: this.paging.query.payOrderId,
          status: this.paging.query.status
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
