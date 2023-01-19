<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <bs-input v-model="paging.query.cid" :placeholder="$t('chatroomList.cid')" />
      <bs-input v-model="paging.query.name" :placeholder="$t('chatroomList.chatName')" />
      <bs-select v-model="paging.query.status" :options="ChatStatusOptions" :placeholder="$t('chatroomList.status')" />
      <bs-date-range-picker
        type="datetimerange"
        v-model="paging.query.dates"
        :clearable="true"
        :placeholder="$t('timestamp.create')"
        style="margin-bottom: 10px; vertical-align: middle;"
      />
      <bs-search-button @click="handleSearch" v-permission="[Permission.CHATROOM_PAGE]"/>
      <bs-button
        :title="$t('chatroomList.createChat')"
        @click="handleCreate"
        v-permission="[Permission.CHATROOM_CREATE]"
      />
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
      v-permission="[Permission.CHATROOM_LIST]"
    >
      <el-table-column :label="$t('chatroomList.cid')">
        <template slot-scope="scope">
          {{ scope.row.cid }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('chatroomList.chatAvatar')">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.image"
            :src="scope.row.image"
            fit="contain"
            :preview-src-list="[scope.row.image]"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('chatroomList.chatName')">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('chatroomList.onlineCount')">
        <template slot-scope="scope">
          <span v-if="Number(scope.row.onlineCount | 0) > 0" class="el-dropdown-link" @click="handleActions(ActionType.Online, scope.row)">
            {{ scope.row.onlineCount }}
          </span>
          <span v-else class="el-dropdown-link">
            {{ scope.row.onlineCount }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('chatroomList.status')">
        <template slot-scope="scope">
          <bs-tag :options="ChatStatusOptions" :status="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('chatroomList.sort')" sortable="custom" prop="_sort">
        <template slot-scope="scope">
          <span class="el-dropdown-link" @click="handleSort(scope.row)">
            {{ scope.row.sort }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('timestamp.createTime')" sortable="custom" prop="_create_time">
        <template slot-scope="scope">{{ scope.row.createTime | moment }}</template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-dropdown @command="(command) => { handleActions(command, scope.row) }">
            <span class="el-dropdown-link">{{ $t('dropdown.more') }}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="ActionType.More">{{ $t('chatroomList.moreInfo') }}</el-dropdown-item>
              <el-dropdown-item
                v-permission="[Permission.CHATROOM_ONLINE_MEMBER]"
                :command="ActionType.Online"
                v-if="scope.row.status === ChatStatus.Normal && Number(scope.row.onlineCount | 0) > 0"
              >
                {{ $t('chatroomList.checkOnline') }}
              </el-dropdown-item>
              <el-dropdown-item
                v-permission="[Permission.CHATROOM_DESTROY]"
                v-if="scope.row.status === ChatStatus.Normal"
                :command="ActionType.Destroy"
              >
                {{ $t('chatroomList.destroyChat') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <bs-pagination
      :current-page="paging.query.page"
      :page-size="paging.query.rows"
      :total="paging.totalElements"
      @on-change-page="handleCurrentChange"
      @on-change-page-size="handleSizeChange"
    />

    <!-- 创建聊天室-弹跳视窗 -->
    <el-dialog
      :title="$t('chatroomList.createChat')"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      :close-on-click-modal="false"
      :show-close="true"
      width="50%"
    >
      <el-form
        :rules="rules"
        ref="dataForm"
        :model="formData"
        label-position="left"
        label-width="100px"
      >
        <el-form-item :label="$t('chatroomList.chatName')" prop="name">
          <bs-input v-model="formData.name" />
        </el-form-item>

        <el-form-item
          :label="$t('chatroomList.chatAvatar')" 
          prop="imageFile"
        >
          <div class="input-container">
            <input
              class="file-input"
              ref="fileInput"
              type="file"
              @input="handlePreviewImage"
              accept="image/*"
            />
            <el-image
              v-if="!formData.imageFile "
              :src="upload"
              fit="contain"
              @click="handleOpenFile"
              style="cursor:pointer"
            />
            <el-image
              v-if="formData.imageFile"
              :src="formData.imageFile"
              fit="contain"
              :preview-src-list="[formData.imageFile]"
            />
            <i v-if="showDeleteIcon" class="el-icon-delete cancel" @click="handleCancel"></i>
            <input type="text" v-model="formData.imageFile" style="display: none" />
          </div>
        </el-form-item>
        <el-form-item :label="$t('chatroomList.sort')" prop="sort">
          <bs-input v-model="formData.sort" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <bs-cancel-button @click="dialogFormVisible = false" />
        <bs-button :title="$t('table.confirm')" @click="createChat" v-permission="[Permission.CHATROOM_CREATE]" />
      </div>
    </el-dialog>

    <el-dialog
      :title="$t('chatroomList.chatMember')"
      :visible.sync="dialogCheckOnlineFormVisible"
      v-if="dialogCheckOnlineFormVisible"
      :close-on-click-modal="false"
      :show-close="true"
      width="100%"
    >
      <div class="filter-container">
        <bs-input v-model="onlineFormData.query.nickNameOrMemberName" :placeholder="$t('chatroomList.nickname') + '/' + $t('chatroomList.username')" />
        <bs-search-button @click="handleOnlineSearch" />
      </div>
      <el-table
        :data="onlineMemberList"
        v-loading="onlineFormData.isLoading" 
        :element-loading-text="$t('table.loading')"
        border
        fit
        highlight-current-row 
        style="width: 100%"
        prop="CreateTime"
        v-permission="[Permission.CHATROOM_ONLINE_MEMBER]"
      >
        <el-table-column :label="$t('chatroomList.avatar')">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.avatarUrl"
              :src="scope.row.avatarUrl"
              fit="contain"
              :preview-src-list="[scope.row.avatarUrl]"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('chatroomList.username')">
          <template slot-scope="scope">
            {{ scope.row.memberName }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('chatroomList.nickname')">
          <template slot-scope="scope">
            {{ scope.row.nickName }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('chatroomList.gender')">
          <template slot-scope="scope">
            <bs-tag :options="GenderOptions" :status="scope.row.gender" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('chatroomList.joinTime')">
          <template slot-scope="scope">{{ scope.row.createTime | moment }}</template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagination">
        <bs-pagination
          :current-page="onlineFormData.query.page"
          :page-size="onlineFormData.query.rows"
          :total="onlineFormData.totalElements"
        />
      </div> -->
    </el-dialog>

    <el-dialog
      :title="DialogTypeOptions[dialogType].name"
      :visible.sync="dialogSortFormVisible"
      v-if="dialogSortFormVisible"
      :close-on-click-modal="false"
      :show-close="true"
      width="80%"
    >
      <el-form
        :rules="rules"
        ref="dataOrderForm"
        :model="formData"
        label-position="left"
        label-width="100px"
      >
        <el-form-item :label="$t('chatroomList.sort')" prop="sort">
          <bs-input v-model="formData.sort" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <bs-submit-button @click="updateData" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getChatroomList,
  destroyChatroom,
  getChatroomOnlineMemberList,
  addChatroom,
  updateChatroomSort
} from '@/api/chatroom'
import { formatDate } from '@/utils/format'
import { ChatStatusOptions, GenderOptions, DialogTypeOptions } from '@/definitions/options'
import { Permission, ChatStatus, DialogType } from '@/definitions/constants'
import { hasAcl } from '@/utils/auth'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'
import upload from '@/assets/file/upload.png'

export default {
  name: 'ChatroomList',
  data() {
    const validateNull = (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        callback(new Error(this.$i18n.t('rules.required')))
      }
      callback()
    }
    const validateOrder = (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        callback(new Error(this.$i18n.t('rules.required')))
      } else if (value !== '') {
        try {
          const a = Number(value)
          if (isNaN(a)) {
            callback(new Error(this.$i18n.t('rules.amount')))
          } else if (a <= 0) {
            callback(new Error(this.$i18n.t('rules.greaterThanNumber', { num: 0 })))
          }
        } catch (error) {
          callback(new Error(error))
        }
      }
      callback()
    }
    return {
      ActionType: {
        Online: 'Online',
        Destroy: 'Destroy',
        More: 'More'
      },
      DialogTypeOptions,
      DialogType,
      GenderOptions,
      ChatStatus,
      upload,
      Permission,
      ChatStatusOptions,
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
      formData: {},
      dialogFormVisible: false,
      rules: {
        name: [...Rules.requiredBlur, ...Rules.noSpace],
        imageFile: [{ required: true, trigger: ['change', 'blur'], validator: validateNull }],
        sort: [
          ...Rules.requiredBlur,
          ...Rules.noSpace,
          { required: true, trigger: ['blur'], validator: validateOrder }
        ]
      },
      showDeleteIcon: false,
      // 查看在線用戶
      dialogCheckOnlineFormVisible: false,
      // 查看在線用戶
      onlineMemberList: [],
      // 查看在線用戶
      onlineFormData: {
        isLoading: false,
        query: {}
      },
      // 修改順序
      dialogType: DialogType.Update,
      dialogSortFormVisible: false
    }
  },
  created() {
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    handleSort(row) {
      if (!hasAcl(Permission.CHATROOM_UPDATE_SORT)) return
      this.formData = objectMerge(deepClone({}), row)
      this.dialogType = DialogType.Update
      this.dialogSortFormVisible = true
    },
    updateData() {
      if (!hasAcl(Permission.CHATROOM_UPDATE_SORT)) return
      this.$refs['dataOrderForm'].validate(valid => {
        if (valid) {
          const { cid, id, sort } = this.formData
          updateChatroomSort({ cid, id, sort }).then(() => {
            this.dialogSortFormVisible = false
            this.getList()
          })
        }
      })
    },
    handleOpenFile() {
      this.$refs.fileInput.click()
    },
    handleCancel() {
      this.$refs.fileInput.value = null
      this.showDeleteIcon = false
      this.$set(this.formData, 'imageFile', null)
      this.$nextTick(() => {
        this.$refs['dataForm'].validateField('imageFile')
      })
    },
    handlePreviewImage(event) {
      const input = event.target
      if (input.files && input.files[0]) {
        // 顯示用
        const reader = new FileReader()
        const that = this
        reader.onload = e => {
          that.$set(that.formData, 'imageFile', e.target.result)
          that.showDeleteIcon = true
          that.$refs['dataForm'].validateField('imageFile')
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    handleCreate() {
      this.formData = deepClone({})
      this.dialogFormVisible = true
      this.showDeleteIcon = false
    },
    createChat() {
      if (!hasAcl(Permission.CHATROOM_CREATE)) return
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // 有圖片格式
          if (this.$refs.fileInput.files[0]) {
            const { name, sort } = this.formData
            const formData = new FormData()
            formData.append('imageFile', this.$refs.fileInput.files[0])
            formData.append('name', name)
            formData.append('sort', sort)
            addChatroom(formData).then(() => {
              this.dialogFormVisible = false
              this.getList()
            })
          }
        }
      })
    },
    handleOnlineSearch() {
      this.getOnlineMember()
    },
    getOnlineMember() {
      if (!hasAcl(Permission.CHATROOM_ONLINE_MEMBER)) return
      const { cid, id, nickNameOrMemberName } = this.onlineFormData.query
      this.onlineFormData.isLoading = true
      // 沒有分頁功能
      getChatroomOnlineMemberList({ cid, id, nickNameOrMemberName }).then(response => {
        this.onlineMemberList = response
      }).finally(() => {
        this.onlineFormData.isLoading = false
      })
    },
    handleActions(type, row) {
      switch (type) {
        case this.ActionType.More:
          this.$router.push({
            path: '/message/messageList',
            query: { account1: row.cid }
          })
          break
        case this.ActionType.Online:
          this.onlineFormData = deepClone({
            isLoading: false,
            totalElements: null,
            query: {
              cid: row.cid,
              id: row.id
            }
          })
          this.handleOnlineSearch()
          this.dialogCheckOnlineFormVisible = true
          break
        case this.ActionType.Destroy:
          this.$confirm(
            this.$t('chatroomList.message.destroy.content'),
            this.$t('chatroomList.message.destroy.title'),
            {
              confirmButtonText: this.$t('confirmDialog.confirm'),
              cancelButtonText: this.$t('confirmDialog.cancel')
            }
          ).then(() => {
            const { cid, id } = row
            if (cid && id) {
              this.paging.isLoading = true
              destroyChatroom({ cid, id }).then(() => {
              }).finally(() => {
                this.getList()
              })
            }
          }).catch(() => {
          })
          break
        default:
          break
      }
    },
    // checkQuery() {
    //   const { dates } = this.paging.query
    //   if (!dates) {
    //     this.$message({
    //       message: this.$t('messageList.message.emptyDates'),
    //       type: 'error',
    //       duration: 5 * 1000
    //     })
    //     return true
    //   }
    //   if (dates && dates.length > 0) {
    //     const stateDate = moment(dates[0])
    //     const endDate = moment(dates[1])
    //     const days = endDate.diff(stateDate, 'days')
    //     // 查询期间不可超过30天
    //     if (days > 30) {
    //       this.$message({
    //         message: this.$t('messageList.message.maxRangeDays'),
    //         type: 'error',
    //         duration: 5 * 1000
    //       })
    //       return true
    //     }
    //   }
    //   return false
    // },
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
      if (!hasAcl(Permission.CHATROOM_PAGE)) return
      // if (this.checkQuery()) return
      this.paging.isLoading = true
      getChatroomList(this.getQueryParams()).then(response => {
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
.file-input {
  display: none;
}
.input-container {
  width: 100%;
  max-width: 228px;
  position: relative;
  input {
    cursor: pointer;
    opacity: 1;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    max-width: 228px;
  }
  .cancel {
    position: absolute;
    right: -20px;
    top: 0;
    cursor: pointer;
  }
}
</style>
