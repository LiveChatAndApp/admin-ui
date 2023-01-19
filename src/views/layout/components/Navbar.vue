<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <vue-marquee v-if="shouldShowMarquee()" :marquee-list="$store.getters.bulletin" style="margin-right: 5px" />
      <span>{{ $store.getters.user.roleName }} |</span>
      <span>{{ $store.getters.user.nickname }} ({{ $store.getters.user.username }}) |</span>
      <lang-select class="set-language" />
      <span>|</span>
      <span style="cursor: pointer;" @click="logout">{{ $t('navbar.logout') }}</span>
    </div>

  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import LangSelect from '@/components/LangSelect'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { logout } from '@/api/login'
import { removeToken } from '@/utils/auth'
// 2020/7/20註解
// import { getBulletinIndexing } from '@/api/indexing'
import Marquee from './Marquee'
import { isMobile } from '@/utils'

export default {
  components: {
    LangSelect,
    Breadcrumb,
    Hamburger,
    'vue-marquee': Marquee
  },
  data() {
    return {
      showDialog: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  mounted() {
    // 2020/7/20註解
    // if (this.shouldShowMarquee()) {
    //   this.queryBulletinList()
    // }
  },
  methods: {
    shouldShowMarquee() {
      return !isMobile()
    },
    // 2020/7/20註解
    // queryBulletinList() {
    //   getBulletinIndexing().then(response => {
    //     if (response && response.length > 0) {
    //       const list = response.map(res => res.content)
    //       this.$store.dispatch('setBulletinList', list)
    //     }
    //   })
    // },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      logout().then(() => {
        removeToken()
        location.reload()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    position: fixed;
    display: block;
    right: 0;
    font-size: 14px;
    margin-right: 10px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
  }
}
</style>
