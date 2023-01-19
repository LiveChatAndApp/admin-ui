<template>
  <div class="app-container calendar-list-container">
    <div style="width: 100%; margin-left:10px;">
      <v-tree
        ref="aclTree"
        :data="aclList"
        :multiple="false"
        :tpl="tpl"
        :halfcheck="true"
        :expandAll="true"
      />
    </div>
  </div>
</template>

<script>
import VTree from '@/components/Tree/tree'
import { getAuthListRoleId } from '@/api/auth'
import { Permission } from '@/definitions/constants'
// import { isSuperAdminLevel } from '@/utils/user'

export default {
  name: 'menuList',
  components: {
    VTree
  },
  data() {
    return {
      Permission,
      paging: {
        isLoading: true
      },
      aclList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
    getList() {
      const { roleId } = this.$store.getters.user
      // let id = roleId
      // 管理者就不帶
      // if (isSuperAdminLevel(this.$store)) {
      //   id = undefined
      // }
      getAuthListRoleId(roleId).then(response => {
        this.aclList = response.map(this.buildTreeTitle)
      })
    },
    buildTreeTitle(root) {
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

      if (root.children) {
        root.children = root.children.map(this.buildTreeTitle)
      }
      return root
    }
  }
}
</script>
