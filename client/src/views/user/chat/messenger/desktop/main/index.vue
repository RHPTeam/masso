<template>
  <span class="wrap">
    <!--Start: Header Content-->
     <main-header />
    <!--End: Header Content-->
    <!--Start: Main Content-->
    <div class="body d_flex flex_row_reverse">
      <!--Start: Sidebar-->
        <div class="sidebar">
          <right-sidebar/>
        </div>
      <!--End: Sidebar-->
      <!--Start: Chat Content-->
      <chat-content />
      <!--End: Chat Content-->
    </div>
    <!--End: Main Content-->
  </span>
</template>

<script>
import MainHeader from "./header";
import RightSidebar from "./sidebar";
import ChatContent from "./content";
export default {
  components: {
    ChatContent,
    MainHeader,
    RightSidebar
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  flex: 3;
  flex-direction: column;
  min-width: 0;
  .body {
    display: flex;
    flex: 1 1 0%;
    > div[role="body"] {
      flex: 2 0 0%;
      overflow: hidden;
      position: relative;
      display: flex;
    }
    .sidebar {
      border-left: 1px solid rgba(0, 0, 0, .10);
      flex: 0 2 33.33%;
      max-width: 420px;
      min-width: 200px;
    }
  }
}
</style>
