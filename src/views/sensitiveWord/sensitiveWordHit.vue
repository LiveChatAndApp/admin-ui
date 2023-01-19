<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <bs-input v-model="paging.query.senderAccount" :placeholder="$t('sensitiveWordHit.senderUid')" />
      <bs-search-button @click='handleSearch' v-permission="[Permission.SENSITIVE_WORD_HIT_PAGE]" />
      <bs-button :title="$t('sensitiveWordHit.clear')" @click="clearAll"
        v-permission="[Permission.SENSITIVE_WORD_HIT_DELETE_ALL]" />
    </div>
    <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
      highlight-current-row style="width: 100%" @sort-change="onSortChange" prop="CreateTime"
      v-permission="[Permission.SENSITIVE_WORD_PAGE]">
      <el-table-column :label="$t('table.id')">
        <template slot-scope="scope">
          <div>{{ scope.row.id }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sensitiveWordHit.senderUid')">
        <template slot-scope="scope">
          <div>{{ scope.row.sender }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sensitiveWordHit.senderNickName')">
        <template slot-scope="scope">
          <div>{{ scope.row.senderNickName }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sensitiveWordHit.receiverUid')">
        <template slot-scope="scope">
          <div>{{ scope.row.receiver }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sensitiveWordHit.receiverNickName')">
        <template slot-scope="scope">
          <div>{{ scope.row.receiverNickName }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sensitiveWordHit.content')">
        <template slot-scope="scope">
          <div>{{ scope.row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sensitiveWordHit.chatType')">
        <template slot-scope="scope">
          <div>{{ getChatTypeName(scope.row.chatType) }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sensitiveWordHit.createTime')">
        <template slot-scope="scope">
          <div>{{ scope.row.createTime | moment }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')">
        <template slot-scope="scope">
          <!-- 編輯 -->
          <el-button size='mini' type='danger' class="remove-m-l" @click='handleDelete(scope.row)'
            v-permission="[Permission.SENSITIVE_WORD_HIT_DELETE]">
            {{ $t("table.delete") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <bs-pagination :current-page="paging.query.page" :page-size="paging.query.rows" :total="paging.totalElements"
      @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />


  </div>
</template>
    
<script>
import { getSwHitList, deleteAllSensitiveWord, deleteSensitiveWordHit } from '@/api/sensitiveWord'
import { findOptionById, ChatTypeOptions } from '@/definitions/options'
import { Permission } from '@/definitions/constants'
import { hasAcl } from '@/utils/auth'

export default {
  name: 'sensitiveWordHit',
  data() {
    return {
      Permission,
      ChatTypeOptions,
      addWordsDialogFormVisible: false,
      list: [],
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 0,
          rows: 20,
          needSort: true
        }
      }
    }
  },
  created() {
  },
  mounted() {
    if (!hasAcl(Permission.SENSITIVE_WORD_HIT)) return

    this.handleSearch()
  },
  methods: {
    clearAll() {
      deleteAllSensitiveWord().then((res) => {
        this.getList()
      })
    },
    handleDelete(row) {
      const data = {
        ids: row.id
      }
      deleteSensitiveWordHit(data).then((res) => {
        this.getList()
      })
    },
    getQueryParams() {
      const params = { ...this.paging.query, page: this.paging.query.page + 1 }
      return params
    },
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    getList() {
      this.paging.isLoading = true
      getSwHitList(this.getQueryParams()).then(response => {
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
    getChatTypeName(type) {
      return findOptionById(ChatTypeOptions, type).name
    }
  }
}
</script>
    
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
    