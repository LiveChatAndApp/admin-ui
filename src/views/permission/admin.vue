<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-input v-model="paging.query.username" :placeholder="$t('admin.username')" />
        <bs-select v-model="paging.query.status" :options="StatusOptions" :placeholder="$t('status.status')" />
        <bs-search-button @click="getList" />
        <bs-add-button @click="handleCreate" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row style="width: 100%" @sort-change="onSortChange">
        <el-table-column :label="$t('table.id')">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('admin.username')">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column :label="$t('admin.nickname')">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column :label="$t('admin.role')">
          <template slot-scope="scope">{{ scope.row.roleName }}</template>
        </el-table-column>
        <el-table-column :label="$t('admin.loginTime')" sortable="custom">
          <template slot-scope="scope">{{ scope.row.loginTime | moment }}</template>
        </el-table-column>
        <el-table-column :label="$t('admin.ip')" sortable="custom">
          <template slot-scope="scope">{{ scope.row.loginIp }}</template>
        </el-table-column>
        <el-table-column :label="$t('timestamp.createTime')">
          <template slot-scope="scope">{{ scope.row.createTime | moment }}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-status :status="scope.row.status" @on-click-submit="changeStatus(scope.row, $event)"
              :memo="scope.row.memo" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.memo')">
          <template slot-scope="scope">{{ scope.row.memo }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')" min-width="130%">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" class="filter-item" @click="handleModify(scope.row)">{{
            $t('table.edit') }}
            </el-button>
            <el-button @click="handleKickUser(scope.row)" size="mini" type="primary" class="filter-item remove-m-l"
              v-waves>{{ $t('otp.resetOtp') }}
            </el-button>
            <el-button @click="handleKickUser(scope.row)" size="mini" class="filter-item remove-m-l" type="danger"
              v-waves>{{ $t('otp.resetOtp') }}
            </el-button>
            <el-button @click="handleKickUser(scope.row)" size="mini" class="filter-item remove-m-l" type="danger"
              v-waves>{{ $t('navbar.logout') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true" width="80%">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('admin.username')" v-if="dialogType === DialogType.Create">
            <bs-input v-model="formData.username" />
          </el-form-item>
          <el-form-item :label="$t('admin.nickname')">
            <bs-input v-model="formData.nickname" />
          </el-form-item>
          <el-form-item :label="$t('admin.password')" v-if="dialogType === DialogType.Create">
            <bs-input v-model="formData.password" :placeholder="$t('userList.passwordPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('role.roleName')" prop="roleName" v-if="dialogType === DialogType.Create">
            <bs-select v-model="formData.roleId" :options="roleList" :clearable="false" />
          </el-form-item>
          <el-form-item :label="$t('merchantList.email')" prop="email">
            <bs-input v-model="formData.email" />
          </el-form-item>
          <el-form-item :label="$t('merchantList.mobile')" prop="phone">
            <bs-input v-model="formData.phone" />
          </el-form-item>
          <el-form-item :label="$t('status.status')">
            <bs-select v-model="formData.status" :options="StatusOptions" :clearable="false" />
          </el-form-item>
          <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-text-area v-model="formData.remark" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="dialogFormVisible = false" />
          <bs-submit-button v-if="dialogType === DialogType.Create" @click="createData" />
          <bs-submit-button v-else @click="updateData" />
        </div>
      </el-dialog>

      <el-dialog :title="$t('userList.resetWithdrawPassword')" :visible.sync="resetWithdrawPasswordDialogFormVisible"
        v-if="resetWithdrawPasswordDialogFormVisible" :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('userList.userId')">{{ formData.username }}</el-form-item>
          <el-form-item :label="$t('userList.withdrawPassword')" prop="password">
            <bs-input type="password" v-model="formData.withdrawPassword"
              :placeholder="$t('userList.passwordPlaceholder')" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="resetWithdrawPasswordDialogFormVisible = false" />
          <bs-submit-button @click="resetWithdrawPassword" />
        </div>
      </el-dialog>

      <!-- 重置OTP-弹跳视窗 -->
      <el-dialog :title="$t('otp.resetOtp')" :visible.sync="resetOtpDialogFormVisible" v-if="resetOtpDialogFormVisible">
        <el-form label-position="left" label-width="120px">
          <el-form-item :label="$t('userList.username')">{{ resetOtpForm.username }}</el-form-item>
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
import { getadminlist, addAdminUser, updateAdminUser } from '@/api/admin'
import { DialogType, Permission, Status } from '@/definitions/constants'
import { DialogTypeOptions, StatusOptions } from '@/definitions/options'
import { getRoleIndexing } from '@/api/indexing'
import { deepClone, objectMerge } from '@/utils'
import { kickUser } from '@/api/user'

export default {
  name: 'logList',
  data() {
    return {
      roleList: [],
      rules: {},
      formData: {},
      StatusOptions,
      dialogFormVisible: false,
      resetWithdrawPasswordDialogFormVisible: false,
      resetOtpDialogFormVisible: false,
      Permission,
      DialogType,
      dialogType: 0,
      DialogTypeOptions,
      defaultFormData: {
        email: '',
        id: 0,
        nickname: '',
        phone: '',
        remark: '',
        status: Status.Enabled
      },
      roles: [],
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          pageNum: 0,
          pagerows: undefined
        }
      },
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.paging.isLoading = true
      getadminlist(this.paging.query).then(response => {
        this.list = response.page.list
        // this.list.forEach(user => {
        //   var lrole = this.roles.find(role => role.id === user.roleId)
        //   if (lrole) {
        //     user.rolename = lrole.name
        //   }
        // })
        this.paging.totalElements = response.total
        this.paging.isLoading = false
      })
    },
    handleCreate() {
      this.queryRoleList()

      this.formData = deepClone(this.defaultFormData)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Create
      this.isShowRoleOption = true
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addAdminUser(this.formData).then(() => {
            this.getList()
          })
          this.dialogFormVisible = false
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateAdminUser(this.formData).then(() => {
            this.getList()
          })
          this.dialogFormVisible = false
        }
      })
    },
    handleSizeChange(val) {
      this.paging.query.size = val
      this.getList()
    },
    handleModify(row) {
      this.defaultFormData.nickname = row.nickname
      this.formData = deepClone(this.defaultFormData)
      // this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Update
    },
    handleCurrentChange(val) {
      this.paging.query.page = val
      this.getList()
    },
    handleResetWithdrawPassword(row) {
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.resetWithdrawPasswordDialogFormVisible = true
    },
    onSortChange(column) {
      if (column.prop) {
        this.paging.query.sort = `${column.prop},${column.order === 'ascending' ? 'ASC' : 'DESC'}`
        this.getList()
      }
    },
    // 登出帳戶
    handleKickUser(row) {
      this.paging.isLoading = true
      const { username, merchantId } = row
      if (username && merchantId) {
        kickUser(username, merchantId).then(() => {
          this.paging.isLoading = false
        })
      }
    },
    queryRoleList() {
      getRoleIndexing().then(response => {
        if (response && response.list.length > 0) {
          this.roleList = response.list.map(role => ({
            id: role.id,
            name: role.name
          }))
        } else {
          this.roleList = undefined
        }
      })
    }
  }
}
</script>
