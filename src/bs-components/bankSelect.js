import { getBankAbbreviationIndexing } from '@/api/indexing'

export default {
  name: 'BsBankSelect',
  template: `
    <el-select v-model="inputVal"
               :options="bankOptions"
               :filterable="true"
               :clearable="true"
               @input="$emit('input', $event)"
               @change="$emit('change', $event)"
               :style="{width: width}">
      <el-option v-for="bank in bankOptions"
                 :key="bank.bankName"
                 :value="bank.bankName"
                 :label="bank.bankAbbreviation + ' - ' + bank.bankName"
      />
     </el-select>
  `,
  props: {
    value: {
      type: String
    },
    width: {
      type: String
    }
  },
  mounted() {
    getBankAbbreviationIndexing().then(response => {
      this.bankOptions = response
      if (!this.inputVal) {
        this.inputVal = this.bankOptions[0].bankName
        this.$emit('input', this.inputVal)
        this.$emit('change', this.inputVal)
      }
    })
  },
  data() {
    return {
      bankOptions: [],
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
