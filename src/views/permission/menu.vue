<template>
  <div class="app-container calendar-list-container" style='flex'>

    <div style='width: 60%; margin-left:10px; float: left;'>
      <v-tree ref='aclTree' :data='aclList' :multiple='false' :tpl='tpl' @node-click='nodeClick' :halfcheck='true'
        :expandAll='true' />
    </div>
  </div>

</template>

<script>
import VTree from '@/components/Tree/tree'
import { getAclListByRoleId } from '@/api/acl'
// import { addMenu, updateMenu } from '@/api/menu'
import { Permission } from '@/definitions/constants'
import { deepClone } from '@/utils'
export default {
  name: 'acl',
  components: {
    VTree
  },
  data() {
    return {
      dialogType: 0,
      formData: {},
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
          onClick={() => ctx.parent.nodeSelected(ctx.props.node)}>
        </span>
      )
    },
    nodeClick(node) {
      if (node.parent === null) {
        this.formData.parentId = node.id
        this.formData.parentname = node.text
        this.formData.name = null
        this.formData.id = null
        this.dialogType = 0
      } else {
        this.formData.id = node.id
        this.formData.parentname = node.parent.text
        this.formData.parentId = node.parent.id
        this.formData.name = node.text
        this.formData.order = node.order
        this.dialogType = 1
      }
      this.formData = deepClone(this.formData)
    },
    getList() {
      getAclListByRoleId().then(response => {
        this.aclList = response.list.map(this.buildTreeTitle)
      })
    },
    buildTreeTitle(root) {
      var str = (root.isLog) ? ' (isLog: true)' : ''
      root.title = '<b>' + root.name + '</b>' +
        '<i style="color: #aaaaaa">' +
        ' ' + root.code + str + '</i>'

      if (root.children) {
        root.children = root.children.map(this.buildTreeTitle)
      }
      return root
    }
  }
}
</script>
