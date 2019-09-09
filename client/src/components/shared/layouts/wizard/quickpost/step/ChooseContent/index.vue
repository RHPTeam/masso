<template>
  <div class="main">
    <!-- <h5>Chọn danh mục mẫu mà bạn muốn sử dụng để đăng bài dưới đây.</h5> -->
    <div class="tab">
      <div
        :class="{selected:  currentTabComponent==='post-list'}"
        @click="switchTab('post-list')"
      >Bài viết</div>
      <div
        :class="{selected:  currentTabComponent==='category-list'}"
        @click="switchTab('category-list')"
      >Danh mục</div>
      <div
        :class="{selected: currentTabComponent==='category-default-list'}"
        @click="switchTab('category-default-list')"
      >Danh mục mẫu</div>
    </div>
    <transition name="fade" mode="out-in">
      <component
        :is="currentTabComponent"
        :emitCanContinue="emitCanContinue"
        :selectedPost="selectedPost"
        :selectedCategory="selectedCategory"
      ></component>
    </transition>
  </div>
</template>
<script>
import CategoryDefaultList from "./CategoryDefaultList";
import CategoryList from "./CategoryList";
import PostList from "./PostList";
export default {
  components: {
    CategoryDefaultList,
    PostList,
    CategoryList
  },
  data() {
    return {
      currentTabComponent: ""
    };
  },
  computed: {
    chooseContentCurrentComponentTab() {
      return this.$store.getters.chooseContentCurrentComponentTab;
    },
    finishedStep() {
      return this.$store.getters.finishedStep;
    },
    categoryToCopy() {
      return this.$store.getters.categoryToCopy;
    },
    selectedPostInListTab() {
      return this.$store.getters.selectedPostInListTab;
    }
  },
  watch: {
    finishedStep() {
      if (this.finishedStep === "Bước 3") {
        // this.$store.dispatch("selectCategoryThenCreateNewCampaign");
      }
    },
    selectedPostInListTab() {
      if (this.selectedPostInListTab.length > 0) {
        this.emitCanContinue(true);
      } else {
        this.emitCanContinue(false);
      }
    }
  },
  async created() {
    await this.$store.dispatch("getCategoryDefault");
    this.currentTabComponent = this.chooseContentCurrentComponentTab;
  },
  beforeDestroy() {
    if (this.finishedStep === "Bước 3") {
      if (this.currentTabComponent === "category-default-list") {
        this.$store.dispatch("copySelectedDefaultCategory");
      }
    } else {
      if (this.currentTabComponent === "post-list") {
        this.$store.dispatch("removeAllSelectedPostInListTab");
      }
    }
  },
  methods: {
    emitCanContinue(value) {
      this.$emit("can-continue", { value: value });
    },
    switchTab(component) {
      this.currentTabComponent = component;
      this.$store.dispatch("updateChooseContentCurrentComponentTab", component);
    },
    selectedPost(post) {
      // console.log("selectedPost", post);
    },
    selectedCategory(category) {
      // console.log("selectedCategory", category);
    }
  }
};
</script>

.<style lang="scss" scoped>
h5 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.main {
  min-height: 27rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem;
}
.tab {
  display: flex;
  justify-content: center;
  padding-bottom: 0.5rem;

  > div {
    background-color: #242629;
    padding: 1rem;
    width: 50%;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.5s all;
    &:hover {
      background-color: #3f3f3f;
    }
  }
}

.selected {
  background-color: #1e1f23 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter {
  // transform: translateX(100%);
  opacity: 0;
}
.fade-leave-to {
  // transform: translateX(-100%);
  opacity: 0;
}
</style>
