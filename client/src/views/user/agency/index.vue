<template>
  <div class="main--agency">
    <!-- Start: Desktop -->
    <div class="d_none d_md_block" v-if="innerWidth > 768">
      <app-desktop />
    </div>
    <!-- End: Desktop -->
    <!-- Start: Mobile -->
    <div class="d_block d_md_none" v-else>
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
  async created(){
    await this.$store.dispatch("getInfoAgency");
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
