<template>
  <div class="modal--event-body px_3 py_4">
    <!-- Start: Post Content Options -->
    <section>
      <post-content-options
        v-if="postContentOption === 'none'"
        @updatePostContentOption="postContentOption = $event"
      />
      <post-option-category
        v-if="postContentOption === 'category'"
        @updatePostContentOption="postContentOption = $event"
      />
    </section>
    <!-- End: Post Content Options -->
  </div>
</template>

<script>
import PostContentOptions from "./post-content-options";
import PostOptionCategory from "./post-option-category";

export default {
  components: {
    PostContentOptions,
    PostOptionCategory
  },
  data() {
    return {
      postContentOption: "none"
    }
  }
};
</script>

<style></style>
