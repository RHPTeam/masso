<template>
  <div>
    <!-- Start: Top -->
    <app-top :user="user"></app-top>
    <!-- End: Top -->
    <!-- Start: Content -->
    <div class="main--content">
      <!-- Start: User Expire -->
      <user-info :user="user"></user-info>
      <!-- End: User Info -->
      <!-- Start: User Keywords -->
      <user-keywords :user="user"></user-keywords>
      <!-- End: User Keywords -->
    </div>
    <!-- End: Content -->
  </div>
</template>

<script>
import AppTop from "./components/top";
import UserInfo from "./components/info";
import UserKeywords from "./components/keywords";
export default {
  components: {
    AppTop,
    UserInfo,
    UserKeywords
  },
  props: [ "user" ]
}
</script>

<style scoped>

</style>
