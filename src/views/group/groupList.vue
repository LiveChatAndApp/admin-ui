<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-input v-model="paging.query.gid" :placeholder="$t('groupList.groupId')" />
        <bs-input v-model="paging.query.groupName" :placeholder="$t('groupList.groupName')" />
        <bs-input v-model="paging.query.managerMemberName" :placeholder="$t('groupList.managerId')" />
        <bs-date-range-picker type="datetimerange" v-model="paging.query.dates" :clearable="true"
          :placeholder="$t('groupList.create')" style="margin-bottom: 10px; vertical-align: middle;" />
        <bs-select v-model="paging.query.muteType" :options="MuteSelectOptions"
          :placeholder="$t('groupList.muteType')" />
        <bs-select v-model="paging.query.privateChat" :options="PrivateChatOptions"
          :placeholder="$t('groupList.privateChat')" />
        <bs-select v-model="paging.query.status" :options="GroupStatusOptions" :placeholder="$t('groupList.status')" />
        <bs-select v-model="paging.query.groupType" :options="GroupTypeOptions"
          :placeholder="$t('groupList.groupType')" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.GROUP_PAGE]" />
        <bs-button :title="$t('groupList.createGroup')" @click="handleCreate"
          v-permission="[Permission.GROUP_INSERT]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row style="width: 100%" @sort-change="onSortChange" v-permission="[Permission.GROUP_LIST]">
        <el-table-column :label="$t('groupList.groupId')">
          <template slot-scope="scope">
            <div>{{ scope.row.gid }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('groupList.groupName')">
          <template slot-scope="scope">
            <div>{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('groupList.groupImage')">
          <template slot-scope="scope">
            <div class="flex_container">
              <el-image class="avatar" v-if="!scope.row.groupImage" :src="avatar" fit="contain"
                :preview-src-list="[avatar]" />
              <el-image class="avatar" v-else :src="scope.row.groupImage" fit="contain"
                :preview-src-list="[scope.row.groupImage]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('groupList.managerId')">
          <template slot-scope="scope">
            <div>{{ scope.row.managerMemberName }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('groupList.managerName')">
          <template slot-scope="scope">
            <div>{{ scope.row.managerNickName }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('timestamp.createTime')">
          <template slot-scope="scope">
            <div>{{ scope.row.createTime | moment }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('groupList.memberCount')">
          <template slot-scope="scope">
            <div>{{ scope.row.memberCount }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('groupList.muteType')">
          <template slot-scope="scope">
            <bs-tag :options="MuteOptions" :status="scope.row.muteType" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('groupList.privateChat')">
          <template slot-scope="scope">
            <bs-tag :options="PrivateChatOptions" :status="scope.row.privateChat" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('groupList.status')">
          <template slot-scope="scope">
            <bs-tag :options="GroupStatusOptions" :status="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('groupList.groupType')">
          <template slot-scope="scope">
            <bs-tag :options="GroupTypeOptions" :status="scope.row.groupType" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')" min-width="130%">
          <template slot-scope="scope">
            <el-dropdown @command="(command) => { handleCommand(command, scope.row) }">
              <span class="el-dropdown-link">{{ $t('dropdown.more') }}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1" v-if="scope.row.status === 1" v-permission="[Permission.GROUP_EDIT]">
                  {{ $t('groupList.modifyGroup') }}
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  {{ $t('groupList.checkedMessage') }}
                </el-dropdown-item>
                <el-dropdown-item command="3" v-permission="[Permission.GROUP_MEMBER]">
                  {{ $t('groupList.checkedGroupMember') }}
                </el-dropdown-item>
                <el-dropdown-item command="4" v-if="scope.row.groupType === 2">
                  {{ $t('groupList.broadcast') }}
                </el-dropdown-item>
                <el-dropdown-item command="5" v-if="scope.row.status === 1"
                  v-permission="[Permission.GROUP_OUTSIDE_MEMBER]">
                  {{ $t('groupList.addGroupMember') }}
                </el-dropdown-item>
                <el-dropdown-item command="6" v-if="scope.row.status === 1" v-permission="[Permission.GROUP_DISSOLVE]">
                  {{ $t('groupList.delete') }}
                </el-dropdown-item>
                <el-dropdown-item command="7" v-if="scope.row.status === 1" v-permission="[Permission.GROUP_MUTE]">
                  {{ getDropDownMuteName(scope.row.muteType) }}
                </el-dropdown-item>
                <el-dropdown-item command="8" v-if="scope.row.status === 1"
                  v-permission="[Permission.GROUP_PRIVATRE_CHAT]">
                  {{ getDropDownChatName(scope.row.privateChat) }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.rows" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <!-- 创建群组-弹跳视窗 -->
      <el-dialog :title="$t('groupList.createGroup')" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true" width="50%">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('groupList.groupName')" prop="groupName">
            <bs-input v-model="formData.groupName" />
          </el-form-item>
          <el-form-item :label="$t('groupList.groupImage')">
            <div class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
              <img v-if="!imageData" :src="avatar" class="placeholder" />
              <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
            </div>
          </el-form-item>
          <el-form-item :label='$t("groupList.groupType")' label-width="130px" :required="true">
            <el-radio v-model='formData.groupType' label='1'>
              {{ $t("groupList.normalType") }}
            </el-radio>
            <el-radio v-model='formData.groupType' label='2'>
              {{ $t("groupList.broadcast") }}
            </el-radio>
          </el-form-item>
          <el-form-item :label="$t('groupList.managerId')" prop="memberName">
            <bs-input v-model="formData.memberName" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-submit-button @click="createData" />
        </div>
      </el-dialog>

      <!-- 编辑群组-弹跳视窗 -->
      <el-dialog :title="$t('groupList.modifyGroup')" :visible.sync="editDialogFormVisible" v-if="editDialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('groupList.groupId')" prop="gid">
            <bs-input v-model="formData.gid" :disabled='true' />
          </el-form-item>
          <el-form-item :label="$t('groupList.groupName')" prop="name">
            <bs-input v-model="formData.name" />
          </el-form-item>
          <el-form-item :label="$t('groupList.groupImage')">
            <div class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
              <img v-if="!imageData" :src="avatar" class="placeholder" />
              <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
            </div>
          </el-form-item>
          <el-form-item :label="$t('groupList.managerId')" prop="managerMemberName">
            <bs-input v-model="formData.managerMemberName" />
            <br />
            <span style="color: #8c939d">{{ $t('groupList.tip') }}</span>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-submit-button @click="updateData" />
        </div>
      </el-dialog>

      <!-- 解散-弹跳视窗 -->
      <el-dialog :title="$t('confirmDialog.warning')" :visible.sync="deleteGroupDialogFormVisible"
        v-if="deleteGroupDialogFormVisible" :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="top" label-width="0px">
          <el-form-item>
            {{ $t("groupList.deleteText") }}
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="deleteGroupDialogFormVisible = false" />
          <bs-button :title="$t('table.confirm')" @click="deleteGroup" />
        </div>
      </el-dialog>

      <!-- 查看群成员-弹跳视窗 -->
      <el-dialog :title='$t("groupList.checkedGroupMember")' :visible.sync='groupMemberDialogFormVisible'
        v-if='groupMemberDialogFormVisible' :close-on-click-modal="false" :show-close="true" width='100%'>
        <div class="filter-container">
          <bs-input v-model="dialogPaging.query.member" :placeholder="$t('groupList.nicknamePlaceholder')" />
          <bs-search-button @click="getGroupMemberList" />
          <bs-button :title="$t('table.delete')" @click="handleDeleteGroupMember"
            v-permission="[Permission.GROUP_MEMBER_DELETE]" />
        </div>
        <div class='filter-container'>
          <el-table :data='groupMemberList' v-loading='dialogPaging.isLoading'
            :element-loading-text='$t("table.loading")' border fit highlight-current-row style="width: 100%"
            @selection-change="handleDeleteMemberChange">
            <el-table-column type="selection" width="55" @selection-change="handleSelectionChange"
              :selectable="checkSelectable">
            </el-table-column>
            <el-table-column :label='$t("groupList.groupImage")' min-width='30%'>
              <template slot-scope='scope'>
                <el-image class="avatar" v-if="!scope.row.avatarUrl" :src="avatar" fit="contain"
                  :preview-src-list="[avatar]" />
                <el-image class="avatar" v-else :src="scope.row.avatarUrl" fit="contain"
                  :preview-src-list="[scope.row.avatarUrl]" />
              </template>
            </el-table-column>
            <el-table-column :label='$t("groupList.memberName")'>
              <template slot-scope='scope'>{{ scope.row.memberName }}</template>
            </el-table-column>
            <el-table-column :label='$t("groupList.nickName")'>
              <template slot-scope='scope'>{{ scope.row.nickName }}</template>
            </el-table-column>
            <el-table-column :label='$t("groupList.memberType")'>
              <template slot-scope='scope'>{{ getGroupMemberTypeName(scope.row.memberType).name }}</template>
            </el-table-column>
            <el-table-column :label='$t("groupList.gender")' min-width='30%'>
              <template slot-scope='scope'>{{ getGenderName(scope.row.gender).name }}</template>
            </el-table-column>
            <el-table-column :label='$t("timestamp.updateTime")'>
              <template slot-scope='scope'>{{ scope.row.updateTime | moment }}</template>
            </el-table-column>
            <el-table-column :label='$t("table.actions")'>
              <template slot-scope="scope" v-if="scope.row.memberType != 3">
                <el-dropdown>
                  <span class="el-dropdown-link">{{ $t('dropdown.more') }}</span>
                  <el-dropdown-menu slot="dropdown" align="center">
                    <el-dropdown-item v-for="item in scope.row.dropdownList" :key="item.id"
                      @click.native="modifyMemberType(item, scope.row)" v-permission="[Permission.GROUP_ADD_MANAGER]">
                      {{ item.name }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-pagination @current-change="handleGroupMemberCurrentChange" :current-page="dialogPaging.query.page"
          :page-size="10" layout="total, prev, pager, next, jumper" :total="dialogPaging.totalElements">
        </el-pagination>
      </el-dialog>

      <!-- 添加群成员-弹跳视窗 -->
      <el-dialog :title="$t('groupList.chooseMember')" :visible.sync="addedMemberDialogFormVisible"
        v-if="addedMemberDialogFormVisible" :close-on-click-modal="false" :show-close="true" width='70%'>
        <div class="filter-container">
          <bs-input v-model="dialogPaging.query.member" :placeholder="$t('groupList.nicknamePlaceholder')" />
          <bs-search-button @click="handleAddedSearch" />
        </div>
        <div class="dialog">
          <div style="width: 50%">
            <div class='filter-container'>
              <el-table ref="checkTable" :data='addedMemberList' v-loading='dialogPaging.isLoading'
                :element-loading-text='$t("table.loading")' border fit highlight-current-row style="width: 100%"
                @selection-change="handleSelectionChange" row-key="id" height="400px">
                <el-table-column type="selection" width="55" height="100" :reserve-selection="true">
                </el-table-column>
                <el-table-column :label='$t("groupList.groupImage")' min-width='30%'>
                  <template slot-scope='scope'>
                    <el-image class="avatar" v-if="!scope.row.avatarUrl" :src="avatar" fit="contain"
                      :preview-src-list="[avatar]" />
                    <el-image class="avatar" v-else :src="scope.row.avatarUrl" fit="contain"
                      :preview-src-list="[scope.row.avatarUrl]" />
                  </template>
                </el-table-column>
                <el-table-column :label='$t("groupList.memberName")'>
                  <template slot-scope='scope'>{{ scope.row.memberName }}</template>
                </el-table-column>
                <el-table-column :label='$t("groupList.nickName")'>
                  <template slot-scope='scope'>{{ scope.row.nickName }}</template>
                </el-table-column>
              </el-table>
            </div>

            <el-pagination @current-change="handleAddedGroupMemberCurrentChange" :current-page="dialogPaging.query.page"
              :page-size="10" layout="prev, pager, next" :total="dialogPaging.totalElements">
            </el-pagination>
          </div>

          <div style="width: 50%;">
            <el-table :data='addedList' fit highlight-current-row style="width: 100%" empty-text=" " border
              height="400px">
              <el-table-column width="80px">
                <template slot="header">
                  <el-button type="danger" size="mini" @click="handleClearAll">{{ $t('groupList.clear') }}</el-button>
                </template>
                <template slot-scope='scope'>
                  <span @click="removeName(scope.row)">
                    <svg-icon icon-class="delete" />
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label='$t("groupList.groupImage")' min-width='30%'>
                <template slot-scope='scope'>
                  <el-image class="avatar" v-if="!scope.row.avatarUrl" :src="avatar" fit="contain"
                    :preview-src-list="[avatar]" />
                  <el-image class="avatar" v-else :src="scope.row.avatarUrl" fit="contain"
                    :preview-src-list="[scope.row.avatarUrl]" />
                </template>
              </el-table-column>
              <el-table-column :label='$t("groupList.memberName")'>
                <template slot-scope='scope'>{{ scope.row.memberName }}</template>
              </el-table-column>
              <el-table-column :label='$t("groupList.nickName")'>
                <template slot-scope='scope'>{{ scope.row.nickName }}</template>
              </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer-added">
              <bs-button :title="$t('groupList.add')" @click="addedMember"
                v-permission="[Permission.GROUP_MEMBER_INSERT]" />
            </div>
          </div>
        </div>
      </el-dialog>

      <!-- 广播-弹跳视窗 -->
      <el-dialog :title="$t('groupList.broadcast')" :visible.sync="chatRoomDialogFormVisible"
        v-if="chatRoomDialogFormVisible" :close-on-click-modal="false" :show-close="true" width='80%'>
        <Chat @onSubmit="handleSubmit" :messages="chatList" @onReset="getChatList" />
      </el-dialog>
    </div>
  </div>
</template>
  
<script>
import clipboard from '@/directive/clipboard'
import {
  MuteOptions, PrivateChatOptions, findOptionById, GenderOptions, GroupMemberTypeOptions, GroupStatusOptions, MuteSelectOptions, GroupTypeOptions
} from '@/definitions/options'
import { DialogType, Permission, PrivateChatType, MuteType, UserLevel, ChatTypeStatus } from '@/definitions/constants'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'
import {
  getGroupList,
  addGroup,
  updateGroup,
  deleteGroup,
  getGroupMemberList,
  getAddedGroupMemberList,
  addGroupMember,
  deleteGroupMember,
  // editGroupMember,
  groupMute,
  groupPrivateChat,
  editManager
} from '@/api/group'
import { formatDate } from '@/utils/format'
import avatar from '@/assets/user/avatar.png'
import { hasAcl } from '@/utils/auth'
import Chat from '@/components/Chat'
import { getLastChatList, sendMessage } from '@/api/message'

export default {
  name: 'groupList',
  directives: {
    clipboard
  },
  data() {
    return {
      avatar,
      Permission,
      MuteOptions,
      MuteSelectOptions,
      PrivateChatOptions,
      GroupMemberTypeOptions,
      GroupStatusOptions,
      GroupTypeOptions,
      GenderOptions,
      dialogFormVisible: false,
      editDialogFormVisible: false,
      groupMemberDialogFormVisible: false,
      deleteGroupDialogFormVisible: false,
      addedMemberDialogFormVisible: false,
      chatRoomDialogFormVisible: false,
      DialogType,
      dialogType: 0,
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 0,
          rows: 20,
          needSort: true,
          gid: this.$route.query.gid
        }
      },
      dialogPage: 0,
      dialogPaging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 1,
          rows: 10,
          needSort: false
        }
      },
      rules: {
        groupName: [
          ...Rules.requiredBlur, ...Rules.noSpace,
          { trigger: 'blur', min: 1, max: 20, message: this.$t('rules.oneToTwentyLengthWords') }
        ],
        memberName: [...Rules.requiredBlur],
        managerMemberName: [...Rules.requiredBlur],
        name: [
          ...Rules.requiredBlur, ...Rules.noSpace,
          { trigger: 'blur', min: 1, max: 20, message: this.$t('rules.oneToTwentyLengthWords') }
        ]
      },
      defaultFormData: {
        groupType: '1'
      },
      imageData: null,
      formData: {},
      memberData: {},
      list: [],
      groupMemberList: [],
      addedMemberList: [],
      addedList: [],
      chatList: [],
      isSuperAdmin: this.$store.getters.user.level === UserLevel.SuperAdmin,
      isShowRoleOption: false // 只有第一次進來的時候
    }
  },
  components: {
    Chat
  },
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 10) {
        return value.slice(0, 6) + '...' + value.slice(-6)
      }

      return value
    }
  },
  created() {
  },
  mounted() {
    if (!hasAcl(Permission.GROUP_LIST)) return

    this.paging.isLoading = true
    this.handleSearch()
  },
  methods: {
    handleCreate() {
      this.formData = deepClone(this.defaultFormData)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Create
      this.imageData = null
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          addGroup(this.serializeFormData(this.formData)).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.imageData = null
          })
        }
      })
    },
    handleModify(row) {
      this.formData = deepClone(row)
      this.formData.memberName = row.managerName
      this.imageData = row.groupImage
      this.editDialogFormVisible = true
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateGroup(this.serializeFormData(this.formData)).then(() => {
            this.getList()
            this.imageData = null
            this.editDialogFormVisible = false
          })
        }
      })
    },
    // 更多功能
    handleCommand(command, row) {
      switch (command) {
        case '1':
          this.handleModify(row) // 编辑群组
          break
        case '2':
          this.handleMessageList(row) // 查看消息
          break
        case '3':
          this.handleGroupMemberList(row) // 查看群成员
          break
        case '4':
          this.handleBroadcast(row) // 廣播
          break
        case '5':
          this.handleAddedMemberList(row) // 添加群成员
          break
        case '6':
          this.handleDeleteGroup(row) // 解散
          break
        case '7':
          this.handleMute(row) // 禁言
          break
        case '8':
          this.handlePrivateChat(row) // 私聊
          break

        default:
          break
      }
    },
    handleMessageList(row) {
      this.$router.push({
        path: '/message/messageList',
        query: { account1: '', account2: row.gid }
      })
    },
    getChatList() {
      this.dialogPaging.isLoading = true
      this.dialogPaging.query.receiverId = this.memberData.id
      this.dialogPaging.query.chatType = ChatTypeStatus.Group
      let index = 0
      getLastChatList(this.dialogPaging.query).then(response => {
        this.chatList = response.map(res => ({
          ...res,
          id: index++
        })).sort((a, b) => {
          return b.createTime < a.createTime ? 1 : -1
        })
        this.dialogPaging.totalElements = response.total
        this.dialogPaging.isLoading = false
      })
    },
    handleSubmit(params) {
      const data = {
        groupId: this.memberData.gid,
        messageType: params.messageType,
        text: params.text,
        uploadFile: params.uploadFile
      }
      sendMessage(this.serializeFormData(data)).then(() => {
        setTimeout(() => {
          this.getChatList()
        }, 800)
      })
    },
    handleMute(row) {
      const data = {
        groupId: row.gid,
        muteType: row.muteType === 0 ? MuteType.MuteAll : MuteType.Normal
      }
      groupMute(data).then(() => {
        this.getList()
        this.imageData = null
        this.editDialogFormVisible = false
      })
    },
    handlePrivateChat(row) {
      const data = {
        groupId: row.gid,
        privateChat: row.privateChat === 1 ? PrivateChatType.Prohibit : PrivateChatType.Normal
      }
      groupPrivateChat(data).then(() => {
        this.getList()
        this.imageData = null
        this.editDialogFormVisible = false
      })
    },
    handleBroadcast(row) {
      this.chatList = []
      this.chatRoomDialogFormVisible = true
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.memberData = deepClone(row) // 彈窗列表使用
      this.dialogPaging.query.page = 1
      this.getChatList()
    },
    handleDeleteGroup(row) {
      this.formData = deepClone(row)
      this.deleteGroupDialogFormVisible = true
    },
    deleteGroup() {
      deleteGroup(this.formData.id).then(() => {
        this.getList()
      })
      this.deleteGroupDialogFormVisible = false
    },
    handleGroupMemberList(row) {
      this.groupMemberDialogFormVisible = true
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.memberData = deepClone(row) // 彈窗列表使用
      this.dialogPaging.query.page = 1
      this.dialogPaging.query.member = undefined
      this.getGroupMemberList()
      this.addedList = []
    },
    handleSelectionChange(selection) {
      // this.addedList = []
      // selection.forEach(item => {
      //   this.addedList.push(item.id.toString())
      // })
      this.addedList = selection
    },
    checkSelectable(row) {
      return row.memberType !== 3
    },
    removeName(item) {
      // 取消当前表格里的选中状态时,用表格里的数据
      const arr = this.addedMemberList.filter(sub => { return sub.id === item.id })
      const row = arr.length ? arr[0] : item
      this.$refs.checkTable && this.$refs.checkTable.toggleRowSelection(row, false)
    },
    handleClearAll() {
      // 清除选中的数据
      this.$refs.checkTable.clearSelection()
    },
    handleAddAll() {
      // 切换所有行的选中状态
      this.$refs.checkTable.toggleAllSelection()
    },
    handleAddedMemberList(row) {
      this.addedMemberDialogFormVisible = true
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.memberData = deepClone(row) // 彈窗列表使用
      this.dialogPaging.query.page = 1
      this.dialogPaging.query.member = undefined
      this.getAddedGroupMemberList()
      this.addedList = []
    },
    handleAddedSearch() {
      this.dialogPaging.query.page = 1
      this.getAddedGroupMemberList()

      // 搜尋不清除資料
      // this.addedList = []
      // this.$refs.checkTable.clearSelection()
    },
    addedMember() {
      const array = []
      // 將 checkbox 選擇的內容轉換成 id array
      this.addedList.forEach(item => {
        array.push(item.id)
      })

      if (array.length === 0) {
        this.$message({
          message: this.$t('groupList.noMember'),
          type: 'error'
        })
        return
      }

      // create request object
      const data = {
        groupId: this.memberData.id,
        memberIdList: array
      }
      addGroupMember(data).then(() => {
        this.addedList = []
        this.addedMemberDialogFormVisible = false
        this.handleAddedSearch()
        this.getList()
      })
    },
    handleDeleteMemberChange(selection) {
      this.addedList = []
      selection.forEach(item => {
        this.addedList.push(item)
      })
    },
    handleDeleteGroupMember() {
      const array = []
      let isGroupAdmin = false

      if (this.addedList.length === 0) {
        this.$message({
          message: this.$t('groupList.noMember'),
          type: 'error'
        })
        return
      }

      this.addedList.forEach(item => {
        if (item.memberType === 3) {
          isGroupAdmin = true
          return
        }
        array.push(item.id)
      })

      if (isGroupAdmin) {
        this.$message({
          message: this.$t('groupList.cannotDeleteGroupAdmin'),
          type: 'error'
        })
        return
      } else {
        const data = {
          groupId: this.memberData.id,
          memberIdList: array
        }
        deleteGroupMember(data).then(() => {
          this.getGroupMemberList()
          this.getList()
        })
      }
    },
    // 選擇頭像
    chooseImage() {
      this.$refs.fileInput.click()
    },
    onSelectFile() {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        // 選完圖片預覽用
        const reader = new FileReader()
        reader.onload = e => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(files[0])
      }
    },
    serializeFormData(data) {
      const {
        managerMemberName,
        groupName,
        name,
        gid,
        muteType,
        privateChat,
        memberName,
        groupType,
        text,
        messageType,
        uploadFile,
        groupId
      } = data
      const formData = new FormData()
      // 有更新圖片
      if (this.imageData) {
        if (this.imageData.indexOf('http://') === 0 || this.imageData.indexOf('https://') === 0) {
          // 如果有 http or https 不用傳資料
        } else {
          formData.append('avatarFile', this.$refs.fileInput.files[0])
        }
      }
      if (groupName) {
        formData.append('groupName', groupName)
      }
      if (memberName) {
        formData.append('memberName', memberName)
      }
      if (managerMemberName) {
        formData.append('memberName', managerMemberName)
      }
      if (name) {
        formData.append('groupName', name)
      }
      if (gid) {
        formData.append('groupId', gid)
      }
      if (groupType) {
        formData.append('groupType', groupType)
      }
      if (muteType && muteType.length > 0) {
        formData.append('muteType', Number(muteType))
      }
      if (privateChat && privateChat.length > 0) {
        formData.append('privateChat', Number(privateChat))
      }
      // sendMessage params
      if (groupId) {
        formData.append('gid', groupId)
      }
      if (text && text.length > 0) {
        formData.append('text', text)
      }
      if (messageType) {
        formData.append('messageType', messageType)
      }
      if (uploadFile) {
        formData.append('uploadFile', uploadFile)
      }
      return formData
    },
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
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
    getList() {
      this.paging.isLoading = true
      getGroupList(this.getQueryParams()).then(response => {
        this.list = response.page
        this.paging.totalElements = response.total
        this.paging.isLoading = false
      })
    },
    getQueryDialogParams() {
      const params = { ...this.dialogPaging.query, page: this.dialogPaging.query.page + 1 }
      return params
    },
    // 取得查看群成员列表
    getGroupMemberList() {
      this.dialogPaging.isLoading = true
      this.dialogPaging.query.groupId = this.memberData.id
      getGroupMemberList(this.dialogPaging.query).then(response => {
        this.groupMemberList = response.page.map(res => ({
          ...res,
          dropdownList: this.createDropDownList(res.memberType)
        }))
        this.dialogPaging.totalElements = response.total
        this.dialogPaging.isLoading = false
      })
    },
    createDropDownList(type) {
      let dropdownList = []
      if (type === 1) {
        dropdownList = [
          // { id: 3, name: '群主' },
          { id: 2, name: this.$t('groupList.admin') }
        ]
      } else if (type === 2) {
        dropdownList = [
          // { id: 3, name: '群主' },
          { id: 1, name: this.$t('groupList.member') }
        ]
      }
      return dropdownList
    },
    // 取得可添加群成员列表
    getAddedGroupMemberList() {
      this.dialogPaging.isLoading = true
      this.dialogPaging.query.groupId = this.memberData.id
      getAddedGroupMemberList(this.dialogPaging.query).then(response => {
        this.addedMemberList = response.page
        this.dialogPaging.totalElements = response.total
        this.dialogPaging.isLoading = false
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
    handleGroupMemberCurrentChange(val) {
      this.dialogPaging.query.page = val
      this.getGroupMemberList()
    },
    handleAddedGroupMemberCurrentChange(val) {
      this.dialogPage = val
      this.dialogPaging.query.page = val
      this.getAddedGroupMemberList()
    },
    onSortChange(column) {
      if (column.prop) {
        this.paging.query.sort = `${column.prop},${column.order === 'ascending' ? 'ASC' : 'DESC'}`
        this.getList()
      }
    },
    getDropDownMuteName(type) {
      // 禁言 0:正常 1:禁言普通成员 2:禁言整个群
      let muteName
      if (type === 0) {
        muteName = this.$t('groupList.mute')
      } else if (type === 1) {
        muteName = this.$t('groupList.unmute')
      } else {
        muteName = this.$t('groupList.unmute')
      }
      return muteName
    },
    getDropDownChatName(type) {
      // 私聊 1: 正常, 2: 禁止
      let chatName
      if (type === 1) {
        chatName = this.$t('groupList.prohibitPrivateChat')
      } else {
        chatName = this.$t('groupList.allowPrivateChat')
      }
      return chatName
    },
    getGenderName(type) {
      return findOptionById(GenderOptions, type)
    },
    getGroupMemberTypeName(type) {
      return findOptionById(GroupMemberTypeOptions, type)
    },
    modifyMemberType(item, row) {
      // item: id 1:成員, 2:管理員
      const data = {
        memberId: row.id,
        groupId: this.memberData.id,
        isManager: item.id === 2
      }
      editManager(data).then(() => {
        this.getGroupMemberList()
      })
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

.dialog {
  display: flex;
  flex-direction: row;
  // height: 450px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

/deep/ .el-table th.el-table__cell {
  height: 60px;
}

.dialog-footer-added {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.placeholder {
  background: #F0F0F0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}

.placeholder:hover {
  background: #E0E0E0;
}

.file-input {
  display: none;
}
</style>
  