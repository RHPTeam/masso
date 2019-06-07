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
        <router-link :to="{ name: 'messenger' }" class="mess">
          <div class="btn--messenger position_relative mr_3 d_flex align_items_center"
          >
            <icon-base
              class="icon--messenger"
              width="24px"
              height="18px"
              viewBox="0 0 12 12"
            >
              <icon-messenger></icon-messenger>
            </icon-base>
            <!-- <div class="messenger--total position_absolute">
              <div class="text text_center">0</div>
            </div> -->
            <div class="pl_2 open--mess">Mở messenger</div>
          </div>
        </router-link>
        <!-- End: Btn Messenger -->
        <!-- Start: Messenger Dropdown -->
        <!-- <div class="messenger--dropdown position_absolute">
          <transition name="dropdown">
            <header-messenger
              v-if="isShowMessengerDropdown"
              :messages="notifications"
              @closeDropdown="isShowMessengerDropdown = $event"
            ></header-messenger>
          </transition>
        </div> -->
        <!-- End: Messenger Dropdown -->
      </div>
      <!-- Start: Messenger Link-->
      <!-- Start: Notification Groups -->
      <div class="notification--groups position_relative">
        <div class="btn--notification position_relative mr_3"
             @click="showNotificationDropdown"
        >
          <icon-base
            :class="[ isShowNotificationDropdown ? 'active' : null ]"
            icon-name="bell"
            width="24px"
            height="24px"
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
              v-click-outside="closeNotificationDropdown"
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
        <div @click="showOptionsMoreDropdown" class="more mt_2">
          <icon-base
            class="icon--application"
            :class="{ active: isShowOptionsMoreDropdown }"
            width="24px"
            height="24px"
            viewBox="0 0 512 512"
          >
            <icon-application />
          </icon-base>
        </div>
        <transition name="dropdown">
          <div class="position_absolute options" v-if="isShowOptionsMoreDropdown === true" v-click-outside="closeOptionsMoreDropdown">
            <div class="d_flex text_center r m_0 application">
              <div class="zin--post item c_4" @click="gotoHomePost">
                <icon-base
                  icon-name="bell"
                  width="50px"
                  height="50px"
                  viewBox="0 0 512 512"
                >
                  <icon-zin-post />
                </icon-base>
                <div class="pt_1">Zin Post</div>
              </div>
              <div class="zin--post zin-chat item c_4" @click="gotoHomeChat">
                <icon-base
                  icon-name="bell"
                  width="50px"
                  height="50px"
                  viewBox="0 0 512 512"
                >
                  <icon-zin-chat />
                </icon-base>
                <div class="pt_1">Zin Chat</div>
              </div>
              <div class="zin--post instagram item c_4">
                <icon-base
                  icon-name="bell"
                  width="50px"
                  height="50px"
                  viewBox="0 0 550 550"
                >
                  <icon-instagram />
                </icon-base>
                <div class="pt_1">Instagram</div>
              </div>
              <div class="zin--post zalo item c_4">
                <icon-base
                  icon-name="bell"
                  width="50px"
                  height="50px"
                  viewBox="0 0 512 512"
                >
                  <icon-zalo />
                </icon-base>
                <div class="pt_1">Zalo</div>
              </div>
            </div>
            <div class="text_center view-more">Xem thêm</div>
          </div>
        </transition>
      </div>
      <!-- End: More Options -->

      <!-- Start: Redirect to help -->
      <!--      <div class="help mr_2 ml_1" @click="redirectToHelp">-->
      <!--        <icon-base-->
      <!--          icon-name="menu"-->
      <!--          width="25"-->
      <!--          height="25"-->
      <!--          viewBox="0 0 25 25"-->
      <!--        >-->
      <!--          <icon-help />-->
      <!--        </icon-base>-->
      <!--      </div>-->
      <!-- End: Redirect to help -->

      <!-- Start: User Info -->
      <div
        class="profile position_relative d_flex justify_content_end align_items_center"
        @click="showProfileDropdown" v-click-outside="closeProfileDropdown"
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

