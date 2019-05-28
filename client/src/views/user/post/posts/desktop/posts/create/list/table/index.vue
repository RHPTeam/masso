<template>
  <div class="wrapper" :data-theme="currentTheme">
    <div class="list--data my_3">
      {{postPush.length}}
      <div class="item--header d_flex align_items_center px_2 py_2">
        <div class="col col--content px_3">Nội dung</div>
        <div class="col col--image px_3">Hình ảnh</div>
        <div class="col col--like px_3">Thích</div>
        <div class="col col--share px_3">Chia sẻ</div>
        <div class="col col--action px_3">Hành động</div>
      </div>
      <!-- Start: List Content -->
      <vue-perfect-scrollbar class="infinite">

          <div v-for="(item, index) in postPush" :key="index">
            <item-detail :item="item" />
          </div>



        <div class="infinite--control-block">
          <div ref="infiniteScrollTrigger" id="scrollTrigger"></div>
          <div class="circle--loading" v-if="showLoader"></div>
        </div>
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script>

import ItemDetail from "./item/index";

export default {
  components: {
    ItemDetail,
  },
  props: [ "currentPage", "keyword" ],
  data() {
    return {
      maxPerPage: 12,
      showLoader: false,
      postsArr: [],
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allPostFacebook(){
      // console.log(this.$store.getters.allPostsFacebook);
      return this.$store.getters.allPostsFacebook;
    },
    postsFacebookByKey() {
      // console.log(this.$store.getters.postsFacebookByKey);
      return this.$store.getters.postsFacebookByKey;
    },
    postPush(){
      return this.$store.getters.postPush;
    },
    user() {
      return this.$store.getters.userInfo;
    }
  },
  mounted() {
    this.scrollTrigger();
  },
  methods: {
    scrollTrigger() {
      const observer = new IntersectionObserver( ( entries ) => {
        entries.forEach( ( entry ) => {
          if ( entry.intersectionRatio > 0 && this.currentPage < this.postsFacebookByKey.page) {
            this.showLoader = true;
            setTimeout( () => {
              this.$emit( "updateCurrentPage" );
              this.showLoader = false;

              this.getMorePost();

            }, 2000 );
          }
        } );
      } );

      observer.observe(this.$refs.infiniteScrollTrigger);
    },
    async getMorePost() {
      const dataSender = {
        key: this.keyword,
        size: this.maxPerPage,
        page: this.currentPage
      };

      await this.$store.dispatch( "searchPostsFacebookByKey", dataSender );
    }
  }
};
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
  .wrap--post {
    max-height: 328px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .item--body {
    background-color: #fafafa;
    min-height: 48px;
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
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
    overflow: hidden;
    width: 40px;
    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }
    &-more,
    img {
      position: absolute;
      width: 100%;
    }
    img {
      height: auto;
      left: 50%;
      max-width: none;
      top: 50%;
      transform: translate(-50%, -50%);
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
.infinite {
  max-height: 280px;
}
.infinite--control-block {
  width: 100%;
  #scrollTrigger {
    height: 30px;
  }
  .circle--loading {
    animation: animate 1.5s infinite linear;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top: 3px solid #fff;
    height: 30px;
    margin-left: 50%;
    transform: translate( -50%, -50%);
    width: 30px;
  }

  @keyframes animate {
    0% {
      transform: translate(-50%,-50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%,-50%) rotate(360deg);
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
