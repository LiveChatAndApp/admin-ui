<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in" v-if="isSuperAdmin">
      <!-- 管理者keep -->
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in" v-else>
      <!-- 不是管理者 -->
      <!-- 移除 keepalive -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { isSuperAdminLevel } from '@/utils/user'

export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    isSuperAdmin() {
      return isSuperAdminLevel(this.$store)
    }
  }
}
</script>
