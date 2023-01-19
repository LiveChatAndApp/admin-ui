<template>
  <div class="wrap">
    <div class="chat">
      <div class="header">
        <div />
        <el-button @click="resetTimer" class="counter" style="marginRight: 10px" type="primary"
          :icon="timeVal === 0 ? 'el-icon-loading' : ''" circle>
          <span v-if="timeVal !== 0">{{ timeVal }}</span>
        </el-button>
      </div>
      <perfect-scrollbar @ps-scroll-y="onScroll">
        <div class="content">
          <div v-for="message in messages" :key="message.id"
            :class="{ me: (message.senderAccountName === $store.getters.user.username), row: true }">
            <div class="info">
              <div class="name">{{ message.senderNickName + ':' }}</div>
              <!-- 圖片 -->
              <div v-if="message.messageType === MessageTypeStatus.Image">
                <el-image style="width: 100px; height: 100px" :src="message.filePath" fit="cover"
                  :preview-src-list="[message.filePath]" />
              </div>
              <!-- 聲音 -->
              <div v-else-if="message.messageType === MessageTypeStatus.Voice">
                <audio :src="message.filePath" width="100%" controls />
              </div>
              <!-- 影片 -->
              <div v-else-if="message.messageType === MessageTypeStatus.Video">
                <video :src="message.filePath" controls width="200px" height="200px" />
              </div>
              <!-- 文件 -->
              <div v-else-if="message.messageType === MessageTypeStatus.Doc">
                <el-button size="mini" class="filter-item" type="primary" v-waves
                  @click="downloadFile(message.filePath)">
                  Download
                </el-button>
              </div>
              <div v-else>
                {{ message.content }}
              </div>
              <div class="time">{{ message.createTime | moment }}</div>
            </div>
          </div>
        </div>
        <el-button @click="scrollBottom" class="arrowdown-button" type="primary" :icon="'el-icon-arrow-down'" circle
          v-if="this.isShowButton === true" />
      </perfect-scrollbar>
      <div class="footer">
        <input class="file-input" ref="fileInput" type="file" @change="handleUploadChange" />
        <el-button class="file-button" type="primary" icon="el-icon-folder" circle @click="handleOpenFile" />
        <bs-input :placeholder="$t('groupList.enterPlaceholder')" v-model="message" type="text" />
        <bs-button style="marginLeft: 10px" :title="$t('groupList.submit')" @click="submit" />
      </div>
    </div>

  </div>
</template>

<script>
import { MessageTypeStatus } from '@/definitions/constants'

export default {
  name: 'chat',
  props: {
    onSubmit: {
      type: Function,
      default: () => { }
    },
    onReset: {
      type: Function,
      default: () => { }
    },
    messages: {
      type: Array,
      default: () => []
    },
    initTimeVal: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      MessageTypeStatus,
      message: '',
      timeInterval: null,
      timeVal: 30,
      isStart: false,
      uploadFilePath: null,
      isShowButton: false
    }
  },
  created() {
    this.timeVal = this.initTimeVal
  },
  mounted() {
    this.start()
    // setTimeout(() => {
    //   this.scrollBottom()
    // }, 500)
  },
  beforeDestroy() {
    clearInterval(this.timeInterval)
  },
  watch: {
    // 偵測 message 異動就滾到最下
    messages() {
      this.scrollBottom()
    }
  },
  methods: {
    scrollBottom() {
      const objDiv = document.querySelector('.ps')
      this.$nextTick(() => {
        if (objDiv && objDiv.scrollHeight) {
          objDiv.scrollTop = objDiv.scrollHeight
        }
      })
    },
    onScroll(event) {
      const objDiv = document.querySelector('.ps')
      var scrollTop = objDiv.scrollHeight - objDiv.scrollTop
      if (scrollTop > 450) {
        this.isShowButton = true
      } else {
        this.isShowButton = false
      }
    },
    handleOpenFile() {
      this.$refs.fileInput.click()
    },
    getFileType(file) {
      if (file.type.match('image.*')) {
        return MessageTypeStatus.Image
      }
      if (file.type.match('video.*')) {
        return MessageTypeStatus.Video
      }
      if (file.type.match('audio.*')) {
        return MessageTypeStatus.Voice
      }
      return MessageTypeStatus.Doc
    },
    handleUploadChange() {
      const input = this.$refs.fileInput
      const files = input.files
      const type = this.getFileType(input.files[0])
      if (files && files[0]) {
        const params = {
          uploadFile: this.$refs.fileInput.files[0],
          messageType: type
        }
        this.$emit('onSubmit', params)
        this.resetTimer()
        this.$refs.fileInput.value = ''
      }
    },
    start() {
      if (this.timeVal === 0) {
        return
      }
      // 每1000ms執行一次
      this.timeInterval = setInterval(this.countDown, 1000)
      this.isStart = true
      this.scrollBottom()
    },
    countDown() {
      // 把時間減一
      this.timeVal = this.timeVal - 1
      if (this.timeVal === 0) {
        setTimeout(() => {
          this.resetTimer()
        }, 500)
      }
    },
    stop() {
      // 清掉Interval
      clearInterval(this.timeInterval)
      this.timeVal = 0
      this.isStart = false
    },
    finish() {
      this.stop()
    },
    resetTimer() {
      if (this.isStart) {
        this.stop()
        setTimeout(() => {
          this.handleReset()
        }, 100)
      }
    },
    handleEnter() {
      this.submit()
    },
    submit() {
      const text = this.message
      if (text.length === 0) return
      const params = {
        text: text,
        messageType: MessageTypeStatus.Content
      }
      this.message = ''
      this.$emit('onSubmit', params).then(() => {
        this.resetTimer()
      })
    },
    handleReset() {
      this.$emit('onReset')
      this.timeVal = this.initTimeVal
      this.isStart = true
      this.start()
    },
    downloadFile(url) {
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'download')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>

<style lang="scss" scoped>
.counter {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
}

.arrowdown-button {
  width: 35px;
  height: 35px;
  position: fixed;
  right: 30px;
  bottom: 110px;
}

.wrap {
  .header {
    border: 1px solid #000;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    .row {
      margin-bottom: 15px;
      display: flex;
      padding: 0 10px;

      &.me {
        justify-content: end;
      }
    }
  }

  .info {
    max-width: 500px;
    width: fit-content;
    background-color: rgba(177, 177, 177, 0.55);
    border-radius: 10px;
    padding: 10px;

    .name {
      font-size: 12px;
    }

    .message {
      font-size: 14px;
    }

    .time {
      font-size: 10px;
      color: rgb(174, 174, 174);
    }
  }

  .footer {
    display: flex;
    border: 1px solid #000;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 10px;

    /deep/ .el-input {
      flex: 1;

      input {
        width: 100%;
      }
    }

    .file-button {
      margin-right: 10px;
      width: 35px;
      height: 36px;
    }
  }
}

/* perfect-scrollbar css */
.ps {
  min-height: 250px;
  max-height: 400px;
  border: 1px solid #000;
  border-top: 0;
  border-bottom: 0;
}

.file-input {
  display: none;
}
</style>
