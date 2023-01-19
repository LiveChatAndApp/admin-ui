<template>
  <div class="app-container calendar-list-container">
    <!-- <div class="filter-container">
      <a href="http://www.csapay.com/apidoc/" target="_blank"> API串接文档</a>
    </div>-->
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column :label="$t('version.component')">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column :label="$t('version.version')">
        <template slot-scope="scope">{{scope.row.version}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getVersion } from '@/api/version'
import { hasAcl } from '@/utils/auth'
import { Permission } from '@/definitions/constants'

export default {
  name: 'version',
  data() {
    return {
      list: [{ name: 'UI', version: `v ${require('../../../package').version}` }]

    }
  },
  created() {
    if (hasAcl(Permission.VERSION_GET)) {
      getVersion().then(response => {
        if (response) {
          const res = response.map(o => {
            const { projectCode: name, projectVersion: version } = o
            return {
              name,
              version
            }
          })
          this.list = [...this.list, ...res]
        }
      })
    }
  }
}
</script>
