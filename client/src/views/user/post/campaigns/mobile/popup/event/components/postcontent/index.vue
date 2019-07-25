<template>
  <div class="section mt_3">
    <div class="icon d_flex align_items_center mb_3">
      <icon-base
        class="icon--post mr_2"
        icon--name="Bài đăng"
        height="20px"
        width="20px"
        viewBox="0 0 500 500"
      >
        <icon-post></icon-post>
      </icon-base>
      <div class="title mr_4">Đăng bài viết từ</div>
    </div>
    <div class="alert--text my_1" v-if="error === true">Vui lòng chọn danh mục hoặc bài đăng!</div>
    <div class="section--body">
      <!-- Start: Post Category -->
      <div class="top mb_3 d_flex align_items_center">
        <div class="radio--item d_flex align_items_center mr_4">
          <div class="radio--custom mr_2">
            <input type="radio" v-model="postType" value="1" @click="updatePostCaseEvent(1)" />
          </div>
          <div>Danh mục</div>
        </div>
        <div class="radio--item d_flex align_items_center">
          <div class="radio--custom mr_2">
            <input type="radio" v-model="postType" value="2" @click="updatePostCaseEvent(2)" />
          </div>
          <div>Kho nội dung</div>
        </div>
      </div>
      <div class="form--wrap">
        <div class="form--item" v-if="caseEvent.post === 1">
          <multiselect
            label="title"
            :clearable="false"
            :value="event.post_category"
            :options="filterCategories"
            @input="selectCategory"
            placeholder="Chọn danh mục đăng bài"
          />
        </div>
        <div class="form--item" v-if="caseEvent.post === 2">
          <multiselect
            multiple
            label="title"
            :clearable="false"
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
      isShowError: false,
      postType: '1'
    };
  },
  props: ["error"],
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
    categories() {
      return this.$store.getters.allCategories;
    },
    caseEvent() {
      return this.$store.getters.caseEvent;
    },
    filterCategories() {
      return this.categories.filter(category => {
        return category.totalPosts > 0;
      });
    }
  },
  async created() {
    if (this.allPost.length === 0) {
      await this.$store.dispatch("getAllPost");
    }
    if (this.categories.length === 0) {
      await this.$store.dispatch("getAllCategories");
    }
    
    console.log("this.caseEvent.post", this.caseEvent.post);
    if (this.caseEvent.post === 0) {
      await this.$store.dispatch("setCaseEvent", {
        key: "post",
        value: 1
      });
    }

    this.postType = String(this.caseEvent.post);
  },
  methods: {
    async selectPost(value) {
      if (value) {
        await this.$emit("setErrorPost", false);
      }
      if (value.length === 0) {
        this.isShowError = true;
      } else {
        // Reset post category value
        await this.$store.dispatch("setEvent", {
          key: "post_category",
          value: ""
        });

        await this.$store.dispatch("setEvent", {
          key: "post_custom",
          value: value
        });
      }
    },
    async selectCategory(category) {
      if (!category) return;
      if (category) {
        await this.$emit("setErrorPost", false);
      }
      if (category.totalPosts !== 0) {
        this.isShowError = false;
      }
      if (category.totalPosts === 0) {
        this.isShowError = true;
      } else {
        await this.$store.dispatch("setEvent", {
          key: "post_custom",
          value: []
        });
        this.$store.dispatch("setEvent", {
          key: "post_category",
          value: {
            _id: category._id,
            title: category.title
          }
        });
      }
    },
    async updatePostCaseEvent(value) {
      if (value === 1) {
        await this.$store.dispatch("setEvent", {
          key: "post_custom",
          value: []
        });
      } else {
        await this.$store.dispatch("setEvent", {
          key: "post_category",
          value: ""
        });
      }
      await this.$store.dispatch("setCaseEvent", {
        key: "post",
        value: value
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
