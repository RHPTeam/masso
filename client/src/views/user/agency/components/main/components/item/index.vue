<template>
  <div class="item--body d_flex align_items_center px_3 py_2" v-if="member">
    <!-- Start: Name Column -->
    <div class="col col--name px_2">
      <div
        class="col col--name-text"
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
      <span class="mr_1" @click="deleteMember">
        <icon-base
          icon-name="Xóa"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </span>
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
    editMember() {
      console.log("edit");
    },
    deleteMember(){
      console.log("delete");
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../index.style";
</style>
