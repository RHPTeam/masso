
import DeletePopup from "../popup/delete";
import ConvertUnicode from "@/utils/string.util.js";

export default {
  props: [ "typeFilterSelected",  ],
  data() {
    return {
      campaignDelete: {},
      isShowDeleteCampaignPopup: false,
    };
  },
  created() {
    this.$store.dispatch( "getFacebookPages" );
    this.$store.dispatch( "getFacebookGroups" );
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    facebookGroups() {
      return this.$store.getters.facebookGroups;
    },
    facebookGroupsStatus() {
      return this.$store.getters.facebookGroupsStatus;
    },
    facebookPages() {
      return this.$store.getters.facebookPages;
    },
    facebookPagesStatus() {
      return this.$store.getters.facebookPagesStatus;
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
    }
  },
  components: {
    DeletePopup
  }
};
