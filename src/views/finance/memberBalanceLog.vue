<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
        <!-- <bs-input v-model="paging.query.userId" :placeholder="$t('memberBalanceLog.userId')" /> -->
        <bs-input v-model="paging.query.memberName" :placeholder="$t('memberBalanceLog.memberName')" />
        <bs-select
          v-model="paging.query.type"
          :options="typeOptions"
          :placeholder="$t('memberBalanceLog.type')"
          filterable
        />
        <bs-date-range-picker type="datetimerange" v-model="paging.query.dates" :clearable="true"
          :placeholder="$t('memberBalanceLog.trade')" style="margin-bottom: 10px; vertical-align: middle;" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.MEMBER_BALANCE_LOG_PAGE]" />
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
      v-permission="[Permission.MEMBER_BALANCE_LOG]"
      
    >
      <el-table-column :label="$t('memberBalanceLog.memberBalanceId')" fixed="left">
        <template slot-scope="scope">{{ scope.row.memberBalanceId }}</template>
      </el-table-column>
      <!-- <el-table-column :label="$t('memberBalanceLog.userId')" fixed="left">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column> -->
      <el-table-column :label="$t('memberBalanceLog.memberName')" fixed="left" min-width="130%">
        <template slot-scope="scope">{{ scope.row.memberName }}</template>
      </el-table-column>
      <el-table-column :label="$t('memberBalanceLog.nickname')" min-width="130%">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>
      <el-table-column :label="$t('memberBalanceLog.currency')">
        <template slot-scope="scope">{{ scope.row.currency }}</template>
      </el-table-column>
      <el-table-column :label="$t('memberBalanceLog.beforeBalance')" min-width="150%">
        <template slot-scope="scope">{{ scope.row.beforeBalance | money }}</template>
      </el-table-column>
      <el-table-column :label="$t('memberBalanceLog.amount')" min-width="150%">
        <template slot-scope="scope">
          <BsAmount :amount="scope.row.amount" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('memberBalanceLog.afterBalance')" min-width="150%">
        <template slot-scope="scope">{{ scope.row.afterBalance | money }}</template>
      </el-table-column>
      <el-table-column :label="$t('memberBalanceLog.beforeFreeze')"  min-width="150%" class-name="fa-background">
        <template slot-scope="scope">{{ scope.row.beforeFreeze | money }}</template>
      </el-table-column>
      <el-table-column :label="$t('memberBalanceLog.freezeAmount')"  min-width="150%" class-name="fa-background">
        <template slot-scope="scope">
          <BsAmount :amount="scope.row.freezeAmount" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('memberBalanceLog.afterFreeze')"  min-width="150%" class-name="fa-background">
        <template slot-scope="scope">{{ scope.row.afterFreeze | money }}</template>
      </el-table-column>
      <el-table-column :label="$t('memberBalanceLog.type')">
        <template slot-scope="scope">
          <bs-status-text :options="typeOptions" :status="scope.row.type" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.memo')" min-width="160%">
        <template slot-scope="scope">
          <bs-ellipsis :value="scope.row.memo" :size="30" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('memberBalanceLog.tradeTime')" min-width="160%" fixed="right">
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
import { getMemberBalanceList } from '@/api/memberBalanceLog'
import { MemberBalanceTypeOptions } from '@/definitions/options'
import { formatDate } from '@/utils/format'
import { Permission } from '@/definitions/constants'
import { hasAcl } from '@/utils/auth'

// 金額+-顏色
const BsAmount = {
  name: 'BsAmount',
  template: `
    <span :style="{color: getColor()}">
      {{getNumber() | money}}
    </span>
  `,
  props: {
    amount: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    getColor() {
      const num = String(this.amount || 0)
      const color = num.indexOf('-') !== -1 ? '#F56C6C' : '#67C23A'
      return color
    },
    getNumber() {
      const num = String(this.amount || 0)
      return num.indexOf('-') !== -1 ? `${num}` : `+${num}`
    }
  }
}

export default {
  name: 'memberBalanceLog',
  components: {
    BsAmount
  },
  data() {
    return {
      Permission,
      typeOptions: MemberBalanceTypeOptions.filter(({ simple }) => simple),
      list: [],
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
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    cellStyle({ row, rowIndex, columnIndex }) {
      if ((columnIndex === 7 || columnIndex === 8 || columnIndex === 9)) {
        return 'background-color: #FAFAFA'
      } else {
        return ''
      }
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
      if (!hasAcl(Permission.MEMBER_BALANCE_LOG_PAGE)) return
      this.paging.isLoading = true
      getMemberBalanceList(this.getQueryParams()).then(response => {
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-table th.el-table__cell {
  &.fa-background {
    background: #FAFAFA;
  }
}

</style>
