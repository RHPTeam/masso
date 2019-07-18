<template>
  <div class="form-wrapper" :data-theme="currentTheme">
    <!-- Start: Create Form -->
    <div class="category--form p_3" v-if="isUpdateCategory === false">
      <div class="form--title mb_3">Thêm danh mục mới</div>
      <div class="item">
        <span>Tên danh mục</span>
        <input type="text" placeholder="Nhập tên danh mục" v-model="nameCategory" />
      </div>
      <div v-if="errorStatus"
           class="text--error mt_1"
      >
        {{ errorText }}
      </div>
      <div class="item mt_3">
        <span>Mô tả</span>
        <textarea placeholder="Nhập tên danh mục" v-model="desCategory"></textarea>
      </div>
      <div class="item d_flex align_items_center mt_3 mb_4">
        <toggle-switch
          class="mb_0 mr_3"
          color=""
          :value="mixStatus"
          :sync="true"
          @change="updateMixStatus()"
        ></toggle-switch>
        <div class="">Cho phép là danh mục nâng cao</div>
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
      <div class="item d_flex align_items_center mt_3 mb_4">
        <toggle-switch
          class="mb_0 mr_3"
          v-if="category.mix"
          color=""
          :value="category.mix"
          :sync="true"
          @change="updateCategoryMix()"
        ></toggle-switch>
        <toggle-switch
          class="mb_0 mr_3"
          v-else
          color=""
          :value="mixStatus"
          :sync="true"
          @change="updateMixStatus()"
        ></toggle-switch>
        <div class="">Cho phép là danh mục nâng cao</div>
      </div>
      <div class="item d_flex justify_content_between mt_3">
        <button @click="updateCategory">Cập nhật</button>
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
      errorStatus: false,
      errorText: "",
      desCategory: "",
      mixStatus: false,
      nameCategory: "",
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
          description: this.desCategory,
          mix: this.mixStatus
        },
        page: this.currentPage,
        size: this.filterShowSelected.id
      };

      if ( this.nameCategory === ""  ) {
        this.errorStatus = true;
        this.errorText = "Tiêu đề không được bỏ trống!";
        return;
      }

      // Reset value
      this.errorStatus = false;
      this.errorText = "";

      await this.$store.dispatch( "createCategory", dataSender );
      this.nameCategory = "";
      this.desCategory = "";
      this.mixStatus = false;
    },
    updateCategory() {
      const dataSender = {
        id: this.category._id,
        category: {
          title: this.category.title,
          description: this.category.description,
          mix: this.category.mix ? this.category.mix : this.mixStatus
        },
        page: this.currentPage,
        size: this.filterShowSelected.id
      };

      this.$store.dispatch( "updateCategory", dataSender );
      this.$emit( "comebackDefault", false );
      this.mixStatus = false;
    },
    updateCategoryMix() {
      this.category.mix = !this.category.mix;
    },
    updateMixStatus() {
      this.mixStatus = !this.mixStatus;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
