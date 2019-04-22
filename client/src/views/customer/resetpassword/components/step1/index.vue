<template>
  <form @submit.prevent="sendMail" class="text_center">
    <div class="form--reset-logo">
      <icon-base
        icon-name="logo"
        width="210.21"
        height="78.65"
        viewBox="0 0 250.446 93.703"
      >
        <icon-logo />
      </icon-base>
    </div>
    <h3 class="">Đặt lại mật khẩu</h3>
    <div class="form--reset-title">
      Nhập địa chỉ email tài khoản Zinbee của bạn bên dưới.
    </div>
    <app-alert
      :type="this.$store.getters.authStatus == 'loading' ? 'alert_danger' : ''"
      :message="
        this.$store.getters.authStatus == 'loading'
          ? 'Tài khoản email không tồn tại!'
          : ''
      "
    />
    <div
      class="form_group position_relative"
      :class="{
        errors: statusClassError,
        passed: statusClassPassed
      }"
    >
      <div class="icon position_absolute">
        <icon-base
          icon-name="envelope"
          width="20.554"
          height="15.713"
          viewBox="0 0 20.554 15.713"
        >
          <icon-envelope />
        </icon-base>
      </div>
      <input
        type="text"
        class="form_control"
        placeholder="Nhập email"
        v-model="email"
      />
    </div>
    <div class="text--error">{{ errorText }}</div>
    <button class="btn btn_primary form_control">Gửi mã</button>
    <div class="mb_1 link--custom">
      <router-link to="/signin">Đăng nhập</router-link>
    </div>
  </form>
</template>
<script src="./main.js"></script>
<style lang="scss" scoped>
@import "./style";
</style>
