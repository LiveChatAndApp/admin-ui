export default {
  name: 'BsStatusText',
  template: `
    <span :style="{color: getOption(status).hex}">
      {{getStatusName()}}
    </span>
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
          return { name: status, hex: '#606266' }
        }
      }
      return { name: '', hex: '#606266' }
    }
  }
}
