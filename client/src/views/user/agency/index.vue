<template>
  <div class="main--agency">
    <!-- Start: Desktop -->
<<<<<<< HEAD
    <div class="d_none d_md_block">
=======
    <div class="d_none d_md_block" v-if="innerWidth > 768">
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
      <app-desktop />
    </div>
    <!-- End: Desktop -->
    <!-- Start: Mobile -->
<<<<<<< HEAD
    <div class="d_block d_md_none">
=======
    <div class="d_block d_md_none" v-else>
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
      <app-mobile />
    </div>
    <!-- End: Mobile -->
  </div>
</template>

<script>
import AppDesktop from "./desktop";
import AppMobile from "./mobile";
export default {
  components: {
    AppDesktop,
    AppMobile
  },
  data() {
    return {
      innerWidth: 0
    };
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
  methods: {
    getWindowWidth(event) {
      this.innerWidth = window.innerWidth;
    }
  }
};
</script>

<style scoped>
</style>
