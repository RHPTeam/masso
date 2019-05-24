<template>
  <div class="perinfo--wrapper">
    <div class="title text_left">Thông tin cá nhân</div>
    <form class="wrapper--form">
      <!-- Start: Email -->
      <div class="user--email d_flex mb_2">
        <div class="icon--envelope mt_1">
          <icon-base icon-name viewBox="0 0 20 20">
            <icon-envelope />
          </icon-base>
        </div>
        <div class="text">{{ user.email }}</div>
      </div>
      <!-- End: Email -->
      <!-- Start: Name & Phone-->
      <div class="r">
        <div class="c_sm_12 c_md_12 c_lg_6 form_group">
          <div class="form_group position_relative">
            <div class="icon position_absolute p_2">
              <icon-base icon-name viewBox="0 0 20 20">
                <icon-user class="ic--user" />
              </icon-base>
            </div>
            <input
              type="text"
              class="form_control"
              placeholder="Nhập tên của bạn"
              v-model="user.name"
            />
          </div>
        </div>
        <div class="c_sm_12 c_md_12 c_lg_6 form_group">
          <div class="form_group position_relative">
            <div class="icon position_absolute p_2">
              <icon-base icon-name viewBox="0 0 24 24">
                <icon-phone />
              </icon-base>
            </div>
            <input
              type="text"
              class="form_control"
              placeholder="Nhập số điện thoại của bạn"
              v-model="user.phone"
            />
          </div>
        </div>
      </div>
      <!-- End: Name & Phone -->
      <!--  Star: Password-->
      <div class="title d_flex mt_2">Mật khẩu</div>
      <div class="r pb_lg_4">
        <div class="c_sm_12 c_md_12 c_lg_6 form_group">
          <div
            class="form_group position_relative"
            :class="{
              errors: statusClassError.newPassword,
              passed: statusClassPassed.newPassword
            }"
          >
            <div class="icon password position_absolute p_2">
              <icon-base icon-name viewBox="0 0 20 20">
                <icon-lock />
              </icon-base>
            </div>
            <input
              type="password"
              class="form_control"
              placeholder="Nhập mật khẩu của bạn"
              v-model="reset.newPassword"
            />
          </div>
          <div class="text--error">{{ errorText.newPassword }}</div>
        </div>
        <div class="c_sm_12 c_md_12 c_lg_6 form_group">
          <div
            class="form_group position_relative input--reNewPass"
            :class="{
              errors: statusClassError.confirmNewPassword,
              passed: statusClassPassed.confirmNewPassword
            }"
          >
            <div class="icon password position_absolute p_2">
              <icon-base icon-name viewBox="0 0 20 20">
                <icon-lock-check />
              </icon-base>
            </div>
            <input
              type="password"
              class="form_control"
              placeholder="Nhập lại mật khẩu của bạn"
              v-model="reset.confirmNewPassword"
            />
          </div>
          <div class="text--error">
            {{ errorText.confirmNewPassword }}
          </div>
        </div>
      </div>
      <!--  End: Password -->
    </form>
    <!-- POPUP -->
    <transition name="info--change">
      <!-- Start: Popup info change -->
      <popup-info-change
        v-if="showPopupInfoChange === true"
        :data-theme="currentTheme"
        :user="user"
        @closePopup="showPopupInfoChange = $event"></popup-info-change>
      <!-- End: Popup info change -->
    </transition>
    <!-- Start: Popup password change -->
    <transition name="popup">
      <popup-password-change
        v-if="showPopupPasswordChange === true"
        :data-theme="currentTheme"
        :reset="reset"
        @closePopup="closeModalPassword($event)"></popup-password-change>
      <!-- End: Popup password change -->
    </transition>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "style";
</style>
