<template>
   <div class="tree-container" :style="{width:containerWidth+'%'}" v-click-outside="hide" >
      <span class="ding" v-show="selectedItems.length>2">{{selectedItems.length}}</span>
      <div class="tag-box-container">
        <div class="tag-box" ref="txtbox" @click="open = !open" @mouseleave="leaveTextTag">
          <div class="tag blank" v-show="!selectedItems.length">{{pleasechoosetext}}</div>
          <div class="tag"  @click="tagClick($event)" ref='txttag' @mouseenter="sel_node_Index = idx"  @mouseleave="sel_node_Index = -1"
             v-for="(node,idx) in selectedItems" :key="idx">
            <span v-html='node.title'></span><span class="rmNode" @click.stop="rmNode(node)" v-show="sel_node_Index === idx">x</span>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="tree-box" v-show="open" :class="{'tree-box-bg-color':!transparentBox}">
          <input class="search-input" v-model="searchword" v-show="searchable" @keyup.13="searchNodes" type="text" :placeholder="serchtext">
          <v-tree ref='dropTree' :data='data' @dropTreeNodeChecked='nodeCheckStatusChange' @async-load-nodes='asyncLoadNodes' @node-expanded='asyncLoadNodes' @node-click='nodeClick' @drag-node-end='dragNodeEnd' :dragAfterExpanded="dragAfterExpanded" :draggable="draggable" :tpl ="tpl"  :halfcheck='halfcheck' :scoped='scoped' :multiple="multiple"/>
        </div>
      </transition>
    </div>
</template>
<script>

import ClickOutside from 'vue-click-outside'
import VTree from './tree'
export default {
  name: 'selectTree',
  directives: {
    ClickOutside
  },
  model: {
    event: 'value-change'
  },
  data() {
    return {
      searchword: '',
      open: false,
      sel_node_Index: -1,
      selectedItems: []
    }
  },
  watch: {
    selectedItems: function(oldVal, newVal) {
      this.$emit('value-change', this.selectedItems)
    },
    value: function(value) {
      this.selectedItems = value
      this.initTreeStatus()
    }
  },
  mounted() {
    this.selectedItems = this.value
    this.initTreeStatus()
  },
  props: {
    value: {
      type: Array,
      default: []
    },
    searchable: {
      type: Boolean,
      default: true
    },
    pleasechoosetext: {
      type: String,
      default: '请选择...'
    },
    serchtext: {
      type: String,
      default: '查询...'
    },
    data: {
      type: Array,
      default: () => []
    },
    parent: {
      type: Object,
      default: () => null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    dragAfterExpanded: {
      type: Boolean,
      default: true
    },
    halfcheck: {
      type: Boolean,
      default: false
    },
    scoped: {
      type: Boolean,
      default: false
    },
    containerWidth: {
      type: Number,
      default: 100
    },
    transparentBox: {
      type: Boolean,
      default: true
    },
    tpl: Function,
    searchFilter: Function
  },
  methods: {
    hide() {
      this.open = false
    },
    /* @event passing the async-load-nodes event to the parent component
     *  @param node clicked node
     */
    asyncLoadNodes(node) {
      if (node.async && !node.children) {
        this.$emit('async-load-nodes', node)
      }
    },
    /* @event passing the drag-node-end event to the parent component
     * @param node clicked node
     */
    dragNodeEnd(event) {
      this.$emit('drag-node-end', event)
    },
    /* @event passing the node-click event to the parent component
     * @param node clicked node
     */
    nodeClick(node) {
      if (node.selected) {
        this.$set(node, 'selected', true)
        this.$set(node, 'checked', true)
      }
      if (!this.multiple) this.selectedItems = []
      if (node.selected && this.selectedItems.findIndex(txt => txt.id === node.id) === -1) {
        this.selectedItems.push(node)
      }
      if (!node.selected) this.rmNode(node, true)
      this.$emit('node-click', node)
    },
    /*
    * delete node tag from input
    */
    rmNode(n, eventFromNode) {
      if (!eventFromNode) {
        const node = this.$refs.dropTree.getCheckedNodes(true).find(x => x.id === n.id)
        this.$set(node, 'selected', false)
        this.$set(node, 'checked', false)
      }
      const idx = this.selectedItems.findIndex(x => x === n)
      this.selectedItems.splice(idx, 1)
    },
    /*
    * node check status change event
    */
    nodeCheckStatusChange(node, checked) {
      const treeNodes = this.$refs.dropTree.getCheckedNodes(true)
      if (!treeNodes) this.selectedItems = []
      this.selectedItems = []
      for (const node of treeNodes) {
        this.selectedItems.push(node)
      }
    },
    /*
    * search nodes from  drop-down tree
    * */
    searchNodes() {
      let predicate = node => node.title.indexOf(this.searchword) > -1
      if (this.searchFilter) predicate = this.searchFilter
      this.$refs.dropTree.searchNodes(predicate)
    },
    // click tag animation effects
    tagClick(e) {
      var l = e.target.offsetLeft - 5
      this.$refs.txtbox.style.transition = 'transform .3s linear'
      this.$refs.txtbox.style.transform = 'translateX(-' + l + 'px)'
    },
    // remove tag animation effects
    leaveTextTag() {
      this.$refs.txtbox.style.transition = 'transform 0.4s'
      this.$refs.txtbox.style.transform = 'translateX(0)'
    },
    /*
    * @param data source tree data
    * initialize the state of the drop-down tree node
    */
    initTreeStatus(data) {
      data = data || this.data
      for (const node of data) {
        if (this.value.findIndex(n => n.id === node.id) > -1) {
          this.$set(node, 'selected', true)
          this.$set(node, 'checked', true)
        }
        if (node.children && node.children.length) {
          this.initTreeStatus(node.children)
        }
      }
    }
  },
  components: { VTree }
}
</script>
<style>
  .tree-container {
    position: relative;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .tag-box-container {
    position: relative;
    width: 100%;
    height: 40px;
    overflow: hidden;
  }
  .tag-box {
    width: 100%;
    height: 40px;
  }
  .ding {
    position: absolute;
    z-index: 3;
    right: 12px;
    top: -15px;
    height: 16px;
    width: 16px;
    border-radius: 50% 50% 50% 0;
    text-indent: -1px;
    font-size: 10px;
    background: rgba(255, 0, 0, .5);
    color: #fff;
    cursor: default;
  }
  .tree-box {
    margin-top: 3px;
    border-radius: 6px;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px rgba(0, 0, 0, .4);
  }
  .tree-box ul {
    margin-left: 0;
    -webkit-padding-start: 10px;
  }
  .tree-box-bg-color {
    background-color: #fff;
  }
  .search-input {
    width: 96%;
    height: 40px;
    box-sizing: border-box;
    margin: 10px auto 0;
    border: 1px solid #ccc;
    font-size: 14px;
    text-indent: 1em;
    border-radius: 6px;
    outline: none;
  }
  .tag {
    float: left;
    position: relative;
    min-width: 50px;
    height: 30px;
    margin: 4px;
    padding: 0 25px 0 10px;
    line-height: 30px;
    text-align: center;
    border-radius: 6px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    user-select: none;
    cursor: default;
  }
  .blank{
    color: #a1a1a1;
    background-color: #fff;
    border:0;
  }
  .rmNode {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 15px;
    height: 15px;
    line-height: 13px;
    font-size: 12px;
    border: 1px solid #ccc;
    background-color: #494949;
    color: #ffffff;
    border-radius: 50%;
    cursor: pointer;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s, transform 0.5s;
    /*transition: all 0.5s;*/
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
