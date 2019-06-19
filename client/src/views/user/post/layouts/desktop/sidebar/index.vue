<template>
  <div
    class="sidebar text_left"
    :data-theme="currentTheme"
    :class="{ collapseMenu: collapseMenu }"
  >
    <div class="sidebar--logo d_inline_block text_center">
      <router-link to="/">
        <div class="sidebar--logo-icon">
          <icon-base
            icon-name="ZinBee"
            width="60"
            height="50"
            viewBox="0 0 100 100"
          >
            <icon-logo-short />
          </icon-base>
        </div>
        <div class="sidebar--logo-text">
          <icon-base
            icon-name="ZinBee"
            width="132.92"
            height="49.73"
            viewBox="0 0 250.446 93.703"
          >
            <icon-logo />
          </icon-base>
        </div>
      </router-link>
    </div>
    <ul class="sidebar--menu">
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        active-class="active"
        exact
        v-for="(menu, index) in menus"
        :key="index"
        :to="{ name: menu.to }"
      >
        <a href="#">
          <icon-base
            :icon-name="menu.icon.iconName"
            :width="menu.icon.width"
            :height="menu.icon.height"
            :viewBox="menu.icon.viewBox"
          >
            <component :is="menu.icon.tagName" />
          </icon-base>
          <span class="ml_2">{{ menu.text }}</span>
        </a>
      </router-link>
      <li class="menu--item d_flex align_items_center">
        <a :href="helpCenterUrl" target="_blank">
          <icon-base
            icon-name="Trung tâm trợ giúp"
            width="24"
            height="24"
            viewBox="0 0 550 550"
          >
            <icon-support />
          </icon-base>
          <span class="ml_2">Trung tâm trợ giúp</span>
        </a>
      </li>
    </ul>
    <div class="position_fixed flag--sidebar">
      <!-- Start: Language flag -->
      <div class="flags position_relative ml_3">
        <div @click="showFlagDropdown">
          <icon-base
            class="icon--flag"
            icon-name="flag--vietnam"
            width="24"
            height="20"
            viewBox="0 0 460 460">
            <icon-vietnam-flag/>
          </icon-base>
          <span class="px_1 name--language">Tiếng Việt</span>
        </div>
        <transition name="dropdown">
          <div
            v-if="isShowFlagDropdown === true"
            class="position_absolute dropdown--lang"
            v-click-outside="closeFlagDropdown"
          >
            <div @click="closeFlagDropdown" class="item pb_1">
              <icon-base
                class="icon--flag mr_2"
                icon-name="flag--vietnam"
                width="24"
                height="20"
                viewBox="0 0 460 460"
              >
                <icon-vietnam-flag/>
              </icon-base>
              <span class="name--language">Tiếng Việt</span>
            </div>
            <div @click="closeFlagDropdown" class="item pb_1">
              <icon-base
                class="icon--flag mr_2"
                icon-name="flag--english"
                width="24"
                height="20"
                viewBox="0 0 460 460"
              >
                <icon-america-flag/>
              </icon-base>
              <span class="name--language">English</span>
            </div>
            <div @click="closeFlagDropdown" class="item pb_1">
              <icon-base
                class="icon--flag mr_2"
                icon-name="flag--chinese"
                width="24"
                height="20"
                viewBox="0 0 460 460"
              >
                <icon-china-flag/>
              </icon-base>
              <span class="name--language">中文</span>
            </div>
          </div>
        </transition>
      </div>
      <!-- End: Language flag -->
    </div>
  </div>
</template>

<script src="./index.script"></script>

<style scoped lang="scss">
@import "index.style";
</style>
