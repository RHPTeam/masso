<template>
  <div class="list" :data-theme="currentTheme">
    <div class="list--header">
      <h5 class="list--header-title mb_3">Bài viết mẫu nhiều tương tác</h5>
      <span class="list--header-description"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris.</span
      >
    </div>
    <div class="list--content">
      <div class="list--filter mb_3">
        <div
          class="list--input d_flex justify_content_between align_items_center mx_auto mb_3"
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
          <input type="text" placeholder="Tìm kiếm" />
        </div>
        <div
          class="list--keywork d_flex justify_content_center align_items_center flex_wrap m_n1"
        >
          <span class="list--keywork-item py_1 px_2 m_1">keywork1</span>
          <span class="list--keywork-item py_1 px_2 m_1">keywork2</span>
          <span class="list--keywork-item py_1 px_2 m_1">keywork3</span>
          <span class="list--keywork-item py_1 px_2 m_1">keywork4</span>
          <span class="list--keywork-item py_1 px_2 m_1">keywork5</span>
        </div>
      </div>
      <app-list />
    </div>
  </div>
</template>

<script>
import AppList from "./table/index";
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    AppList
  }
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
  min-width: 300px;
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
    background-color: #ffb94a;
    border: 1px solid #ffb94a;
    border-radius: .5rem;
    cursor: pointer;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 500;
    &:hover,
    &:active,
    &:visited,
    &:focus {
      background-color: transparent;
      border: 1px solid #ffb94a;
      color: #ffb94a;
      transition: all 0.5s ease;
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
