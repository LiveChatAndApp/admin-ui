<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <!-- <bs-input v-model="paging.query.uid" :placeholder="$t('memberOperateLog.uid')" /> -->
      <bs-input v-model="paging.query.memberName" :placeholder="$t('memberOperateLog.memberName')" />
      <bs-select v-model="paging.query.authId" :options="AuthIdOptions" :placeholder="$t('memberOperateLog.authId')"
        filterable />
      <bs-input v-model="paging.query.creatorIp" :placeholder="$t('memberOperateLog.creatorIp')" />
      <bs-date-range-picker type="datetimerange" v-model="paging.query.dates" :clearable="true"
        :placeholder="$t('memberOperateLog.operate')" style="margin-bottom: 10px; vertical-align: middle;" />
      <bs-search-button @click="handleSearch" v-permission="[Permission.MEMBER_OPERATE_LOG_PAGE]" />
      <bs-export-button @click="handleExport" v-permission="[Permission.MEMBER_OPERATE_LOG_CSV]" />
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
      prop="CreateTime"
      v-permission="[Permission.MEMBER_OPERATE_LOG]" 
    >
      <el-table-column :label="$t('memberOperateLog.userOperate')" width="300px" fixed="left">
        <template slot-scope="scope">
          <div class="flex_container">
            <el-image
              v-if="!scope.row.avatarUrl"
              :src="avatar"
              fit="contain"
              :preview-src-list="[avatar]"
              style="max-width: 50px"
            />
            <el-image
              v-else
              :src="scope.row.avatarUrl"
              fit="contain"
              :preview-src-list="[scope.row.avatarUrl]"
              style="max-width: 50px"
            />
            <div class="rightBox">
              <div>
                <span>{{ $t('memberOperateLog.nickName') + '：'}}</span>
                <span v-if="scope.row.nickName">{{ scope.row.nickName }}</span>
              </div>
              <div>
                <span>{{ $t('memberOperateLog.memberName') + '：'}}</span>
                <span v-if="scope.row.memberName">{{ scope.row.memberName }}</span>
              </div>
              <div>
                <span>{{ $t('memberOperateLog.phone') + '：'}}</span>
                <span v-if="scope.row.phone">{{ scope.row.phone }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('memberOperateLog.authId')">
        <template slot-scope="scope">
          <bs-status-text :options="AuthIdOptions" :status="scope.row.authId" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('memberOperateLog.creatorLocation')">
        <template slot-scope="scope">
          <div>{{ scope.row.creatorIp }}</div>
          <div>{{ scope.row.creatorLocation }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.memo')">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.memo.before" :key="index">{{ item['key'] }} : {{ item['val'] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('memberOperateLog.operateTime')">
        <template slot-scope="scope">{{ scope.row.createTime | moment }}</template>
      </el-table-column>
    </el-table>

    <bs-pagination :current-page="paging.query.page" :page-size="paging.query.rows" :total="paging.totalElements"
      @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />
  </div>
</template>

<script>
import { getMemberOperateLogList, exportMemberOperateLogCsv } from '@/api/member'
import { AuthIdOptions } from '@/definitions/options'
import { formatDate } from '@/utils/format'
import avatar from '@/assets/user/avatar.png'
import moment from 'moment'
import { Permission } from '@/definitions/constants'
import { hasAcl } from '@/utils/auth'

export default {
  name: 'memberOperateLog',
  data() {
    return {
      Permission,
      avatar,
      AuthIdOptions,
      list: [],
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 0,
          rows: 20,
          memberName: this.$route.query.memberName
        }
      }
    }
  },
  created() {
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    getQueryParams() {
      const params = { ...this.paging.query, page: this.paging.query.page + 1 }
      const { dates } = params
      // 日期參數重整
      if (dates) {
        params.createTimeGt = formatDate(this.paging.query.dates[0])
        params.createTimeLe = formatDate(this.paging.query.dates[1])
        params.dates = undefined
      }
      return params
    },
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    checkQuery() {
      const { dates } = this.paging.query
      if (!dates) {
        this.$message({
          message: this.$t('memberOperateLog.message.emptyDates'),
          type: 'error',
          duration: 5 * 1000
        })
        return true
      }
      if (dates && dates.length > 0) {
        const stateDate = moment(dates[0])
        const endDate = moment(dates[1])
        const days = endDate.diff(stateDate, 'days')
        // 查询期间不可超过7天
        if (days > 7) {
          this.$message({
            message: this.$t('memberOperateLog.message.maxRangeDays'),
            type: 'error',
            duration: 5 * 1000
          })
          return true
        }
      }
      return false
    },
    getList() {
      if (!hasAcl(Permission.MEMBER_OPERATE_LOG_PAGE)) return
      // if (this.checkQuery()) return
      this.paging.isLoading = true
      getMemberOperateLogList(this.getQueryParams()).then(response => {
        const { page, total } = response
        this.list = page
        this.paging.totalElements = total
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
    },
    handleExport() {
      if (!this.list || this.list.length === 0) {
        this.$message({
          message: this.$t('memberOperateLog.message.noDataToDownload'),
          type: 'error'
        })
        return
      }
      exportMemberOperateLogCsv(this.getQueryParams())
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.avatar {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  display: block;
  min-width: 32px;
  align-self: center;
}

.flex_container {
  display: flex;
  flex-direction: row;
}

.rightBox {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}
</style>
