<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <div class="filter-container">
        <bs-select v-model="paging.query.channelId" :options="channelList"
          :placeholder="$t('channelList.channelName')" />
        <bs-input v-model="paging.query.merchantId" :placeholder="$t('merchantList.merchantId')" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.AccountAllocationList]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row v-permission="[Permission.AccountAllocationList]">
        <el-table-column :label="$t('merchantList.merchantId')">
          <template slot-scope="scope">{{scope.row.merchantId}}</template>
        </el-table-column>
        <el-table-column :label="$t('merchantList.merchant')">
          <template slot-scope="scope">{{scope.row.merchantName}}</template>
        </el-table-column>

        <!-- 代理 -->
        <!-- <el-table-column :label="$t('merchantList.agent')">
          <template slot-scope="scope">{{scope.row.parentName}}</template>
        </el-table-column> -->

        <el-table-column :label="$t('accountGroupList.accountGroupName2')">
          <template slot-scope="scope">
            <span v-for="merchantAccountGroupMap of scope.row.merchantAccountGroupMapList">
              {{merchantAccountGroupMap.accountGroupName}}<br />
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('channelList.channelName')">
          <template slot-scope="scope">
            <span v-for="channelName of scope.row.channelNameList">
              {{channelName}}<br />
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('accountAllocation.status')">
          <template slot-scope="scope">
            <bs-status :status="scope.row.status" :clickable="false" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <bs-edit-button @click="handleModify(scope.row)" v-permission="[Permission.AccountAllocationUpdate]" />
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('merchantList.merchant')">
            {{formData.merchantName}}
          </el-form-item>

          <!-- 代理 -->
          <!-- <el-form-item :label="$t('merchantList.agent')">
            {{formData.parentName}}
          </el-form-item> -->

          <el-form-item :label="$t('accountGroupList.accountGroupName')" prop="accountGroupIdList">
            <bs-select v-model="formData.accountGroupIdList" :options="accountGroupList" multiple />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="dialogFormVisible=false" />
          <bs-submit-button @click="updateData" />
        </div>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  import { DialogType, Permission } from '@/definitions/constants'
  import { DialogTypeOptions } from '@/definitions/options'
  import { getAccountAllocationList, updateAccountAllocation } from '@/api/accountAllocation'
  import { getAccountGroupAssignableList } from '@/api/accountGroup'
  import { getChannelIndexing } from '@/api/indexing'

  export default {
    name: 'accountAllocation',
    data() {
      return {
        Permission,
        dialogFormVisible: false,
        DialogType,
        dialogType: 0,
        DialogTypeOptions,
        paging: {
          isLoading: false,
          totalElements: null,
          query: {
            page: 0,
            rows: undefined
          }
        },
        rules: {},
        defaultFormData: {
          channelId: undefined,
          accountGroupIdList: []
        },
        formData: {
          accountGroupIdList: []
        },
        list: [],
        channelList: [],
        accountGroupList: []
      }
    },
    created() {
      this.queryChannelList()
    },
    methods: {
      getList() {
        this.paging.isLoading = true
        getAccountAllocationList(this.paging.query).then(response => {
          if (response && response.content) {
            response.content.forEach(res => {
              res.channelNameList =
                Array.from(new Set(res.accountGroupMapList.map(channel => channel.channelName || channel.withdrawChannelName)))
            })
          }
          this.list = response.content
          this.paging.totalElements = response.totalElements
          this.paging.isLoading = false
        })
      },
      handleSizeChange(val) {
        this.paging.query.size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.paging.query.page = val
        this.getList()
      },
      changeStatus(row) {
      },
      handleSearch() {
        this.paging.query.page = 0
        this.getList()
      },
      handleModify(row) {
        this.formData.merchantName = row.merchantName
        this.formData.parentName = row.parentName
        this.formData.merchantId = row.merchantId

        const selectedIdList = row.accountGroupMapList.map(accountGroup => accountGroup.accountGroupId)
        const selectedIdSet = new Set()
        selectedIdList.forEach(id => selectedIdSet.add(id))
        this.$set(this.formData, 'accountGroupIdList', Array.from(selectedIdSet))

        getAccountGroupAssignableList({ merchantId: row.merchantId }).then(response => {
          this.accountGroupList = response.map(accountGroup => ({
            id: accountGroup.accountGroupId,
            name: accountGroup.accountGroupName
          }))
        })

        this.dialogFormVisible = true
        this.dialogType = DialogType.Update
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            updateAccountAllocation(this.formData).then(() => {
              this.getList()
            })
            this.dialogFormVisible = false
          }
        })
      },
      queryChannelList() {
        getChannelIndexing().then(response => {
          this.channelList = response.map(channel => ({ id: channel.channelId, name: channel.channelName }))
          this.getList()
        })
      }
    }
  }
</script>
