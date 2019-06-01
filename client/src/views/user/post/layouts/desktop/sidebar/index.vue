<template>
  <div
    class="sidebar text_left"
    :data-theme="currentTheme"
    :class="{ collapseMenu: collapseMenu }"
  >
    <div class="sidebar--logo d_inline_block text_center">
      <router-link :to="{ name: 'post_dashboard' }">
        <div class="sidebar--logo-icon">
          <icon-base
            icon-name="logo-short"
            width="31.706"
            height="31.659"
            viewBox="0 0 31.706 31.659"
          >
            <icon-logo-short />
          </icon-base>
        </div>
        <div class="sidebar--logo-text">
          <icon-base
            icon-name="logo-text"
            width="98.122"
            height="15.799"
            viewBox="0 0 98.122 15.799"
          >
            <icon-logo-text />
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
          <span class="px_1">Tiếng Việt</span>
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
              <span>Tiếng Việt</span>
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
              <span>English</span>
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
              <span>中文</span>
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
