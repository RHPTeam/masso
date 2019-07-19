<template>
  <div class="content item--body p_2 mb_2 d_flex align_items_center" @click="showPost">
    <!--
    <div class="col col--action px_3 text_center">
      <span class="mx_1"
            @click="addToContentStore"
      >
        <icon-base icon-name="Chỉnh sửa" viewBox="0 0 20 20">
          <icon-edit />
        </icon-base>
      </span>
      <span class="mx_1"
            @click="openPopupDetail"
      >
        <icon-base icon-name="icon-info" viewBox="0 0 18 18">
          <icon-info />
        </icon-base>
      </span>
    </div>-->
    <div class="right">
      <div class="title pb_1">{{ item.content }}</div>
      <div class="more d_flex align_items_center">
        <div class="mr_auto">
          <icon-base
            class="mr_1"
            icon-name="icon-like"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <icon-like />
          </icon-base>
          <span>{{ item.like }}</span>
        </div>
        <div class="ml_auto">
          <icon-base
            class="mr_1"
            icon-name="icon-share"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <icon-share />
          </icon-base>
          <span>{{ item.share }}</span>
        </div>
      </div>
    </div>
    <div class="left action pl_2 text_center ml_auto">
      <icon-base icon-name="icon-info" viewBox="0 0 18 18">
        <icon-info />
      </icon-base>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
    };
  },
  methods: {
    showPost() {
      this.$emit("showPost", this.item);
    },
    addToContentStore() {
      this.showCreatePopup = true;
      this.$store.dispatch("updateDefaultPostByFbPost", {
        content: this.item.content,
        attachments: this.item.attachments
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../index.style";
</style>
