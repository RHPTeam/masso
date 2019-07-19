<template>
  <div class="popup--wrap">
    <div class="popup--header text_center position_relative">
      <div class="avatar--wrapper">
        <div v-if="user.imageAvatar">
          <div
            class="user--info d_flex flex_column justify_content_center align_items_center py_4 position_relative"
          >
            <div class="info position_relative text_center align_items_center">
              <div class="avt--user position_relative">
                <div
                  class="user--info-avatar had--avt"
                  :style="{
                  backgroundImage: 'url(' + user.imageAvatar + ')'
                }"
                ></div>
                <input type="file" ref="file" @change="selectFile" class="file" />
              </div>
              <div class="user--info-title mt-2">{{ user.name }}</div>
              <div class="user--info-sub mb_3">{{ user.email }}</div>
            </div>
            <div
              class="bg--avt"
              :style="{
                backgroundImage: 'url(' + user.imageAvatar + ')'
              }"
            ></div>
          </div>
          <!--End: User Info Component-->
          <div
            class="popup--wrap-head position_absolute"
            :style="{
              backgroundImage: 'url(' + user.imageAvatar + ')'
            }"
          ></div>
        </div>
        <div v-else>
          <div class="user--info d_flex flex_column justify_content_center align_items_center mt_3">
            <div class="avt--user position_relative">
              <div
                class="user--info-avatar text_center d_flex align_items_center justify_content_center"
              >{{ user.name | getFirstLetter }}</div>
              <input type="file" ref="file" @change="selectFile" class="file" />
            </div>
            <div class="user--info-title mt-2">{{ user.name }}</div>
            <div class="user--info-sub mb_3">{{ user.email }}</div>
          </div>
          <!--End: User Info Component-->
        </div>
      </div>
      <div class="popup--close position_absolute" @click="closePopup">x</div>
    </div>
    <div class="popup--main text_left mt_3">
      <h4>Chức năng</h4>
      <VuePerfectScrollbar class="scroll-function">
        <ul class="p_0 m_0">
          <li @click="showDashboard" class="d_flex align_items_center">
            <icon-base icon-name="Bảng điều khiển" width="20" height="20" viewBox="0 0 24 24">
              <icon-home />
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
          <li @click="showAccountFb" class="d_flex align_items_center">
            <icon-base icon-name="Tài khoản Facebook" width="20" height="20" viewBox="0 0 24 24">
              <icon-account />
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
            <icon-base icon-name="Facebook tìm kiếm" width="20" height="20" viewBox="0 0 24 24">
              <icon-input-search />
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
          <li @click="showPosts" class="d_flex align_items_center">
            <icon-base icon-name="Kho nội dung" width="20" height="20" viewBox="0 0 540 540">
              <icon-post />
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
          <li @click="showPostgroup" class="d_flex align_items_center">
            <icon-base icon-name="Nhóm Trang" width="20" height="20" viewBox="0 0 24 24">
              <icon-friend />
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
          <li @click="showCampaign" class="d_flex align_items_center">
            <icon-base icon-name="Chiến dịch" width="20" height="20" viewBox="0 0 24 24">
              <icon-broadcast />
            </icon-base>
            <span class="ml_2">Đăng bài tự động</span>
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
              class="icon--setting"
              icon-name="menu"
              width="22"
              height="22"
              viewBox="0 0 265 265"
            >
              <icon-setting />
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
          <!-- <li class="align_items_center">
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
          </li>-->
        </ul>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>
<script src="./index.script.js"></script>
<style lang="scss" scoped>
@import "./index.style";
</style>
