<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <!-- Start: Content -->
      <app-header v-if="variableControl === 0"/>
      <div class="main--content">
        <router-view/>
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import AppHeader from "./components/navigation";
export default {
  components: {
    AppHeader
  },
  computed: {
    variableControl(){
      return this.$store.getters.variableControl;
    }
  },
  async created(){
    await this.$store.dispatch("setCampainControl", 0);
  }
};
</script>

<style lang="scss" scoped></style>
