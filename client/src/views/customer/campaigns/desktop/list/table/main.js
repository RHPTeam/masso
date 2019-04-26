
export default {
  props: [ "filterShowSelected", "filterStatusSelected", "search" ],
  async created() {
    await this.$store.dispatch( "getAllCampaigns" );
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    campaigns() {
      return this.$store.getters.campaigns;
    },
    filteredCampaigns() {
      if ( this.filterStatusSelected.id === "all" ) {
        return this.campaigns.filter( ( item ) => {
          return item.title
            .toString()
            .toLowerCase()
            .includes( this.search.toString().toLowerCase() );
        } );
      }
      if ( this.filterStatusSelected.id === "active" ) {
        return this.campaigns.filter( ( item ) => {
          return item.title.toString()
            .toLowerCase()
            .includes( this.search.toString().toLowerCase() ) && item.status === true;
        } );
      }
      return this.campaigns.filter( ( item ) => {
        return item.title
          .toString()
          .toLowerCase()
          .includes( this.search.toString().toLowerCase() ) && item.status === false;
      } );
    }
  },
  methods: {
    formatDate( d ) {
      const dateTime = new Date( d ),
        date = String( dateTime.getDate() ).padStart( 2, "0" ),
        month = String( dateTime.getMonth() + 1 ).padStart( 2, "0" ),
        year = dateTime.getFullYear();

      return `${date}/${month}/${year}`;
    },
    viewCampaignDetail( campaign ) {
      this.$store.dispatch( "getCampaignDetail", campaign );
      this.$router.push( campaign._id );
    }
  }
};
