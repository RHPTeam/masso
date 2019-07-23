<template>
  <div class="modal--search-mobile">
    <div class="modal--content">
      <!-- Start: Header - Search -->
      <div class="items--header d_flex align_items_center p_3">
        <div class="list--input d_flex justify_content_between align_items_center">
          <span class="ml_3 mt_1">
            <icon-base icon-name="Tìm kiếm" width="20" height="20" viewBox="0 0 20 20">
              <icon-input-search />
            </icon-base>
          </span>
          <input type="text" placeholder="Tìm kiếm" />
        </div>
        <div class="cancel ml_auto" @click="closePopupSearch">Hủy</div>
      </div>
      <!-- End: Header - Search -->
      <!-- Start: Search Near -->
      <div class="near px_3">
        <h6>Tìm kiếm gần đây</h6>
        <div class="list">
          <ul class="p_0 m_0" v-if="keyPopular && keyPopular.length > 0">
            <li v-for="(item, index) in keyPopular" :key="index">{{ item }}</li>
          </ul>
          <p v-else>Bạn chưa tìm gì.</p>
        </div>
      </div>
      <!-- End: Search Near -->
      <!-- Start: Main - Search -->
      <div class="items--body px_3">
        <!-- Start: List Content -->
        <vue-perfect-scrollbar class="infinite" @ps-y-reach-end="loadMore">
          <!-- <div v-for="(item, index) in listPostFacebookDefault" :key="index">
          <app-item :item="item"/>
        </div>
        <div v-if="this.$store.getters.listPostFacebookStatus === 'loading'" class="mt_3">
          <loading-component></loading-component>
        </div>
        <div
          v-if="this.$store.getters.listPostFacebookStatus === 'success' && listPostFacebookDefault.length === 0"
          class="item--body empty--data d_flex align_items_center justify_content_center px_2 py_2"
          >Không có dữ liệu</div>-->
          <div class="content item--body p_2 mb_2 d_flex align_items_center">
            <!-- Rememer slice array when text overfollow -->
            <div class="right">
              <div class="title pb_1">Nội dung Nội dung Nội dung Nội dung</div>
              <div class="more d_flex align_items_center">
                <div class="mr_auto">
                  <icon-base
                    class="mr_1"
                    icon-name="icon-like"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <icon-like />
                  </icon-base>
                  <span>12123</span>
                </div>
                <div class="ml_auto">
                  <icon-base
                    class="mr_1"
                    icon-name="icon-share"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <icon-share />
                  </icon-base>
                  <span>132123213</span>
                </div>
              </div>
            </div>
            <div class="left action pl_2 text_center">Chi tiết</div>
          </div>
        </vue-perfect-scrollbar>
        <!-- Start: List Content -->
      </div>
      <!-- End: Main - Search -->
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    keyPopular() {
      if (
        Object.entries(this.user).length === 0 &&
        this.user.constructor === Object
      )
        return;
      return this.user.keywords.slice(0, 5);
    },
    user() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    async loadMore() {
      if (this.isLoadingData === true) {
        if (this.keyword !== "") {
          if (this.currentPage > this.numberPageCurrent) {
            return false;
          } else {
            this.isLoadingData = false;

            this.currentPage += 1;

            await this.$store.dispatch("searchPostsFacebookByKey", {
              keyword: this.keyword,
              size: this.maxPerPage,
              page: this.currentPage
            });
            this.isLoadingData = true;
          }
        }
      }
    },
    closePopupSearch() {
      this.$emit("closePopupSearch", false);
    }
  }
};
</script>

<style scoped lang="scss">
.modal--search-mobile {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #2f3136;
  z-index: 10;
  .modal--content {
    .items--header {
      .list--input {
        border-radius: 10px;
        font-size: 0.875rem;
        height: 40px;
        background: #27292d;
        width: calc(100vw - 2rem - 35px);
        > input[type="text"] {
          background-color: transparent;
          border: 0;
          color: #fff;
          height: 100%;
          outline: none;
          width: calc(100% - 48px);
          padding-right: 15px;
          &::placeholder {
            color: #666;
          }
        }
        svg {
          color: #999;
        }
      }
    }
    .item--body {
      background-color: #27292d;
      border-radius: 0.625rem;
      font-size: 0.875rem;
      overflow: hidden;
      .right {
        max-width: 90%;
        overflow: hidden;
      }
      .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .near {
      .list {
        li {
          list-style: none;
          border-bottom: 1px solid #444;
          padding: 0.5rem 0;
        }
      }
    }
  }
}
.infinite {
  max-height: calc(100vh - 231px);
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
    transform: translate(-50%, -50%);
    width: 30px;
  }

  @keyframes animate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
}
</style>
