<template>
  <div
    class="modal--wrapper position_fixed d_flex justify_content_center align_items_center"
    :data-theme="currentTheme"
  >
    <div class="modal--content p_4" v-click-outside="closePopupDetail">
      <VuePerfectScrollbar class="detail--scroll">
        <div style="white-space: pre-wrap; word-wrap: break-word; font-family: inherit;" v-html="item.content"></div>
      </VuePerfectScrollbar>
      <div
        class="gallery d_flex justify_content_start align_items_center flex_wrap"
      >
        <div class="gallery--block position_relative" v-for="(gallery, index) in item.attachments.slice(0,3)" :key="`i-${index}`">
          <div class="image--wrap position_relative">
            <img
              :src="gallery.link"
            />
          </div>
        </div>
        <div class="gallery--block position_relative" v-if="item.attachments.length > 4">
          <div class="image--wrap position_relative">
            <img
              src="https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/26/40/90/264090b4-017b-758e-9e32-f4cb602fe70e/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-4.png/246x0w.jpg"
              alt
            />
          </div>
          <div
            class="gallery--block-more d_flex align_items_center justify_content_center position_absolute"
          >
            + {{ item.attachments.length - 4 }}
          </div>
        </div>
      </div>
      <div
        class="reaction d_flex justify_content_start align_items_center mb_4"
      >
        <div
          class="reaction--item d_flex justify_content_start align_items_center"
        >
          <span class="reaction--item-icon">
            <icon-base
              icon-name="icon-like"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-like />
            </icon-base>
          </span>
          <span class="reaction--item-number ml_1">{{ item.like }}</span>
        </div>
        <div
          class="reaction--item d_flex justify_content_start align_items_center ml_3"
        >
          <span class="reaction--item-icon">
            <icon-base
              icon-name="icon-share"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-share />
            </icon-base>
          </span>
          <span class="reaction--item-number ml_1">{{ item.share }}</span>
        </div>
      </div>
      <div class="action d_flex align_items_center align_items_center">
        <button class="btn--cancel ml_auto" @click="closePopupDetail">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    post() {
      if ( Object.entries( this.$store.getters.post ).length === 0 && this.$store.getters.post.constructor === Object ) return;
      return this.$store.getters.post;
    }
  },
  methods: {
    closePopupDetail() {
      this.$emit( "closePopupDetail", false );
    },
    async updatePost() {
      await this.$emit("openCreatePost", true);
      this.closePopupDetail();
    }
  }
};
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
