<template>
  <div
    class="sidebar text_left"
    :data-theme="currentTheme"
    :class="{ collapseMenu: collapseMenu }"
  >
    <!-- Start: Logo -->
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
    <!-- End: Logo -->
    <!-- Start: Menu -->
    <ul class="sidebar--menu">
      <!-- FB Account -->
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        :to="{ name: 'chat_facebook' }"
        active-class="active"
        exact
      >
        <a>
          <icon-base
            icon-name="account"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-account />
          </icon-base>
          <span class="menu--item-text">{{ $t('chat.facebook.title') }}</span>
        </a>
      </router-link>

      <!-- Friends -->
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        :to="{ name: 'chat_friends' }"
        active-class="active"
      >
        <a class="friend">
          <icon-base
            icon-name="friend"
            width="22"
            height="22"
            viewBox="0 0 24 24"
          >
            <icon-friend />
          </icon-base>
          <span class="menu--item-text">{{ $t('chat.friends.title') }}</span>
        </a>
      </router-link>

      <!-- Script -->
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        :to="{ name: 'chat_scripts' }"
        active-class="active"
      >
        <a>
          <icon-base
            icon-name="script"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-script />
          </icon-base>
          <span class="menu--item-text">{{ $t('chat.scripts.title') }}</span>
        </a>
      </router-link>

      <!-- Broadcast -->
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        :to="{ name: 'chat_broadcasts' }"
        active-class="active"
      >
        <a>
          <icon-base
            icon-name="broadcast"
            width="21"
            height="21"
            viewBox="0 0 24 24"
          >
            <icon-broadcast />
          </icon-base>
          <span class="menu--item-text">{{ $t('chat.broadcast.title') }}</span>
        </a>
      </router-link>

      <!-- Keywords -->
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        :to="{ name: 'chat_keywords' }"
        active-class="active"
      >
        <a>
          <icon-base
            icon-name="auto-answer"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-auto-answer />
          </icon-base>
          <span class="menu--item-text">{{ $t('chat.keywords.title') }}</span>
        </a>
      </router-link>

    </ul>
    <!-- End: Menu -->
    <!-- Start: Language -->
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
    <!-- End: Language -->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "index.style";
.setup{
  font-size: 0.8125rem;
}
</style>
