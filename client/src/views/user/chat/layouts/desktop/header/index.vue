<template>
  <div v-if="!user"></div>
  <div
    v-else
    class="header d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <div class="header--icon" @click="toogleSidebar">
      <icon-base icon-name="menu" width="20" height="20" viewBox="0 0 500 500">
        <icon-menu/>
      </icon-base>
    </div>
    <div class="right d_flex align_items_center">
      <!-- Start: Messenger Link-->
      <router-link tag="a"
                   class="mess d_flex align_items_center justify_content_center"
                   :to="{name: 'messenger'}"
                   target="_blank">
        <icon-base
          class="icon--messenger mr_1"
          width="24px"
          height="20px"
          viewBox="0 0 16 16"
        >
          <icon-messenger></icon-messenger>
        </icon-base>
        <div class="text">Trò chuyện</div>
      </router-link>
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
      <!-- Start: Language flag -->
      <div class="flags position_relative mr_3">
        <div @click="showFlag = true">
          <icon-base
            class="icon--flag"
            icon-name="flag--vietnam"
            width="24"
            height="20"
            viewBox="0 0 460 460">
            <icon-vietnam-flag/>
          </icon-base>
        </div>
        <transition name="dropdown">
          <div
          v-if="showFlag === true"
          class="position_absolute dropdown--lang"
          v-click-outside="closeShowFlag"
        >
          <div @click="closeShowFlag" class="item pb_1">
            <icon-base
              class="icon--flag mr_2"
              icon-name="flag--vietnam"
              width="24"
              height="20"
              viewBox="0 0 460 460"
            >
              <icon-vietnam-flag/>
            </icon-base>
            <span>Tiếng Việt</span>
          </div>
          <div @click="closeShowFlag" class="item pb_1">
            <icon-base
              class="icon--flag mr_2"
              icon-name="flag--english"
              width="24"
              height="20"
              viewBox="0 0 460 460"
            >
              <icon-america-flag/>
            </icon-base>
            <span>English</span>
          </div>
          <div @click="closeShowFlag" class="item pb_1">
            <icon-base
              class="icon--flag mr_2"
              icon-name="flag--chinese"
              width="24"
              height="20"
              viewBox="0 0 460 460"
            >
              <icon-china-flag/>
            </icon-base>
            <span>中文</span>
          </div>
        </div>
        </transition>
      </div>
      <!-- End: Language flag -->
      <!-- Start: User Info & Action -->
      <div
        class="header--profile position_relative d_flex justify_content_end align_items_center"
        @click="showDropdown"
        v-click-outside="closeDropdownUser"
      >
        <div class="header--profile-img">
          <div
            v-if="user.imageAvatar"
            class="avatar--content avatar--img position_relative d_block"
            :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
          ></div>
          <div v-else class="avatar--content avatar--default position_relative d_block">
            <span class="position_absolute">
              {{
              user.name | getFirstLetter
              }}
            </span>
          </div>
        </div>
        <div class="header--profile-name ml_2 mr_2">{{ user.name }}</div>
        <icon-base icon-name="arrow-down" width="10" height="10" viewBox="0 0 130 130">
          <icon-arrow-down/>
        </icon-base>
        <div
          class="dropdown--menu dropdown--menu-right user--dd flipInY animated"
          :class="{ show: showdropdown }"
        >
          <span class="with--arrow">
            <span class="bg-orange"></span>
          </span>
          <div class="d_flex align_items_center py_2 px_3 bg-orange border--custom text_white mb_2">
            <div class="avatar--wrap">
              <div
                v-if="user.imageAvatar"
                class="avatar--content avatar--img position_relative d_block"
                :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
              ></div>
              <div v-else class="avatar--content avatar--default position_relative d_block">
                <span class="position_absolute">
                  {{
                  user.name | getFirstLetter
                  }}
                </span>
              </div>
            </div>
            <div class="ml_2">
              <h4 class="mb_0">{{ user.name }}</h4>
              <p class="mb_0">{{ user.email }}</p>
            </div>
          </div>
          <router-link class="dropdown--item" :to="{ name: 'account' }">
            <icon-base icon-name="account" width="20" height="20" viewBox="0 0 24 24">
              <icon-account/>
            </icon-base>{{ $t("chat.layout.setupAccount") }}
          </router-link>
          <router-link class="dropdown--item friend" :to="{ name: 'friends' }">
            <icon-base icon-name="friend" width="22" height="22" viewBox="0 0 25 25">
              <icon-friend/>
            </icon-base>{{ $t("chat.layout.friendManager") }}
          </router-link>
          <div class="dropdown--divider"></div>
          <a class="dropdown--item" href="javascript:void(0)">
            <icon-base icon-name="logout" width="20" height="20" viewBox="0 0 20 20">
              <icon-logout/>
            </icon-base>{{ $t("chat.layout.logout") }}
          </a>
        </div>
      </div>
      <!-- End: User Info & Action -->
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "index.style";
</style>
