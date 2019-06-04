<template>
  <div
    class="modal--wrapper position_fixed d_flex justify_content_center align_items_center"
    :data-theme="currentTheme"
  >
    <div class="modal--content p_4">
      <VuePerfectScrollbar class="detail--scroll">
        <div v-html="item.content"></div>
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
          <span class="reaction--item-number ml_1">1018</span>
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
          <span class="reaction--item-number ml_1">354</span>
        </div>
      </div>
      <div class="action d_flex justify_content_between align_items_center">
        <button class="btn--cancel" @click="closePopupDetail">Hủy</button>
        <button class="btn--edit ml_4" @click="updatePost">Chỉnh sửa</button>
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
    updatePost() {
      this.post.attachments = this.item.attachments;
      this.post.content = this.item.content;

      this.$store.dispatch( "updatePost", this.post );
      this.$emit( "closePopupDetail", false );
    }
  }
};
</script>

<style scoped lang="scss">
.modal--wrapper {
  // background-color: rgba(153, 153, 153, 0.5);
  height: 100vh;
  left: 0;
  max-height: 100vh;
  top: 0;
  width: 100%;
  z-index: 1050;
  .modal--content {
    background-color: #ffffff;
    border-radius: 8px;
    width: 750px;
  }
}
.detail--scroll {
  max-height: calc(100vh - 450px);
  min-height: 150px;
}
.gallery {
  background-color: #ffffff;
  margin: 1.5rem -0.375rem 1rem -0.375rem;
  .gallery--block {
    border-radius: 5px;
    overflow: hidden;
    width: calc(25% - 0.75rem);
    margin: 0 0.375rem;
    &-more {
      background-color: rgba(153, 153, 153, 0.5);
      color: #fff;
      font-size: 2.5rem;
      font-weight: 600;
      height: 100%;
      left: 0;
      top: 0;
      width: 100%;
    }
  }
  .image--wrap {
    cursor: pointer;
    width: 100%;
    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    img {
      height: 100%;
      left: 50%;
      max-width: none;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
  }
}

.reaction {
  &--item {
    > span {
      line-height: 1.2;
    }
    &-number {
      color: #666;
      font-size: 14px;
      font-weight: 600;
    }
  }
}

.action {
  button {
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 10px;
    cursor: pointer;
    font-size: .875rem;
    font-weight: 600;
    height: 40px;
    padding: 0 .75rem;
    outline: none;
    text-transform: uppercase;
    transition: background-color .4s ease;
    &.btn--cancel {
      background-color: transparent;
      color: #999;
      &:hover {
        background-color: #F7F7F7;
      }
    }
    &.btn--edit {
      background-color: #ffb94a;
      border-color: #ffb94a;
      color: #fff;
      &:hover {
        background-color: #FF9E4A;
      }
    }
  }
}

/*Transition popup*/
.popup-enter-active, .popup-leave-active {
  transition: opacity 1.5s;
}
.popup-enter, .popup-leave-to {
  opacity: 0;
}
// CHANGE COLOR THEME

//THEME LIGHT

.modal--wrapper[data-theme="light"] {
  .modal--content {
    background-color: #ffffff;
  }
  .gallery {
    background-color: #ffffff;
  }
}

//THEME DARK

.modal--wrapper[data-theme="dark"] {
  .modal--content {
    background-color: #27292d;
  }
  .gallery {
    background-color: #27292d;
  }
}
</style>
