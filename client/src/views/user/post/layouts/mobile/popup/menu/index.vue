<template>
  <div class="popup--wrap">
    <div class="popup--header text_center position_relative p_3">
      <div class="mt_4 mb_3">
        <div
          v-if="user.imageAvatar"
          class="avatar avatar--img"
          :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
        ></div>
        <div v-else class="avatar avatar--default d_flex align_items_center justify_content_center">
          <span>{{ user.name | getFirstLetter }}</span>
        </div>
      </div>
      <h3>{{ user.name }}</h3>
      <div class="popup--close position_absolute" @click="closePopup">Đóng</div>
    </div>
    <div class="popup--main text_left mt_4">
      <h4>Chức năng</h4>
      <VuePerfectScrollbar class="scroll-function">
        <ul class="p_0 m_0">
          <router-link
            class="align_items_center"
            tag="li"
            active-class="active"
            exact
            v-for="(menu, index) in menus"
            :key="index"
            @click.native="closePopup"
            :to="{ name: menu.to }"
          >
            <a href="#" class="d_flex">
              <icon-base
                :icon-name="menu.icon.iconName"
                :width="menu.icon.width"
                :height="menu.icon.height"
                :viewBox="menu.icon.viewBox"
              >
                <component :is="menu.icon.tagName"/>
              </icon-base>
              <span class="ml_2">{{ menu.text }}</span>
              <span class="ml_auto">
                <icon-base
                  class="icon--go-to"
                  icon-name="Submit"
                  width="22"
                  height="22"
                  viewBox="0 0 33 33"
                >
                  <icon-arrow-right />
                </icon-base>
              </span>
            </a>
          </router-link>
          <li class="align_items_center">
            <a :href="helpCenterUrl" target="_blank" class="d_flex">
              <icon-base
                icon-name="Trung tâm trợ giúp"
                width="24"
                height="24"
                viewBox="0 0 550 550"
              >
                <icon-support/>
              </icon-base>
              <span class="ml_2">Trung tâm trợ giúp</span>
              <span class="ml_auto">
                <icon-base
                  class="icon--go-to"
                  icon-name="Submit"
                  width="22"
                  height="22"
                  viewBox="0 0 33 33"
                >
                  <icon-arrow-right />
                </icon-base>
              </span>
            </a>
          </li>
        </ul>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>
<script src="./index.script.js"></script>
<style lang="scss" scoped>
@import "./index.style";
</style>
