<template>
  <div>
    <div class="item--body d_flex align_items_center px_2 py_2">
      <div class="col col--content px_3">
        <div class="col--content-text">
          <div v-html="item.content"></div>
        </div>
      </div>
      <div class="col col--image px_3">
        <div v-if="item.attachments && item.attachments.length > 0" class="d_flex align_items_center">
          <div class="image--wrap mr_2" v-for="(gallery, index) in item.attachments.slice(0,3)" :key="`i-${index}`">
            <img :src="gallery.link">
          </div>
          <div class="image--wrap position_absolute" v-if="item.attachments.length > 3">
            <div
              class="image--wrap-more d_flex align_items_center justify_content_center"
            >
              +{{ item.attachments.length - 2 }}
            </div>
          </div>
        </div>
        <div v-else>Không có hình ảnh</div>
      </div>
      <div class="col col--like px_3">{{ item.like }}</div>
      <div class="col col--share px_3">{{ item.share }}</div>

      <div class="col col--action px_3 text_center">
        <span class="mx_1">
          <icon-base icon-name="icon-edit" viewBox="0 0 20 20">
            <icon-edit />
          </icon-base>
        </span>
        <span class="mx_1" @click="openPopupDetail">
          <icon-base icon-name="icon-info" viewBox="0 0 18 18">
            <icon-info />
          </icon-base>
        </span>
      </div>
    </div>
    <transition name="popup">
      <popup-detail
        v-if="showDetail === true"
        :item="item"
        @closePopupDetail="showDetail = $event"
      />
    </transition>
    <transition name="fade">
      <div v-if="showDetail === true" class="backdrop position_fixed"></div>
    </transition>
  </div>
</template>

<script>
import PopupDetail from "../popup/detail/index";
export default {
  components: {
    PopupDetail
  },
  props: [ "index.vue" ],
  data() {
    return {
      showDetail: false
    };
  },
  methods: {
    sliceImage(){
      return this.item.attachments.slice(0,3);
    },
    openPopupDetail(){
      this.showDetail = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  .list--data {
    font-size: 0.875rem;
    .item--header {
      background-color: #ffffff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      color: #666666;
      font-weight: 600;
      height: 48px;
    }
    .item--body {
      background-color: #fafafa;
      min-height: 48px;
    }

    .col--content {
      width: calc(100% - 460px);
      &-text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .col--image {
      width: 175px;
    }
    .col--like,
    .col--share {
      width: 90px;
    }
    .col--action {
      width: 110px;
      svg {
        color: #999;
        cursor: pointer;
        transition: all 0.4s ease;
        &:hover {
          color: #ffb94a;
        }
      }
    }

    .image--wrap {
      border-radius: 5px;
      cursor: pointer;
      overflow: hidden;
      width: 40px;
      height: 40px;
      img {
        height: 100%;
        width: 100%;
        max-width: none;
      }
      &-more {
        background-color: #e4e4e4;
        color: #999999;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
  }

  .backdrop {
    background-color: rgba(153, 153, 153, 0.5);
    height: 100vh;
    left: 0;
    max-height: 100vh;
    top: 0;
    width: 100%;
    z-index: 1040;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  // RESPONSIVE
  @media only screen and (max-width: 1800px) {
    .list--data {
      .col {
        padding: 0 0.5rem !important;
      }
      .col--content {
        width: calc(100% - 315px);
      }
      .col--image {
        width: 150px;
      }
      .col--like {
        width: 70px;
      }
      .col--share {
        display: none;
      }
      .col--action {
        width: 95px;
      }
    }
  }
  @media only screen and (max-width: 1500px) {
    .list--data {
      .col--content {
        width: calc(100% - 165px);
      }
      .col--image {
        display: none;
      }
    }
  }
  // @media only screen and (max-width: 1366px) {
  //   .list--data {
  //     .col--content {
  //       width: calc(100% - 315px);
  //     }
  //     .col--image {
  //       width: 150px;
  //       display: block;
  //     }
  //   }
  // }
  @media only screen and (max-width: 1280px) {
    .list--data {
      .col--content {
        width: calc(100% - 165px);
      }
      .col--image {
        display: none;
      }
    }
  }

  @media only screen and (max-width: 1200px) {
    .list--data {
      .col--content {
        width: calc(100% - 375px);
      }
      .col--image {
        display: block;
      }
      .col--share {
        width: 70px;
        display: block;
      }
    }
  }

  @media only screen and (max-width: 1024px) {
    .list--data {
      .col--content {
        width: calc(100% - 315px);
      }
      .col--share {
        display: none;
      }
    }
  }
  @media only screen and (max-width: 992px) {
    .list--data {
      .col--content {
        width: calc(100% - 165px);
      }
      .col--image {
        display: none;
      }
    }
  }
  //CHANGE COLOR THEME

  // THEME lIGHT
  .wrapper[data-theme="light"] {
    .item--header {
      background-color: #ffffff;
    }
    .item--body {
      background-color: #fafafa;
    }
  }

  // THEME DARK
  .wrapper[data-theme="dark"] {
    .item--header {
      background-color: #27292d;
      border-bottom: 1px solid #666;
    }
    .item--body {
      background-color: #27292d;
    }
  }
</style>
