import { getAccountIndexing } from '@/api/indexing'

export default {
  name: 'BsAccountSelect',
  template: `
    <el-select v-model="inputVal"
               :options="accountOptions"
               :filterable="true"
               :clearable="true"
               placeholder="sdfsdf"
               @input="$emit('input', $event)"
               @change="$emit('change', $event)"
               :style="{width: width}"
               :placeholder="placeholder"
               >
      <el-option v-for="account in accountOptions"
                 :key="account.accountId"
                 :value="account.accountId"
                 :label="account.catchId + ' - ' + account.accountName"
      />
     </el-select>
  `,
  props: {
    value: {
      type: [Number, String]
    },
    width: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  mounted() {
    getAccountIndexing().then(response => {
      const accountOptions = response.filter(account => {
        return account.catchId !== undefined
      })
      this.$set(this, 'accountOptions', accountOptions)
    })
  },
  data() {
    return {
      accountOptions: [],
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
