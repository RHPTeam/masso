<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content mb_2" v-click-outside="closePopup">
        <!-- Start: Header -->
        <!-- End: Header -->
        <!-- Start: Body -->
        <div class="modal--body p_3">
          <div class="popup--title text_center mt_1">
            <span>Xóa</span>
            <span>{{ title }}</span>
          </div>
          <div class="popup--description">{{ description }}</div>
        </div>
        <!-- End: Body -->
        <!-- Start: Footer -->
        <div class="modal--footer text_center">
          <div class="delete item" @click="submit()">Xóa</div>
          <div class="cancel mt_2 item" @click="closePopup">Hủy</div>
        </div>
        <!-- End: Footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    submit() {
      this.$store.dispatch("setEvent", {
        key: "plugins",
        value: ""
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "./index.style.scss";
</style>
