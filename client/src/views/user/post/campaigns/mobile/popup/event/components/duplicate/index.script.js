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
    currentTheme() {
      return this.$store.getters.themeName;
    },
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
    },
    event() {
      return this.$store.getters.event;
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
    async duplicateEvent() {
      await this.resetTimeStartedAt();
      await this.resetCampaignSelected();

      const dateTemp = new Date ( this.dateStartedAt ),
        timeTemp = this.timeStartedAt.split( ":" ),
        dateTime = new Date(
          dateTemp.getFullYear(),
          dateTemp.getMonth(),
          dateTemp.getDate(),
          timeTemp[0],
          timeTemp[1]
        );

      await this.$store.dispatch( "duplicateEvent", {
        eventId: this.event._id,
        data: {
          started_at: dateTime,
          campaign: this.campaignSelected._id
        }
      } );

      if ( this.campaignSelected._id === this.campaignDetail._id ) {
        await this.$store.dispatch( "getCampaignDetail", this.campaignSelected._id );
      }

      this.$emit( "closePopup", false );
    },
    resetCampaignSelected() {
      if ( this.campaignSelected === null ) {
        this.campaignSelected = {
          _id: this.campaignDetail._id,
          title: this.campaignDetail.title
        }
      }
    },
    resetTimeStartedAt() {
      //Validate timeStartedAt, in case of invalid, set value is 12:00.
      const regexTime = new RegExp( "^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$" );
      if ( !regexTime.test( this.timeStartedAt.toLowerCase() ) ) {
        this.timeStartedAt = "12:00";
      }
    }
  }
}
