<template>
  <div class="item--body d_flex align_items_center px_3 py_2" v-if="member">
    <!-- Start: Name Column -->
    <div class="col col--name px_2">
      <div
        class="col col--name-text"
        @click="editMember"
      >
        {{member.user.name}}
      </div>
    </div>
    <!-- End: Name Column -->
    <!-- Start: Email Column -->
    <div class="col col--category px_2">
      <span>
        {{member.user.email}}
      </span>
    </div>
    <!-- End: Email Column -->
    <!-- Start: Phone Column -->
    <div class="col col--category px_2">
      <span>
        {{member.user.phone}}
      </span>
    </div>
    <!-- End: Phone Column -->
    <!-- Start: Type Column -->
    <div class="col col--category px_2">
      <span>
        {{member.typeUser}}
      </span>
    </div>
    <!-- End: Type Column -->

    <!-- Start: Action Column -->
    <div class="col d_flex align_items_center justify_content_center col--action px_4 text_center">
      <div
        class="mx_2"
        @click="editMember"
      >
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
  props: ["member"],
  methods: {
    async editMember() {
      await this.$store.dispatch("getInfoMember", this.member.user._id);
      this.$emit("openEdit", true);
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../index.style";
</style>
