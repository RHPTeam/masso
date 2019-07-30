<template>
  <div class="form-wrapper" :data-theme="currentTheme">
    <!-- Start: Create Form -->
    <div class="category--form">
      <div class="items--header d_flex align_items_center">
        <div @click="closePopup">
          <icon-base
            icon-name="arrow-down"
            class="arrow-down"
            width="20"
            height="20"
            viewBox="0 0 130 130"
          >
            <icon-arrow-down />
          </icon-base>
        </div>
        <p class="name--modal mb_0">Sửa danh mục</p>
        <div class="active mr_3" @click="updateCategory">Xong</div>
      </div>
      <div class="items--body px_3 mt_3">
        <div class="item">
          <span>Tên danh mục</span>
          <div class="error my_1" v-if="isShowAlertTitle === true">Tên danh mục không được bỏ trống</div>
          <input type="text" placeholder="Nhập tên danh mục" v-model="item.title" />
        </div>
        <div class="item mt_3">
          <span>Mô tả</span>
          <textarea placeholder="Nhập tên danh mục" v-model="item.description"></textarea>
        </div>
        <div class="item d_flex align_items_center mt_3">
          <toggle-switch
            class="mb_0 mr_3"
            color
            :value="item.mix"
            :sync="true"
            @change="updateCategoryMix()"
          ></toggle-switch>
          <div class>Cho phép là danh mục nâng cao</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      desCategory: "",
      nameCategory: "",
      isShowAlertTitle: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    updateCategoryMix() {
      this.item.mix = !this.item.mix;
    },
    updateCategory() {
      if (this.item.title.length === 0) {
        this.isShowAlertTitle = true;
      } else {
        const dataSender = {
          id: this.item._id,
          category: {
            title: this.item.title,
            description: this.item.description,
            mix: this.item.mix
          }
        };
        this.$store.dispatch("updateCategory", dataSender);
        this.$emit("closePopup", false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-wrapper {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #2f3136;
  color: #ccc;
  z-index: 10;
  font-size: 0.875rem;

  .items--header {
    padding: 0.625rem 0;
    border-bottom: 1px solid #444;

    .arrow-down {
      transform: rotate(90deg);
      margin-left: 0.5rem;
    }

    .name--modal {
      margin: auto;
    }
  }

  .form--title {
    font-weight: 600;
    font-size: 1rem;
  }

  .category--form {
    height: 100%;
    width: 100%;
  }

  .item {
    > input,
    > textarea {
      border: 1px solid;
      border-radius: 0.625rem;
      margin-top: 0.5rem;
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

    button {
      text-transform: uppercase;
      color: #fff;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
      height: 40px;
      padding: 0 0.75rem;
      transition: all 0.4s ease;
      background: none;
      border: 0;
    }
  }

  .error {
    color: #da2c2c;
    font-size: 0.825rem;
  }
}

/* Theme Color */
/* Light */
.form-wrapper[data-theme="light"] {
  // color: #444444;

  // .category--new-desc {
  //   color: #444;
  // }

  // .category--form {
  //   background-color: #fff;
  // }

  // .item {
  //   >span {
  //     color: #666666;
  //   }

  //   input,
  //   textarea {
  //     background-color: #fff;
  //     border-color: #e4e4e4;
  //     color: #444;

  //     &::placeholder {
  //       color: #ccc;
  //     }
  //   }
  // }
}

/* Dark */
.form-wrapper[data-theme="dark"] {
  color: #f7f7f7;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(12, 12, 12, 0.73);
  z-index: 10;

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
      background-color: #27292d;
      border-color: #444;
      color: #f7f7f7;

      &::placeholder {
        color: #666;
      }
    }
  }
}
</style>
