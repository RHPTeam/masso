<template>
  <div class="new px_2">

    <div class="default d_flex align_items_center p_2">
      <div class="left d_flex align_items_center justify_content_center mr_2">
        <icon-base
          icon-name="người dùng"
          width="30"
          height="30"
          viewBox="0 0 16.5 16.5"
        >
          <icon-user />
        </icon-base>
      </div>

      <div class="middle d_flex align_items_center">
        Tin nhắn mới
      </div>

      <div class="icon d_flex align_items_center justify_content_center" @click="deleteNewMessages">
        <icon-base
          icon-name="đóng"
          width="13"
          height="13"
          viewBox="0 0 20 20"
        >
          <icon-close />
        </icon-base>
      </div>

    </div>

    <div class="default d_flex align_items_center p_2">
      <div class="left d_flex align_items_center justify_content_center mr_2">
        <icon-base
          icon-name="người dùng"
          width="30"
          height="30"
          viewBox="0 0 16.5 16.5"
        >
          <icon-user />
        </icon-base>
      </div>

      <div class="middle d_flex align_items_center">
        Tin nhắn mới đến Lê Khang
      </div>

      <div class="icon d_flex align_items_center justify_content_center" @click="deleteNewMessages">
        <icon-base
          icon-name="đóng"
          width="13"
          height="13"
          viewBox="0 0 20 20"
        >
          <icon-close />
        </icon-base>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  methods: {
    deleteNewMessages() {
      this.$store.dispatch("setVariableControl", {
        key: "new",
        value: false
      });
    }
  },
}
</script>

<style lang="scss" scoped>
  .new {
    .default {
      cursor: pointer;
      &:hover, &:focus, &:active, &:visited {
        > .icon {
          opacity: 1;
        }
      }
      .left {
        border-radius: 50%;
        border: 1px solid #e4e4e4;
        width: 50px;
        height: 50px;
      }
      .middle {
        color: #fff;
        font-size: .9rem;
        width: calc(100% - 90px);
      }
      .icon {
        background-color: #ffb94a;
        border-radius: 50%;
        opacity: 0;
        top: 6%;
        width: 23px;
        height: 23px;
        right: 1rem;
        z-index: 99;
      }
    }
  }
</style>
