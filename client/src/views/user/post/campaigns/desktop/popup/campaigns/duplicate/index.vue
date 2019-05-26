<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div class="title">Sao chép chiến dịch</div>
        </div>
        <div class="modal--body my_3">
          <div class="desc">Toàn bộ dữ liệu thuộc chiến dịch
            <span class="text--bold">{{ campaignDuplicate.title }}</span>
            sẽ được sao chép sang một chiến dịch mới.
          </div>
        </div>
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button
            class="btn--skip"
            @click="closePopup()"
          >HỦY</button>
          <button
            class="btn--submit"
            @click="duplicateCampaign()"
          >SAO CHÉP</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "campaignDuplicate" ],
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    },
    async duplicateCampaign() {
      await this.$store.dispatch( "duplicateCampaign", this.campaignDuplicate._id );

      const campaign = this.$store.getters.campaignDetail;

      console.log(campaign);


      this.$router.push( { name: "post_campaigns_detail",
                           params: { campaignId: campaign._id } } );

      this.$emit( "closePopup", false );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";
</style>

