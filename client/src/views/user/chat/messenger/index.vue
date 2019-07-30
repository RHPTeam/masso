<template>
  <div class="main d_flex" :data-theme="currentTheme">
    <!-- Start: Left Sidebar -->
    <div role="sidebar">
      <left-sidebar :currentTheme="currentTheme"/>
    </div>
    <!-- End: Left Sidebar -->
    <!-- Start: Main Content -->
    <div class="d_flex" role="main">
      <main-content :currentTheme="currentTheme"/>
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
  },
  computed: {
    currentTheme(){
      return this.$store.getters.themeName;
    }
  },
  created() {
    this.$store.dispatch("getAllFriendFbChat");
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
  .main[data-theme="dark"] {
    div[role="sidebar"] {
      border-color: #27292d;
    }
  }
</style>
