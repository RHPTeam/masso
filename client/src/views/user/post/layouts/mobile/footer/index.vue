<template>
  <div class="footer--mobile px_3 position_relative" :data-theme="currentTheme">
    <div class="m_auto">
      <ul class="p_0 m_0 d_flex justify_content_center align_items_center">
          <li
            @click="showPosts"
            :class="this.$route.name === 'post_posts' || this.$route.name === 'post_postCategories' || this.$route.name === 'categories_default' ? 'active' : '' "
          >
            <icon-base icon-name="icon-chat" width="20" height="20" viewBox="0 0 540 540">
              <icon-post/>
            </icon-base>
          </li>
          <li
            @click="showCampaigns"
            :class="this.$route.name === 'post_campaigns' ? 'active' : '' "
          >
            <icon-base icon-name="icon-timer" width="24" height="24" viewBox="0 0 25 25">
              <icon-broadcast/>
            </icon-base>
          </li>
          <li
            @click="showPostGroup"
            :class="this.$route.name === 'post_group' ? 'active' : '' "
          >
            <icon-base icon-name="icon-autoreply" width="24" height="24" viewBox="0 0 25 25">
              <icon-friend/>
            </icon-base>
          </li>
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
    },
    gestureCursorMenuUser() {
      return this.$store.getters.gestureCursorMenuUser;
    }
  },
  methods: {
    /**
     * get variable control header mobile, then show component attacked value, if value === 1 render components posts mobile
     * Then render component attach variable control search on header mobile with value 11 and request get list post
     */
    showPosts() {
      this.$store.dispatch("actionCursorMenu", 1);
      this.$store.dispatch("actionCursor", 11);
      this.$router.push({
        name: 'post_posts',
        query: { size: 25, page: 1 }
      });
    },
    /**
     * get variable control header mobile, then show component attacked value, if value === 2 render components campaign schedule mobile
     * Then render component and request get list campaign
     */
    showCampaigns() {
      this.$store.dispatch("actionCursorMenu", 2);
      this.$router.push({
        name: 'post_campaigns',
        query: { size: 25, page: 1 }
      });
    },
    /**
     * get variable control header mobile, then show component attacked value, if value === 3 render components group contain groups, profile facebook, groupfacebook and fanpage facebook
     * Then render component and request get list group
     */
    showPostGroup() {
      this.$store.dispatch("actionCursorMenu", 3);
      this.$router.push({ name: 'post_group' });
    }
  },
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
      &.active {
        svg {
          color: #ffb94a;
        }
      }
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
