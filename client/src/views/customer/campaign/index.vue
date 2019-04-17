<template>
  <div>
    <!-- Start: Campaign Detail -->
    <campaign-list v-if="true" />
    <!-- End: Campaign Detail -->
    <!-- Start: Campaign Detail -->
    <campaign-detail v-show="false" />
    <!-- End: Campaign Detail -->
  </div>
</template>

<script>
import CampaignDetail from "./desktop/detail/index";
import CampaignList from "./desktop/list/index";

export default {
  components: {
    CampaignDetail,
    CampaignList
  }
};
</script>

<style lang="scss" scoped></style>
