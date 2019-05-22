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
  </div>
</template>

<script src="./index.script"></script>

<style scoped lang="scss">
@import "index.style";
</style>
