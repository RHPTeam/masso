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
          <div class="text--error" v-if="alertTitle === true">Tiêu đề không được bỏ trống!</div>
          <input type="text" placeholder="Nhập tên danh mục" v-model="nameCategory" />
        </div>
        <div class="item mt_3">
          <span>Mô tả</span>
          <textarea placeholder="Nhập tên danh mục" v-model="desCategory"></textarea>
        </div>
        <div class="item d_flex align_items_center mt_3">
          <toggle-switch
            class="mb_0 mr_3"
            color=""
            :value="mixStatus"
            :sync="true"
            @change="updateMixStatus()"
          ></toggle-switch>
          <div class="">Cho phép là danh mục nâng cao</div>
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
      mixStatus: false,
      desCategory: "",
      alertTitle: false
    };
  },
  watch: {
    "nameCategory"(value) {
      if(value.length > 0) {
        this.alertTitle = false;
      }
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async createCategory() {
      if(this.nameCategory.trim() === "") {
        this.alertTitle = true;
      } else {
        const dataSender = {
          category: {
            title: this.nameCategory,
            description: this.desCategory,
            mix: this.mixStatus
          },
          size: 25,
          page: 1
        };
        await this.$store.dispatch( "createCategory", dataSender );
        this.mixStatus = false;
        this.closePopupNewCategory();
      }
    },
    closePopupNewCategory() {
      this.$emit("closePopupNewCategory", false);
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
