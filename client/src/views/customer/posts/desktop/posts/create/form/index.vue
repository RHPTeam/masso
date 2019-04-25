<template>
  <div class="wrapper py_4 px_3" :data-theme="currentTheme">
    <div v-if="isShowUpdatePost === false">
      <create-new />
    </div>
    <div v-if="isShowUpdatePost === true">
      <update-post/>
    </div>
  </div>
</template>

<script>
import CreateNew from "./createnew";
import UpdatePost from "./update";
export default {
  props: {
    isShowUpdatePost: {
      type: Boolean
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    posts() {
      return this.$store.getters.post;
    }
  },
  components: {
    CreateNew,
    UpdatePost
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
