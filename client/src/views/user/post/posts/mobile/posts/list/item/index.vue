<template>
  <div class="item--body d_flex align_items_center py_2 pl_2">
    <div class="content" @click="showDetailPost">
      <div
        class="title"
      >{{ item.title !== undefined && item.title.length > 0 ? item.title : "Bài viết chưa có tiêu đề" }}</div>
      <div class="category--parent">
        <span
          v-for="(category, index) in item._categories"
          :key="`c-${index}`"
        >{{ category.title + [ index === item._categories.length - 1 ? '' : ', ' ] }}</span>
      </div>
    </div>
    <!-- Start: action posts -->
    <div class="col d_flex align_items_center justify_content_center col--action pr_2 text_center">
      <span class="mr_1" @click="showPopupDelete">
        <icon-base icon-name="Xóa" width="20" height="20" viewBox="0 0 15 15">
          <icon-remove />
        </icon-base>
      </span>
      <span class="mx_1">
        <icon-base class="icon--post-now" icon-name="Đăng ngay" viewBox="0 0 506 506">
          <icon-post-now />
        </icon-base>
      </span>
    </div>
    <!-- End: action posts -->
  </div>
</template>

<script>
export default {
  props: ["item"],
  components: {
  },
  data() {
    return {      
    }
  },
  computed: {
  },
  methods: {
    showDetailPost() {
      this.$emit("showDetailPost", this.item );
    },
    showPopupDelete() {
      this.$emit("showPopupDelete", this.item );
    }
  }
};
</script>

<style scoped lang="scss">
.item--body {
  border-bottom: 1px solid #484848;
  background: rgba(39, 41, 45, 0.4);
  .content {
    width: 100%;
    max-width: 90%;
    font-size: 0.875rem;
    overflow: hidden;
    .category--parent {
      font-size: 0.8125rem;
      color: #999;
    }
    .title,
    .category--parent {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>