<template>
  <div class="app-container">
    <div class="filter-container">
      <bs-search-button @click="getList" />


    </div>

    <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
      highlight-current-row>
      <el-table-column :label="$t('table.id')">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column :label="$t('auth.code')">
        <template slot-scope="scope">{{scope.row.code}}</template>
      </el-table-column>
      <el-table-column :label="$t('auth.name')">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column :label="$t('auth.type')">
        <template slot-scope="scope">{{scope.row.type}}</template>
      </el-table-column>
      <el-table-column :label="$t('admin.operator')">
        <template slot-scope="scope">
          <bs-edit-button @click="handleModify(scope.row)" />
        </template>
      </el-table-column>

    </el-table>

    <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
      @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />
  </div>
</template>

<script>
  import { getAclListByRoleId } from '@/api/acl'
  import { Permission } from '@/definitions/constants'

  export default {
    name: 'logList',
    data() {
      return {
        Permission,
        paging: {
          isLoading: false,
          totalElements: null,
          query: {
            page: 0,
            rows: undefined
          }
        },
        list: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.paging.isLoading = true
        getAclListByRoleId(this.paging.query).then(response => {
          this.list = response.rows
          this.paging.totalElements = response.total
          this.paging.isLoading = false
        })
      },
      handleSizeChange(val) {
        this.paging.query.size = val
        this.getList()
      },
      handleModify(row) {
      },
      handleCurrentChange(val) {
        this.paging.query.page = val
        this.getList()
      }
    }
  }
</script>
