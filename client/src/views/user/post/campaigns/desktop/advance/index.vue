<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <!-- Start: Content -->
      <app-navigation/>
      <div class="main--content">
        <router-view/>
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import AppNavigation from "./components/navigation";
export default {
  components: {
    AppNavigation
  },
  computed: {
    variableControl(){
      return this.$store.getters.variableControlCampaign;
    }
  },
  async created(){
    await this.$store.dispatch("setCampainControl", 0);
  }
};
</script>

<style lang="scss" scoped></style>
