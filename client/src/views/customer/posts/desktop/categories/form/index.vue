<template>
  <div class="category--new" :data-theme="currentTheme">
    <div class="category--new-desc mb_3">Thêm danh mục mới</div>
    <div class="category--form py_4 px_3">
      <div class="item mb_4">
        <span>Tên danh mục</span>
        <input type="text" placeholder="Nhập tên danh mục" />
      </div>
      <div class="item mb_4">
        <span>Mô tả</span>
        <textarea placeholder="Nhập tên danh mục"></textarea>
      </div>
      <div class="item">
        <button>Thêm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style lang="scss" scoped>
.category--new {
  color: #444444;
  font-size: 14px;
  &-desc {
    font-weight: 600;
    height: 40px;
  }
  .category--form {
    background-color: #ffffff;
    border-radius: 10px;
  }
  .item {
    > span {
      color: #000;
      font-weight: 600;
    }
    > input,
    > textarea {
      border: solid 1px #e4e4e4;
      border-radius: 0.5rem;
      margin-top: 0.75rem;
      outline: none;
      transition: all 0.4s ease;
      width: 100%;
      &:focus {
        border-color: #ffb94a;
      }
    }
    > input {
      padding: 0 0.75rem;
      height: 40px;
    }
    > textarea {
      height: 120px;
      padding: 0.75rem;
      resize: none;
    }
    > button {
      background-color: #ffb94a;
      border: solid 1px #ffb94a;
      border-radius: 0.5rem;
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      height: 40px;
      transition: all 0.4s ease;
      width: 80px;
      &:hover {
        background-color: transparent;
        color: #ffb94a;
      }
    }
  }
}
//CHANGE BACKGROUND COLOR THEME

//LIGHT
.category--new[data-theme="light"] {
  .category--new-desc {
    color: #444;
  }
  .category--form {
    background-color: #fff;
  }
  .item {
    > span {
      color: #000;
    }
    input,
    textarea {
      background-color: #fff;
      color: #444;
    }
  }
}

//DARK
.category--new[data-theme="dark"] {
  .category--new-desc {
    color: #cccccc;
  }
  .category--form {
    background-color: #27292d;
  }
  .item {
    > span {
      color: #cccccc;
    }
    input,
    textarea {
      background-color: #2f3136;
      border-color: #2f3136;
      color: #cccccc;
    }
  }
}
</style>
