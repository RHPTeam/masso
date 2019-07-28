<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog">
      <div class="modal--header d_flex align_items_center">
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
        <p class="name--modal mb_0 m_auto">Nội dung nâng cao</p>
        <div class="active mr_2" @click="submit">Xong</div>
      </div>
      <div class="modal--body px_2">
        <div class="text--error mb_2" v-if="errorStatus">{{ errorText }}</div>
        <!-- Start: Beginning -->
        <div class="form--group">
          <div class="title mb_2">Mở bài</div>
          <multiselect
            label="title"
            class="form--control"
            placeholder="Chọn danh mục mở bài"
            v-model="beginningCategory"
            :options="mixCategories"
          ></multiselect>
        </div>
        <!-- End: Beginning -->
        <!-- Start: Ending -->
        <div class="form--group mt_3">
          <div class="title mb_2">Kết bài</div>
          <multiselect
            label="title"
            class="form--control"
            placeholder="Chọn danh mục kết bài"
            v-model="endingCategory"
            :options="mixCategories"
          ></multiselect>
        </div>
        <!-- End: Ending -->
      </div>
      <!-- Start: Footer -->
      <div class="modal--footer px_2 mt_2">
        <div class="desc">Các bài viết trong danh mục được lựa chọn sẽ tự động được thêm làm mở bài hay kết bài trong mỗi lần đăng bài viết.
          Điều này hạn chế trùng lặp nội dung, bảo vệ tài khoản của bạn khỏi spam hay vi phạm tiêu chuẩn cộng đồng của Facebook.
        </div>
      </div>
      <!-- End: Footer -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      beginningCategory: "",
      endingCategory: "",
      errorStatus: false,
      errorText: ""
    };
  },
  computed: {
    event() {
      return this.$store.getters.event;
    },
    mixCategories() {
      return this.$store.getters.mixCategories;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    async submit() {
      const dataSender = {
        mix: {
          open: {
            _id: this.beginningCategory._id,
            title: this.beginningCategory.title
          },
          close: {
            _id: this.endingCategory._id,
            title: this.endingCategory.title
          }
        }
      };

      // Check close or open undefined
      if (dataSender.mix.open && dataSender.mix.open._id === undefined) {
        dataSender.mix.open = "";
      }
      if (dataSender.mix.close && dataSender.mix.close._id === undefined) {
        dataSender.mix.close = "";
      }

      //Validate
      if (this.beginningCategory === "" && this.endingCategory === "") {
        this.errorStatus = true;
        this.errorText = "Bạn phải chọn danh mục mở bài hoặc kết bài!";
      } else {
        this.errorStatus = false;
        this.errorText = "";
      }
      if (this.errorStatus) return;

      await this.$store.dispatch("setEvent", {
        key: "plugins",
        value: dataSender
      });

      this.closePopup();
    }
  },
  watch: {
    beginningCategory(value) {
      if (value && this.endingCategory) {
        if (value._id === this.endingCategory._id) {
          this.errorStatus = true;
          this.errorText = "Danh mục mở bài và kết bài trùng nhau!";
        } else {
          this.errorStatus = false;
          this.errorText = "";
        }
      } else {
        this.errorStatus = false;
        this.errorText = "";
      }
    },
    endingCategory(value) {
      if (value && this.beginningCategory) {
        if (value._id === this.beginningCategory._id) {
          this.errorStatus = true;
          this.errorText = "Danh mục mở bài và kết bài trùng nhau!";
        } else {
          this.errorStatus = false;
          this.errorText = "";
        }
      } else {
        this.errorStatus = false;
        this.errorText = "";
      }
    }
  },
  created() {
    this.$store.dispatch("getMixCategories");
  }
};
</script>
<style lang="scss" scoped>
@import "../../index.style";
.modal--body {
  padding: 0.75rem 0;
  .text--error {
    color: #f44542;
    font-size: 0.825rem;
  }
}
.modal--footer {
  background-color: #2f3136;
  border-radius: .375rem;
  color: #ccc;
  font-size: .8135rem;
  padding: .25rem .5rem;
}
.form--group {
  .title {
    color: #ccc;
    font-size: 0.825rem;
    font-weight: 600;
  }
  .form--control {
    border: 1px solid #444;
    border-radius: .5rem;
  }
}
</style>
