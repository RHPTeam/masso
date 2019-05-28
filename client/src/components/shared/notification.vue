<template>
  <div
    class="notification d_flex align_items_center popup-enter"
  >
    <div class="notification--text">
      <div class="r m_0 content mb_1 pt_2 pb_1  px_3">
        <div class="d_inline_flex">
          <div class="notifi mr_1"></div>
          <div class="name">{{ $t('chat.common.slowConnect.title') }}</div>
        </div>
        <div class="d_inline_flex close--now ml_auto">
          <div class="now mr_1">{{ $t('chat.common.slowConnect.now') }}</div>
        </div>
      </div>
      <div class="notice py_2  px_3">
        <div>
          <span>{{ $t('chat.common.slowConnect.see') }}</span>
          <span class="name--user px_1"> Nguyễn Công Khanh</span>
          <span>{{ $t('chat.common.slowConnect.onFB') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      showModal: false,
      nameBread: "Cập nhật tài khoản Facebook",
      subBread: "Dán mã kích hoạt Facebook vào ô bên dưới để cập nhật tài khoản."
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.notification {
  font-size: 13px;
  justify-content: space-between;
  transition: all 0.4s ease;
  background-color: #f0fff0;
  width: 250px;
  z-index: 1000;
  bottom: 15px;
  left: 15px;
  border-radius: 10px;
  position: fixed;
  color: #333;
  &:last-child {
    border-bottom: 0;
  }
  &--text {
    .name{
      font-weight: bold;
    }
    .notifi{
      height: 20px;
      width: 20px;
      background: rgba(255, 0, 3, 0.82);
    }
    .content{
      border-bottom: 1px solid #ccc;
      background: #ccc;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .notice{
      .name--user{
        color: rgba(255,0,3,.56);
      }
    }
  }
  .close {
    font-size: 1rem;
    cursor: pointer;
  }
}
</style>
