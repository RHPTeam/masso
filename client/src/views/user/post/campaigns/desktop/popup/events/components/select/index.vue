<template>
  <div class="select">
    <div class="category">
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
        <div class="desc--alert mt_2" v-if="isShowError === true">Danh mục không có bài viết, vui lòng chọn lại danh mục</div>
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
            multiple
            label="title"
            :clearable="false"
            :options="allPost"
            :value="event.post_custom"
            @input="selectPost"
            placeholder="Chọn bài viết"
          />
        </div>
      <div class="desc--alert mt_2" v-if="isShowError === true">Vui lòng chọn bài viết để tiếp tục</div>
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
    },
    convertNameCategories(){
      let cateId = this.event.post_category;
      return this.categories.filter(cate => {
        if(cate._id === cateId) return {
          title: cate.title,
          id: cate._id
        }
      })
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
    async selectPost( value ){
      if(value) {
        await this.$emit("setErrorPost", false);
      }
      if(value.length === 0)  {
        this.isShowError = true;
      } else {
        // Active Option
        await this.$store.dispatch( "setCaseEvent", {
          key: "listPost",
          value: 0
        } );
        // Attach Post Category Empty
        await this.$store.dispatch( "setEvent", {
          key: "post_category",
          value: []
        } );
        this.$store.dispatch( "setEvent", {
          key: "post_custom",
          value: value
        } );
      }
    },
    async selectCategory( category ){
      if(category) {
        await this.$emit("setErrorPost", false);
      }
      if (category.totalPosts !== 0) {
        this.isShowError = false;
      }
      if(category.totalPosts === 0) {
        this.isShowError = true;
      } else {
        await this.$store.dispatch( "setCaseEvent", {
          key: "active",
          value: 0
        } );
        await this.$store.dispatch( "setEvent", {
          key: "post_custom",
          value: []
        } );
        this.$store.dispatch( "setEvent", {
          key: "post_category",
          value: {
            _id: category._id,
            title: category.title
          }
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
      border: 1px solid #444;
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
        border: 1px solid #444;
        border-radius: calc(.5rem + 2px);
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
