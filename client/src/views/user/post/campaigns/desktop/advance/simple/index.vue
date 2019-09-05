<template>
  <div class="campaigns--wrapper">
    <!-- Start: Data Table -->
    <app-table/>
    <!-- End: Data Table -->
  </div>
</template>

<script>
import AppTable from "./table/index";

export default {
  components: {
    AppTable
  },
  created() {
    this.$store.dispatch( "getCampaignSimple" );
  }
};
</script>

<style lang="scss" scoped></style>
