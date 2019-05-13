<template>
  <div class="modal--event-body px_3 py_4">
    <!--Start: Setup custom post-->
    <custom-post v-if="eventDetail.post_custom.length > 0" :eventDetail="eventDetail"/>
    <!--End: Setup custom post-->
    <!--Start: Setup auto post-->
    <auto-post v-else :eventDetail="eventDetail" />
    <!--End: Setup auto post-->
  </div>
</template>

<script>
import AutoPost from "./auto-post";
import CustomPost from "./custom-post";
export default {
  components: {
    AutoPost,
    CustomPost
  },
  props: {
    eventDetail: {
      type: Object
    }
  },
  data() {
    return {
      isShowOptionPost: "none"
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
