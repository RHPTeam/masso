<template>
  <div class="popup">
    <!-- Start: Header -->
    <div class="popup--header position_relative mx_3 pt_2">
      <div class="popup--title text_center mt_1">Sao chép sự kiện</div>
      <div class="btn--close position_absolute"
           @click.prevent="closePopup"
      >
        <icon-base
          class="icon--close"
          icon--name="Hủy"
          height="12px"
          width="12px"
          viewBox="0 0 20 20"
        >
          <icon-close></icon-close>
        </icon-base>
      </div>
    </div>
    <!-- End: Header -->
    <!-- Start: Body -->
    <div class="popup--body mx_3">
      <!-- Start: Time -->
      <div class="form--group mb_3">
        <div class="title mb_2">
          Bắt đầu
        </div>
        <div class="row d_flex align_items_center">
          <div class="col">
            <input type="text"
                   :class="inputTimeInvalid ? 'error' : null"
                   placeholder="hh:mm"
                   v-model="timeStartedAt"
                   v-click-outside="resetTimeStartedAt"
            >
          </div>
          <div class="col">
            <date-picker
              format="DD/MM/YYYY"
              v-model="dateStartedAt"
            ></date-picker>
          </div>
        </div>
      </div>
      <!-- End: Time -->
      <!-- Start: Campaign -->
      <div class="form--group">
        <div class="title mb_2">
          Sao chép tới
        </div>
        <multiselect
          label="title"
          class="form--control"
          v-model="campaignSelected"
          :options="convertCampaigns"
          placeholder="Chọn chiến dịch"
        ></multiselect>
      </div>
      <!-- End: Campaign -->
    </div>
    <!-- End: Body -->
    <!-- Start: Footer -->
    <div class="popup--footer mx_3">
      <div class="d_flex justify_content_end">
        <button class="btn btn_success save">Lưu</button>
      </div>
    </div>
    <!-- End: Footer -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      campaignSelected: {},
      dateStartedAt: new Date(),
      timeStartedAt: "12:00",
      inputTimeInvalid: false,
    }
  },
  computed: {
    campaigns() {
      return this.$store.getters.allCampaigns;
    },
    campaignDetail() {
      return this.$store.getters.campaignDetail;
    },
    convertCampaigns() {
      return this.campaigns.filter( ( campaign ) => {
        return campaign.status === true;
      } ).map( ( campaign ) => {
        return {
          _id: campaign._id,
          title: campaign.title
        }
      } );
    }
  },
  watch: {
    "timeStartedAt"( value ) {
      const regexTime = new RegExp( "^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$" );
      this.inputTimeInvalid = !regexTime.test(value.toLowerCase());
    }
  },
  created() {
    this.$store.dispatch( "getAllCampaigns" );
    this.campaignSelected = {
      _id: this.campaignDetail._id,
      title: this.campaignDetail.title
    }
  },
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    },
    resetTimeStartedAt() {
      //Validate timeStartedAt, in case of invalid, set value is 12:00.
      const regexTime = new RegExp( "^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$" );
      if ( !regexTime.test( this.timeStartedAt.toLowerCase() ) ) {
        this.timeStartedAt = "12:00";
      }
    },
  }
}
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
