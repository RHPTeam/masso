<template>
  <div class="sidebar">
    <!-- Start: Header Left Sidebar -->
    <app-header/>
    <!-- Start: Header Left Sidebar -->
    <vue-perfect-scrollbar :style="{ height: windowHeight + 'px' }">
      <!-- Start: Search Left Sidebar -->
      <app-search />
      <!-- Start: Search Left Sidebar -->

      <!-- Start:Result  Search Left Sidebar -->
      <div class="d_none">
        <result-search />
      </div>
      <!-- Start:Result Search Left Sidebar -->

      <!-- Start: List User Left Sidebar -->
      <div>
        <app-user />
        <app-user />
        <app-user />
        <app-user />
        <app-user />
        <app-user />
      </div>
      <!-- Start: List User Left Sidebar -->
    </vue-perfect-scrollbar>

  </div>
</template>

<script>
import AppHeader from "./header";
import AppSearch from "./search";
import AppUser from "./user";
import ResultSearch from "./friend";
export default {
  components: {
    AppHeader,
    AppSearch,
    AppUser,
    ResultSearch
  },
  data() {
    return {
      windowHeight: 0
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowHeight()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowHeight);
  },
  methods: {
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight - 60;
    }
  }
}
</script>

<style scoped>

</style>
