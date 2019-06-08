<template>
  <div class="wellcome">
    <div
      class="wellcome--wrap"
      :style="{ backgroundImage: 'url(' + imagePage + ')' }"
    >
      <!-- Start: Header -->
      <div class="header d_flex justify_content_end">
        <div
          class="header--profile position_relative d_flex justify_content_end align_items_center"
          @click="showDropdown"
        >
          <div class="header--profile-img">
            <div
              v-if="avatar"
              class="avatar--wrap avatar--img position_relative d_block"
              :style="{ backgroundImage: 'url(' + user.avatar + ')' }"
            ></div>
            <div
              v-else
              class="avatar--wrap avatar--default position_relative d_block"
            >
              <span class="position_absolute">{{user.name | getFirstLetter}}</span>
            </div>
          </div>
          <div class="header--profile-name ml_2 mr_2">{{user.name}}</div>
          <icon-base
            icon-name="arrow-down"
            width="10"
            height="10"
            viewBox="0 0 130 130"
          >
            <icon-arrow-down />
          </icon-base>
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
              <div
                v-if="user.avatar"
                class="avatar--wrap avatar--img position_relative d_block"
                :style="{ backgroundImage: 'url(' + user.avatar + ')' }"
              ></div>
              <div
                v-else
                class="avatar--wrap avatar--default position_relative d_block"
              >
                <span class="position_absolute">{{user.name | getFirstLetter}}</span>
              </div>
              <div class="ml_2">
                <h4 class="mb_0">{{user.name}}</h4>
                <p class="mb_0">{{user.email}}</p>
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
      <!-- End: Header -->
      <!-- Start: Content -->
      <div
        class="wellcome--content d_flex justify_content_center align_items_center flex_column text_center"
      >
        <div class="content--title mb_4">Xin chào {{user.name}} !</div>
        <div class="content--desc mb_5">
          Chào mừng bạn đến với hệ thống Marketting Online của Zinbee.
        </div>
        <div class="d_flex justify_content_center align_items_center">
          <div class="tool" style="opacity: .4; cursor: not-allowed">
            <div
              class="tool--icon"
              :style="{ backgroundImage: 'url(' + imageChat + ')' }"
            ></div>
            <div class="tool--name">Zinbee Chat</div>
          </div>
          <div class="tool">
            <div
              class="tool--icon"
              :style="{ backgroundImage: 'url(' + imagePost + ')' }"
              @click="gotoHomePost"
            ></div>
            <div class="tool--name">Zinbee Post</div>
          </div>
        </div>
      </div>
      <!-- End: Content -->
    </div>
  </div>
</template>
<script src="./index.script"></script>

<style scoped lang="scss">
@import "index.style";
</style>
