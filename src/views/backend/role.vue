<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <bs-add-button @click="handleCreate" />
      <el-table
        :data="list"
        v-loading="paging.isLoading"
        :element-loading-text="$t('table.loading')"
        border
        fit
        highlight-current-row
        style="width: 100%"
        @sort-change="onSortChange"
      >
        <el-table-column :label="$t('role.roleName')">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column :label="$t('role.level')">
          <template slot-scope="scope">
            <bs-status-text :options="UserLevelOptions" :status="scope.row.level" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('timestamp.createTime')" sortable="custom" prop="_create_time">
          <template slot-scope="scope">{{ scope.row.createTime | moment }}</template>
        </el-table-column>
        <el-table-column :label="$t('timestamp.updateTime')" sortable="custom" prop="_update_time">
          <template slot-scope="scope">{{ scope.row.updateTime | moment }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.memo')">
          <template slot-scope="scope">
            <bs-ellipsis :value="scope.row.memo" :size="30" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleModify(scope.row)"
              class="filter-item remove-m-l"
            >
              {{$t('table.edit')}}
            </el-button>
            <el-button
              class="filter-item remove-m-l"
              size="mini"
              type="primary"
              @click="getAclList(scope.row)"
            >
              {{$t('role.acl')}}
            </el-button>
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

      <el-dialog
        :title="$t('role.viewAcl')"
        :visible.sync="listFormVisible"
        v-if="listFormVisible"
        :close-on-click-modal="true"
        :show-close="true"
        width="800px"
      >
        <div style="margin-left:10px;">
          <v-tree
            ref="aclTree"
            :data="aclList"
            :multiple="false"
            :tpl="tpl"
            :halfcheck="true"
            :expandAll="true"
          />
        </div>
      </el-dialog>

      <el-dialog
        :title="DialogTypeOptions[dialogType].name"
        :visible.sync="dialogFormVisible"
        v-if="dialogFormVisible"
        :close-on-click-modal="false"
        :show-close="true"
      >
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left">
          <el-form-item :label="$t('role.roleName')" prop="name">
            <bs-input v-model="formData.name" />
          </el-form-item>
          <el-form-item :label="$t('role.level')" prop="level">
            <bs-select
              v-model="formData.level"
              :options="UserLevelOptions"
              :clearable="false"
              :disabled="dialogType===DialogType.Update"
            />
          </el-form-item>
          <el-form-item :label="$t('role.acl')" prop="aclList">
            <v-tree
              ref="aclTree"
              :data="userAclList"
              :multiple="true"
              :tpl="tpl"
              :halfcheck="true"
              :expandAll="true"
            />
          </el-form-item>
          <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-text-area v-model="formData.memo" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="dialogFormVisible=false" />
          <bs-submit-button v-if="dialogType===DialogType.Create" @click="createData" />
          <bs-submit-button v-else @click="updateData" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import VTree from '@/components/Tree/tree'
import { addRole, getRoleList, updateRole } from '@/api/role'
import { getAuthListRoleId } from '@/api/auth'
import { DialogTypeOptions, UserLevelOptions, StatusOptions } from '@/definitions/options'
import { DialogType, Permission } from '@/definitions/constants'
import { deepClone, objectMerge } from '@/utils'
import { Rules } from '@/definitions/fieldCheck'
import { isSuperAdminLevel } from '@/utils/user'

export default {
  name: 'role',
  components: {
    VTree
  },
  data() {
    return {
      StatusOptions,
      Permission,
      UserLevelOptions,
      listFormVisible: false,
      dialogFormVisible: false,
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
        name: [{ required: true, trigger: 'blur', message: this.$t('rules.required') }, ...Rules.roleName],
        level: [{ required: true, trigger: 'change', message: this.$t('role.rules.level') }],
        memo: [...Rules.memo]
      },
      defaultFormData: {},
      formData: {},
      list: [],
      userAclList: [],
      aclList: [],
      merchantList: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    isSuperAdmin() {
      return isSuperAdminLevel(this.$store)
    },
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    tpl(node, ctx) {
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      if (node.searched) titleClass += ' node-searched'
      return (
        <span
          class={titleClass}
          domPropsInnerHTML={node.title}
          onClick={() => ctx.parent.nodeSelected(ctx.props.node)}
        />
      )
    },
    getQueryParams() {
      const params = { ...this.paging.query, page: this.paging.query.page + 1 }
      return params
    },
    getList() {
      this.paging.isLoading = true
      getRoleList(this.getQueryParams()).then(response => {
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
    handleCreate() {
      this.formData = objectMerge(deepClone(this.defaultFormData), {})
      this.dialogFormVisible = true
      this.dialogType = DialogType.Create
      const { roleId } = this.$store.getters.user
      getAuthListRoleId(roleId).then(response => {
        this.userAclList = response.map(this.buildTreeTitle)
      })
    },
    async handleModify(row) {
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Update
      const { roleId } = this.$store.getters.user
      Promise.all([getAuthListRoleId(roleId), getAuthListRoleId(row.id)]).then(([userAclList, roleAclList]) => {
        const aclList = this.flattenTree(roleAclList)
        this.userAclList = userAclList.map(res => this.buildTreeTitle(res, aclList))
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        const aclIdList = this.$refs.aclTree.getCheckedNodes().map(n => n.id)
        if (valid && aclIdList && this.checkAclIdList()) {
          this.formData.adminAuthList = aclIdList
          addRole(this.formData).then(() => {
            this.getList()
            this.dialogFormVisible = false
          })
        }
      })
    },
    checkAclIdList() {
      const aclIdList = this.$refs.aclTree.getCheckedNodes().map(n => n.id)
      if (aclIdList.length === 0 || !aclIdList) {
        this.$message({
          message: this.$t('rules.aclistEmpty'),
          type: 'error'
        })
        return false
      }
      return true
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid && this.checkAclIdList()) {
          this.formData.adminAuthList = this.$refs.aclTree.getCheckedNodes().map(n => n.id)
          updateRole(this.formData).then(() => {
            this.getList()
            this.dialogFormVisible = false
          })
        }
      })
    },
    getAclList(row) {
      const { id } = row
      if (id) {
        getAuthListRoleId(id).then(response => {
          this.listFormVisible = true
          this.aclList = response.map(this.buildTreeTitle)
        })
      }
    },
    buildTreeTitle(root, checkedList) {
      root.title =
        '<b>' +
        root.name +
        '</b>' +
        '<i style="color: #aaaaaa">' +
        ' ' +
        root.code +
        (root.isLog ? ' (isLog: ' + root.isLog + ')' : '') +
        (root.api ? '<br/>api: ' + root.api : '') +
        '</i>'

      if (checkedList && checkedList[root.id]) {
        root.checked = true
      }

      if (root.children) {
        root.children = root.children.map(res => this.buildTreeTitle(res, checkedList))
      }
      return root
    },
    flattenTree(root, array = {}) {
      if (Array.isArray(root)) {
        root.forEach(node => this.flattenTree(node, array))
      } else {
        array[root.id] = root
        if (root.children) {
          this.flattenTree(root.children, array)
        }
      }
      return array
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
