<template>
  <div class='app-container calendar-list-container'>
    <div class='filter-container'>
      <div class='filter-container'>
        <bs-select v-model='paging.query.type' :options='DefaultMemberTypeOptions'
          :placeholder='$t("defaultFriends.type")' filterable />
        <bs-input v-model='paging.query.inviteCode' :placeholder='$t("defaultFriends.inviteCode")' />
        <bs-search-button @click='handleSearch' v-permission="[Permission.DEFAULT_MEMBER_PAGE]" />
        <el-button size='mini' class='filter-item' type='primary' @click='handleAddDefaultMember'
          v-permission="[Permission.DEFAULT_MEMBER_INSERT]">
          {{ $t("defaultFriends.addDefaultMember") }}
        </el-button>
        <el-button size='mini' class='filter-item' type='primary' @click='handleSettings'
          v-permission="[Permission.DEFAULT_MEMBER_ALL_MODE]">
          {{ $t("defaultFriends.defaultMemberSettings") }}
        </el-button>
      </div>

      <el-table
        :data='list'
        v-loading='paging.isLoading'
        :element-loading-text='$t("table.loading")'
        border
        fit
        highlight-current-row style="width: 100%"
        v-permission="[Permission.DEFAULT_MEMBER]"
      >
        <el-table-column :label='$t("defaultFriends.type")' min-width="100px">
          <template slot-scope='scope'>
            <div>
              <span v-if="scope.row.type === 2">{{ '邀请码【' + scope.row.inviteCode + '】' }}</span>
              <span v-else>{{ $t("defaultFriends.allRegistrants") }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label='$t("defaultFriends.message")' min-width="250px">
          <template slot-scope="scope">
            <div class="flex_container">
              <el-image class="avatar" v-if="!scope.row.avatarUrl" :src="avatar" fit="contain"
                :preview-src-list="[avatar]" />
              <el-image class="avatar" v-else :src="scope.row.avatarUrl" fit="contain"
                :preview-src-list="[scope.row.avatarUrl]" />
              <div class="rightbox" v-if="scope.row.defaultType === 1">
                <span>{{ $t('defaultFriends.nickname') + '：' + scope.row.nickName }}</span>
                <span>{{ $t('defaultFriends.username') + '：' + scope.row.memberName }}</span>
                <span>{{ $t('defaultFriends.mobile') + '：' + scope.row.phone }}</span>
              </div>
              <div class="rightbox" v-else>
                <span>{{ $t('defaultFriends.groupId') + '：' + scope.row.gid }}</span>
                <span>{{ $t('defaultFriends.groupName') + '：' + scope.row.groupName }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label='$t("defaultFriends.welcomeMessage")' min-width="250px">
          <template slot-scope='scope'>{{ scope.row.welcomeText }}</template>
        </el-table-column>
        <el-table-column :label='$t("timestamp.createTime")' min-width='130%'>
          <template slot-scope='scope'>{{ scope.row.createTime | moment }}</template>
        </el-table-column>
        <el-table-column :label='$t("table.actions")' min-width='130%'>
          <template slot-scope='scope'>
            <!-- 編輯 -->
            <el-button size='mini' type='primary' class='filter-item' @click='handleModify(scope.row)'
              v-if="scope.row.defaultType === 1" v-permission="[Permission.DEFAULT_MEMBER_EDIT]">
              {{ $t("table.edit") }}
            </el-button>
            <!-- 刪除 -->
            <el-button size='mini' class='filter-item remove-m-l' type='danger'
              @click='handleDeleteFriendGroup(scope.row)'>
              {{ $t("table.delete") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page='paging.query.page' :page-size='paging.query.rows' :total='paging.totalElements'
        @on-change-page='handleCurrentChange' @on-change-page-size='handleSizeChange' />

      <!-- 预设好友/群-弹跳视窗 -->
      <el-dialog :title='$t("defaultFriends.addDefaultMember")' :visible.sync='addFriendGroupDialogFormVisible'
        v-if='addFriendGroupDialogFormVisible' :close-on-click-modal='false' :show-close='true' width='60%'>
        <el-form :rules='rules' ref='dataForm' :model='formData' label-position='left' label-width='150px'>
          <el-form-item :label='$t("defaultFriends.type")' :required="true">
            <el-radio v-model='formData.type' label='2'>{{
                $t("defaultFriends.inviteCodeMember")
            }}</el-radio>
            <el-radio v-model='formData.type' label='1'>{{
                $t("defaultFriends.allRegistrants")
            }}</el-radio>
          </el-form-item>
          <el-form-item :label='$t("defaultFriends.inviteCode")' prop='inviteCode' v-if="formData.type === '2'">
            <bs-input v-model='formData.inviteCode' :placeholder='$t("defaultFriends.inviteCode")' />
          </el-form-item>
          <el-form-item :label='$t("defaultFriends.defaultType")' :required="true">
            <el-radio v-model='formData.defaultType' label='1'>{{
                $t("defaultFriends.friend")
            }}</el-radio>
            <el-radio v-model='formData.defaultType' label='2'>{{
                $t("defaultFriends.group")
            }}</el-radio>
          </el-form-item>
          <el-form-item :label='$t("defaultFriends.uidAndGroupId")' prop='username'>
            <bs-input v-model='formData.username' :placeholder='$t("defaultFriends.uidAndGroupIdPlaceholder")' />
          </el-form-item>
          <el-form-item :label='$t("defaultFriends.welcomeMessage")' prop='welcomeText'
            v-if="formData.defaultType === '1'">
            <bs-input v-model='formData.welcomeText' :placeholder='$t("defaultFriends.defaultFriendPlaceholder")' />
          </el-form-item>
        </el-form>

        <div slot='footer' class='dialog-footer'>
          <bs-cancel-button @click='addFriendGroupDialogFormVisible = false' />
          <bs-submit-button @click='addDefaultMember' />
        </div>
      </el-dialog>

      <!-- 全局默认好友-弹跳视窗 -->
      <el-dialog :title='$t("defaultFriends.allDefaultFriends")' :visible.sync='defaultFriendDialogFormVisible'
        v-if='defaultFriendDialogFormVisible' :close-on-click-modal='false' :show-close='true' width='60%'>
        <el-form :rules='rules' ref='dataForm' :model='formData' label-position='left' label-width='150px'>
          <el-form-item :label='$t("defaultFriends.defaultFriendMode")' :required="true">
            <el-radio v-model='formData.defaultMemberType' label='1'>{{
                $t("defaultFriends.addAllFriends")
            }}</el-radio>
            <br />
            <el-radio v-model='formData.defaultMemberType' label='2'>{{
                $t("defaultFriends.addByTurn")
            }}</el-radio>
          </el-form-item>
        </el-form>

        <div slot='footer' class='dialog-footer'>
          <bs-cancel-button @click='defaultFriendDialogFormVisible = false' />
          <bs-submit-button @click='setAllDefaultMember' />
        </div>
      </el-dialog>

      <!-- 操作确认-弹跳视窗 -->
      <el-dialog :visible.sync="operationDialogVisible" v-if="operationDialogVisible" :title="operationTitle"
        width="30%" center :close-on-click-modal="false" :show-close="true">
        <span>{{ operationText }}</span>
        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="operationDialogVisible = false" />
          <bs-button :title="$t('table.confirm')" @click="confirm" />
        </div>
      </el-dialog>

      <!-- 默認好友编辑-弹跳视窗 -->
      <el-dialog :title='operationTitle' :visible.sync='modifyDialogFormVisible' v-if='modifyDialogFormVisible'
        :close-on-click-modal='false' :show-close='true'>
        <el-form :rules='rules' ref='dataForm' :model='formData' label-position='left' label-width='100px'>
          <el-form-item :label='$t("defaultFriends.inviteCode")'>
            <bs-input v-model='formData.inviteCode' :disabled='true' />
          </el-form-item>
          <el-form-item :label='$t("defaultFriends.userId")'>
            <bs-input v-model='formData.memberName' :disabled='true' />
          </el-form-item>
          <el-form-item :label='$t("defaultFriends.welcomeMessage")'>
            <el-input v-model='formData.welcomeText' :placeholder='$t("defaultFriends.defaultFriendPlaceholder")'
              maxlength="50" />
          </el-form-item>
        </el-form>

        <div slot='footer' class='dialog-footer'>
          <bs-cancel-button @click='modifyDialogFormVisible = false' />
          <bs-submit-button @click='modifyDefaultMember' />
        </div>
      </el-dialog>

    </div>
  </div>
</template>
  
<script>
import clipboard from '@/directive/clipboard'
import {
  DialogTypeOptions,
  StatusOptions,
  DefaultMemberTypeOptions
  // findOptionById
} from '@/definitions/options'
import {
  DialogType,
  Permission,
  Status,
  UserLevel,
  RadioType
} from '@/definitions/constants'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'
import {
  getDefaultMemberList,
  editDefaultMember,
  addDefaultMember,
  setDefaultMemberType,
  deleteDefaultMember
} from '@/api/defaultMember'
import { hasAcl } from '@/utils/auth'
import avatar from '@/assets/user/avatar.png'

export default {
  name: 'defaultFriends',
  directives: {
    clipboard
  },
  data() {
    return {
      avatar,
      Permission,
      DefaultMemberTypeOptions,
      defaultFriendDialogFormVisible: false,
      addFriendGroupDialogFormVisible: false,
      operationDialogVisible: false,
      operationKey: '',
      operationTitle: undefined,
      operationText: undefined,

      dialogFormVisible: false,
      modifyDialogFormVisible: false,
      defaultGroupDialogFormVisible: false,
      editDialogFormVisible: false,
      searchDates: [],
      DialogType,
      dialogType: 0,
      DialogTypeOptions,
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 0,
          rows: 20
        }
      },
      rules: {
        username: [...Rules.requiredBlur],
        welcomeText: [...Rules.memo],
        inviteCode: [...Rules.requiredBlur, ...Rules.noSpace, ...Rules.inviteCode],

        status: [...Rules.requiredChange],
        note: [...Rules.memo],

        password: [...Rules.password],
        email: [...Rules.email],
        phone: [...Rules.mobile]
      },
      StatusOptions,
      defaultFormData: {
        status: Status.Enabled,
        defaultMemberType: RadioType.Default,
        type: RadioType.Second,
        defaultType: RadioType.Default
      },
      formData: {},
      list: [],
      isSuperAdmin: this.$store.getters.user.level === UserLevel.SuperAdmin,
      isShowRoleOption: false // 只有第一次進來的時候
    }
  },
  created() { },
  mounted() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    getQueryParams() {
      const params = { ...this.paging.query, page: this.paging.query.page + 1 }
      // const { dates } = params
      // // 日期參數重整
      // if (dates) {
      //   params.createTimeGt = formatDate(this.paging.query.dates[0])
      //   params.createTimeLe = formatDate(this.paging.query.dates[1])
      //   params.dates = undefined
      // }
      return params
    },
    getList() {
      if (!hasAcl(Permission.DEFAULT_MEMBER_PAGE)) return
      this.paging.isLoading = true
      getDefaultMemberList(this.getQueryParams()).then((response) => {
        this.list = response.page
        this.paging.totalElements = response.total
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
    // 添加预设好友
    handleAddDefaultMember(row) {
      this.addedResultTitle = this.$t('defaultFriends.defaultFriendAndGroup')
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.formData.defaultType = RadioType.Default
      this.addFriendGroupDialogFormVisible = true
    },
    isNumber(obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj)
    },
    addDefaultMember() {
      const data = {
        type: Number(this.formData.type),
        defaultType: Number(this.formData.defaultType),
        username: this.formData.username,
        inviteCode: this.formData.inviteCode,
        welcomeText: this.formData.welcomeText
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addDefaultMember(data).then((res) => {
            this.getList()
            this.addFriendGroupDialogFormVisible = false
          })
        }
      })
    },
    handleSettings() {
      this.formData = deepClone(this.defaultFormData)
      this.defaultFriendDialogFormVisible = true
    },
    setAllDefaultMember() {
      const data = {
        defaultMemberType: Number(this.formData.defaultMemberType)
      }
      setDefaultMemberType(data)
      this.defaultFriendDialogFormVisible = false
    },
    // 刪除好友/群
    handleDeleteFriendGroup(row) {
      this.operationDialogVisible = true
      this.formData = deepClone(row)
      this.operationTitle = this.$t('defaultFriends.operationTitle')
      this.operationText = this.$t('defaultFriends.deleteFriendGroupText')
      this.operationKey = 'deleteFriendGroup'
    },
    confirm() {
      this.operationDialogVisible = false
      if (this.operationKey === 'deleteFriendGroup') {
        deleteDefaultMember(this.formData.id).then(() => {
          this.getList()
        })
      }
    },
    // 編輯-彈跳視窗
    handleModify(row) {
      this.operationTitle = this.$t('table.edit')
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.modifyDialogFormVisible = true
    },
    modifyDefaultMember() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = {
            id: this.formData.id,
            welcomeText: this.formData.welcomeText
          }
          editDefaultMember(data).then(() => {
            this.getList()
            this.modifyDialogFormVisible = false
          })
        }
      })
    },

    handleMemberCurrentChange(val) {
      this.dialogPaging.query.page = val
      this.getChatHistoryList()
    },
    handleAddInviteCode() {
      this.formData = deepClone(this.defaultFormData)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Create
      this.isShowRoleOption = true
    },
    handleRegistration(row) {
      this.$router.push({
        path: '/user/userList',
        query: { inviteCode: row.inviteCode }
      })
    },
    handleFriends(row) {
      this.addedResultTitle = this.$t('defaultFriends.inviteCode') + '【' + row.inviteCode + '】' + this.$t('defaultFriends.defaultFriend')
      this.defaultFriendDialogFormVisible = true
      this.dialogPaging.query.inviteCode = row.inviteCode
      this.getDefaultMemberList()
    },
    handleGroups(row) {
      this.addedResultTitle = this.$t('defaultFriends.inviteCode') + '【' + row.inviteCode + '】' + this.$t('defaultFriends.defaultGroup')
      this.defaultGroupDialogFormVisible = true
      this.getDefaultMemberList()
    },

    getStatusOption(status) {
      for (const statusOption of StatusOptions) {
        if (statusOption.id === status) {
          return statusOption
        }
      }
    }
  }
}
</script>
  
<style rel='stylesheet/scss' lang='scss' scoped>
.emptyRoles {
  color: #f56c6c;
  font-size: 12px;
  margin-left: 5px;
}

.top_area {
  display: flex;
  justify-content: start;
  margin-bottom: 10px;
}

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

.rightbox {
  display: flex;
  flex-direction: column;

  .inbox {
    display: flex;
    flex-direction: row;
  }
}
</style>
  