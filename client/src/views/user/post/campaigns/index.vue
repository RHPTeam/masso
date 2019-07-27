<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Thiết lập chiến dịch"
        subBread="Giúp bạn thiết lập bộ hẹn cho bài đăng theo ý muốn và trực quan hơn"
      />
      <!-- Start: Content -->
      <app-navigation v-if="variableControl === 0"/>
      <div class="main--content">
        <router-view/>
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import AppNavigation from "./desktop/advance/components/navigation";
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
