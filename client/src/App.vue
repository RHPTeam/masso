<template>
  <div id="app">
    <VuePerfectScrollbar class="scroll-area" ref="scroll">
      <router-view />
    </VuePerfectScrollbar>
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  },
  watch:{
    $route (to, from){
      this.$refs.scroll.$el.scrollTop = 0;
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .scroll-area {
    position: relative;
    height: 100vh;
  }
}
</style>
