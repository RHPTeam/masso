<template>
  <div class="select">
    <div class="category">
      <!-- Start: Top -->
      <div class="top mb_3">
        <div class="font_weight_bold">Tùy chọn đăng bài viết trong danh mục của bạn</div>
      </div>
      <!-- End: Top -->
      <!-- Start: Body Category -->
      <div class="body--category mb_3" :class="caseEvent.active === 0 ? 'active' : ''">
        <div class="desc mb_3 text_left">
          <span class="desc--text">Danh mục bài viết</span>
        </div>
          <div class="option">
            <multiselect
              label="title"
              :clearable="false"
              :value="event.post_category"
              :options="categories"
              @input="selectCategory"
              placeholder="Chọn danh mục đăng bài "
            />
          </div>
        <div class="desc--alert mt_2" v-if="isShowError === true">Thằng ngu chọn danh mục không có bài viết kìa</div>
      </div>
      <!-- End: Body Category -->
    </div>

    <!-- Start: Body Select List Post -->
    <div class="body mb_3"  :class="caseEvent.listPost === 0 ? 'active' : ''">
      <div class="desc mb_2 text_left">
        <span class="desc--text font_weight_bold">Lựa chọn bài viết từ kho nội dung</span>
      </div>
        <div class="option">
          <multiselect
            label="title"
            multiple
            :options="allPost"
            :value="event.post_custom"
            @input="selectPost"
            placeholder="Chọn bài viết"
          />
        </div>
      <div class="desc--alert mt_2">
        Khuyên dùng! Một bài viết không được đăng quá 5 vị trí khác nhau.
        Điều này, giúp tài khoản của bạn an toàn, spam, vi phạm tiêu chuẩn công động, v.v
      </div>
    </div>
    <!-- End: Body List Post-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowError: false
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allPost() {
      return this.$store.getters.allPost;
    },
    event() {
      return this.$store.getters.event;
    },
    categories(){
      return this.$store.getters.allCategories;
    },
    caseEvent() {
      return this.$store.getters.caseEvent;
    }
  },
  async created(){
    if ( this.allPost.length === 0 ) {
      await this.$store.dispatch( "getAllPost" );
    }
    if ( this.categories.length === 0 ) {
      await this.$store.dispatch( "getAllCategories" );
    }
  },
  methods: {
    resetPostType() {
      this.$store.dispatch( "setCaseEvent", {
        key: "target",
        value: 0
      } );
      this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: 0
      } );
      // Remove post_category
      this.$store.dispatch( "setEventRemove", "post_category" );
    },
    selectPost( value ){
      const listPost = value.map(item => item._id);
      this.$store.dispatch( "setEventPush", {
        key: "post_custom",
        value: listPost
      } );
    },
    async selectCategory( category ){
      console.log(category);
      if(category.totalPost === 0) {
        this.isShowError = true;
      } else {
        await this.$store.dispatch( "setCaseEvent", {
          key: "active",
          value: 0
        } );
        await this.$store.dispatch( "setEvent", {
          key: "post_category",
          value: {
            _id: category._id,
            title: category.title
          }
        } );
        this.$store.dispatch( "setEvent", {
          key: "post_custom",
          value: []
        } );
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .select {
    color: #ccc;
  }
  .body {
    border-radius: .625rem;
    width: 100%;
    .desc {
      color: #ccc;
      font-size: .875rem;
      font-weight: 600;
      svg {
        margin-bottom: -8px;
      }
      &--alert {
        color: #ffb94a;
      }
    }
    .option {
      border: 1px solid #e4e4e4;
      border-radius: calc(.5rem + 2px);
      width: 100%;
    }
  }
  .active {
    color: #ffb94a !important;
  }
  .category {
    color: #ccc;
    .top {
      color: #ccc;
    }
    .body--category {
      border-radius: .625rem;
      .desc {
        color: #ccc;
        font-size: .875rem;
        font-weight: 600;
        svg {
          margin-bottom: -8px;
        }
      }
      .option {
        border: 1px solid #e4e4e4;
        border-radius: calc(.5rem + 2px);
        width: 50%;
      }
    }
    .bottom {
      .next {
        border: 1px solid #e4e4e4;
        border-radius: .625rem;
        cursor: pointer;
        padding: .5rem 1rem;
      }
    }
  }
</style>
