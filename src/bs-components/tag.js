export default {
  name: 'BsTag',
  template: `
    <el-tag :type="getOption(status).color">
      {{getStatusName()}}
    </el-tag>
  `,
  props: {
    mode: {
      type: String,
      default: 'full'
    },
    options: {
      type: Array,
      default: []
    },
    status: Number | String
  },
  data() {
    return {}
  },
  methods: {
    getStatusName() {
      return this.getOption(this.status).name
    },
    getOption(status) {
      if (this.options.length > 0) {
        const obj = this.options.find(option => {
          return String(option.id) === String(status)
        })
        if (obj) {
          return obj
        } else {
          return { name: status, color: 'success' }
        }
      }
      return { name: '', color: '#success' }
    }
  }
}
