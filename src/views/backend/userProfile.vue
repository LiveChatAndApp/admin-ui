<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :model="profile"
        label-position="left"
        label-width="100px"
      >
        <el-form-item :label="$t('userProfile.username')">{{profile.username}}</el-form-item>
        <el-form-item :label="$t('userProfile.password')">
          <bs-button
            :title="$t('userProfile.resetPassword')"
            @click="handleResetPassword"
            v-permission="[Permission.ADMIN_RESETPWD]"
          />
        </el-form-item>
        <el-form-item :label="$t('userProfile.nickname')">
          {{profile.nickname}}
          &nbsp;
          <bs-edit-button
            @click="handleChangeNickname"
            v-permission="[Permission.ADMIN_UPDATE]"
          />
        </el-form-item>
        <el-form-item :label="$t('userProfile.roleName')">{{profile.roleName}}</el-form-item>
        <el-form-item :label="$t('userProfile.lastLoginIp')">{{profile.loginIp}}</el-form-item>
        <el-form-item :label="$t('userProfile.lastLoginTime')">{{profile.loginTime | moment}}</el-form-item>
        <el-form-item :label="$t('otp.otpStatus')">
          <bs-button
            v-if="profile.isVerifyOtpKey === 0"
            :title="$t('otp.bindOtp')"
            @click="handleBindOtp"
          />
          <span v-else>{{$t('otp.isBinded')}}</span>
        </el-form-item>
      </el-form>

      <el-dialog
        :title="$t('userProfile.resetPassword')"
        :visible.sync="passwordDialogVisible"
        v-if="passwordDialogVisible"
        :close-on-click-modal="false"
        :show-close="true"
      >
        <el-form
          :rules="rules"
          ref="dataForm"
          :model="formData"
          label-position="left"
          label-width="100px"
        >
          <el-form-item :label="$t('userProfile.password')" prop="password">
            <bs-input v-model="formData.password" type="password" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="passwordDialogVisible=false" />
          <bs-submit-button @click="resetPassword" />
        </div>
      </el-dialog>

      <el-dialog
        :title="$t('userProfile.changeNickname')"
        :visible.sync="nicknameDialogVisible"
        v-if="nicknameDialogVisible"
        :close-on-click-modal="false"
        :show-close="true"
      >
        <el-form
          :rules="rules"
          ref="dataForm"
          :model="formData"
          label-position="left"
          label-width="100px"
        >
          <el-form-item :label="$t('userProfile.nickname')" prop="nickname">
            <bs-input v-model="formData.nickname" />
          </el-form-item>
          <!-- <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-text-area v-model="formData.memo" />
          </el-form-item>-->
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="nicknameDialogVisible=false" />
          <bs-submit-button @click="changeNickname" />
        </div>
      </el-dialog>

      <!-- 綁定 otp -->
      <el-dialog
        :title="$t('otp.bindOtp')"
        :visible.sync="bindOtpDialogVisible"
        v-if="bindOtpDialogVisible"
        :close-on-click-modal="false"
        :show-close="true"
        :before-close="closBindOtp"
      >
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left">
          <h4 class="scanTip">{{$t('otp.scanTip')}}</h4>
          <el-form-item prop="totpCode">
            <div class="center">
              <img class="qrCodeImg" v-if="qrCodeUrl" :src="qrCodeUrl" alt="otpQrcodeUrl" />
              <span v-else>loading...</span>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="center">
              <el-input
                clearable
                v-model="formData.totpCode"
                :placeholder="$t('otp.bindOtpPlaceholder')"
                style="width: auto"
              />
            </div>
          </el-form-item>
        </el-form>

        <div class="center">
          <bs-submit-button
            @click="updateTotpCode"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Permission } from '@/definitions/constants'
import { getUserProfile, updateUser, resetUserPassword } from '@/api/user'
import { Rules } from '@/definitions/fieldCheck'
import { generateOtpQrcode, verifyTotpCode } from '@/api/otp'
import { deepClone } from '@/utils'
import { hasAcl } from '@/utils/auth'

export default {
  name: 'userProfile',
  data() {
    return {
      Permission,
      passwordDialogVisible: false,
      nicknameDialogVisible: false,
      bindOtpDialogVisible: false,
      rules: {
        password: [...Rules.requiredBlur, ...Rules.password],
        nickname: [...Rules.requiredBlur, ...Rules.name],
        memo: [...Rules.requiredBlur],
        totpCode: [...Rules.totpCode]
      },
      profile: {},
      formData: {},
      qrCodeUrl: '',
      clearOtpTimeout: null
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    updateTotpCode() {
      const { id } = this.profile
      const { totpCode } = this.formData
      verifyTotpCode({ adminUserId: id, totpCode }).then(() => {
        this.getProfile()
        this.bindOtpDialogVisible = false
      })
    },
    closBindOtp(done) {
      if (this.clearOtpTimeout) {
        clearTimeout(this.clearOtpTimeout)
      }
      done()
    },
    handleBindOtp() {
      this.formData = deepClone({})
      // 先清空
      this.qrCodeUrl = ''
      const { id } = this.profile
      this.bindOtpDialogVisible = true
      this.intervalQrcode = true
      this.intervalGenerateOtpQrcode(id)
    },
    intervalGenerateOtpQrcode(id) {
      // 當是開啟綁定 otp 畫面時候
      if (this.bindOtpDialogVisible) {
        generateOtpQrcode(id).then(res => {
          if (res) {
            this.checkImage(res)
          }
        })
      }
    },
    checkImage(url) {
      const img = new Image()
      img.onload = () => {
        this.qrCodeUrl = url
      }
      img.onerror = () => {
        // 圖片載失敗，要在重新執行一次
        this.clearOtpTimeout = setTimeout(() => {
          if (this.bindOtpDialogVisible) {
            this.checkImage(url)
          }
        }, 1000)
      }
      img.src = url
    },
    getProfile() {
      if (!hasAcl(Permission.ADMIN_INFO)) return
      getUserProfile().then(response => {
        this.profile = response
      })
    },
    handleResetPassword() {
      this.formData = { id: this.profile.id }
      this.passwordDialogVisible = true
    },
    handleChangeNickname() {
      const { id, nickname, status } = this.profile
      this.formData = {
        id,
        nickname,
        status
      }
      this.nicknameDialogVisible = true
    },
    resetPassword() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const { id, password } = this.formData
          resetUserPassword({ id, password }).then(response => {
            this.profile = { ...this.profile, ...response }
            this.passwordDialogVisible = false
          })
        }
      })
    },
    changeNickname() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const { id, nickname, status } = this.formData
          updateUser({ id, nickname, status }).then(() => {
            this.getProfile()
            this.nicknameDialogVisible = false
          })
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.scanTip {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 10px 0;
}
.center {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.qrCodeImg {
  width: 80%;
  max-width: 350px;
}
</style>
