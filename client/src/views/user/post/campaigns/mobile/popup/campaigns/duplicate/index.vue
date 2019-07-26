<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div class="title">Sao chép chiến dịch</div>
        </div>
        <div class="modal--body my_3">
          <div class="desc">Toàn bộ dữ liệu thuộc chiến dịch
            <!-- <span class="text--bold">{{ campaignDuplicate.title }}</span> -->
            <span class="text--bold">CD Mau 1</span>
            sẽ được sao chép sang một chiến dịch mới.
          </div>
          <div class="duplicate">
            <div class="account mt_3">
              <h5 class="mb_3">Chọn tài khoản sử dụng chiến dịch</h5>
              <div class="account--list-item d_flex align_items_center"
                   v-for="( account, index ) in allAccountFB"
                   :key="index"
              >
                <!-- Start: Avatar Account -->
                <div class="left"
                     :style="{ backgroundImage: 'url(' + account.userInfo.thumbSrc + ')' }"
                >
                </div>
                <!-- End: Avatar Account -->
                <!-- Start: Name Account + Action -->
                <div class="right d_flex align_items_center">
                  <!-- Start: Name Account -->
                  <div class="name ml_2">{{ account.userInfo.name }}</div>
                  <!-- End: Name Account -->
                </div>
                <!-- Start: Action -->
                <div class="action ml_auto">
                  <label class="custom--checkbox">
                    <input
                      type="checkbox"
                      :value="account._id"
                      @click="chooseAccount(account._id)"
                    />
                  </label>
                </div>
                <!-- End: Action -->
                <!-- Start: Name Account + Action -->
              </div>
            </div>
          </div>
        </div>
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button
            class="btn--skip"
            @click="closePopup()"
          >HỦY</button>
          <button
            class="btn--submit"
            @click="duplicateCampaignSimple()"
          >SAO CHÉP</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "campaignDuplicate", "isShow" ],
  data() {
    return {
      setup: {
        accountId: "",
        timeStart: new Date()
      }
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allAccountFB() {
      return this.$store.getters.accountsFB;
    }
  },
  async created() {
    if ( this.allAccountFB.length === 0 ) {
      await this.$store.dispatch( "getAccountsFB" );
    }
  },
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    },
    changeDateSetup(value){
      this.setup.timeStart = new Date(
        ( new Date( value ) ).getFullYear(),
        ( new Date( value ) ).getMonth(),
        ( new Date( value ) ).getDate(),
        ( new Date( this.event.started_at ) ).getHours(),
        ( new Date( this.event.started_at ) ).getMinutes(),
        0 )
    },
    chooseAccount(val){
      this.setup.accountId = val;
    },
    async duplicateCampaign() {
      await this.$store.dispatch( "duplicateCampaign", this.campaignDuplicate._id );

      const campaign = this.$store.getters.campaignDetail;

      this.$router.push( { name: "post_campaigns_detail", params: { campaignId: campaign._id } } );

      this.$emit( "closePopup", false );
    },
    async duplicateCampaignSimple(){
      const dataSender = {
        campaignId: this.campaignDuplicate._id,
        facebookId: this.setup.accountId
      };
      await this.$store.dispatch("duplicateCampaignSimple", dataSender);
      await this.$emit("setDefault", false);
      this.closePopup();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";
</style>

