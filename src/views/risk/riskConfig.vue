<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-table
        :data="list"
        v-loading="paging.isLoading"
        :element-loading-text="$t('table.loading')"
        border
        fit
        highlight-current-row
        class="report-table"
        v-permission="[Permission.RiskConfigList]"
      >
        <el-table-column :label="$t('riskConfig.key')">
          <template slot-scope="scope">
            {{scope.row.name}}
            <br />
            {{scope.row.key}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('riskConfig.value')">
          <template slot-scope="scope">
            <span v-if="scope.row.type===RiskConfigType.Money">{{scope.row.value | money}}</span>
            <span v-else-if="scope.row.type===RiskConfigType.Percentage">{{scope.row.value}}%</span>
            <pre v-else-if="scope.row.type===RiskConfigType.Json">{{scope.row.value}}</pre>
            <span v-else>{{scope.row.value}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-status
              :status="scope.row.status"
              :memo="scope.row.memo"
              @on-click-submit="changeStatus(scope.row, $event)"
              :clickable="hasAcl(Permission.RiskConfigUpdate)"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('timestamp.updateTime')">
          <template slot-scope="scope">{{scope.row.updateTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('table.memo')">
          <template slot-scope="scope">
            <!-- {{scope.row.memo}} -->
            <bs-ellipsis :value="scope.row.memo" :size="30" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <bs-edit-button
              @click="handleModify(scope.row)"
              v-permission="[Permission.RiskConfigUpdate]"
            />
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        :title="DialogTypeOptions[dialogType].name"
        :visible.sync="dialogFormVisible"
        v-if="dialogFormVisible"
        :close-on-click-modal="false"
        :show-close="true"
      >
        <el-form
          :rules="rules"
          ref="dataForm"
          :model="formData"
          label-position="left"
          label-width="100px"
        >
          <el-form-item :label="$t('riskConfig.key')">
            {{formData.name}}
            <br />
            {{formData.key}}
          </el-form-item>
          <el-form-item :label="$t('riskConfig.value')" prop="value">
            <span v-if="formData.type===RiskConfigType.Percentage">
              <bs-input v-model="formData.value" />%
            </span>
            <bs-text-area v-if="formData.type===RiskConfigType.Json" v-model="formData.value" />
            <bs-input v-else v-model="formData.value" />
          </el-form-item>
          <el-form-item :label="$t('status.status')" prop="status">
            <bs-select v-model="formData.status" :options="StatusOptions" :clearable="false" />
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
import { DialogType, Permission, RiskConfig, RiskConfigType } from '@/definitions/constants'
import { DialogTypeOptions, StatusOptions } from '@/definitions/options'
import { deepClone, objectMerge } from '@/utils'
import { getRiskConfigList, updateRiskConfig } from '@/api/riskConfig'
import { moneyToCent, moneyToDollar } from '@/utils/money'
import { hasAcl } from '@/utils/auth'
import { Rules } from '@/definitions/fieldCheck'
import { showFailure } from '@/utils/executionMessage'

export default {
  name: 'riskConfig',
  data() {
    return {
      Permission,
      dialogFormVisible: false,
      DialogType,
      dialogType: 0,
      DialogTypeOptions,
      paging: {
        isLoading: false
      },
      rules: {
        value: [...Rules.requiredBlur],
        status: [...Rules.requiredChange],
        memo: [...Rules.memo]
      },
      RiskConfigType,
      StatusOptions,
      defaultFormData: {},
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    hasAcl,
    getList() {
      this.paging.isLoading = true
      getRiskConfigList().then(response => {
        response.forEach(config => {
          const found = RiskConfig.find(c => c.key === config.key)
          if (found) {
            config.name = found.name
            config.type = found.type

            if (config.type === RiskConfigType.Money) {
              config.value = moneyToDollar(config.value)
            } else if (config.type === RiskConfigType.Json) {
              config.value = JSON.stringify(JSON.parse(config.value), null, '    ')
            }
          }
        })
        this.list = response
      })
      this.paging.isLoading = false
    },
    changeStatus(row, { status, memo }) {
      const data = {
        key: row.key,
        status,
        memo
      }
      updateRiskConfig(data).then(this.getList)
    },
    handleModify(row) {
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Update
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.normalize()
          updateRiskConfig(this.formData).then(() => {
            this.getList()
          })
          this.dialogFormVisible = false
        }
      })
    },
    normalize() {
      if (this.formData.type === RiskConfigType.Money) {
        this.formData.value = moneyToCent(this.formData.value)
      } else if (this.formData.type === RiskConfigType.Json) {
        try {
          const object = JSON.parse(this.formData.value)
          this.formData.value = JSON.stringify(object)
        } catch (e) {
          showFailure('Invalid JSON')
          throw e
        }
      }
    }
  }
}
</script>
