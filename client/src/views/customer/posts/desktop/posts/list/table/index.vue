<template>
  <div class="post--data my_3" :data-theme="currentTheme">
    <div class="item--header d_flex align_items_center px_3 py_2">
      <div class="col col--checkbox px_2">
        <label class="custom--checkbox mb_0">
          <input type="checkbox" />
        </label>
      </div>
      <div class="col col--name px_2">Tên bài viết</div>
      <div class="col col--category px_2">Danh mục</div>
      <div class="col col--image px_4">Hình ảnh</div>
      <div class="col col--action px_4">Hành động</div>
    </div>
    <!-- if all post === undefined call component loading -->
    <div v-if="allPost.length === 0" class="results text_center p_3 bg_danger">
      Hiện tại bạn chưa có bài viết, vui lòng tạo mới bài viết của bạn.
    </div>
    <!-- else call component item post -->
    <div v-else>
      <div v-if="this.$store.getters.statusPost === 'loading'">đang tải kết quả</div>
      <div v-for="(item, index) in allPost" :key="index">
        <item-post :item="item" />
      </div>
    </div>
    <!-- Start: pagination post-->
    <div>
      <paginate-post />
    </div>
    <!-- End: pagination post-->
  </div>
</template>

<script>
import ItemPost from "./item";
import PaginatePost from "./paginate";
export default {
  components: {
    ItemPost,
    PaginatePost
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allPost () {
      return this.$store.getters.allPost;
    }
  },
  async created  () {
    await this.$store.dispatch( "getAllPost" );
  }
};
</script>

<style lang="scss" scoped>
.post--data {
  font-size: 0.875rem;
  .item--header {
    background-color: #ffffff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #666666;
    font-weight: 600;
    height: 48px;
  }
  .results {
    color: #ffffff;
  }
  .item--body {
    background-color: #fafafa;
    min-height: 48px;
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
  .col--checkbox {
    height: 20px;
    width: calc(20px + 1rem);
  }
  .col--name {
    width: calc(100% - 20% - 312px - 7rem);
  }
  .col--category {
    width: 20%;
  }
  .col--image {
    width: calc(217px + 3rem);
  }
  .col--action {
    width: calc(75px + 3rem);
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
.custom--checkbox {
  input[type="checkbox"] {
    border-radius: 6px;
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

// RESPONSIVE
@media only screen and (max-width: 1366px) {
  .post--data {
    .col--name {
      width: calc(82% - 280px - 3rem);
    }
    .col--category {
      width: 18%;
    }
    .col--content {
      display: none;
    }
    .col--image {
      width: calc(185px + 1rem);
      padding: 0 0.5rem !important;
    }
    .col--action {
      width: calc(75px + 1rem);
      padding: 0 0.5rem !important;
    }
  }
}
@media only screen and (max-width: 1024px) {
  .post--data {
    .col--name {
      width: calc(100% - 250px - 2rem);
    }
    .col--category {
      width: 155px;
    }
    .col--image {
      display: none;
    }
  }
}
@media only screen and (max-width: 992px) {
  .post--data {
    .col--name {
      width: calc(100% - 95px - 2rem);
    }
    .col--category {
      display: none !important;
    }
  }
}

// CHANGE BACKGROUND COLOR THEME

//LIGHT

.post--data[data-theme="light"] {
  .item--header {
    background-color: #fff;
  }
  .item--body {
    background-color: #fafafa;
  }
  .image--wrap-more {
    background-color: #e4e4e4;
    color: #999999;
  }
}

//DARK

.post--data[data-theme="dark"] {
  .item--header {
    background-color: #27292d;
    color: #cccccc;
  }
  .item--body {
    background-color: #27292c;
    color: #999999;
  }
  .image--wrap-more {
    background-color: #2f3136;
    color: #999999;
  }
}
</style>
