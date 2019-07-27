<template>
  <div class="item--body d_flex align_items_center px_3 py_2" v-if="item">
    <!-- Start: Name Column -->
    <div class="col col--name px_2">
      <router-link
        class="col col--name-text"
        :to="{ name: 'post_update_post', params: { id: item._id } }"
        @click.native="updatePost()"
      >
        {{ item.title !== undefined && item.title.length > 0 ? item.title : "Bài viết chưa có tiêu đề" }}
      </router-link>
    </div>
    <!-- End: Name Column -->
    <!-- Start: Category Column -->
    <div class="col col--category px_2">
      <span v-for="(category, index) in item._categories"
            :key="`c-${index}`"
      >
        {{ category.title + [ index === item._categories.length - 1 ? '' : ', ' ] }}
      </span>
    </div>
    <!-- End: Category Column -->

    <!-- Start: Action Column -->
    <div class="col d_flex align_items_center justify_content_center col--action px_4 text_center">
      <router-link
        class="mx_2"
        :to="{ name: 'post_update_post', params: { id: item._id } }"
        @click.native="updatePost"
      >
        <icon-base icon-name="Chỉnh sửa" viewBox="0 0 20 20">
          <icon-edit />
        </icon-base>
      </router-link>
      <span class="mr_1" @click="showDeletePopup()">
        <icon-base
          icon-name="Xóa"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </span>
      <span class="mx_1 d_none" @click="showPostNowPopup">
        <icon-base
          class="icon--post-now"
          icon-name="Đăng ngay"
          viewBox="0 0 506 506">
          <icon-post-now />
        </icon-base>
      </span>
    </div>
    <!-- End: Action Column -->
  </div>
</template>

<script>
export default {
  props: ["item"],
  computed: {
    // post(){
    //   return this.$store.getters.post;
    // }
  },
  methods: {
    async updatePost() {
      await this.$store.dispatch( "getPostById", this.item._id );
      this.$router.push( {
        name: "post_update_post",
        params: { id: this.item._id }
      } );
    },
    async editPostCateDefault(){
      await this.$store.dispatch( "showPostDuplicate", this.item._id );
      const postId = this.$store.getters.post._id;
      this.$router.push( {
        name: "post_update_post",
        params: { id: postId }
      } );
    },
    showDeletePopup() {
      this.$emit( "showDeletePopup", this.item );
    },
    showPostNowPopup() {
      this.$emit( "showPostNowPopup", this.item );
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
