import { getCatalogIndexing } from '@/api/indexing'
import { getRandomInt } from '@/utils'

export default {
  name: 'BsCatalogSelect',
  template: `
    <el-select v-model="inputVal"
               :options="catalogOptions"
               :filterable="true"
               :clearable="true"
               @input="$emit('input', $event)"
               @change="$emit('change', $event)"
               :style="{width: width}">
      <el-option v-for="catalog in catalogOptions"
                 :key="catalog.catalogId"
                 :value="catalog.catalogId"
                 :label="catalog.catalogName"
      />
     </el-select>
  `,
  props: {
    value: {
      type: Number
    },
    width: {
      type: String
    }
  },
  created() {
    getCatalogIndexing().then(response => {
      this.catalogOptions = response
      if (!this.inputVal) {
        this.inputVal = this.catalogOptions[getRandomInt(1, this.catalogOptions.length)].catalogId
        this.$emit('input', this.inputVal)
        this.$emit('change', this.inputVal)
      }
    })
  },
  data() {
    return {
      catalogOptions: [],
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
