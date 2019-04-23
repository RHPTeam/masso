<template>
  <div v-if="!user"></div>
  <div
    v-else
    class="header d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <div class="header--left d_flex justify_content_start align_items_center">
      <div class="header--icon" @click="toogleSidebar">
        <icon-base
          icon-name="menu"
          width="20"
          height="20"
          viewBox="0 0 500 500"
        >
          <icon-menu />
        </icon-base>
      </div>
      <router-link
        class="header--button ml_4"
        tag="button"
        :to="{ name: 'post/create' }"
        >Viết bài mới</router-link
      >
    </div>
    <div class="header--right">
      <div
        class="profile position_relative d_flex justify_content_end align_items_center"
        @click="showDropdown"
      >
        <div class="profile--image">
          <div
            v-if="user.avatar"
            class="avatar--wrap avatar--img position_relative d_block"
            :style="{ backgroundImage: 'url(' + user.avatar + ')' }"
          ></div>
          <div
            v-else
            class="avatar--wrap avatar--default position_relative d_block"
          >
            <span class="position_absolute">{{
              user.name | getFirstLetter
            }}</span>
          </div>
        </div>
        <span class="profile--name ml_2 mr_2">{{ user.name }}</span>
        <div class="profile--icon">
          <icon-base
            icon-name="arrow-down"
            width="10"
            height="10"
            viewBox="0 0 130 130"
          >
            <icon-arrow-down />
          </icon-base>
        </div>
        <div
          class="dropdown--menu dropdown--menu-right user--dd flipInY animated"
          :class="{ show: showdropdown }"
        >
          <span class="with--arrow">
            <span class="bg-orange"></span>
          </span>
          <div
            class="d_flex align_items_center py_2 px_3 bg-orange border--custom text_white mb_2"
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
                <span class="position_absolute">
                  {{ user.name | getFirstLetter }}
                </span>
              </div>
            </div>
            <div class="ml_2">
              <h4 class="mb_0">{{ user.name }}</h4>
              <p class="mb_0">{{ user.email }}</p>
            </div>
          </div>
          <router-link class="dropdown--item" :to="{ name: 'account' }">
            <icon-base
              icon-name="account"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <icon-account /> </icon-base
            >Thiết lập tài khoản
          </router-link>
          <div class="dropdown--divider"></div>
          <a class="dropdown--item" href="javascript:void(0)" @click="logOut">
            <icon-base
              icon-name="logout"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-logout /> </icon-base
            >Đăng xuất
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.script"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
