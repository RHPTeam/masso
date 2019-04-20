<template>
  <div>
    <!-- Start: Campaign Detail -->
    <campaign-list v-if="false" />
    <!-- End: Campaign Detail -->
    <!-- Start: Campaign Detail -->
    <campaign-detail v-show="true" />
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
