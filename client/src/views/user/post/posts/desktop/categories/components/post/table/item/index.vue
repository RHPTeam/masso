<template>
  <div class="item--body d_flex align_items_center px_3 py_2">
    <!--<div class="col col--checkbox px_2">
      <label class="detail--checkbox mb_0">
        <input type="checkbox" checked />
      </label>
    </div>-->
    <!-- Start: Name Column -->
    <div class="col col--name px_2">
      <div class="col col--name-text"
          @click="updatePost()"
      >
        {{ item.title }}
      </div>
    </div>
    <!-- End: Name Column -->
    <!-- Start: Category Column -->
    <div class="col col--category px_2" v-if="this.$store.getters.infoPostCateDefault === 0">
      <span v-for="(category, index) in item._categories"
            :key="`c-${index}`"
      >
        {{ category.title + [ index === item._categories.length - 1 ? '' : ', ' ] }}
      </span>
    </div>

    <div class="col col--category px_2" v-if="this.$store.getters.infoPostCateDefault === 1">
      {{titleCategory}}
    </div>
    <!-- End: Category Column -->

    <!-- Start: Action Column -->
    <div v-if="this.$store.getters.infoPostCateDefault === 0" class="col d_flex align_items_center justify_content_center col--action px_4 text_center">
      <span class="mx_2" @click="updatePost">
        <icon-base icon-name="Chỉnh sửa" viewBox="0 0 20 20">
          <icon-edit />
        </icon-base>
      </span>
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
      <span class="mx_1" @click="showPostNowPopup">
        <icon-base
          class="icon--post-now"
          icon-name="Đăng ngay"
          viewBox="0 0 506 506">
          <icon-post-now />
        </icon-base>
      </span>
    </div>
    <div v-if="this.$store.getters.infoPostCateDefault === 1" class="col d_flex align_items_center justify_content_center col--action px_4 text_center">
      <span class="mx_2" @click="editPostCateDefault">
        <icon-base
          icon-name="duplicate"
          width="20"
          height="20"
          viewBox="0 0 520 520"
        >
          <icon-copy />
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
    // },
    titleCategory(){
      return this.$store.getters.titleCategory;
    }
  },
  methods: {
    updatePost() {
      this.$store.dispatch( "getPostById", this.item._id );
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
@import "index.style";
</style>
