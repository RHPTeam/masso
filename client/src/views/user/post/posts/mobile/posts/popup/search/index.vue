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
      <!-- <div class="near px_3">
        <h6>Tìm kiếm gần đây</h6>
        <div class="list">
          <ul class="p_0 m_0" v-if="keyPopular && keyPopular.length > 0">
            <li v-for="(item, index) in keyPopular" :key="index">{{ item }}</li>
          </ul>
          <p v-else>Bạn chưa tìm gì.</p>
        </div>
      </div>-->
      <!-- End: Search Near -->
      <!-- Start: Main - Search -->
      <div class="items--body px_2">
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
          <div class="item d_flex align_items_center">
            <div
              class="fanpage tab"
              :class="isShowPopupFanpage === true ? 'active' : ''"
              @click="showPopupFanpage"
            >Bài viết</div>
            <div
              class="group tab"
              :class="isShowPopupGroup === true ? 'active' : ''"
              @click="showPopupGroup"
            >Danh mục</div>
            <div
              class="postgroup tab"
              :class="isShowPopupPostGroup === true ? 'active' : ''"
              @click="showPopupPostGroup"
            >Danh mục mẫu</div>
          </div>
          <div class="content mt_2">
            <!-- Start: Fanpage -->
            <div class="fanpage" v-if="isShowPopupFanpage === true">
              <div class="item--content d_flex align_items_center py_2">
                <div class="content">
                  <div class="title">Bài đăng chưa có tiêu đề</div>
                  <div class="category--parent">Chưa phân loại</div>
                </div>
                <div class="action align_items_center ml_auto">
                  <span class="mx_1" @click="showPopupDelete">
                    <icon-base
                      icon-name="Xóa"
                      width="20"
                      height="20"
                      viewBox="0 0 15 15"
                    >
                      <icon-remove />
                    </icon-base>
                  </span>
                  <span class="mx_1">
                    <icon-base
                      width="20"
                      height="20"
                      viewBox="0 0 18 18"
                    >
                      <icon-info />
                    </icon-base>
                  </span>
                </div>
              </div>
            </div>
            <div class="group" v-if="isShowPopupGroup === true">
              <div class="item--content d_flex align_items_center py_2">
                <div class="col col--category pl_3 pr_2">Chưa phân loại</div>
                <div class="col col--posts text_center ml_auto">3</div>
                <div class="action align_items_center ml_auto">
                  <span class="" @click="showPopupDelete">
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
              </div>
            </div>
            <div class="post--group" v-if="isShowPopupPostGroup === true">
              <div class="item--content d_flex align_items_center py_2">
                <div class="col col--category pl_3 pr_2">Chưa loại</div>
                <div class="col col--posts text_center ml_auto">12</div>
                <div class="action align_items_center ml_auto">
                  <span class="" @click="showPopupDelete">
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
              </div>
            </div>
            <!-- Start: Group -->
            <!-- Start: Post group -->
          </div>
        </vue-perfect-scrollbar>
        <!-- Start: List Content -->
      </div>
      <!-- End: Main - Search -->
    </div>
    <!-- Start: Transition -->
    <transition name="popup">
      <popup-delete @closePopup="isShowPopupDelete = $event" v-if="isShowPopupDelete === true"/>
    </transition>
    <!-- End: Transition -->
  </div>
</template>

<script>
import PopupDelete from "../delete"
export default {
  components: {
    PopupDelete
  },
  computed: {},
  data() {
    return {
      isShowPopupFanpage: true,
      isShowPopupGroup: false,
      isShowPopupPostGroup: false,
      isShowAddToGroup: false,
      isShowPopupDelete: false
    };
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
    },
    showPopupFanpage() {
      this.isShowPopupFanpage = true;
      this.isShowPopupGroup = false;
      this.isShowPopupPostGroup = false;
    },
    showPopupGroup() {
      this.isShowPopupFanpage = false;
      this.isShowPopupGroup = true;
      this.isShowPopupPostGroup = false;
    },
    showPopupPostGroup() {
      this.isShowPopupFanpage = false;
      this.isShowPopupGroup = false;
      this.isShowPopupPostGroup = true;
    },
    showPopupAddToGroup() {
      this.isShowAddToGroup = true;
    },
    showPopupDelete() {
      this.isShowPopupDelete = true;
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
    font-size: 0.875rem;
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
    .items--body {
      .item {
        .tab {
          text-align: center;
          flex: 1;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #ccc;
          &.active {
            color: #ffb94a;
            border-color: #ffb94a;
          }
        }
      }
      .col--category {
        width: 100%;
      }
      .col--posts {
        padding: 0 0.375rem;
        margin: 0 0.5rem 0 1rem;
        background: #ffb94a;
        border-radius: 20px;
        color: #27292d;
      }
    }
    .near {
      .list {
        li {
          list-style: none;
          border-bottom: 1px solid #ccc;
          padding: 0.5rem 0;
        }
      }
    }
  }
}
.fanpage,
.group,
.post--group {
  .item--content {
    border-bottom: 1px solid #484848;
  }
  .col--checkbox {
    height: 20px;
  }
  .custom--checkbox {
    input[type="checkbox"] {
      border-radius: 50%;
      border: solid 1.5px #cccccc;
      cursor: pointer;
      height: 20px;
      outline: none;
      width: 20px;
      -webkit-appearance: none;
      -moz-appearance: none;
      &:checked {
        background-color: #ffb94a;
        border: solid 1px #ffb94a;

        &:before {
          border-bottom: 2px solid #fff;
          border-right: 2px solid #fff;
          content: "";
          display: block;
          height: 10px;
          position: relative;
          left: 50%;
          top: 42%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 7px;
        }
      }
    }
  }
  .col--name {
    width: 100%;
    overflow: hidden;
    .avatar .img {
      border-radius: 50%;
    }
    &-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90%;
    }
  }
}
.infinite {
  max-height: calc(100vh - 112px);
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
.popup-enter {
  transform: translateY(100%);
}

.popup-enter-to {
  transition: transform 0.2s;
  transform: translateY(0);
}

.popup-leave-to {
  transition: transform 0.2s;
  transform: translateY(100%);
}
</style>