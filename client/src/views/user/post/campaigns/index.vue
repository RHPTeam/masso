<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <div class="d_flex align_items_center">
        <breadcrumb
          nameBread="Thiết lập chiến dịch"
          subBread="Giúp bạn thiết lập bộ hẹn cho bài đăng theo ý muốn và trực quan hơn"
        />
        <div class="guide ml_3" @click="redirectBlogHelp">
          <icon-base
            class="icon icon--help"
            width="18px"
            height="18px"
            icon-name="Hướng dẫn"
            viewBox="0 0 320 320"
          >
            <icon-help />
          </icon-base>
        </div>
      </div>

      <!-- Start: Content -->
      <app-header v-if="variableControl === 0"/>
      <div class="main--content">
        <router-view/>
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->

    <!--Start: Mobile Component-->
    <div class="d_block d_md_none">
      <app-mobile />
    </div>
    <!--End: Mobile Component-->
  </div>
</template>
<script>
import AppHeader from "./desktop/advance/components/navigation";
import AppMobile from "./mobile"
export default {
  components: {
    AppHeader,
    AppMobile
  },
  computed: {
    variableControl(){
      return this.$store.getters.variableControlCampaign;
    }
  },
  async created(){
    await this.$store.dispatch("setCampainControl", 0);
  },
  methods: {
    redirectBlogHelp() {
      const routes = "https://www.zinbee.vn/#/help/lam-cach-nao-de-tim-kiem-cac-bai-viet-tren-facebook";
      window.open(routes, '_blank');
    }
  },
};
</script>

<style lang="scss" scoped>
  .guide {
    cursor: pointer;
    margin-bottom: -2.3rem;
  }
</style>
