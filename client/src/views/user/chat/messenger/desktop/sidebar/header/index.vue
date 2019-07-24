<template>
  <div class="header d_flex align_items_center justify_content_between" :data-theme="currentTheme">
    <div class="left d_flex align_items_center">
      <div class="avatar mr_2" :style="{backgroundImage: 'url('+srcDefault+')'}"></div>
      <div class="title">Trò chuyện</div>
    </div>
    <div class="right d_flex align_items_center">
      <div class="position_relative">
        <div class="icon d_flex align_items_center justify_content_center mr_2"
             @click="showDropdownSetting"
             v-click-outside="closeDropdownSetting"
        >
          <icon-base
            class="icon--setting"
            :class="[ isShowDropdownSetting ? 'active' : null ]"
            icon-name="menu"
            width="22"
            height="22"
            viewBox="0 0 265 265"
          >
            <icon-setting />
          </icon-base>
        </div>
        <!-- Start: Dropdown Setting -->
        <div class="dropdown--setting position_absolute" v-show="isShowDropdownSetting">
          <div class="dropdown--setting-item"
               v-for="(option, index) in settingOptions"
               :key="index"
               @click="chooseSettingOption(option)"
          >{{ option }}</div>
        </div>
        <!-- End: Dropdown Setting -->
      </div>
      <div class="icon d_flex align_items_center justify_content_center" @click="createNewMessages">
        <icon-base
          class="icon--create"
          icon-name="menu"
          width="20"
          height="20"
          viewBox="0 0 23 23"
        >
          <icon-edit />
        </icon-base>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTheme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    return {
      srcDefault: "https://images-na.ssl-images-amazon.com/images/I/81fd-3Fdc5L.jpg",
      isShowDropdownSetting: false,
      settingOptions: [ "Cài đặt", "Trợ giúp", "Báo cáo sự cố", "Đăng xuất" ]
    }
  },
  methods: {
    createNewMessages(){
      this.$store.dispatch("setVariableControl", {
        key: "new",
        value: true
      });
    },
    closeDropdownSetting() {
      this.isShowDropdownSetting = false;
    },
    chooseSettingOption( option ) {
      this.isShowDropdownSetting = false
    },
    showDropdownSetting() {
      this.isShowDropdownSetting = true;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
