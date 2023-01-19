<template>
  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <el-form :model="profile" label-position="left" label-width="100px" v-permission="[Permission.ProfileMerchantGet]">
        <el-form-item :label="$t('merchantList.merchant')">
          {{profile.merchantName}}
        </el-form-item>
        <el-form-item :label="$t('merchantList.merchantId')">
          {{profile.merchantId}}
        </el-form-item>
        <el-form-item :label="$t('merchantList.requestKey')">
          <span style="width: 50px; word-wrap: break-word">{{profile.requestKey}}</span>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import { getMerchantProfile } from '@/api/profile'
  import { Permission } from '@/definitions/constants'

  export default {
    name: 'merchantProfile',
    data() {
      return {
        Permission,
        profile: {}
      }
    },
    created() {
      this.getProfile()
    },
    methods: {
      getProfile() {
        getMerchantProfile().then(response => {
          this.profile = response
        })
      }
    }
  }
</script>
