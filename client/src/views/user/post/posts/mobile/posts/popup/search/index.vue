<template>
  <div class="modal--search-mobile">
    <div class="modal--content">
      <!-- Start: Header - Search -->
      <div class="items--header d_flex align_items_center p_3">
        <div class="list--input d_flex justify_content_between align_items_center">
          <span class="ml_3 mt_1" @click="updateSearch">
            <icon-base icon-name="Tìm kiếm" width="20" height="20" viewBox="0 0 20 20">
              <icon-input-search />
            </icon-base>
          </span>
          <input type="text" placeholder="Tìm kiếm" v-model="search" @keydown.enter="updateSearch" />
        </div>
        <div class="cancel ml_auto" @click="closePopupSearch">Hủy</div>
      </div>
      <!-- End: Header - Search -->
      <!-- Start: Main - Search -->
      <div class="items--body px_3">
        <!-- Start: List Content -->
        <vue-perfect-scrollbar class="infinite">
          <div class="item d_flex align_items_center">
            <div
              class="post tab"
              :class="isShowPopupPosts === true ? 'active' : ''"
              @click="showPopupPosts"
            >Bài viết</div>
            <div
              class="category tab"
              :class="isShowPopupCategories === true ? 'active' : ''"
              @click="showPopupCategories"
            >Danh mục</div>
            <div
              class="category--default tab"
              :class="isShowPopupCategoriesDefault === true ? 'active' : ''"
              @click="showPopupCategoriesDefault"
            >Danh mục mẫu</div>
          </div>
          <div class="content mt_2">
            <!-- Start: post -->
            <div class="post" v-if="isShowPopupPosts === true">
              <list-post :search="search"/>
            </div>
            <!-- Start: category -->
            <div class="category" v-if="isShowPopupCategories === true">
              <list-category :search="search" />
            </div>
            <div class="post--category" v-if="isShowPopupCategoriesDefault === true">
              <list-category-default :search="search" />
            </div>
            <!-- Start: Post category -->
          </div>
        </vue-perfect-scrollbar>
        <!-- Start: List Content -->
      </div>
      <!-- End: Main - Search -->
    </div>
    <!-- Start: Transition -->
    <transition name="popup">
      <popup-delete @closePopup="isShowPopupDelete = $event" v-if="isShowPopupDelete === true" />
    </transition>
    <!-- End: Transition -->
  </div>
</template>

<script>
import PopupDelete from "../delete";
import ListPost from "./post";
import ListCategory from "./category";
import ListCategoryDefault from "./categorydefault";
export default {
  components: {
    PopupDelete,
    ListPost,
    ListCategory,
    ListCategoryDefault
  },
  computed: {},
  data() {
    return {
      search: "",
      isShowPopupPosts: true,
      isShowPopupCategories: false,
      isShowPopupCategoriesDefault: false,
      isShowAddToGroup: false,
      isShowPopupDelete: false
    };
  },
  methods: {
    closePopupSearch() {
      this.$emit("closePopupSearch", false);
      // const dataSender = {
      //   keyword: "",
      //   size: 25,
      //   page: 1
      // };
      // this.$store.dispatch("getPostsByKeyMobile", dataSender);
      // this.$store.dispatch("getCategoriesByKeyMobile", dataSender);
      // this.$store.dispatch("getCategoryDefault");
    },
    showPopupPosts() {
      this.isShowPopupPosts = true;
      this.isShowPopupCategories = false;
      this.isShowPopupCategoriesDefault = false;
    },
    showPopupCategories() {      
      const dataSender = {
        keyword: this.search,
        size: 25,
        page: 1
      };
      this.$store.dispatch("getCategoriesByKeyMobile", dataSender);
      this.isShowPopupPosts = false;
      this.isShowPopupCategories = true;
      this.isShowPopupCategoriesDefault = false;
    },
    showPopupCategoriesDefault() {
      this.$store.dispatch("getCategoriesDefaultByKey", {
        search: this.search,
        categoriesDefault: this.$store.getters.allCateDefault
      });
      this.isShowPopupPosts = false;
      this.isShowPopupCategories = false;
      this.isShowPopupCategoriesDefault = true;
    },
    showPopupAddToGroup() {
      this.isShowAddToGroup = true;
    },
    showPopupDelete() {
      this.isShowPopupDelete = true;
    },
    async updateSearch() {
      if(this.isShowPopupPosts === true) { 
        const dataSender = {
          keyword: this.search,
          size: 25,
          page: 1
        };
        this.$store.dispatch("getPostsByKeyMobile", dataSender);
      }
      if(this.isShowPopupCategories === true) {
        const dataSender = {
          keyword: this.search,
          size: 25,
          page: 1
        };
        this.$store.dispatch("getCategoriesByKeyMobile", dataSender);
      }
      if(this.isShowPopupCategoriesDefault === true) {
        this.$store.dispatch("getCategoriesDefaultByKey", {
          search: this.search,
          categoriesDefault: this.$store.getters.allCateDefault
        });
      }
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
          border-bottom: 1px solid #444;
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
          border-bottom: 1px solid #444;
          padding: 0.5rem 0;
        }
      }
    }
  }
}
.post,
.category,
.category--default {
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
