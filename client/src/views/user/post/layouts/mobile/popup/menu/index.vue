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
    <div class="popup--main text_left">
      <h4>Chức năng</h4>
      <VuePerfectScrollbar class="scroll-function">
        <ul class="p_0 m_0">
          <li @click="showDashboard" class="d_flex align_items_center">
            <icon-base
              icon-name="Bảng điều khiển"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <icon-home/>
            </icon-base>
            <span class="ml_2">Bảng điều khiển</span>
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
          </li>
          <li @click="showPosts" class="d_flex align_items_center">
            <icon-base
                icon-name="Kho nội dung"
                width="20"
                height="20"
                viewBox="0 0 540 540"
              >
                <icon-post/>
              </icon-base>
              <span class="ml_2">Kho nội dung</span>
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
          </li>
          <li @click="showCampaign" class="d_flex align_items_center">
            <icon-base
                icon-name="Chiến dịch"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <icon-broadcast/>
              </icon-base>
              <span class="ml_2">Chiến dịch</span>
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
          </li>
          <li @click="showPostgroup" class="d_flex align_items_center">
            <icon-base
                icon-name="Nhóm Trang"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <icon-friend/>
              </icon-base>
              <span class="ml_2">Nhóm & Trang</span>
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
          </li>
          <li @click="showAccountFb" class="d_flex align_items_center">
            <icon-base
                icon-name="Tài khoản Facebook"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <icon-account/>
              </icon-base>
              <span class="ml_2">Tài khoản Facebook</span>
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
          </li>
          <li @click="showSearchFb" class="d_flex align_items_center">
            <icon-base
                icon-name="Facebook tìm kiếm"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <icon-input-search/>
              </icon-base>
              <span class="ml_2">Facebook tìm kiếm</span>
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
          </li>
          <li @click="showSetupAccount" class="d_flex align_items_center">
            <icon-base
                icon-name="Thiết lập tài khoản"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <icon-friend/>
              </icon-base>
              <span class="ml_2">Thiết lập tài khoản</span>
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
          </li>
          <li class="align_items_center">
            <a :href="helpCenterUrl" target="_blank" class="d_flex help--center">
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
