<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title--small mt_2">This is Event Popup.</div>
          <div class="desc mt_3">
            {{ eventData }}
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closePopup">HỦY</button>
          <button class="btn-submit">
            XONG
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["eventData"],
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style";
</style>
