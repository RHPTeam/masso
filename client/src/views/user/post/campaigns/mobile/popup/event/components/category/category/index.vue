<template>
  <div class="category" :data-theme="currentTheme">
    <!-- Start: Body -->
    <div class="body p_3 mb_4">
      <div class="desc mb_2">
        <span class="desc--text">Danh mục bài viết</span>
      </div>
      <div class="option">
        <multiselect
          label="title"
          :options="categories"
          placeholder="Chọn danh mục đăng bài"          
          :value="event.post_category"
          :clearable="false"
          @input="selectCategory"
        />
      </div>
    </div>
    <!-- End: Body -->
  </div>
</template>

<script>
// import GlobalOption from "../components/target/index";
export default {
  components: {
    // GlobalOption
  },
  props: {
    event: Object
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categories(){
      return this.$store.getters.allCategories;
    }
  },
  async created(){
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
    selectCategory( category ){
      this.$store.dispatch( "setEvent", {
        key: "post_category",
        value: {
          _id: category._id,
          title: category.title
        }
      } );
    }
  },
}
</script>

<style lang="scss" scoped>
.category {
  background-color: #f7f7f7;
  color: $mainDarkLight;
  .top {
    font-size: .825rem;
    .top--left {
      color: #666;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .top--right {
      color: #666;
      .icon {
        .icon--categories {
          stroke-width: 5;
          transition: all 1s ease;
          vertical-align: middle;
        }
      }
    }
  }
  .body {
    background-color: #fff;
    border-radius: .625rem;
    .desc {
      color: #666;
      font-size: .875rem;
      font-weight: 600;
      svg {
        margin-bottom: -8px;
      }
    }
    .option {
      border: 1px solid #e4e4e4;
      border-radius: calc(.5rem + 2px);
    }
  }
}


// ========================= CHANGE THEME

// dark
.category[data-theme="dark"] { 
  background: #2f3236;
  .body {
    background: #272a2c;
    .desc--text {
      color: #ccc;
    }
    .option {
      border-color: #484848;
    }
  }
}
</style>
