<template>
  <div class='app-container calendar-list-container'>
    <div class='filter-container'>
      <div class='filter-container'>
        <bs-input v-model='paging.query.inviteCode' :placeholder='$t("inviteCode.inviteCode")' />
        <bs-input v-model='paging.query.memo' :placeholder='$t("table.memo")' />
        <bs-select v-model='paging.query.status' :options='StatusOptions' :placeholder='$t("status.status")'
          filterable />
        <bs-date-range-picker type="datetimerange" v-model="searchDates" :clearable="true"
          :placeholder="$t('inviteCode.registration')" style="margin-bottom: 10px; vertical-align: middle;" />
        <bs-search-button @click='handleSearch' v-permission="[Permission.INVITE_CODE_PAGE]" />
        <el-button size='mini' type='primary' class='filter-item remove-m-l' @click='handleAddInviteCode'
          v-permission="[Permission.INVITE_CODE_INSERT]">
          {{ $t("inviteCode.InviteCodeDialog") }}
        </el-button>
      </div>

      <el-table
        :data='list'
        v-loading='paging.isLoading'
        :element-loading-text='$t("table.loading")'
        border
        fit
        highlight-current-row
        style="width: 100%"
        v-permission="[Permission.INVITE_CODE_LIST]"
      >
        <el-table-column :label='$t("inviteCode.inviteCode")'>
          <template slot-scope='scope'>{{ scope.row.inviteCode }}</template>
        </el-table-column>
        <el-table-column :label='$t("inviteCode.registrationNumber")'>
          <template slot-scope='scope'>
            <span style="cursor:pointer; color:#409EFF" @click='handleRegistration(scope.row)'>
              {{ scope.row.registerCount ? scope.row.registerCount : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label='$t("inviteCode.defaultFriend")'>
          <template slot-scope='scope'>
            <span style="cursor:pointer; color:#409EFF" @click='handleFriends(scope.row)'>
              {{ scope.row.friendCount ? scope.row.friendCount : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label='$t("inviteCode.defaultGroup")'>
          <template slot-scope='scope'>
            <span style="cursor:pointer; color:#409EFF" @click='handleGroups(scope.row)'>
              {{ scope.row.groupCount ? scope.row.groupCount : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label='$t("table.memo")'>
          <template slot-scope='scope'>{{ scope.row.memo }}</template>
        </el-table-column>
        <el-table-column :label='$t("status.status")'>
          <template slot-scope='scope'>
            <bs-tag :options="StatusOptions" :status="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column :label='$t("inviteCode.createTime")' min-width='130%'>
          <template slot-scope='scope'>{{ scope.row.registerTime | moment }}</template>
        </el-table-column>
        <el-table-column :label='$t("timestamp.createTime")' min-width='130%'>
          <template slot-scope='scope'>{{ scope.row.createTime | moment }}</template>
        </el-table-column>
        <el-table-column :label='$t("table.actions")' min-width='130%' fixed="right">
          <template slot-scope='scope'>
            <!-- 预设好友/群 -->
            <el-button size='mini' type='primary' class='filter-item remove-m-l'
              @click='handleDefaultFriends(scope.row)'>
              {{ $t("inviteCode.defaultFriendAndGroup") }}
            </el-button>
            <!-- 編輯 -->
            <el-button size='mini' type='primary' class='filter-item remove-m-l' @click='handleEdit(scope.row)'
              v-permission="[Permission.INVITE_CODE_EDIT]">
              {{ $t("table.edit") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page='page' :page-size='paging.query.rows' :total='paging.totalElements'
        @on-change-page='handleCurrentChange' @on-change-page-size='handleSizeChange' />

      <!-- 添加邀请码-弹跳视窗 -->
      <el-dialog :title='$t("inviteCode.InviteCodeDialog")' :visible.sync='dialogFormVisible' v-if='dialogFormVisible'
        :close-on-click-modal='false' :show-close='true' width='60%'>
        <el-form :rules='rules' ref='dataForm' :model='formData' label-position='left' label-width='150px'>
          <el-form-item :label='$t("inviteCode.inviteCode")' prop='inviteCode'>
            <bs-input v-model='formData.inviteCode' :placeholder='$t("inviteCode.inviteCode")' />
            <br />
            <span style="color: #8c939d">{{ this.$t('inviteCode.inviteCodeTip') }}</span>
          </el-form-item>
          <el-form-item :label='$t("table.memo")' prop='memo'>
            <bs-input v-model='formData.memo' :placeholder='$t("inviteCode.memoPlaceholder")' />
          </el-form-item>
          <el-form-item :label='$t("inviteCode.defaultUserId")'>
            <bs-input v-model='formData.username' :placeholder='$t("inviteCode.userId")' />
          </el-form-item>
          <el-form-item :label='$t("inviteCode.welcome")' prop='welcomeText'>
            <bs-input v-model='formData.welcomeText' :placeholder='$t("inviteCode.defaultFriendPlaceholder")' />
          </el-form-item>
          <el-form-item :label='$t("inviteCode.defaultFriendMode")' :required="true">
            <el-radio v-model='formData.friendsDefaultType' label='1'>
              {{ $t("inviteCode.addAllFriends") }}
            </el-radio>
            <br />
            <el-radio v-model='formData.friendsDefaultType' label='2'>
              {{ $t("inviteCode.addByTurn") }}
            </el-radio>
          </el-form-item>
          <el-form-item :label='$t("status.status")' prop='status'>
            <bs-select v-model='formData.status' :options='StatusOptions' :clearable='false' />
          </el-form-item>
        </el-form>

        <div slot='footer' class='dialog-footer'>
          <bs-cancel-button @click='dialogFormVisible = false' />
          <bs-submit-button @click='createData' />
        </div>
      </el-dialog>

      <!-- 预设好友/群-弹跳视窗 -->
      <el-dialog :title='$t("inviteCode.defaultFriendAndGroup")' :visible.sync='friendGroupDialogFormVisible'
        v-if='friendGroupDialogFormVisible' :close-on-click-modal='false' :show-close='true' width='60%'>
        <el-form :rules='rules' ref='dataForm' :model='formData' label-position='left' label-width='150px'>
          <el-form-item :label='$t("inviteCode.defaultType")' :required="true">
            <el-radio v-model='formData.defaultType' label='1'>
              {{ $t("inviteCode.friend") }}
            </el-radio>
            <el-radio v-model='formData.defaultType' label='2'>
              {{ $t("inviteCode.group") }}
            </el-radio>
          </el-form-item>
          <el-form-item :label='$t("inviteCode.uidAndGroupId")' prop='username'>
            <bs-input v-model='formData.username' :placeholder='$t("inviteCode.uidAndGroupIdPlaceholder")' />
          </el-form-item>
          <el-form-item :label='$t("inviteCode.welcomeMessage")' prop='welcomeText' v-if="formData.defaultType === '1'">
            <bs-input v-model='formData.welcomeText' :placeholder='$t("inviteCode.defaultFriendPlaceholder")' />
          </el-form-item>
        </el-form>

        <div slot='footer' class='dialog-footer'>
          <bs-cancel-button @click='friendGroupDialogFormVisible = false' />
          <bs-submit-button @click='addDefaultMember' />
        </div>
      </el-dialog>

      <!-- 邀請碼编辑-弹跳视窗 -->
      <el-dialog :title='$t("table.edit")' :visible.sync='editDialogFormVisible' v-if='editDialogFormVisible'
        :close-on-click-modal='false' :show-close='true' width='60%'>
        <el-form :rules='rules' ref='dataForm' :model='formData' label-position='left' label-width='150px'>
          <el-form-item :label='$t("inviteCode.inviteCode")'>
            <bs-input v-model='formData.inviteCode' :disabled='true' />
          </el-form-item>
          <el-form-item :label='$t("table.memo")' prop='memo'>
            <bs-input v-model='formData.memo' :placeholder='$t("inviteCode.memoPlaceholder")' />
          </el-form-item>
          <el-form-item :label='$t("inviteCode.defaultFriendMode")' :required="true">
            <el-radio v-model='formData.friendsDefaultType' label='1'>
              {{ $t("inviteCode.addAllFriends") }}
            </el-radio>
            <el-radio v-model='formData.friendsDefaultType' label='2'>
              {{ $t("inviteCode.addByTurn") }}
            </el-radio>
          </el-form-item>
          <el-form-item :label='$t("status.status")' prop='status'>
            <bs-select v-model='formData.status' :options='StatusOptions' :clearable='false' />
          </el-form-item>
        </el-form>

        <div slot='footer' class='dialog-footer'>
          <bs-cancel-button @click='editDialogFormVisible = false' />
          <bs-submit-button @click='updateData' />
        </div>
      </el-dialog>

      <!-- 默認好友编辑-弹跳视窗 -->
      <el-dialog :title='addedResultTitle' :visible.sync='modifyDialogFormVisible' v-if='modifyDialogFormVisible'
        :close-on-click-modal='false' :show-close='true'>
        <el-form :rules='rules' ref='dataForm' :model='formData' label-position='left' label-width='100px'>
          <el-form-item :label='$t("inviteCode.inviteCode")'>
            <bs-input v-model='formData.inviteCode' :disabled='true' />
          </el-form-item>
          <el-form-item :label='$t("inviteCode.userId")'>
            <bs-input v-model='formData.account' :disabled='true' />
          </el-form-item>
          <el-form-item :label='$t("inviteCode.welcomeMessage")'>
            <el-input v-model='formData.welcomeText' :placeholder='$t("inviteCode.defaultFriendPlaceholder")'
              maxlength="50" />
          </el-form-item>
        </el-form>

        <div slot='footer' class='dialog-footer'>
          <bs-cancel-button @click='modifyDialogFormVisible = false' />
          <bs-submit-button @click='modifyDefaultMember' />
        </div>
      </el-dialog>

      <!-- 预设好友列表-弹跳视窗 -->
      <el-dialog :title="addedResultTitle" :visible.sync='defaultFriendDialogFormVisible'
        v-if='defaultFriendDialogFormVisible' width='80%' v-permission="[Permission.INVITE_CODE_DEFAULT_MEMBER]">
        <div class='filter-container'>
          <el-table :data='friendList' v-loading='paging.isLoading' :element-loading-text='$t("table.loading")' border
            fit highlight-current-row style="width: 200%">
            <el-table-column :label='$t("inviteCode.type")'>
              <template slot-scope="scope">{{ '邀请码【' + scope.row.inviteCode + '】' }}</template>
            </el-table-column>
            <el-table-column :label='$t("inviteCode.userInfo")' min-width="150px">
              <template slot-scope='scope'>
                <div class="flex_container">
                  <el-image class="avatar" v-if="!scope.row.avatarUrl" :src="avatar" fit="contain"
                    :preview-src-list="[avatar]" />
                  <el-image class="avatar" v-else :src="scope.row.avatarUrl" fit="contain"
                    :preview-src-list="[scope.row.avatarUrl]" />
                  <div class="rightbox">
                    <span>{{ $t('inviteCode.nickname') + '：' + scope.row.nickName }}</span>
                    <span>{{ $t('inviteCode.username') + '：' + scope.row.account }}</span>
                    <span>{{ $t('inviteCode.mobile') + '：' + scope.row.phone }}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label='$t("inviteCode.welcomeMessage")'>
              <template slot-scope='scope'>{{ scope.row.welcomeText }}</template>
            </el-table-column>
            <el-table-column :label='$t("timestamp.createTime")' min-width="90px">
              <template slot-scope='scope'>{{ scope.row.createTime | moment }}</template>
            </el-table-column>
            <el-table-column :label='$t("table.actions")'>
              <template slot-scope='scope'>
                <el-button size='mini' type='primary' class='filter-item remove-m-l' @click='handleModify(scope.row)'>
                  {{ $t("table.edit") }}
                </el-button>
                <el-button size='mini' class='filter-item remove-m-l' type='danger'
                  @click='handleDeleteFriend(scope.row)'>
                  {{ $t("table.delete") }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-pagination @current-change="handleMemberCurrentChange" :current-page="dialogPaging.query.page"
          :page-size="20" layout="total, prev, pager, next, jumper" :total="dialogPaging.totalElements"></el-pagination>
      </el-dialog>

      <!-- 预设群列表-弹跳视窗 -->
      <el-dialog :title="addedResultTitle" :visible.sync='groupDialogFormVisible' v-if='groupDialogFormVisible'
        width='80%' v-permission="[Permission.INVITE_CODE_DEFAULT_GROUP]">
        <div class='filter-container'>
          <el-table :data='groupList' v-loading='paging.isLoading' :element-loading-text='$t("table.loading")' border
            fit highlight-current-row style="width: 200%">
            <el-table-column :label='$t("inviteCode.type")'>
              <template>{{ '邀请码【' + formData.inviteCode + '】' }}</template>
            </el-table-column>
            <el-table-column :label='$t("inviteCode.groupMessage")' min-width="170px">
              <template slot-scope='scope'>
                <div class="flex_container">
                  <el-image class="avatar" v-if="!scope.row.avatarUrl" :src="avatar" fit="contain"
                    :preview-src-list="[avatar]" />
                  <el-image class="avatar" v-else :src="scope.row.avatarUrl" fit="contain"
                    :preview-src-list="[scope.row.avatarUrl]" />
                  <div class="rightbox">
                    <span>{{ $t('inviteCode.groupId') + '：' + scope.row.account }}</span>
                    <span>{{ $t('inviteCode.groupName') + '：' + scope.row.groupName }}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label='$t("timestamp.createTime")' min-width='130%'>
              <template slot-scope='scope'>{{ scope.row.createTime | moment }}</template>
            </el-table-column>
            <el-table-column :label='$t("table.actions")'>
              <template slot-scope='scope'>
                <el-button size='mini' class='filter-item remove-m-l' type='danger'
                  @click='handleDeleteGroup(scope.row)'>{{
                      $t("table.delete")
                  }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-pagination @current-change="handleMemberCurrentChange" :current-page="dialogPaging.query.page"
          :page-size="20" layout="total, prev, pager, next, jumper" :total="dialogPaging.totalElements"></el-pagination>
      </el-dialog>

      <!-- 操作确认-弹跳视窗 -->
      <el-dialog :visible.sync="operationDialogVisible" v-if="operationDialogVisible" :title="addedResultTitle"
        width="30%" center :close-on-click-modal="false" :show-close="true">
        <span>{{ addedResultText }}</span>
        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="operationDialogVisible = false" />
          <bs-button :title="$t('table.confirm')" @click="confirm" />
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
  UserLevelOptions
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
  deleteDefaultMember,
  editDefaultMember,
  addDefaultMember
} from '@/api/defaultMember'
import {
  getInviteCodeList,
  addInviteCode,
  editInviteCode,
  getGroupList,
  getFriendList
} from '@/api/inviteCode'
import { parseTimeToDateTimeString } from '@/utils/format'
import avatar from '@/assets/user/avatar.png'
import { hasAcl } from '@/utils/auth'

export default {
  name: 'inviteCode',
  directives: {
    clipboard
  },
  data() {
    return {
      avatar,
      Permission,
      defaultFriendDialogFormVisible: false,
      UserLevelOptions,
      friendGroupDialogFormVisible: false,
      dialogFormVisible: false,
      modifyDialogFormVisible: false,
      groupDialogFormVisible: false,
      editDialogFormVisible: false,
      operationDialogVisible: false,
      resetOtpForm: {},
      searchDates: [],
      DialogType,
      dialogType: 0,
      DialogTypeOptions,
      page: 0,
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: this.page + 1,
          rows: 20,
          needSort: true
        }
      },
      dialogPage: 0,
      dialogPaging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 1,
          rows: 20
        }
      },
      rules: {
        inviteCode: [...Rules.requiredBlur, ...Rules.noSpace, ...Rules.inviteCode],
        username: [...Rules.requiredBlur],
        roleId: [
          {
            required: true,
            trigger: 'change',
            message: this.$t('rules.required')
          }
        ],
        status: [...Rules.requiredChange],
        memo: [
          { trigger: 'blur', min: 1, max: 50, message: this.$t('rules.oneToFiftyLength') }
        ],
        welcomeText: [{ trigger: 'blur', min: 1, max: 50, message: this.$t('rules.oneToFiftyLength') }],
        password: [...Rules.password],
        email: [...Rules.email],
        phone: [...Rules.mobile]
      },
      StatusOptions,
      defaultFormData: {
        status: Status.Enabled,
        friendsDefaultType: RadioType.Default,
        defaultType: RadioType.Default
      },
      formData: {},
      list: [],
      friendList: [],
      groupList: [],
      listId: 0,
      addedResult: {
        merchant: {}
      },
      addedResultTitle: undefined,
      addedResultText: undefined,
      operationKey: '',
      isSuperAdmin: this.$store.getters.user.level === UserLevel.SuperAdmin,
      isShowRoleOption: false // 只有第一次進來的時候
    }
  },
  created() {
    this.handleSearch()
  },
  mounted() { },
  methods: {
    // 刪除好友
    handleDeleteFriend(row) {
      this.operationDialogVisible = true
      this.formData = deepClone(row)
      this.addedResultTitle = this.$t('inviteCode.operationTitle')
      this.addedResultText = this.$t('inviteCode.deleteFriendText')
      this.operationKey = 'deleteFriend'
    },
    // 预设好友/群
    handleDefaultFriends(row) {
      this.addedResultTitle = this.$t('inviteCode.defaultFriendAndGroup')
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.friendGroupDialogFormVisible = true
    },
    isNumber(obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj)
    },
    addDefaultMember() {
      const data = {
        defaultType: Number(this.formData.defaultType),
        username: this.formData.username,
        inviteCode: this.formData.inviteCode,
        welcomeText: this.formData.welcomeText
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addDefaultMember(data).then((res) => {
            this.getList()
            this.friendGroupDialogFormVisible = false
          })
        }
      })
    },
    getFriendList(id) {
      this.dialogPaging.isLoading = true
      this.dialogPaging.query.id = id
      getFriendList(this.dialogPaging.query).then((response) => {
        this.friendList = response.page
        this.dialogPaging.totalElements = response.total
        this.dialogPaging.isLoading = false
      })
    },
    getGroupList(id) {
      this.dialogPaging.isLoading = true
      this.dialogPaging.query.id = id
      getGroupList(this.dialogPaging.query).then((response) => {
        this.groupList = response.page
        this.dialogPaging.totalElements = response.total
        this.dialogPaging.isLoading = false
      })
    },
    // 編輯邀請碼
    handleEdit(row) {
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.formData.friendsDefaultType = row.friendsDefaultType.toString()
      this.editDialogFormVisible = true
    },
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    getList() {
      if (!hasAcl(Permission.INVITE_CODE_PAGE)) return
      this.paging.isLoading = true
      if (this.searchDates && this.searchDates.length === 2) {
        this.paging.query.registerTimeGt = parseTimeToDateTimeString(this.searchDates[0])
        this.paging.query.registerTimeLe = parseTimeToDateTimeString(this.searchDates[1])
      } else {
        this.paging.query.registerTimeGt = null
        this.paging.query.registerTimeLe = null
      }

      getInviteCodeList(this.paging.query).then((response) => {
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
      this.page = val
      this.paging.query.page = this.page + 1
      this.getList()
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
    handleModify(row) {
      this.addedResultTitle = this.$t('table.edit')
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.modifyDialogFormVisible = true
    },
    handleRegistration(row) {
      this.$router.push({
        path: '/user/userList',
        query: { inviteCode: row.inviteCode }
      })
    },
    handleFriends(row) {
      this.addedResultTitle = this.$t('inviteCode.inviteCode') + '【' + row.inviteCode + '】' + this.$t('inviteCode.defaultFriend')
      this.defaultFriendDialogFormVisible = true
      this.listId = row.id
      this.getFriendList(row.id)
    },
    handleGroups(row) {
      this.addedResultTitle = this.$t('inviteCode.inviteCode') + '【' + row.inviteCode + '】' + this.$t('inviteCode.defaultGroup')
      this.groupDialogFormVisible = true
      this.listId = row.id
      this.getGroupList(row.id)
    },
    handleDeleteGroup(row) {
      this.operationDialogVisible = true
      this.formData = deepClone(row)
      this.addedResultTitle = this.$t('inviteCode.operationTitle')
      this.addedResultText = this.$t('inviteCode.deleteGroupText')
      this.operationKey = 'deleteGroup'
    },
    confirm() {
      this.operationDialogVisible = false
      if (this.operationKey === 'deleteFriend') {
        deleteDefaultMember(this.formData.id).then((res) => {
          this.getFriendList(this.listId)
          this.getList()
        })
      } else if (this.operationKey === 'deleteGroup') {
        deleteDefaultMember(this.formData.id).then((res) => {
          this.getGroupList(this.listId)
          this.getList()
        })
      }
    },
    createData() {
      if (this.formData.welcomeText && this.formData.welcomeText.length > 0) {
        if (!this.formData.username) {
          this.$message({
            message: this.$t('inviteCode.needUserId'),
            type: 'error'
          })
          return
        }
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addInviteCode(this.formData).then((res) => {
            this.getList()
            this.dialogFormVisible = false
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = {
            inviteCodeID: this.formData.id,
            memo: this.formData.memo,
            friendsDefaultType: this.formData.friendsDefaultType,
            status: this.formData.status
          }
          editInviteCode(data).then(() => {
            this.getList()
            this.editDialogFormVisible = false
          })
        }
      })
    },
    modifyDefaultMember() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = {
            id: this.formData.id,
            welcomeText: this.formData.welcomeText
          }
          editDefaultMember(data).then(() => {
            this.getFriendList(this.listId)
            this.modifyDialogFormVisible = false
          })
        }
      })
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
  