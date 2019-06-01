<template>
  <div v-if="!user"></div>
  <div
    v-else
    class="header d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <!-- Start: Header Left -->
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
    </div>
    <!-- End: Header Left -->
    <!-- Start: Header Right -->
    <div class="header--right d_flex align_items_center">
      <!-- Start: Messenger Link-->
      <div class="messenger--group position_relative">
        <!-- Start: Btn Messenger -->
        <div class="btn--messenger position_relative mr_3 d_flex"
             @click="showMessengerDropdown"
             v-click-outside="closeMessengerDropdown"
        >
          <div class="pr_1">Mở bằng messenger</div>
          <div>
            <icon-base
              class="icon--messenger"
              width="25px"
              height="20px"
              viewBox="0 0 12 12"
            >
              <icon-messenger></icon-messenger>
            </icon-base>
            <div class="messenger--total position_absolute">
              <div class="text text_center">0</div>
            </div>
          </div>
        </div>
        <!-- End: Btn Messenger -->
        <!-- Start: Messenger Dropdown -->
        <div class="messenger--dropdown position_absolute">
          <transition name="dropdown">
            <header-messenger
              v-if="isShowMessengerDropdown"
              :messages="notifications"
              @closeDropdown="isShowMessengerDropdown = $event"
            ></header-messenger>
          </transition>
        </div>
        <!-- End: Messenger Dropdown -->
      </div>
      <!-- Start: Messenger Link-->
      <!-- Start: Notification Groups -->
      <div class="notification--groups position_relative">
        <div class="btn--notification position_relative mr_3"
             @click="showNotificationDropdown"
             v-click-outside="closeNotificationDropdown"
        >
          <icon-base
            :class="[ isShowNotificationDropdown ? 'active' : null ]"
            icon-name="bell"
            width="20px"
            height="20px"
            viewBox="0 0 512 512"
          >
            <icon-bell></icon-bell>
          </icon-base>
          <div class="notification--total position_absolute">
            <div class="text text_center">{{ notifications.length }}</div>
          </div>
        </div>
        <!-- Start: Notification Dropdown -->
        <div class="notification--dropdown position_absolute">
          <transition name="dropdown">
            <header-notification
              v-if="isShowNotificationDropdown"
              :notifications="notifications"
              @closeDropdown="isShowNotificationDropdown = $event"
            ></header-notification>
          </transition>
        </div>
        <!-- End: Notification Dropdown -->
      </div>
      <!-- End: Notification Groups -->
      <!-- Start: More Options -->
      <div class="more--options position_relative pr_2">
        <div @click="showOptionsMoreDropdown" class="more">
          <icon-base
            icon-name="bell"
            width="20px"
            height="20px"
            viewBox="0 0 512 512"
          >
            <icon-bell></icon-bell>
          </icon-base>
        </div>
        <div class="position_absolute options p_3 pt_3" v-if="isShowOptionsMoreDropdown === true" v-click-outside="closeOptionsMoreDropdown">
          <div class="d_flex text_center">
            <div class="zin--post item" @click="closeOptionsMoreDropdown">
              <icon-base
                icon-name="bell"
                width="20px"
                height="20px"
                viewBox="0 0 512 512"
              >
                <icon-bell></icon-bell>
              </icon-base>
              <div>Zin Post</div>
            </div>
            <div class="zin--post item" @click="closeOptionsMoreDropdown">
              <icon-base
                icon-name="bell"
                width="20px"
                height="20px"
                viewBox="0 0 512 512"
              >
                <icon-bell></icon-bell>
              </icon-base>
              <div>Zin Chat</div>
            </div>
          </div>
          <div class="d_flex text_center">
            <div class="zin--post item" @click="closeOptionsMoreDropdown">
              <icon-base
                icon-name="bell"
                width="20px"
                height="20px"
                viewBox="0 0 512 512"
              >
                <icon-bell></icon-bell>
              </icon-base>
              <div>Instagram</div>
            </div>
            <div class="zin--post item" @click="closeOptionsMoreDropdown">
              <icon-base
                icon-name="bell"
                width="20px"
                height="20px"
                viewBox="0 0 512 512"
              >
                <icon-bell></icon-bell>
              </icon-base>
              <div>Zalo</div>
            </div>
          </div>
        </div>
      </div>
      <!-- End: More Options -->
      <!-- Start: User Info -->
      <div
        class="profile position_relative d_flex justify_content_end align_items_center"
        @click="showProfileDropdown"
        v-click-outside="closeProfileDropdown"
      >
        <div class="profile--image">
          <div
            v-if="user.imageAvatar"
            class="avatar--wrap avatar--img position_relative d_block"
            :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
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
        <!-- Start: Dropdown Menu -->
        <div
          class="dropdown--menu dropdown--menu-right user--dd flipInY animated"
          :class="{ show: isShowProfileDropdown }"
        >
          <span class="with--arrow">
            <span class="bg-orange"></span>
          </span>
          <div
            class="d_flex align_items_center py_2 px_3 bg-orange border--custom text_white mb_2"
          >
            <div
              v-if="user.imageAvatar"
              class="avatar--wrap avatar--img position_relative d_block"
              :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
            ></div>
            <div
              v-else
              class="avatar--wrap avatar--default position_relative d_block"
            >
            <span class="position_absolute">{{
              user.name | getFirstLetter
            }}</span>
            </div>
            <div class="ml_2">
              <h4 class="mb_0">{{ user.name }}</h4>
              <p class="mb_0">{{ user.email }}</p>
            </div>
          </div>
          <router-link class="dropdown--item" :to="{ name: 'post_account' }">
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
        <!-- End: Dropdown Menu -->
      </div>
      <!-- End: User Info -->
      
    </div>
    <!-- End: Header Right -->
  </div>
</template>

<script src="./index.script"></script>

<style scoped lang="scss">
@import "index.style";
</style>
