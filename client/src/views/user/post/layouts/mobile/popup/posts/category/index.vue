<template>
  <div class="form-wrapper" :data-theme="currentTheme">
    <!-- Start: Create Form -->
    <div class="category--form">
      <div class="items--header d_flex align_items_center">
        <div @click="closePopupNewCategory">
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
        <p class="name--modal mb_0">Thêm danh mục mới</p>
        <div class="active mr_3" @click="createCategory">Thêm</div>
      </div>
      <div class="items--body px_2 mt_3">
        <div class="item">
          <span>Tên danh mục</span>
          <input type="text" placeholder="Nhập tên danh mục" v-model="nameCategory" />
        </div>
        <div class="item mt_3">
          <span>Mô tả</span>
          <textarea placeholder="Nhập tên danh mục" v-model="desCategory"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameCategory: "",
      desCategory: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async createCategory() {
      const dataSender = {
        category: {
          title: this.nameCategory,
          description: this.desCategory
        },
        size: 25,
        page: 1
      };
      await this.$store.dispatch( "createCategory", dataSender );
      this.closePopupNewCategory();
    },
    closePopupNewCategory() {
      this.$emit("closePopupNewCategory", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
