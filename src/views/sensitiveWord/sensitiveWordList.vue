<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <bs-input v-model="paging.query.content" :placeholder="$t('sensitiveWordList.sensitiveWord')" />
      <bs-search-button @click='handleSearch' v-permission="[Permission.SENSITIVE_WORD_PAGE]" />
      <bs-button :title="$t('sensitiveWordList.add')" @click="handleAddWords"
        v-permission="[Permission.SENSITIVE_WORD_CREATE]" />
    </div>
    <el-table
      :data="list"
      v-loading="paging.isLoading"
      :element-loading-text="$t('table.loading')"
      border
      fit
      highlight-current-row
      style="width: 100%"
      v-permission="[Permission.SENSITIVE_WORD_LIST]"
    >
      <el-table-column :label="$t('table.id')">
        <template slot-scope="scope">
          <div>{{ scope.row.id }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sensitiveWordList.sensitiveWord')">
        <template slot-scope="scope">
          <div>{{ scope.row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')">
        <template slot-scope="scope">
          <!-- 編輯 -->
          <el-button size='mini' type='danger' class='filter-item' @click='handleDelete(scope.row)'
            v-permission="[Permission.SENSITIVE_WORD_DELETE]">
            {{ $t("table.delete") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <bs-pagination :current-page="paging.query.page" :page-size="paging.query.rows" :total="paging.totalElements"
      @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

    <!-- 添加敏感词-弹跳视窗 -->
    <el-dialog :title='$t("sensitiveWordList.add")' :visible.sync='addWordsDialogFormVisible'
      v-if='addWordsDialogFormVisible' :close-on-click-modal='false' :show-close='true'>
      <div v-for="(item, index) in keywordsArray" :key="index">
        <div class="svg-container">
          <el-input v-model="item.label" class="el-input"
            :placeholder="$t('sensitiveWordList.sensitiveWordPlaceholder')" />
          <span @click="removeInput(item, index)">
            <svg-icon icon-class="remove" />
          </span>
        </div>
      </div>
      <span @click="addInput">
        <svg-icon icon-class="add" />
      </span>

      <div slot='footer' class='dialog-footer'>
        <bs-submit-button @click="addWords" />
      </div>
    </el-dialog>

  </div>
</template>
  
<script>
import { getSensitiveWordList, addSensitiveWord, deleteSensitiveWord } from '@/api/sensitiveWord'
import { Permission } from '@/definitions/constants'
import { hasAcl } from '@/utils/auth'

export default {
  name: 'sensitiveWordList',
  data() {
    return {
      Permission,
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
      },
      index: 0,
      keywordsArray: []
    }
  },
  created() {
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    handleAddWords() {
      this.addWordsDialogFormVisible = true
      this.keywordsArray = []
      this.keywordsArray.push({ id: this.index, label: '' })
    },
    addWords() {
      const arr = []
      for (let index = 0; index < this.keywordsArray.length; index++) {
        arr[index] = this.keywordsArray[index].label
      }
      if (arr.toString().length === 0) {
        this.$message({
          message: this.$t('sensitiveWordList.sensitiveWordPlaceholder'),
          type: 'error'
        })
        return
      }

      const data = {
        contentList: arr.toString()
      }
      addSensitiveWord(data).then((res) => {
        this.getList()
      })
      this.addWordsDialogFormVisible = false
    },
    addInput() {
      this.keywordsArray.push({ id: ++this.index, label: '' })
    },
    removeInput(item, index) {
      this.keywordsArray.splice(index, 1)
    },
    handleDelete(row) {
      const data = {
        ids: row.id
      }
      deleteSensitiveWord(data).then((res) => {
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
      if (!hasAcl(Permission.SENSITIVE_WORD_PAGE)) return
      this.paging.isLoading = true
      getSensitiveWordList(this.getQueryParams()).then(response => {
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
    }
  }
}
</script>
  
<style rel="stylesheet/scss" lang="scss" scoped>
.svg-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.svg-icon {
  vertical-align: middle;
  margin-left: 10px;
  width: 20px;
  height: 20px;
}

/deep/ .el-dialog {
  .el-input {
    input {
      width: 100% !important;
    }
  }
}
</style>
  