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
        <icon-base icon-name="menu" width="20" height="20" viewBox="0 0 500 500">
          <icon-menu/>
        </icon-base>
      </div>
    </div>
    <!-- End: Header Left -->
    <!-- Start: Header Right -->
    <div class="header--right d_flex align_items_center">
      <!-- Start: Messenger Link-->
      <div class="messenger--group position_relative">
        <!-- Start: Btn Messenger -->
        <a class="mess" :href="marketUrl" target="_blank">
          <div class="btn--messenger position_relative mr_3 d_flex align_items_center"
          >
            <icon-base
              class="icon--messenger"
              width="20px"
              height="20px"
              icon-name="Cửa hàng nội dung"
              viewBox="0 0 520 520"
            >
              <icon-shop />
            </icon-base>
            <div class="pl_2 open--mess">Cửa hàng</div>
          </div>
        </a>
        <!-- End: Btn Messenger -->
      </div>
      <!-- Start: Messenger Link-->

      <!-- Start: Help Dropdown -->
      <div class="notification--groups help position_relative">
        <div class="icon--help mr_3 d_flex align_items_center" @click="isShowNotificationHelp = !isShowNotificationHelp">
          <icon-base
            class="icon"
            width="20"
            height="20"
            icon-name="Bạn cần trợ giúp?"
            viewBox="0 0 300 300"
          >
            <icon-help />
          </icon-base>
          <div class="title pl_2">Trợ giúp</div>
        </div>
        <div class="notification--dropdown news position_absolute">
          <div class="notification--dropdown position_absolute">
            <transition name="dropdown">
              <help-notification
                v-if="isShowNotificationHelp === true"
                :notifications="notifications"
                @close="isShowNotificationHelp = $event"
              ></help-notification>
            </transition>
          </div>
        </div>
      </div>
      <!-- End: Help Dropdown -->

      <!-- Start: Notification Groups -->
      <div class="notification--groups position_relative d_none">
        <div class="btn--notification position_relative mr_3" @click="showNotificationDropdown">
          <icon-base
            class="icon--bell"
            :class="[ isShowNotificationDropdown ? 'active' : null ]"
            icon-name="Thông báo"
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
        <div @click="showOptionsMoreDropdown" class="more">
          <icon-base
            class="icon icon--application"
            :class="{ active: isShowOptionsMoreDropdown }"
            width="26"
            height="26"
            viewBox="0 0 60 60"
          >
            <icon-application/>
          </icon-base>
        </div>
        <transition name="dropdown">
          <div
            class="position_absolute options"
            v-if="isShowOptionsMoreDropdown === true"
            v-click-outside="closeOptionsMoreDropdown"
          >
            <div class="d_flex text_center r m_0 application">
              <div class="zin--post item c_4" @click="gotoHomePost">
                <icon-base icon-name="bell" width="50px" height="50px" viewBox="0 0 512 512">
                  <icon-zin-post/>
                </icon-base>
                <div class="pt_1">Zin Post</div>
              </div>

              <div class="zin--post item c_4" @click="showGuidePopup">
                <icon-base icon-name="hướng dẫn" width="50px" height="50px" viewBox="0 0 410 410">
                  <icon-play/>
                </icon-base>
                <div class="pt_1">Hướng dẫn</div>
              </div>

              <div class="zin--post item c_4" @click="redirectToGetCookie">
                <icon-base icon-name="lấy cookie" width="50px" height="50px" viewBox="0 0 512 512">
                  <icon-plugin/>
                </icon-base>
                <div class="pt_1">Lấy Cookie</div>
              </div>

              <div class="zin--post zin-chat d_none item c_4" @click="gotoHomeChat">
                <icon-base icon-name="bell" width="50px" height="50px" viewBox="0 0 512 512">
                  <icon-zin-chat/>
                </icon-base>
                <div class="pt_1">Zin Chat</div>
              </div>
              <div class="zin--post d_none instagram item c_4">
                <icon-base icon-name="bell" width="50px" height="50px" viewBox="0 0 550 550">
                  <icon-instagram/>
                </icon-base>
                <div class="pt_1">Instagram</div>
              </div>
              <div class="zin--post d_none zalo item c_4">
                <icon-base icon-name="bell" width="50px" height="50px" viewBox="0 0 512 512">
                  <icon-zalo/>
                </icon-base>
                <div class="pt_1">Zalo</div>
              </div>
            </div>
            <div class="text_center view-more">Xem thêm</div>
          </div>
        </transition>
      </div>
      <!-- End: More Options -->

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
            icon-name="Hiển thị thêm"
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
            class="d_flex align_items_center py_3 px_4 border--custom text_white mb_2"
          >
            <div class="mr_2">
              <h4 class="mb_2">{{ user.name }}</h4>
              <p class="mb_2">{{ user.email }}</p>
              <p class="mb_2">Số điện thoại : {{ user.phone }}</p>
              <div class="more d_flex align_items_center justify_content_between">
                <router-link class="setting" :to="{ name: 'post_account' }">Thiết lập tài khoản</router-link>
                <div class="setting ml_4" @click="logOut">Đăng xuất</div>
              </div>
            </div>
            <div class="ml_auto">
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
          </div>
          <div class="dropdown--divider"></div>
          <div class="info px_4 py_3">
            <h4 class="mb_2">Thông tin khác</h4>
            <p class="exp mb_2">Tài khoản sử dụng đến ngày: {{formatDate(user.expireDate)}}</p>
            <p class="expire" @click="openExpireModal">Gia hạn tài khoản</p>
          </div>
        </div>
        <!-- End: Dropdown Menu -->
      </div>
      <!-- End: User Info -->
    </div>
    <!-- End: Header Right -->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
  @import "index.style";
</style>

