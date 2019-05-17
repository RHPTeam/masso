<template>
  <div class="list" :data-theme="currentTheme">
    <div class="list--header">
      <h5 class="list--header-title mb_3">Bài viết mẫu nhiều tương tác</h5>
      <span class="list--header-description"
        >
        Bài viết mẫu được gợi ý dựa trên các từ khóa bạn sử dụng trong thông tin cá nhân,
        hoặc bạn có thể trực tiếp tìm kiếm bài viết cụ thể khác bằng từ khóa trên thanh tìm kiếm.
      </span
      >
    </div>
    <div class="list--content">
      <div class="list--filter mb_3">
        <div
          class="list--input d_flex justify_content_between align_items_center mx_auto mb_2"
        >
          <span class="ml_3 mt_1">
            <icon-base
              icon-name="input-search"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-input-search />
            </icon-base>
          </span>
          <input type="text" placeholder="Tìm kiếm" v-model="keyword" @keydown.enter="searchPostByKeyword" />
        </div>
        <div
          class="list--keywork d_flex justify_content_center align_items_center flex_wrap m_n1"
        >
          <span
            v-show="keyPopular && keyPopular.length > 0"
            class="list--keywork-item py_1 m_1"
            v-for="(item, index) in keyPopular"
            :key="index"
            @click="searchPostByKey(item)"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <app-list />
    </div>
  </div>
</template>

<script>
import AppList from "./table/index";
export default {
  components: {
    AppList
  },
  data() {
    return {
      keyword: ""
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    user(){
      return this.$store.getters.userInfo;
    },
    keyPopular(){
      if(Object.entries(this.user).length === 0 && this.user.constructor === Object) return;
      return this.user.keywords.slice(0,5);
    }
  },
  async created() {
    await this.$store.dispatch( "getUserInfo" );
  },
  methods: {
    searchPostByKey( val ) {
      const dataSender = {
        key: val,
        size: 10
      };
      this.$store.dispatch( "searchPostFromLibrariesByKey", dataSender );
    },
    searchPostByKeyword(){
      if( this.keyword.length > 0 ) {
        const dataSender = {
          key: this.keyword,
          size: 10
        };
        this.$store.dispatch( "searchPostFromLibrariesByKey", dataSender );
      } else {
        this.$store.dispatch( "getAllPostLibraries" );
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.list--header {
  color: #444444;
  margin-bottom: 1.25rem;
  &-title {
    font-size: 1rem;
    font-weight: 600;
  }
  &-description {
    color: #999999;
    font-size: .875rem;
  }
}
.list--input {
  border-radius: 10px;
  font-size: 0.875rem;
  height: 40px;
  max-width: 100%;
  width: 60%;
  min-width: 400px;
  > input[type="text"] {
    background-color: transparent;
    border-top-right-radius: calc(0.5rem + 2px);
    border-bottom-right-radius: calc(0.5rem + 2px);
    border: 0;
    font-size: 0.875rem;
    height: 100%;
    outline: none;
    width: calc(100% - 48px);
  }
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #ccc;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: #ccc;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: #ccc;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: #999;
  }
  svg {
    color: #999;
  }
}
.list--keywork {
  &-item {
    cursor: pointer;
    color: $color-dark-2;
    font-size: calc(1rem - 3px);
    font-weight: 500;
    text-decoration: underline;
    &:hover,
    &:active,
    &:visited,
    &:focus {
      color: #ffb94a;
    }
  }
}
// CHANGE COLOR THEME
.list[data-theme="light"] {
  .list--header {
    color: #444444;
  }
  .list--input {
    background-color: #ffffff;
    input[type="text"] {
      background: #ffffff;
      color: #000;
    }
  }
}
.list[data-theme="dark"] {
  .list--header {
    color: #ccc;
  }
  .list--input {
    background-color: #27292d;
    input[type="text"] {
      background: #27292d;
      color: #ccc;
    }
  }
}
</style>
