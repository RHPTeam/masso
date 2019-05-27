<template>
  <div class="main d_flex">
    <!-- Start: Left Sidebar -->
    <div role="sidebar">
      <left-sidebar/>
    </div>
    <!-- End: Left Sidebar -->
    <!-- Start: Main Content -->
    <div class="d_flex" role="main">
      <main-content/>
    </div>
    <!-- End: Main Content -->
  </div>
</template>
<script>
import LeftSidebar from "./desktop/sidebar";
import MainContent from "./desktop/main";
export default {
  components: {
    LeftSidebar,
    MainContent
  }
}
</script>
<style lang="scss" scoped>
.main {
  div[role="sidebar"] {
    flex: 0 0 25%;
    max-width: 420px;
    min-width: 285px;
    border-right: 1px solid #e4e4e4;
  }
  div[role="main"] {
    flex: 3;
    flex-direction: column;
    min-width: 0;
  }
}
</style>
