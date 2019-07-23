<template>
  <span class="wrap" :data-theme="currentTheme">
    <!--Start: Header Content-->
     <main-header
       :currentTheme="currentTheme"
       :status="isShowRightSidebar"
        @toggleRightSidebar="isShowRightSidebar = $event"
     />
    <!--End: Header Content-->
    <!--Start: Main Content-->
    <div class="body d_flex flex_row_reverse">
      <!--Start: Sidebar-->
      <transition name="sidebar">
        <div class="sidebar" v-if="isShowRightSidebar === false">
          <right-sidebar :currentTheme="currentTheme"/>
        </div>
      </transition>
      <!--End: Sidebar-->
      <!--Start: Chat Content-->
      <chat-content :currentTheme="currentTheme" />
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
  },
  props: {
    currentTheme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    return {
      isShowRightSidebar: false
    }
  },
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
    //Transition tooglesidebar
    .sidebar-enter {
      transform: translateX(100%);
    }

    .sidebar-enter-to {
      transition: transform 0.75s;
      transform: translateX(0);
    }

    .sidebar-leave-to {
      transition: transform 0.75s;
      transform: translateX(100%);
    }
  }
}
  .wrap[data-theme="dark"] {
    .body {
      .sidebar {
        border-color: #27292d;
      }
    }
  }
</style>
