<template>
  <div class="modal--main--mobile">
    <!-- Start: Content -->
    <div class="modal--content p_3">
      <!-- Start: Info -->
      <div class="items items--info">
        <div class="title d_flex">
          <icon-base
            icon-name="icon-autoreply"
            class="icon--info mr_2"
            width="25"
            height="25"
            viewBox="0 0 25 15"
          >
            <icon-friend />
          </icon-base>
          <div>
            <b>Thông tin cá nhân</b>
          </div>
        </div>
        <div class="info py_2">
          <div class="item d_flex align_items_center" @click="showChangeName">
            <div class="content d_flex align_items_center">
              <div class="info--title">Tên người dùng</div>
              <div class="ml_auto">
                <!-- Nhớ slice kí tự để chuyển text về ... khi quá dài -->
                <span class="name--user">{{ user.name }}</span>
                <icon-base
                  icon-name="arrow-down"
                  class="arrow-down"
                  width="10"
                  height="10"
                  viewBox="0 0 130 130"
                >
                  <icon-arrow-down />
                </icon-base>
              </div>
            </div>
          </div>
          <div class="item d_flex align_items_center" @click="showChangePhoneNumber">
            <div class="content d_flex align_items_center">
              <div class="info--title">Số điện thoại</div>
              <div class="ml_auto">
                {{user.phone}}
                <icon-base
                  icon-name="arrow-down"
                  class="arrow-down"
                  width="10"
                  height="10"
                  viewBox="0 0 130 130"
                >
                  <icon-arrow-down />
                </icon-base>
              </div>
            </div>
          </div>
          <div class="item d_flex align_items_center" @click="showChangePassword">
            <div class="content d_flex align_items_center">
              <div class="info--title">Thay đổi mật khẩu</div>
              <div class="ml_auto">
                <icon-base
                  icon-name="arrow-down"
                  class="arrow-down"
                  width="10"
                  height="10"
                  viewBox="0 0 130 130"
                >
                  <icon-arrow-down />
                </icon-base>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Start: Keywords -->
      <div class="items items--keyword py_2">
        <div class="title d_flex">
          <icon-base
            class="icon--setting mr_2"
            icon-name="menu"
            width="22"
            height="22"
            viewBox="0 0 265 265"
          >
            <icon-setting />
          </icon-base>
          <div>
            <b>Từ khóa</b>
          </div>
        </div>
        <div class="content py_2 my_2" @click="showKeywords" v-if="user.keywords">
          <div v-if="user.keywords.length === 0" class="item d_flex align_items_center">
            <div class="item--keyword">Không có từ khóa</div>
            <div class="ml_auto">
              <icon-base icon-name="Them" width="20" height="20" viewBox="0 0 64 64">
                <icon-plus />
              </icon-base>
            </div>
          </div>
          <div v-else class="item d_flex align_items_center">
            <div v-if="user.keywords.length <= 3" class="item--keyword">
              <template v-for="(keyword,index) in user.keywords" v-bind="index">
                {{keyword}}
                <span v-if="index !== (user.keywords.length - 1)">,</span>
              </template>
            </div>
            <div v-if="user.keywords.length > 3" class="item--keyword">
              <template v-for="keyword in user.keywords.slice(0, 3)">{{keyword + ', '}}</template>
              <span>...</span>
            </div>
            <div class="ml_auto">
              Xem tất cả
              <icon-base
                icon-name="arrow-down"
                class="icon--arrow-right"
                width="10"
                height="10"
                viewBox="0 0 130 130"
              >
                <icon-arrow-down />
              </icon-base>
            </div>
          </div>
        </div>
      </div>
      <!-- Start: Info -->
      <div class="items pb_3">
        <div class="title d_flex mb_2">
          <icon-base class="icon--info mr_2" icon-name="info" width="25" height="25" viewBox="0 0 20 20">
            <icon-info />
          </icon-base>
          <div>
            <b>Thông tin khác</b>
          </div>
        </div>
        <div class="content logout d_flex align_items_center">
          <div class="mb_0">Tài khoản sử dụng đến ngày</div>
          <div class="ml_auto">
            {{formatDate(user.expireDate)}}
          </div>
        </div>
      </div>
      <!-- Start: Logout -->
      <div class="items">
        <div class="title d_flex mb_2">
          <icon-base
            icon-name="Tài khoản Facebook"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            class="mr_2"
          >
            <icon-account />
          </icon-base>
          <div>
            <b>Tài khoản</b>
          </div>
        </div>
        <div class="content logout d_flex align_items_center" @click="logout">
          <div class="mb_0">Đăng xuất</div>
          <div class="ml_auto">
            <icon-base
              icon-name="arrow-down"
              class="icon--arrow-right"
              width="10"
              height="10"
              viewBox="0 0 130 130"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
        </div>
      </div>
    </div>
    <!-- End: Content -->
    <!-- Start: Popup -->
    <transition name="popup--mobile">
      <popup-confirm-password
        v-if="isShowInfoUser === true"
        @closeConfirmPassword="isShowInfoUser = $event"></popup-confirm-password>
      <popup-keywords v-if="isShowKeywords === true" @closeKeywords="isShowKeywords = $event"></popup-keywords>
    </transition>
    <!-- End: Popup -->
    <!-- Start: Popup Delete -->
    <transition name="popup-delete">
      <popup-delete
        @closePopupDelete="isShowPopupDelete = $event"
        @confirmPopupDelete="confirmDelete($event)"
        v-if="isShowPopupDelete === true"
      >
      </popup-delete>
    </transition>
    <!-- End: Popup Delete -->
  </div>
</template>

<script src="./index.script.js">
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
