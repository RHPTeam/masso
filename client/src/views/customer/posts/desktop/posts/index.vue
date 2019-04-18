<template>
  <div class="post--wrap">
    <!-- Start: Action -->
    <app-action />
    <!-- End: Action -->
    <!-- Start: Data List -->
    <app-list />
    <!-- End: Data List -->
    <!-- Start: Info -->
    <app-info />
    <!-- Start: Info -->
  </div>
</template>

<script>
import AppAction from "../layouts/action/index";
import AppList from "./list-post/index";
import AppInfo from "../layouts/info/index";
export default {
  components: {
    AppAction,
    AppList,
    AppInfo
  }
};
</script>

<style lang="scss" scoped></style>
