<template>
  <div class="popup">
    <!-- Start: Header -->
    <div class="popup--header position_relative mx_3 pt_2">
      <div class="popup--title text_center mt_1">Thêm nội dung nâng cao</div>
      <div class="btn--close position_absolute"
           @click.prevent="closePopup"
      >
        <icon-base
          class="icon--close"
          icon--name="Hủy"
          height="12px"
          width="12px"
          viewBox="0 0 20 20"
        >
          <icon-close></icon-close>
        </icon-base>
      </div>
    </div>
    <!-- End: Header -->
    <!-- Start: Body -->
    <div class="popup--body mx_3">
      <div class="text--error mb_2" v-if="errorStatus">
        {{ errorText }}
      </div>
      <!-- Start: Beginning -->
      <div class="form--group">
        <div class="title mb_2">
          Mở bài
        </div>
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
        <div class="title mb_2">
          Kết bài
        </div>
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
    <!-- End: Body -->
    <!-- Start: Footer -->
    <div class="popup--footer mx_3 mt_2">
      <div class="d_flex">
        <button class="btn btn_success save" @click="submit">Thêm</button>
      </div>
      <div class="desc mt_3">Các bài viết trong danh mục được lựa chọn sẽ tự động được thêm làm mở bài hay kết bài trong mỗi lần đăng bài viết.
        Điều này hạn chế trùng lặp nội dung, bảo vệ tài khoản của bạn khỏi spam hay vi phạm tiêu chuẩn cộng đồng của Facebook.
      </div>
    </div>
    <!-- End: Footer -->
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
    }
  },
  computed: {
    event() {
      return this.$store.getters.event;
    },
    mixCategories() {
      return this.$store.getters.mixCategories;
    }
  },
  watch: {
    "beginningCategory"( value) {
      if ( value && this.endingCategory ) {
        if ( value._id === this.endingCategory._id ) {
          this.errorStatus = true;
          this.errorText = "Danh mục mở bài và kết bài trùng nhau!"
        } else {
          this.errorStatus = false;
          this.errorText = "";
        }
      } else {
        this.errorStatus = false;
        this.errorText = "";
      }
    },
    "endingCategory"( value ) {
      if ( value && this.beginningCategory ) {
        if ( value._id === this.beginningCategory._id ) {
          this.errorStatus = true;
          this.errorText = "Danh mục mở bài và kết bài trùng nhau!"
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
    this.$store.dispatch( "getMixCategories" );
  },
  methods: {
    closePopup() {
      this.$emit( "close", false );
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
      if ( dataSender.mix.open && dataSender.mix.open._id === undefined ) {
        dataSender.mix.open = "";
      }
      if ( dataSender.mix.close && dataSender.mix.close._id === undefined ) {
        dataSender.mix.close = "";
      }

      //Validate
      if ( this.beginningCategory === "" && this.endingCategory === "" ) {
        this.errorStatus = true;
        this.errorText = "Bạn phải chọn danh mục mở bài hoặc kết bài!"
      } else {
        this.errorStatus = false;
        this.errorText = "";
      }
      if ( this.errorStatus ) return;

      await this.$store.dispatch( "setEvent", {
        key: "plugins",
        value: dataSender
      } );

      this.closePopup();
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./index.style";
</style>
