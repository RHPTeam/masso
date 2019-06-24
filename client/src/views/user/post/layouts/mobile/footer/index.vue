<template>
  <div class="footer--mobile px_3 position_relative" :data-theme="currentTheme">
    <div class="m_auto">
      <ul class="p_0 m_0 d_flex justify_content_center align_items_center">
        <router-link tag="li" :to="{ name: 'post_posts' }" active-class="active">
          <icon-base icon-name="icon-chat" width="20" height="20" viewBox="0 0 540 540">
            <icon-post/>
          </icon-base>
        </router-link>
        <router-link tag="li" :to="{ name: 'post_campaigns' }" active-class="active">
          <icon-base icon-name="icon-timer" width="24" height="24" viewBox="0 0 25 25">
            <icon-broadcast/>
          </icon-base>
        </router-link>
        <router-link tag="li" :to="{ name: 'post_group' }" active-class="active">
          <icon-base icon-name="icon-autoreply" width="24" height="24" viewBox="0 0 25 25">
            <icon-friend/>
          </icon-base>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>
<style lang="scss" scoped>
.footer--mobile {
  max-height: 54px;
  ul {
    list-style: none;
    height: 54px;
    li {
      margin-right: 72px;
      padding-top: 2px;
      height: 24px;
      &:last-child {
        margin-right: 0;
      }
    }
    .menu--active {
      color: #ffb94a;
    }
  }
}
//Change Theme
//Light
.footer--mobile[data-theme="light"] {
  // border-top: solid 1px #e4e4e4;
  ul {
    li {
      color: #666;
      &.active,
      &:hover {
        color: #000;
      }
    }
  }
}
//Dark
.footer--mobile[data-theme="dark"] {
  // border-top: solid 1px #444444;
  ul {
    li {
      color: #cccccc;
      &.active,
      &:hover {
        color: #ffb94a;
      }
    }
  }
}
</style>
