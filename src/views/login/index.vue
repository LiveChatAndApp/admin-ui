<template>
  <div class="login-container">
    <el-form class="login-form" autocomplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
      label-position="left">
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <lang-select class="set-language"></lang-select>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autocomplete="on"
          :placeholder="$t('login.username')" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" v-model="loginForm.password" autocomplete="on"
          :placeholder="$t('login.password')" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item prop="totpCode">
        <el-col class="line" :span="2">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="key" />
          </span>
        </el-col>
        <el-col class="line" :span="22">
          <el-input name="totpCode" type="text" v-model="loginForm.totpCode" autocomplete="on"
            :placeholder="$t('otp.codePlaceholder')" />
        </el-col>

      </el-form-item>
      <div class="hint">{{ $t('otp.otpCodeHint1') }}</div>
      <div class="hint">{{ $t('otp.otpCodeHint2') }}</div>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading"
        @click.native.prevent="handleLogin">{{ $t('login.login') }}</el-button>
    </el-form>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import { loginByUsername } from '@/api/login'
import { setAclList, setToken } from '@/utils/auth'
import { Rules } from '@/definitions/fieldCheck'

export default {
  components: { LangSelect },
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
        // checkcode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: this.$t('rules.requiredField') }],
        password: [{ required: true, trigger: 'blur', message: this.$t('rules.requiredField') }],
        // checkcode: [{ required: true, trigger: 'blur', message: this.$t('rules.requiredField') }],
        totpCode: [...Rules.totpCode]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      captchaId: '',
      captchaImg: ''
    }
  },
  mounted() {
    this.getCaptchaImg()
  },
  methods: {
    // 產生 captch img url
    getCaptchaImg() {
      //  this.captchaImg = `${process.env.BASE_API}/code/image?t=${this.randomCaptchaId()}`
    },
    randomCaptchaId() {
      // 隨機產生亂數 id
      const str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      let captchaArray = []

      for (let i = 0; i < 5; i++) {
        captchaArray.push(str.charAt(this.getRandomIntBetween(0, str.length)))
      }

      // 只截出0~3個字元
      captchaArray = captchaArray.slice(0, this.getRandomIntBetween(0, 4))

      const id = String(+new Date() / 1) + captchaArray.join('')

      this.captchaId = id

      return id
    },
    getRandomIntBetween(min, max) {
      const ceilMin = Math.ceil(min)
      const floorMax = Math.floor(max)
      return Math.floor(Math.random() * (floorMax - ceilMin)) + ceilMin
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          loginByUsername(this.loginForm)
            .then(data => {
              setToken(data.token)
              data.aclList = data.menus.map(acl => acl.code)
              setAclList(data.aclList)
              this.$store.dispatch('setUserInfo', data)
              this.loading = false
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              this.getCaptchaImg()
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      /* -webkit-appearance: none; */
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;

    &_login {
      font-size: 20px;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  #captcha {
    cursor: pointer;
  }

  .captcha {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
      height: 47px;
      cursor: pointer;
    }
  }
}

.hint {
  display: block;
  color: #909399;
  font-size: 12px;
  margin: 0 0 10px 0;
}
</style>
