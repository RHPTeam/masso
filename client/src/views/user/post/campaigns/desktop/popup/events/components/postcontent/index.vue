<template>
  <div class="section d_flex align_items_start mt--5">
    <div class="icon mr_4">
      <icon-base
        class="icon--post"
        icon--name="Bài đăng"
        height="20px"
        width="20px"
        viewBox="0 0 500 500"
      >
        <icon-post></icon-post>
      </icon-base>
    </div>
    <div class="section--body">
      <!-- Start: Post Category -->
      <div class="top mb_3 d_flex align_items_center">
        <div class="title mr_4">Đăng bài viết từ</div>
        <div class="radio--item mr_4">
          <label for="category" class="radio--custom d_flex align_items_center">
            <input
              type="radio"
              id="category"
              v-model="postType"
              value="1"
              @click="updatePostCaseEvent(1)"
            />
            <div class="pl_2">Danh mục</div>
          </label>
        </div>
        <div class="radio--item">
          <label for="post" class="radio--custom d_flex align_items_center mr_2">
            <input
              type="radio"
              id="post"
              v-model="postType"
              value="2"
              @click="updatePostCaseEvent(2)"
            />
            <div class="pl_2">Kho nội dung</div>
          </label>
        </div>
      </div>
      <div class="form--wrap">
        <div class="form--item" v-if="caseEvent.post === 1">
          <r-select
            v-model="event.post_category"
            track-by="title"
            label="title"
            placeholder="Chọn danh mục"
            :maxHeight="260"
            :options="filterCategories"
            @input="selectCategory"
          />
        </div>
        <div class="form--item" v-if="caseEvent.post === 2">
          <r-select
            :multiple="true"
            label="title"
            track-by="title"
            :maxHeight="260"
            :options="allPost"
            :value="event.post_custom"
            @input="selectPost"
            placeholder="Chọn bài viết từ kho nội dung"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postType: '1',
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
    filterCategories() {
      return this.categories.filter( ( category ) => {
        return category.totalPosts > 0;
      } );
    },
  },
  async created(){
    const categories = this.$store.getters.allCategories,
          caseEvent = this.$store.getters.caseEvent;
    if ( categories && categories.length === 0 ) {
      await this.$store.dispatch( "getAllCategories" );
    }
    if ( caseEvent.post === 0 ) {
      await this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: 1
      } );
    }
    this.postType = String( caseEvent.post );
  },
  methods: {
    async selectPost( value ){
      if ( value ) {
        await this.$emit("setErrorPost", false);
      }

      // Reset post category value
      await this.$store.dispatch( "setEvent", {
        key: "post_category",
        value: ""
      } );

      await this.$store.dispatch( "setEvent", {
        key: "post_custom",
        value: value
      } );
    },
    async selectCategory( category ){
      console.log(category);
      if ( !category ) return;
      if ( category ) {
        await this.$emit( "setErrorPost", false );
      }

      await this.$store.dispatch( "setEvent", {
        key: "post_custom",
        value: []
      } );
      await this.$store.dispatch( "setEvent", {
        key: "post_category",
        value: {
          _id: category._id,
          title: category.title
        }
      } );
    },
    async updatePostCaseEvent( value ) {
      if ( value === 1 ) {
        await this.$store.dispatch( "setEvent", {
          key: "post_custom",
          value: []
        } );
      } else {
        await this.$store.dispatch( "setEvent", {
          key: "post_category",
          value: ""
        } );
      }
      await this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: value
      } );
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
