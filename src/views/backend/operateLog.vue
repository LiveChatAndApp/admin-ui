<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <bs-input v-model="paging.query.userName" :placeholder="$t('operateLog.userName')" />
      <bs-select
        v-model="paging.query.aclOne"
        :options="aclOneList"
        :placeholder="$t('operateLog.aclOne')"
        @change="onChangeAclOne"
        filterable
      />
      <bs-select
        v-model="paging.query.aclTwo"
        :options="aclTwoList"
        :placeholder="$t('operateLog.aclTwo')"
        @change="onChangeAclTwo"
        filterable
      />
      <bs-select
        v-model="paging.query.aclThree"
        :options="aclThreeList"
        :placeholder="$t('operateLog.aclThree')"
        filterable
      />
      <bs-input v-model="paging.query.creatorIp" :placeholder="$t('operateLog.creatorIp')" />
      <bs-date-range-picker
        type="datetimerange"
        v-model="paging.query.dates"
        :clearable="true"
        :placeholder="$t('operateLog.operate')"
        style="margin-bottom: 10px; vertical-align: middle;"
      />
      <bs-search-button @click="handleSearch" />
      <bs-export-button @click="handleExport" />
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
    >
      <el-table-column :label="$t('operateLog.userName')">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('operateLog.authName')">
        <template slot-scope="scope">
          {{ scope.row.authName }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.memo')">
        <el-table-column :label="$t('operateLog.before')" width="200%">
          <template slot-scope="scope">
            <div
              v-for="(item, index) in scope.row.memo.before"
              :key="index"
            >{{ item['key'] }} : {{ item['val'] }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('operateLog.after')" width="200%">
          <template slot-scope="scope">
            <div
              v-for="(item, index) in scope.row.memo.after"
              :key="index"
            >{{ item['key'] }} : {{ item['val'] }}</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('memberOperateLog.creatorLocation')">
        <template slot-scope="scope">
          <div>{{ scope.row.creatorIp }}</div>
          <div>{{ scope.row.creatorLocation }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('memberOperateLog.operateTime')">
        <template slot-scope="scope">{{ scope.row.createTime | moment }}</template>
      </el-table-column>
    </el-table>
    <bs-pagination
      :current-page="paging.query.page"
      :page-size="paging.query.rows"
      :total="paging.totalElements"
      @on-change-page="handleCurrentChange"
      @on-change-page-size="handleSizeChange"
    />
  </div>
</template>

<script>
import { getSystemOperateLogList, exportSystemOperateLogCsv } from '@/api/system'
import { getOpLogAuthList } from '@/api/auth'
import { isSuperAdminLevel } from '@/utils/user'
import { formatDate } from '@/utils/format'
import { str } from '@/utils/string'

export default {
  name: 'operateLog',
  data() {
    return {
      list: [],
      allAclList: [],
      aclOneList: [],
      aclTwoList: [],
      aclThreeList: [],
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 0,
          rows: 20
        }
      }
    }
  },
  created() {
    this.queryAclList()
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    isSuperAdmin() {
      return isSuperAdminLevel(this.$store)
    },
    // acl 全部資料
    queryAclList() {
      const { roleId } = this.$store.getters.user
      let id = roleId
      // 管理者就不帶
      if (this.isSuperAdmin()) {
        id = undefined
      }
      getOpLogAuthList(id).then(response => {
        this.allAclList = response
        // 有全部 acl 資料 先將第一層 option 建立
        this.aclOneList = this.filterAclOption(this.allAclList)
      })
    },
    filterAclOption(list) {
      return list.map(o => {
        return { ...o, value: o.name }
      })
    },
    onChangeAclOne() {
      // step1. 清除 aclTwo、aclThree
      this.aclTwoList = []
      this.aclThreeList = []
      this.paging.query = { ...this.paging.query, aclTwo: '', aclThree: '' }
      // step2. 再將屬於該 aclTwoList 濾出
      const aclTwo = this.allAclList.find(o => o.id === this.paging.query.aclOne)
      if (aclTwo) {
        const list = aclTwo.children || []
        if (list.length > 0) {
          this.aclTwoList = this.filterAclOption(list)
        }
      }
    },
    onChangeAclTwo() {
      // step1. 清除 aclThree
      this.paging.query = { ...this.paging.query, aclThree: '' }
      this.aclThreeList = []
      // step2. 再將屬於該 aclThreeList 濾出
      const aclThree = this.aclTwoList.find(o => o.id === this.paging.query.aclTwo)
      if (aclThree) {
        const list = aclThree.children || []
        if (list.length > 0) {
          this.aclThreeList = this.filterAclOption(list)
        }
      }
    },
    getQueryParams() {
      const { aclOne, aclTwo, aclThree } = this.paging.query
      const params = { ...this.paging.query, page: this.paging.query.page + 1 }
      const { dates } = params
      // 日期參數重整
      if (dates) {
        params.createTimeGt = formatDate(this.paging.query.dates[0])
        params.createTimeLe = formatDate(this.paging.query.dates[1])
        params.dates = undefined
      }

      if (!str.isEmpty(aclOne) && !str.isEmpty(aclTwo) && !str.isEmpty(aclThree)) {
        // 到第三層
        params.authId = aclThree
      } else if (!str.isEmpty(aclOne) && !str.isEmpty(aclTwo) && str.isEmpty(aclThree)) {
        // 到第二層
        params.authId = aclTwo
      } else if (!str.isEmpty(aclOne) && str.isEmpty(aclTwo) && str.isEmpty(aclThree)) {
        // 到第ㄧ層
        params.authId = aclOne
      }
      params.aclOne = undefined
      params.aclTwo = undefined
      params.aclThree = undefined

      return params
    },
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    getList() {
      this.paging.isLoading = true
      getSystemOperateLogList(this.getQueryParams()).then(response => {
        const { page, total } = response
        this.list = page
        this.paging.totalElements = total
      }).finally(() => {
        this.paging.isLoading = false
      })
    },
    handleExport() {
      if (!this.list || this.list.length === 0) {
        this.$message({
          message: this.$t('operateLog.message.noDataToDownload'),
          type: 'error'
        })
        return
      }
      exportSystemOperateLogCsv(this.getQueryParams())
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
