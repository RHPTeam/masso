
import DeleteCampaignPopup from "../../popup/deletecampaign";
import ConvertUnicode from "@/utils/functions/string.js";

export default {
  props: [ "currentPage", "filterShowSelected", "filterStatusSelected", "search" ],
  data() {
    return {
      campaignDelete: {},
      isShowDeleteCampaignPopup: false,
      isSort: [
        {
          name: "title",
          asc: false,
          desc: false
        },
        {
          name: "started_at",
          asc: false,
          desc: false
        },
        {
          name: "finished_at",
          asc: false,
          desc: false
        },
        {
          name: "status",
          asc: false,
          desc: false
        }
      ]
    };
  },
  async created() {
    const dataSender = {
      size: this.filterShowSelected.id,
      page: this.currentPage
    };

    await this.$store.dispatch( "getCampaignsByPage", dataSender );
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
    activeCurrentSort( i, type ) {
      this.isSort.forEach( ( item, index ) => {
        if ( index === i ) {
          if ( type === "asc" ) {
            item.asc = true;
            item.desc = false;
          } else {
            item.asc = false;
            item.desc = true;
          }
        } else {
          item.asc = false;
          item.desc = false;
        }
      } );
    },
    formatDate( d ) {
      const dateTime = new Date( d ),
        date = String( dateTime.getDate() ).padStart( 2, "0" ),
        month = String( dateTime.getMonth() + 1 ).padStart( 2, "0" ),
        year = dateTime.getFullYear();

      return `${date}/${month}/${year}`;
    },
    showDeleteCampaignPopup( campaign ) {
      this.isShowDeleteCampaignPopup = true;
      this.campaignDelete = campaign;
    },
    sortCampaignsByProperty( sortSelected, index ) {
      const attr = sortSelected.name;

      // Sort Ascending
      if ( sortSelected.asc === false ) {
        this.campaigns.sort( ( a, b ) => {
          let valA = ConvertUnicode.convertUnicode( String( a[ attr ] ).toUpperCase() ),
            valB = ConvertUnicode.convertUnicode( String( b[ attr ] ).toUpperCase() );

          if ( valA < valB ) {
            return -1;
          }
          if ( valA > valB ) {
            return 1;
          }
          return 0;
        } );
        this.activeCurrentSort( index, "asc" );
      } else if ( sortSelected.desc === false ) { // Sort Descending
        this.campaigns.sort( ( a, b ) => {
          let valA = ConvertUnicode.convertUnicode( String( a[ attr ] ).toUpperCase() ),
            valB = ConvertUnicode.convertUnicode( String( b[ attr ] ).toUpperCase() );

          if ( valA > valB ) {
            return -1;
          }
          if ( valA < valB ) {
            return 1;
          }
          return 0;
        } );
        this.activeCurrentSort( index, "desc" );
      }
    },
    viewCampaignDetail( id ) {
      this.$store.dispatch( "getCampaignDetail", id );
      this.$router.push( { name: "campaigns/detail",
        params: { campaignId: id } } );
    }
  },
  components: {
    DeleteCampaignPopup
  }
};
