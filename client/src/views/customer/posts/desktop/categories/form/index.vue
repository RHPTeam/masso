<template>
  <div class="form-wrapper" :data-theme="currentTheme">
    <!-- Start: Create Form -->
    <div class="category--form p_3" v-if="isUpdateCategory === false">
      <div class="form--title mb_3">Thêm danh mục mới</div>
      <div class="item">
        <span>Tên danh mục</span>
        <input type="text" placeholder="Nhập tên danh mục" v-model="nameCategory" />
      </div>
      <div v-if="this.$store.getters.statusError.status === 'fail'"
           class="text--error mt_1"
      >
        {{ this.$store.getters.statusError.data.title }}
      </div>
      <div class="item mt_3">
        <span>Mô tả</span>
        <textarea placeholder="Nhập tên danh mục" v-model="desCategory"></textarea>
      </div>
      <div class="item mt_3" @click="createCategory">
        <button>Thêm mới</button>
      </div>
    </div>
    <!-- End: Create Form -->
    <!-- Start: Update Form -->
    <div class="category--form p_3" v-if="isUpdateCategory === true">
      <div class="form--title mb_3">Cập nhật danh mục</div>
      <div class="item">
        <span>Tên danh mục</span>
        <input type="text" placeholder="Nhập tên danh mục" v-model="category.title" />
      </div>
      <div class="item mt_3">
        <span>Mô tả</span>
        <textarea placeholder="Nhập tên danh mục" v-model="category.description"></textarea>
      </div>
      <div class="item d_flex justify_content_between mt_3" @click="updateCategory">
        <button>Cập nhật</button>
        <button class="btn--cancel" @click="cancelUpdateCategory">Hủy</button>
      </div>
    </div>
    <!-- End: Update Form -->
  </div>
</template>

<script>
export default {
  props: [ "currentPage", "filterShowSelected", "isUpdateCategory" ],
  data() {
    return {
      nameCategory: "",
      desCategory: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    category() {
      return this.$store.getters.categoryById;
    }
  },
  methods: {
    cancelUpdateCategory () {
      this.$emit( "cancelUpdateCategory", false );
    },
    async createCategory() {
      const dataSender = {
        category: {
          title: this.nameCategory,
          description: this.desCategory
        },
        page: this.currentPage,
        size: this.filterShowSelected.id
      };
      await this.$store.dispatch( "createCategory", dataSender );
    },
    updateCategory() {
      const dataSender = {
        id: this.category._id,
        category: {
          title: this.category.title,
          description: this.category.description
        },
        page: this.currentPage,
        size: this.filterShowSelected.id
      };

      this.$store.dispatch( "updateCategory", dataSender );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
