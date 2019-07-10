<template>
  <div class="modal--main--mobile">
    <!-- Start: Content -->
    <div class="modal--content py_3">
      <div class="items items--info">
        <div class="title">THÔNG TIN CÁ NHÂN</div>
        <div class="info py_2">
          <div class="item d_flex align_items_center" @click="showChangeName">
            <icon-base
              icon-name="icon-autoreply"
              class="mr_2"
              width="24"
              height="24"
              viewBox="0 0 25 25"
            >
              <icon-friend />
            </icon-base>

            <div class="content d_flex align_items_center">
              <div class="info--title">Tên người dùng</div>
              <div class="ml_auto">
                <!-- Nhớ slice kí tự để chuyển text về ... khi quá dài -->
                <span class="name--user">{{ user.name | getFirstLetter }}</span>
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
            <icon-base
              icon-name="icon-autoreply"
              class="mr_2"
              width="24"
              height="24"
              viewBox="0 0 25 25"
            >
              <icon-friend />
            </icon-base>

            <div class="content d_flex align_items_center">
              <div class="info--title">Số điện thoại</div>
              <div class="ml_auto">
                0986471458
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
            <icon-base
              icon-name="icon-autoreply"
              class="mr_2"
              width="24"
              height="24"
              viewBox="0 0 25 25"
            >
              <icon-friend />
            </icon-base>

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
      <div class="items items--keyword">
        <div class="title">TỪ KHÓA</div>
        <div class="list">
          <ul class="p_0 m_0">
            <li class="d_flex align_items_center">
              <span>Girl</span>
              <span class="ml_auto delete" @click="showPopupDelete">Xóa</span>
            </li>
            <li class="d_flex align_items_center">
              <span>Girl</span>
              <span class="ml_auto delete">Xóa</span>
            </li>
            <li class="d_flex align_items_center">
              <span>Girl</span>
              <span class="ml_auto delete">Xóa</span>
            </li>
          </ul>
          <div class="more text_center mt_2" @click="showKeywords">
            Xem tất cả
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
    <!-- End: Content -->
    <!-- Start: Popup -->
    <transition name="popup--mobile">
      <popup-confirm-password
        v-if="isShowInfoUser === true"
        @closeConfirmPassword="isShowInfoUser = $event"
      />
      <popup-keywords
        v-if="isShowKeywords === true"
        @closeKeywords="isShowKeywords = $event"
      />
    </transition>
    <!-- End: Popup -->
    <!-- Start: Popup Delete -->
    <transition name="popup-delete">
      <popup-delete @closePopupDelete="isShowPopupDelete = $event" v-if="isShowPopupDelete === true"/>
    </transition>
    <!-- End: Popup Delete -->
  </div>
</template>

<script src="./index.script.js">
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>