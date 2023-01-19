<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <bs-input v-model="paging.query.content" :placeholder="$t('messageList.placeholder.content')" />
      <bs-select v-model="paging.query.chatType" :options="ChatTypeOptions" :placeholder="$t('messageList.chatType')" />
      <!-- <bs-select
        v-model="paging.query.messageType" 
        :options="MessageTypeOptions"
        :placeholder="$t('messageList.messageType')"
      /> -->
      <bs-input v-model="paging.query.account1" :placeholder="$t('messageList.account1')" />
      <bs-input v-model="paging.query.account2" :placeholder="$t('messageList.account2')" />
      <bs-date-range-picker type="datetimerange" v-model="paging.query.dates" :clearable="true"
        :placeholder="$t('memberBalanceLog.trade')" style="margin-bottom: 10px; vertical-align: middle;" />
      <bs-search-button @click="handleSearch" v-permission="[Permission.MESSAGE_PAGE]" />
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
      :cell-style="cellStyle"
      v-permission="[Permission.MESSAGE_LIST]"
    >
      <el-table-column :label="$t('messageList.chatType')">
        <template slot-scope="scope">
          <div>{{ scope.row.chatTypeString }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('messageList.messageType')">
        <template slot-scope="scope">
          <div>{{ scope.row.messageTypeString }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('messageList.senderAccount')" class-name="custom-fa-background">
        <template slot-scope="scope">
          <div>{{ scope.row.senderAccount }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('messageList.receiverAccount')" class-name="custom-fa-background">
        <template slot-scope="scope">
          <div>{{ scope.row.receiverAccount }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('messageList.senderNickname')">
        <template slot-scope="scope">
          <div>{{ scope.row.senderNickname }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('messageList.content')" width="320px">
        <template slot-scope="scope">
          <!-- 圖片 -->
          <div v-if="scope.row.messageType === MessageTypeStatus.Image">
            <el-image style="width: 100px; height: 100px; maxHeight: 160px" :src="scope.row.fileUrl" fit="cover" :preview-src-list="[scope.row.fileUrl]"/>
          </div>
          <!-- 聲音 -->
          <div v-else-if="scope.row.messageType === MessageTypeStatus.Voice">
            <audio :src="scope.row.fileUrl" width="100%" controls />
          </div>
          <!-- 影片 -->
          <div v-else-if="scope.row.messageType === MessageTypeStatus.Video">
            <video :src="scope.row.fileUrl" style="maxHeight: 160px" controls width="100%" height="100%" />
          </div>
          <!-- 文件 -->
          <div v-else-if="scope.row.messageType === MessageTypeStatus.Doc">
            <el-button size="mini" class="filter-item" type="primary" v-waves @click="downloadFile(scope.row.fileUrl)">
              Download
            </el-button>
          </div>
          <div v-else>
            {{ scope.row.content }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('messageList.receiverNickname')" width="160px">
        <template slot-scope="scope">
          <div>{{ scope.row.receiverNickname }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('timestamp.time')" sortable="custom" prop="_create_time">
        <template slot-scope="scope">{{ scope.row.createTime | moment }}</template>
      </el-table-column>
      <el-table-column :label="$t('table.memo')">
        <template slot-scope="scope">
          {{ scope.row.memo }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.isRevert"
            size="mini"
            class="filter-item"
            type="primary"
            v-waves
            @click="handleRevert(scope.row.id)"
            v-permission="[Permission.MESSAGE_REVERT]"
          >
            {{ $t('messageList.revert') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <bs-pagination :current-page="paging.query.page" :page-size="paging.query.rows" :total="paging.totalElements"
      @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />
  </div>
</template>

<script>
import { getMessageList, revertMessage } from '@/api/message'
import { formatDate } from '@/utils/format'
import moment from 'moment'
import { ChatTypeOptions } from '@/definitions/options'
import { MessageTypeStatus, Permission } from '@/definitions/constants'
import { hasAcl } from '@/utils/auth'

export default {
  name: 'MessageList',
  data() {
    return {
      Permission,
      ChatTypeOptions,
      MessageTypeStatus,
      list: [],
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 0,
          rows: 20,
          needSort: true,
          account1: this.$route.query.account1,
          account2: this.$route.query.account2,
          dates: [
            moment()
              .set('hour', 23)
              .set('minute', 59)
              .set('second', 59)
              .subtract(30, 'day')
              .toDate(),
            moment().set('hour', 23)
              .set('minute', 59)
              .set('second', 59)
              .toDate()
          ]
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
    cellStyle({ row, rowIndex, columnIndex }) {
      if ((columnIndex === 2 || columnIndex === 3)) {
        return 'background-color: #FAFAFA'
      } else {
        return ''
      }
    },
    downloadFile(url) {
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'download')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    checkQuery() {
      const { dates } = this.paging.query
      if (!dates) {
        this.$message({
          message: this.$t('messageList.message.emptyDates'),
          type: 'error',
          duration: 5 * 1000
        })
        return true
      }
      if (dates && dates.length > 0) {
        const stateDate = moment(dates[0])
        const endDate = moment(dates[1])
        const days = endDate.diff(stateDate, 'days')
        // 查询期间不可超过30天
        if (days > 30) {
          this.$message({
            message: this.$t('messageList.message.maxRangeDays'),
            type: 'error',
            duration: 5 * 1000
          })
          return true
        }
      }
      return false
    },
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
    getList() {
      if (!hasAcl(Permission.MESSAGE_PAGE)) return
      if (this.checkQuery()) return
      this.paging.isLoading = true
      getMessageList(this.getQueryParams()).then(response => {
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
    handleRevert(id) {
      this.$confirm(
        this.$t('messageList.message.revert.content'),
        this.$t('messageList.message.revert.title'),
        {
          confirmButtonText: this.$t('confirmDialog.confirm'),
          cancelButtonText: this.$t('confirmDialog.cancel')
        }
      ).then(() => {
        this.paging.isLoading = true
        revertMessage(id).then(() => {
        }).finally(() => {
          this.getList()
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-table th.el-table__cell {
  &.custom-fa-background {
    background: #FAFAFA;
  }
}
</style>
