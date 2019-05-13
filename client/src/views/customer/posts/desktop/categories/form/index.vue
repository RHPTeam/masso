<template>
  <div class="form-wrapper" :data-theme="currentTheme">
    <!-- Start: Create Form -->
    <div class="category--form p_3" v-if="isUpdateCategories === false">
      <div class="form--title mb_3">Thêm danh mục mới</div>
      <div class="item">
        <span>Tên danh mục</span>
        <input type="text" placeholder="Nhập tên danh mục" v-model="nameCategories" />
      </div>
      <div v-if="this.$store.getters.statusError.status === 'fail'"
           class="text--error mt_1"
      >
        {{ this.$store.getters.statusError.data.title }}
      </div>
      <div class="item mt_3">
        <span>Mô tả</span>
        <textarea placeholder="Nhập tên danh mục" v-model="desCategories"></textarea>
      </div>
      <div class="item mt_3" @click="createCategories">
        <button>Thêm mới</button>
      </div>
    </div>
    <!-- End: Create Form -->
    <!-- Start: Update Form -->
    <div class="category--form p_3" v-if="isUpdateCategories === true">
      <div class="form--title mb_3">Cập nhật danh mục</div>
      <div class="item">
        <span>Tên danh mục</span>
        <input type="text" placeholder="Nhập tên danh mục" v-model="categories.title" />
      </div>
      <div class="item mt_3">
        <span>Mô tả</span>
        <textarea placeholder="Nhập tên danh mục" v-model="categories.description"></textarea>
      </div>
      <div class="item mt_3" @click="updateCategories">
        <button>Cập nhật</button>
      </div>
    </div>
    <!-- End: Update Form -->
  </div>
</template>

<script>
export default {
  props: {
    isUpdateCategories: {
      type: Boolean
    }
  },
  data() {
    return {
      nameCategories: "",
      desCategories: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categories() {
      return this.$store.getters.categoriesById;
    }
  },
  methods: {
    async createCategories() {
      const dataSender = {
        title: this.nameCategories,
        description: this.desCategories
      };
      await this.$store.dispatch( "createCategories", dataSender );
      this.nameCategories = "";
      this.desCategories = "";
    },
    updateCategories() {
      this.$store.dispatch( "updateCategories", this.categories );
      this.categories.title = "";
      this.categories.description = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
