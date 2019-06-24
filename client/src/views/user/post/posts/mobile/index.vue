<template>
  <div class="main--mobile px_3 position_relative">
    <!-- Start: Content -->
    <div class="main--content">
      <!-- Start: Search -->
      <div
        class="posts-search mb_3 d_flex align_items_center position_relative"
        :data-theme="currentTheme"
      >
        <div class="mr_auto search">
          <span class="ml_2">
            <icon-base
              class="ic--search"
              icon-name="Tìm kiếm"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-input-search/>
            </icon-base>
          </span>
          <input class="search--input" placeholder="Tìm kiếm" type="text">
        </div>
      </div>
      <!-- End: Search -->

      <!-- Start: Tabs - All Posts and Category -->
      <div class="tabs--post-category text_center d_flex align_items_center">
        <div
          class="posts items"
          @click="showPosts"
          :class="isShowPosts === true ? 'active' : '' "
        >Tất cả bài viết</div>
        <div
          class="category items"
          @click="showCategory"
          :class="isShowCategory === true ? 'active' : '' "
        >Danh mục</div>
      </div>
      <!-- End: Tabs - All Posts and Category -->

      <!-- Start: List Posts -->
      <div class="list--post pt_2" v-if="isShowPosts === true">
        <list-post/>
      </div>
      <!-- End: List Posts -->

      <!-- Start: List Posts -->
      <div class="category" v-if="isShowCategory === true">
        <VuePerfectScrollbar class="scroll-category" ref="scroll">
          <category/>
        </VuePerfectScrollbar>
      </div>
      <!-- End: List Posts -->

      <!-- Start: Create new post -->
      <!-- <div class="new--post position_fixed">
        <icon-base
          class="ic--new-post"
          icon-name="Them"
          width="25"
          height="25"
          viewBox="0 0 400 400"
        >
          <icon-create-new />
        </icon-base>
      </div>-->
      <!-- End: Create new post -->
    </div>
    <!-- End: Content -->
  </div>
</template>

<script>
import ListPost from "./posts/list";
import Category from "./category";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    ListPost,
    Category,
    VuePerfectScrollbar
  },
  data() {
    return {
      isShowCategory: false,
      isShowPosts: true
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    showPosts() {
      this.isShowCategory = false;
      this.isShowPosts = true;
    },
    showCategory() {
      this.isShowPosts = false;
      this.isShowCategory = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.main--mobile {
  .posts-search {
    background-clip: padding-box;
    background: #2b2d33;
    color: #ccc;
    border-radius: 0.5rem;
    .search {
      width: 100%;
      // background: #2b2d33;
    }
    svg.ic--search {
      vertical-align: middle;
    }
    .ic--options {
      height: 20px;
      text-align: center;
      // width: 30px;
      font-size: 14px;
    }
    .search--input {
      background-clip: padding-box;
      background: #2b2d33;
      width: 89%;
      color: #ccc;
      border: 0;
      font-size: 0.875rem;
      height: 40px;
      line-height: 40px;
      padding: 0.375rem 0.75rem 0.375rem 0.25rem;
      // width: calc(100%-24px);
      &:active,
      &:focus,
      &:visited {
        outline: 0 !important;
        box-shadow: none;
      }
    }
  }
  .tabs--post-category {
    .items {
      flex: 1;
      font-size: 0.93rem;
      padding: 0.4rem 0;
      border-bottom: 1px solid #484848;
      &.active {
        color: #ffb94a;
        border-color: #ffb94a;
      }
    }
  }
  .new--post {
    background: #ffb94a;
    display: inline-block;
    color: #fff;
    padding: 0.625rem 0.78rem;
    border-radius: 50%;
    bottom: 3.2rem;
    right: 1rem;
    svg {
      margin-left: 2px;
    }
  }
  .scroll-category {
    max-height: 63vh;
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
  animation: fadeInRight 1s;
}
.slide-fade-leave-active {
  transition: all 0.1s ease;
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>