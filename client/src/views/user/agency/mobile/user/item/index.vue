<template>
  <div
    class="item--body px_2 py_2 mb_2 d_flex align_items_center"
    v-if="member"
    @click="editMember"
  >
    <div class="info">
      <!-- Start: Email Column -->
      <div class="col col--category px_2">{{member.user.email}}</div>
      <!-- End: Email Column -->
      <!-- Start: Phone Column -->
      <div class="col col--category px_2">{{member.user.phone}}</div>
      <!-- End: Phone Column -->
    </div>

    <!-- Start: Action Column -->
    <div
      class="col d_flex align_items_center justify_content_center col--action text_center ml_auto"
    >
      <div class>
        <icon-base icon-name="Chỉnh sửa" viewBox="0 0 20 20">
          <icon-edit />
        </icon-base>
      </div>
    </div>
    <!-- End: Action Column -->
  </div>
</template>

<script>
export default {
  props: {
    member: Object
  },
  methods: {
    async editMember() {
      await this.$store.dispatch("getInfoMember", this.member.user._id);
      this.$emit("openEdit", true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";
.info {
  width: 90%;
}
</style>
