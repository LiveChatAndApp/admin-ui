import { getChannelIndexing } from '@/api/indexing'

export default {
  name: 'BsChannelSelect',
  template: `
    <el-select v-model="inputVal"
               :options="optionList"
               :filterable="true"
               :clearable="clearable === undefined ? false : clearable"
               @input="$emit('input', $event)"
               @change="$emit('change', $event)"
               :style="{width: width}">
      <el-option v-for="option in optionList"
                 :key="option.channelId"
                 :value="option.channelId"
                 :label="option.channelName"
      />
     </el-select>
  `,
  props: {
    value: {
      type: Number
    },
    clearable: {
      type: Boolean
    },
    width: {
      type: String
    }
  },
  mounted() {
    getChannelIndexing().then(response => {
      this.optionList = response
      if (!this.inputVal) {
        this.inputVal = this.optionList[0].channelId
        this.$emit('input', this.inputVal)
        this.$emit('change', this.inputVal)
      }
    })
  },
  data() {
    return {
      optionList: [],
      inputVal: this.value
    }
  },
  methods: {
    onChange(event) {
      this.$emit('change', event)
    }
  },
  watch: {
    inputVal(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.inputVal = val
    }
  }
}
