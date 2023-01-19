<template>
  <div class="app-container calendar-list-container">
    <div class="flex-end">
      <el-date-picker
        v-model="dates"
        type="date"
        :placeholder="$t('dashboard.date')"
        :picker-options="dateOptions"
        @change="handleChangeDate"
        :clearable="false"
      />
    </div>
    <el-row :gutter="12">
      <el-col :xs="12" :sm="12" :md="8" :lg="8">
        <el-card shadow="always">
          <div class="card-title">{{ $t('dashboard.activeMemberCount') }}</div>
          <div class="card-text">{{ info.activeMemberCount || 0 }}</div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="8" :lg="8" >
        <el-card shadow="always">
          <div class="card-title">{{ $t('dashboard.addMemberCount') }}</div>
          <div class="card-text">{{ info.addMemberCount || 0}}</div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="8" :lg="8" >
        <el-card shadow="always">
          <div class="card-title">{{ $t('dashboard.memberGrandTotalCount') }}</div>
          <div class="card-text">{{ info.memberGrandTotalCount || 0 }}</div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="8" :lg="8" >
        <el-card shadow="always">
          <div class="card-title">{{ $t('dashboard.addGroupCount') }}</div>
          <div class="card-text">{{ info.addGroupCount || 0 }}</div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="8" :lg="8" >
        <el-card shadow="always">
          <div class="card-title">{{ $t('dashboard.groupGrandTotalCount') }}</div>
          <div class="card-text">{{ info.groupGrandTotalCount || 0 }}</div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="8" :lg="8" >
        <el-card shadow="always">
          <div class="card-title">{{ $t('dashboard.messageCount') }}</div>
          <div class="card-text">{{ info.messageCount || 0 }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="12">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" >
        <el-card shadow="always">
          <div class="card-title">{{ $t('dashboard.top10ActiveMember') }}</div>
          <div>
            <el-table
              ref="singleTable"
              :data="info.top10ActiveMember"
              highlight-current-row
              style="width: 100%"
            >
              <el-table-column :label="$t('dashboard.rank')">
                <template slot-scope="scope">{{ scope.row.range}}</template>
              </el-table-column>
              <el-table-column :label="$t('dashboard.memberName')">
                <template slot-scope="scope">
                  <div class="el-dropdown-link" @click="handleRedirect('/user/userList', scope.row.memberName)">{{scope.row.memberName }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('dashboard.nickname')">
                <template slot-scope="scope">{{scope.row.nickName  }}</template>
              </el-table-column>
              <el-table-column :label="$t('dashboard.count')">
                <template slot-scope="scope">{{ scope.row.messageCount  }}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" >
        <el-card shadow="always">
          <div class="card-title">{{ $t('dashboard.top10ActiveGroup') }}</div>
          <div>
            <el-table
              ref="singleTable"
              :data="info.top10ActiveGroup"
              highlight-current-row
              style="width: 100%"
            >
              <el-table-column :label="$t('dashboard.rank')">
                <template slot-scope="scope">{{ scope.row.range }}</template>
              </el-table-column>
              <el-table-column :label="$t('dashboard.groupId')">
                <template slot-scope="scope">
                  <div class="el-dropdown-link" @click="handleRedirect('/group/groupList', scope.row.gid)">{{scope.row.gid }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('dashboard.groupName')">
                <template slot-scope="scope">{{scope.row.name  }}</template>
              </el-table-column>
              <el-table-column :label="$t('dashboard.count')">
                <template slot-scope="scope">{{ scope.row.messageCount  }}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import { getMainPageInfo } from '@/api/mainPage'
import { deepClone, objectMerge } from '@/utils'
import { Permission } from '@/definitions/constants'
import { hasAcl } from '@/utils/auth'

export default {
  name: 'dashboard',
  data() {
    return {
      Permission,
      dates: moment().toDate(),
      dateOptions: {
        // 最多只能夠到前一天
        disabledDate(time) {
          // const start = moment(time)
          // const today = moment(new Date())
          // const days = start.diff(today, 'days')
          // return days > -1
          return time.getTime() > Date.now()
        }
      },
      defaultInfo: {
        // 活跃用户数
        activeMemberCount: 0,
        // 新建群个数
        addGroupCount: 0,
        // 新增用户数
        addMemberCount: 0,
        // 当前系统群总数
        groupGrandTotalCount: 0,
        // 当前系统总用户数
        memberGrandTotalCount: 0,
        // 发送消息数
        messageCount: 0,
        // Top10活跃用户数
        top10ActiveMember: [],
        // Top10活跃群组
        top10ActiveGroup: []
      },
      info: {
        // 活跃用户数
        activeMemberCount: 0,
        // 新建群个数
        addGroupCount: 0,
        // 新增用户数
        addMemberCount: 0,
        // 当前系统群总数
        groupGrandTotalCount: 0,
        // 当前系统总用户数
        memberGrandTotalCount: 0,
        // 发送消息数
        messageCount: 0,
        // Top10活跃用户数
        top10ActiveMember: [],
        // Top10活跃群组
        top10ActiveGroup: []
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleRedirect(path, key) {
      if (path === '/user/userList') {
        this.$router.push({
          path,
          query: { memberName: key }
        })
      } else if (path === '/group/groupList') {
        this.$router.push({
          path,
          query: { gid: key }
        })
      }
    },
    handleChangeDate() {
      this.getList()
    },
    getQueryParams() {
      return moment(this.dates).format('YYYY-MM-DD')
    },
    getList() {
      if (!hasAcl(Permission.MAIN_PAGE)) return
      const loading = this.$loading({
        lock: true,
        text: 'loading..',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'refreshLoading'
      })
      getMainPageInfo(this.getQueryParams()).then((res) => {
        this.info = objectMerge(deepClone(this.defaultInfo), res)
      }).finally(() => {
        loading.close()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.app-container {
  .card-title {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
    font-weight: 500;
  }

  .card-text {
    font-size: 20px;
    color: #666;
    font-weight: bold;
  }
  /deep/ .el-card__body {
    min-height: 100px;
  }

  /deep/ .el-col {
    margin-bottom: 40px;
  }
}

.flex-end {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}

</style>
