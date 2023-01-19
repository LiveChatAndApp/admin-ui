<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <bs-input v-model="paging.query.username" :placeholder="$t('backendUserList.userAccount')" />
      <bs-input v-model="paging.query.chatUserName" :placeholder="$t('backendUserList.chatMemberName')" />
      <!-- 狀態 -->
      <bs-select v-model="paging.query.status" :options="StatusOptions" :placeholder="$t('status.status')" />
      <bs-search-button @click="handleSearch" v-permission="[Permission.ADMIN_PAGE]" />
      <bs-add-button @click="handleCreate" v-permission="[Permission.ADMIN_INSERT]" />

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row style="width: 100%" @sort-change="onSortChange" prop="CreateTime"
        v-permission="[Permission.ADMIN_LIST]">
        <el-table-column :label="$t('table.id')">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('backendUserList.username')">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column :label="$t('backendUserList.nickname')">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column :label="$t('role.roleName')" min-width="110px">
          <template slot-scope="scope">{{ scope.row.roleName }}</template>
        </el-table-column>
        <el-table-column :label="$t('backendUserList.phone')" min-width="110px">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column :label="$t('backendUserList.chatMemberName')" min-width="110px">
          <template slot-scope="scope">{{ scope.row.chatMemberName }}</template>
        </el-table-column>
        <el-table-column :label="$t('backendUserList.chatNickName')" min-width="110px">
          <template slot-scope="scope">{{ scope.row.chatNickName }}</template>
        </el-table-column>
        <el-table-column :label="$t('timestamp.createTime')" sortable="custom" prop="_create_time" min-width="155px">
          <template slot-scope="scope">{{ scope.row.createTime | moment }}</template>
        </el-table-column>
        <el-table-column :label="$t('backendUserList.updateTime')" sortable="custom" prop="_update_time"
          min-width="155px">
          <template slot-scope="scope">{{ scope.row.updateTime | moment }}</template>
        </el-table-column>
        <el-table-column :label="$t('backendUserList.loginIp')" min-width="155px">
          <template slot-scope="scope">{{ scope.row.loginIp }}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-status :status="scope.row.status" @on-click-submit="changeStatus(scope.row, $event)"
              :memo="scope.row.memo" :clickable="isSuperAdmin" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.memo')">
          <template slot-scope="scope">
            <bs-ellipsis :value="scope.row.memo" :size="30" />
          </template>
        </el-table-column>

        <el-table-column :label="$t('table.actions')" fixed="right">
          <template slot-scope="scope" v-if="isSuperAdmin">
            <el-dropdown @command="(command) => { handleActions(command, scope.row) }">
              <span class="el-dropdown-link">{{ $t('dropdown.more') }}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit" v-permission="[Permission.ADMIN_UPDATE]">{{ $t('table.edit') }}
                </el-dropdown-item>
                <el-dropdown-item command="resetPassword" v-permission="[Permission.ADMIN_RESETPWD]">{{
                    $t('backendUserList.resetPassword')
                }}</el-dropdown-item>
                <el-dropdown-item command="resetOtp">{{ $t('otp.resetOtp') }}</el-dropdown-item>
                <el-dropdown-item command="logout" v-permission="[Permission.ADMIN_KICKOUT]">{{ $t('navbar.logout') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.rows" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true" width="80%">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('backendUserList.nickname')" prop="nickname">
            <bs-input v-model="formData.nickname" />
          </el-form-item>
          <el-form-item v-if="dialogType === DialogType.Create" :label="$t('backendUserList.username')" prop="username">
            <bs-input v-model="formData.username" />
          </el-form-item>
          <el-form-item :label="$t('backendUserList.password')" prop="password" v-if="dialogType === DialogType.Create">
            <bs-input type="password" v-model="formData.password" />
          </el-form-item>
          <el-form-item :label="$t('role.roleName')" prop="roleId" v-if="dialogType === DialogType.Create">
            <bs-select v-model="formData.roleId" :options="roleList" :clearable="false" />
            <span v-show="roleList === undefined" class="emptyRoles">{{ $t('backendUserList.emptyRoles') }}</span>
          </el-form-item>
          <el-form-item v-if="dialogType === DialogType.Create" :label="$t('backendUserList.phone')" prop="phone">
            <bs-input v-model="formData.phone" />
          </el-form-item>
          <el-form-item :label="$t('backendUserList.email')" prop="email">
            <bs-input v-model="formData.email" />
          </el-form-item>
          <el-form-item :label="$t('status.status')" prop="status">
            <bs-select v-model="formData.status" :options="StatusOptions" :clearable="false"
              :disabled="!isSuperAdmin" />
          </el-form-item>
          <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-text-area v-model="formData.memo" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="dialogFormVisible = false" />
          <bs-submit-button v-if="dialogType === DialogType.Create" @click="createData" />
          <bs-submit-button v-else @click="updateData" />
        </div>
      </el-dialog>

      <el-dialog :title="$t('backendUserList.resetPassword')" :visible.sync="resetPasswordDialogFormVisible"
        v-if="resetPasswordDialogFormVisible" :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('backendUserList.username')">{{ formData.username }}</el-form-item>
          <el-form-item :label="$t('backendUserList.password')" prop="password">
            <bs-input type="password" v-model="formData.password" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="resetPasswordDialogFormVisible = false" />
          <bs-submit-button @click="resetPassword" />
        </div>
      </el-dialog>

      <el-dialog :title="addedResultTitle" :visible.sync="addResultDialogFormVisible" v-if="addResultDialogFormVisible"
        width="70%">
        <el-form label-position="left" label-width="120px">
          <el-form-item :label="$t('backendUserList.loginUrl')">{{ loginUrl }}/</el-form-item>
          <el-form-item :label="$t('backendUserList.loginUsername')">{{ this.addedResult.username }}</el-form-item>
          <el-form-item :label="$t('backendUserList.loginPassword')">{{ this.addedResult.password }}</el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-button :title="$t('table.copy')" v-clipboard:copy="addedResultText" />
          <bs-submit-button id="copyResult" :data-clipboard-text="addedResultText" @click="closeAddResult" />
        </div>
      </el-dialog>

      <!-- 重置OTP-弹跳视窗 -->
      <el-dialog :title="$t('otp.resetOtp')" :visible.sync="resetOtpDialogFormVisible" v-if="resetOtpDialogFormVisible">
        <el-form label-position="left" label-width="120px">
          <el-form-item :label="$t('backendUserList.username')">{{ resetOtpForm.username }}</el-form-item>
          <div>{{ $t('otp.resetOtpConfirm') }}</div>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="resetOtpDialogFormVisible = false" />
          <bs-submit-button @click="resetOtp" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import clipboard from '@/directive/clipboard'
import { DialogTypeOptions, StatusOptions, UserLevelOptions } from '@/definitions/options'
import { DialogType, Permission, Status, UserLevel } from '@/definitions/constants'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'
import { addUser, getUserPageList, resetUserPassword, updateUser, kickOutUser } from '@/api/user'
import { resetSecretKey } from '@/api/otp'
import { getRoleIndexing } from '@/api/indexing'
import { hasAcl } from '@/utils/auth'

export default {
  name: 'backendUserList',
  directives: {
    clipboard
  },
  data() {
    return {
      Permission,
      addResultDialogFormVisible: false,
      UserLevelOptions,
      listFormVisible: false,
      dialogFormVisible: false,
      resetPasswordDialogFormVisible: false,
      resetOtpDialogFormVisible: false,
      resetOtpForm: {},
      DialogType,
      dialogType: 0,
      DialogTypeOptions,
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 0,
          rows: 20,
          needSort: true
        }
      },
      rules: {
        username: [...Rules.requiredBlur, ...Rules.username],
        nickname: [...Rules.requiredBlur, ...Rules.name],
        roleId: [{ required: true, trigger: 'change', message: this.$t('rules.required') }],
        status: [...Rules.requiredChange],
        memo: [...Rules.memo],
        password: [...Rules.requiredBlur, ...Rules.password],
        email: [...Rules.email],
        phone: [...Rules.requiredBlur, ...Rules.mobile]
      },
      StatusOptions,
      defaultFormData: {
        status: Status.Enabled
      },
      formData: {},
      list: [],
      roleList: [],
      loginUrl: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : ''),
      addedResult: {
        merchant: {}
      },
      addedResultTitle: undefined,
      addedResultText: undefined,
      isSuperAdmin: this.$store.getters.user.roleLevel === UserLevel.SuperAdmin
    }
  },
  created() {
    this.handleSearch()
  },
  mounted() {
  },
  methods: {
    handleActions(type, row) {
      switch (type) {
        case 'edit':
          this.handleModify(row)
          break
        case 'resetPassword':
          this.handleResetPassword(row)
          break
        case 'resetOtp':
          this.handleResetOtp(row)
          break
        case 'logout':
          this.handleKickOutUser(row)
          break
        default:
          break
      }
    },
    // 開啟重置 otp dialog
    handleResetOtp(row) {
      this.resetOtpDialogFormVisible = true
      this.resetOtpForm = row
    },
    resetOtp() {
      const { id } = this.resetOtpForm
      resetSecretKey(id).then(res => {
        this.resetOtpDialogFormVisible = false
        this.resetOtpForm = {}
      })
    },
    // 登出其他帳戶
    handleKickOutUser(row) {
      this.paging.isLoading = true
      const { id } = row
      if (id) {
        kickOutUser(id).then(() => {
          this.paging.isLoading = false
        })
      }
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
      if (!hasAcl(Permission.ADMIN_PAGE)) return
      this.paging.isLoading = true
      getUserPageList(this.getQueryParams()).then(response => {
        this.list = response.page
        this.paging.totalElements = response.total
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
    changeStatus(row, { status, memo }) {
      if (!hasAcl(Permission.ADMIN_UPDATE)) return
      const { id } = row
      if (id) {
        const data = {
          id,
          status,
          memo
        }
        updateUser(data).then(this.getList)
      }
    },
    handleCreate() {
      this.queryRoleList()
      this.formData = deepClone(this.defaultFormData)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Create
    },
    handleModify(row) {
      this.queryRoleList()
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Update
    },
    handleResetPassword(row) {
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.resetPasswordDialogFormVisible = true
    },
    createData() {
      if (this.roleList === undefined) return
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.addedResultTitle = this.$t('backendUserList.addSuccessTitle')
          addUser(this.formData).then(res => {
            this.getList()
            const { username, password } = this.formData
            this.showAddedResult({ username, password })
            this.dialogFormVisible = false
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const { email, id, nickname, phone, memo, status } = this.formData
          const data = {
            email, id, nickname, phone, memo, status
          }
          updateUser(data).then(() => {
            this.getList()
            this.dialogFormVisible = false
          })
        }
      })
    },
    resetPassword() {
      this.addedResultTitle = this.$t('backendUserList.resetPasswordSuccessTitle')
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          resetUserPassword(this.formData).then(() => {
            const { username, password } = this.formData
            this.showAddedResult({ username, password })
            this.resetPasswordDialogFormVisible = false
          })
        }
      })
    },
    queryRoleList() {
      getRoleIndexing().then(response => {
        if (response && response.length > 0) {
          this.roleList = response.map(({ id, name }) => ({
            id,
            name
          }))
        } else {
          this.roleList = undefined
        }
      })
    },
    showAddedResult(data) {
      this.addedResult = data
      this.addResultDialogFormVisible = true

      this.addedResultText =
        this.$t('backendUserList.loginUrl') +
        ' : ' +
        this.loginUrl + '/' +
        '\n' +
        this.$t('backendUserList.loginUsername') +
        ' : ' +
        data.username +
        '\n' +
        this.$t('backendUserList.loginPassword') +
        ' : ' +
        data.password
    },
    closeAddResult() {
      this.getList()
      this.addResultDialogFormVisible = false
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
.emptyRoles {
  color: #f56c6c;
  font-size: 12px;
  margin-left: 5px;
}
</style>
