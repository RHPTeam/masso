<template>
  <div class="sidebar text_left" :class="{ collapseSidebar: collapseMenu }">
    <div class="sidebar--logo d_flex align_items_center justify_content_center">
      <router-link to="/">
        <div class="sidebar--logo-icon">
          <icon-base
            icon-name="logo"
            width="132.92"
            height="49.73"
            viewBox="0 0 250.446 93.703"
          >
            <icon-logo />
          </icon-base>
        </div>
      </router-link>
    </div>
    <div class="d_flex justify_content_center">
      <ul class="sidebar--menu d_inline_block">
        <router-link
          class="menu--item d_flex align_items_center"
          tag="li"
          :to="{ name: 'admin_dashboard' }"
          active-class="active"
          exact
        >
          <a>
            <icon-base
              icon-name="dashboard"
              width="24"
              height="18.857"
              viewBox="0 0 24 18.857"
            >
              <icon-dashboard />
            </icon-base>
            <span class="menu--item-text">Bảng điều khiển</span>
          </a>
        </router-link>
        <router-link
          class="menu--item d_flex align_items_center"
          tag="li"
          :to="{ name: 'admin_users' }"
          active-class="active"
        >
          <a class="account">
            <icon-base
              icon-name="manage-account"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <icon-manage-account />
            </icon-base>
            <span class="menu--item-text">Tài khoản</span>
          </a>
        </router-link>
        <router-link
          class="menu--item d_flex align_items_center"
          tag="li"
          :to="{ name: 'post_libraries' }"
          active-class="active"
        >
          <a class="account">
            <icon-base
              icon-name="autopost"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <icon-libs />
            </icon-base>
            <span class="menu--item-text">Thư viện bài đăng</span>
          </a>
        </router-link>
        <router-link
          class="menu--item d_flex align_items_center"
          tag="li"
          :to="{ name: 'admin_server' }"
          active-class="active"
        >
          <a class="account">
            <icon-base
              icon-name="autopost"
              width="24"
              height="24"
              viewBox="0 0 65 65"
            >
              <icon-location />
            </icon-base>
            <span class="menu--item-text">Quản lý server</span>
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>

import IconDashboard from "@/components/icons/IconDashboard";
import IconManageAccount from "@/components/icons/IconManageAccount";
export default {
  components: {
    IconDashboard,
    IconManageAccount
  },
  computed: {
    collapseMenu() {
      return this.$store.getters.collapseMenu;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
