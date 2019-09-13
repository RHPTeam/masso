<template>
  <div class="main">
    <h5>Chọn danh mục mẫu mà bạn muốn sử dụng để đăng bài dưới đây.</h5>
    <category-default-list :emitCanContinue="emitCanContinue" />
  </div>
</template>
<script>
import CategoryDefaultList from "./CategoryDefaultList";
export default {
  components: {
    CategoryDefaultList
  },
  data() {
    return {};
  },
  computed: {
    finishedStep() {
      return this.$store.getters.finishedStep;
    },
    categoryToCopy() {
      return this.$store.getters.categoryToCopy;
    }
  },
  watch: {
    finishedStep() {
      if (this.finishedStep === "Bước 3") {
        // this.$store.dispatch("selectCategoryThenCreateNewCampaign");
      }
    }
  },
  async created() {
    await this.$store.dispatch("getCategoryDefault");
  },
  methods: {
    emitCanContinue() {
      this.$emit("can-continue", { value: true });
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
  height: 27rem;
  overflow-y: scroll;
  padding: 0.5rem;
}
</style>
