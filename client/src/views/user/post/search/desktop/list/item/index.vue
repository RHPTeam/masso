<template>
  <div>
    <div class="item--body d_flex align_items_center px_2 py_2">
      <div class="col col--content px_3">
        <div class="col--content-text">
          <a class="text_light" :href="`https://www.facebook.com/${item.feedId}`" target="_blank" :title="item.content" v-html="item.content"></a>
        </div>
      </div>
      <div class="col col--image px_3">
        <div v-if="item.attachments && item.attachments.length > 0" class="d_flex align_items_center">
          <div class="image--wrap mr_2" v-for="(gallery, index) in item.attachments.slice(0,3)" :key="`i-${index}`">
            <img :src="gallery.link">
          </div>
          <div class="image--wrap" v-if="item.attachments.length > 3">
            <div
              class="image--wrap-more d_flex align_items_center justify_content_center"
            >
              +{{ item.attachments.length -3 }}
            </div>
          </div>
        </div>
        <div v-else>Không có hình ảnh</div>
      </div>
      <div class="col col--like px_3">{{ item.like }}</div>
      <div class="col col--share px_3">{{ item.share }}</div>

      <div class="col col--action px_3 text_center">
        <span class="mx_1"
              @click="addToContentStore"
        >
          <icon-base icon-name="Chỉnh sửa" viewBox="0 0 20 20">
            <icon-edit />
          </icon-base>
        </span>
        <span class="mx_1"
              @click="showDetailPopup"
        >
          <icon-base icon-name="icon-info" viewBox="0 0 18 18">
            <icon-info />
          </icon-base>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "item" ],
  computed: {
    post() {
      if ( Object.entries( this.$store.getters.post ).length === 0 && this.$store.getters.post.constructor === Object ) return;
      return this.$store.getters.post;
    },
    defaultPost() {
      return this.$store.getters.defaultPost;
    },
  },
  methods: {
    sliceImage(){
      return this.item.attachments.slice(0,3);
    },
    showDetailPopup(){
      this.$emit( "showDetailPopup", this.item );
    },
    async addToContentStore() {
      await this.$store.dispatch( "updateDefaultPostByFbPost", {
        content: this.item.content,
        attachments: this.item.attachments
      } );

      this.$emit( "showCreatePopup", this.item );
    }
  }
}
</script>

<style scoped lang="scss">
@import "../index.style";
</style>
