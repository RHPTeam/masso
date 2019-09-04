<template>
  <div
    class="post--navigation d_flex justify_content_between align_items_center mb_4 position_relative"
    :data-theme="currentTheme"
  >
    <!-- Start: Navigation Left -->
    <div class="nav--left mr_auto d_flex align_items_center r m_0">
      <div class="d_flex align_items_center action--post">
        <router-link
          class="nav--link mr_2 ml_2"
          :to="{ name: 'post_posts', query: { size: 25, page: 1 } }"
          active-class="active"
          exact
        >Tất cả bài viết</router-link>
        <div class="divider"></div>
        <router-link
          class="nav--link ml_2"
          :to="{ name: 'post_postCategories', query: { size: 25, page: 1 } }"
          active-class="active"
        >Danh mục</router-link>
        <div class="divider"></div>
        <router-link
          class="nav--link ml_2"
          :to="{ name: 'categories_default' }"
          active-class="active"
        >Danh mục mẫu</router-link>
      </div>
      <div class="btn--create mr_4 mr_auto" @click="createPost">Viết bài mới</div>
    </div>
    <!-- End: Navigation Left -->
    <!-- Start: Navigation Right -->
    <div class="nav--right ml_auto">
      <div v-if="isShowHistoryButton" class="btn--history" @click="showHistory">Lịch sử đăng bài</div>
    </div>
    <!-- End: Navigation Right -->

    <!--***********POPUP***********-->
    <transition name="slide-fade">
      <post-history
        v-if="isShowHistory"
        :currentTheme="currentTheme"
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
      isShowHistory: false,
      isShowHistoryButton: true
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    newPost() {
      return this.$store.getters.newPost;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path === "/post/posts/list") {
        this.isShowHistoryButton = true;
      } else {
        this.isShowHistoryButton = false;
      }
    }
  },
  created() {
    if (this.$route.path === "/post/posts/list") {
      this.isShowHistoryButton = true;
    } else {
      this.isShowHistoryButton = false;
    }
  },
  methods: {
    async createPost() {
      const dataSender = {};

      await this.$store.dispatch("createNewPost", dataSender);
      await this.$store.dispatch("getPostById", this.newPost._id);
      this.$router.push({
        name: "post_update_post",
        params: { id: this.newPost._id }
      });
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
    .action--post {
      order: 2;
    }
    .btn--create {
      order: 1;
    }
    .nav--link {
      font-size: 0.95rem;
      font-weight: 600;
      padding: 0 0.5rem;
      text-decoration: none;
      transition: all 0.4s ease;
    }
    .btn--create {
      background-color: #ffb94a;
      border-radius: 0.5rem;
      color: #fff;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 600;
      height: 40px;
      line-height: 40px;
      padding: 0 0.75rem;
      transition: all 0.4s ease;
      &:hover {
        background-color: #ff9e4a;
      }
    }
    .divider {
      height: 16px;
      width: 2px;
    }
  }
  .nav--right {
    .btn--history {
      background-color: #27292c;
      border-radius: 0.625rem;
      color: #f7f7f7;
      cursor: pointer;
      font-size: 0.875rem;
      padding: 0.5rem 0.75rem;
      transition: all 0.4s ease;
      &:hover {
        box-shadow: 0 0 8px rgba(153, 153, 153, 0.4);
      }
    }
  }
}

/* Theme Color */
.post--navigation[data-theme="light"] {
  .nav--left {
    .nav--link {
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
      color: #ccc;
      &:hover,
      &.active {
        color: #ffb94a;
      }
    }
    .divider {
      background-color: #666;
    }
  }
  .nav--left {
    .nav--link {
      color: #ccc;
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

// =============== RESPONSIVE
@media screen and (max-width: 980px) and (min-width: 768px) {
  .post--navigation {
    flex-direction: column;
    .nav--right {
      margin-top: 0.625rem;
    }
  }
}

@media screen and (max-width: 835px) and (min-width: 768px) {
  .post--navigation {
    .nav--left {
      .action--post {
        order: 1;
        margin-bottom: 1rem;
      }
      .btn--create {
        order: 2;
      }
    }
    .nav--right {
      margin-top: 0;
    }
  }
}

@media screen and (max-width: 575px) {
  .post--navigation {
    flex-direction: column;
    .nav--left {
      flex-direction: column;
      height: 80px;
      .action {
        position: absolute;
        top: 60px;
        left: 0;
      }
    }
    .nav--right {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
