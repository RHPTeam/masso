<template>
  <div class="post--navigation d_flex justify_content_between align_items_center mb_4" :data-theme="currentTheme">
    <!-- Start: Navigation Left -->
    <div class="nav--left d_flex justify_content_start align_items_center">
      <div class="btn--create mr_3"
           @click="createPost"
      >Viết bài mới</div>
      <router-link
        class="mr_2"
        tag="button"
        :to="{ name: 'post_posts' }"
        active-class="active"
        exact
      >Tất cả bài viết</router-link
      >
      <div class="divider"></div>
      <router-link
        class="ml_2"
        tag="button"
        :to="{ name: 'post_postCategories' }"
        active-class="active"
      >Danh mục</router-link
      >
    </div>
    <!-- End: Navigation Left -->
    <!-- Start: Navigation Right -->
    <div class="nav--right">
      <div class="btn--history"
           @click="showHistory"
      >
        <icon-base
          class="icon--info"
          width="22px"
          height="22px"
          viewBox="0 0 20 20"
        >
          <icon-info></icon-info>
        </icon-base>
      </div>
    </div>
    <!-- End: Navigation Right -->

    <!--***********POPUP***********-->
    <transition name="slide-fade">
      <post-history
        v-if="isShowHistory"
        @close="isShowHistory = $event"
      ></post-history>
    </transition>
  </div>
</template>

<script>
import PostHistory from "../../popups/history";

export default {
  components: {
    PostHistory
  },
  data() {
    return {
      isShowHistory: false
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    newPost() {
      return this.$store.getters.newPost;
    }
  },
  methods: {
    async createPost() {
      const dataSender = {};

      await this.$store.dispatch( "createNewPost", dataSender );
      this.$router.push( {
        name: "post_update_post",
        params: { id: this.newPost._id }
      } );
    },
    showHistory() {
      this.isShowHistory = !this.isShowHistory;
    }
  }
};
</script>

<style lang="scss" scoped>
.post--navigation {
  .nav--left {
    height: 40px;
    > button {
      background-color: transparent;
      border: 0;
      border-radius: .625rem;
      cursor: pointer;
      font-size: .95rem;
      font-weight: 600;
      height: 100%;
      outline: none;
      padding: 0 .5rem;
      transition: all 0.4s ease;
    }
    .btn--create {
      background-color: #ffb94a;
      border-radius: 0.5rem;
      color: #fff;
      cursor: pointer;
      font-size: .95rem;
      font-weight: 600;
      height: 40px;
      line-height: 40px;
      padding: 0 .75rem;
      transition: all 0.4s ease;
      &:hover {
        background-color: #FF9E4A;
      }
    }
    .divider {
      height: 16px;
      width: 2px;
    }
  }
  .nav--right {
    .icon--info {
      cursor: pointer;
      transition: all .4s ease;
    }
  }
}

/* Theme Color */
.post--navigation[data-theme="light"] {
  .nav--left {
    button {
      color: #999999;
      &:hover,
      &.active {
        color: #ffb94a;
      }
    }
    .divider {
      background-color: #ccc;
    }
  }
  .nav--right {
    .icon--info {
      color: #999;
      &:hover {
        color: #444;
      }
    }
  }
}

.post--navigation[data-theme="dark"] {
  .nav--right {
    button {
      color: #999999;
      &:hover,
      &.active {
        color: #ffb94a;
      }
    }
    .divider {
      background-color: #666;
    }
  }
}
</style>
