<template>
  <div class="header d_flex justify_content_between align_items_center">
    <!-- <div class="header--icon" @click="toogleSidebar">
      <icon-base icon-name="menu" width="20" height="20" viewBox="0 0 500 500">
        <icon-menu/>
      </icon-base>
    </div>-->
    <router-link to="/" class="link--page">≪ Đi tới trang thành viên</router-link>
    <div v-if="!user"></div>
    <div
      v-else
      class="header--profile position_relative d_flex justify_content_end align_items_center"
      @click="showDropdown"
    >
      <div class="header--profile-img">
        <div
          v-if="user.imageAvatar"
          class="avatar--content avatar--img position_relative d_block"
          :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
        ></div>
        <div
          v-else
          class="avatar--content avatar--default position_relative d_block"
        >
          <span class="position_absolute">{{
            user.name | getFirstLetter
          }}</span>
        </div>
      </div>
      <div class="header--profile-name ml_2 mr_2">{{ user.name }}</div>
      <icon-base
        icon-name="arrow-down"
        width="10"
        height="10"
        viewBox="0 0 130 130"
      >
        <icon-arrow-down />
      </icon-base>
      <div
        class="dropdown--menu dropdown--menu-right user--dd flipInY animated"
        :class="{ show: showdropdown }"
      >
        <span class="with--arrow">
          <span class="bg--maincolor"></span>
        </span>
        <div
          class="d_flex align_items_center px_3 py_2 bg--maincolor border--custom text_white"
        >
          <div class="avatar--wrap">
            <div
              v-if="user.imageAvatar"
              class="avatar--content avatar--img position_relative d_block"
              :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
            ></div>
            <div
              v-else
              class="avatar--content avatar--default position_relative d_block"
            >
              <span class="position_absolute">{{
                user.name | getFirstLetter
              }}</span>
            </div>
          </div>
          <div class="ml_2">
            <h4 class="mb_0">{{ user.name }}</h4>
            <p class="mb_0">{{ user.email }}</p>
          </div>
        </div>
        <a class="dropdown--item my_1" href="javascript:void(0)" @click="logOut">
          <icon-base
            icon-name="logout"
            width="18"
            height="18"
            viewBox="0 0 20 20"
          >
            <icon-logout /> </icon-base
          >Đăng xuất
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusCollapse: false,
      showdropdown: false
    };
  },
  computed: {
    collapseSidebar() {
      return this.$store.getters.collapseSidebar;
    },
    user() {
      return this.$store.getters.userInfo;
    }
  },
  filters: {
    getFirstLetter( string ) {
      if ( typeof string === "undefined" ) {
        return;
      }
      if ( string.length === 0 ) {
        return;
      }
      return string.charAt( 0 ).toUpperCase();
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch( "logOut" );
      this.$router.push( "/signin" );
    },
    toogleSidebar() {
      this.statusCollapse = !this.statusCollapse;
      this.$store.dispatch( "changeSidebar", this.statusCollapse );
    },
    showDropdown: function() {
      this.showdropdown = !this.showdropdown;
    }
  }
};
</script>
<style scoped lang="scss">
@import "./index.style";
</style>
