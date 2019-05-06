
import DeletePopup from "../../popup/delete";
import ConvertUnicode from "@/utils/string.util.js";

export default {
  props: [ "filterShowSelected", "filterStatusSelected", "search" ],
  data() {
    return {
      campaignDelete: {},
      isShowDeleteCampaignPopup: false,
      isSort: [
        {
          name: "name",
          asc: false,
          desc: false
        },
        {
          name: "type",
          asc: false,
          desc: false
        },
        {
          name: "account",
          asc: false,
          desc: false
        }
      ],
      postGroups: [
        {
          id: "0001",
          name: "Chuyên hàng xách tay Mỹ Nhật",
          avatar: "https://image.freepik.com/free-vector/successful-businessman-avatar-cartoon_24640-38906.jpg",
          type: "Trang",
          account: "Đặng Yến"
        },
        {
          id: "0002",
          name: "Mẹ và Bé",
          avatar: "https://image.freepik.com/free-vector/successful-businessman-avatar-cartoon_24640-38906.jpg",
          type: "Trang",
          account: "Đặng Yến"
        }
      ]
    };
  },
  async created() {
    await this.$store.dispatch( "getAllCampaigns" );
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
    // campaigns() {
    //   return this.$store.getters.campaigns;
    // },
    // filteredCampaigns() {
    //   if ( this.filterStatusSelected.id === "all" ) {
    //     return this.campaigns.filter( ( item ) => {
    //       return item.title
    //         .toString()
    //         .toLowerCase()
    //         .includes( this.search.toString().toLowerCase() );
    //     } );
    //   }
    //   if ( this.filterStatusSelected.id === "active" ) {
    //     return this.campaigns.filter( ( item ) => {
    //       return item.title.toString()
    //         .toLowerCase()
    //         .includes( this.search.toString().toLowerCase() ) && item.status === true;
    //     } );
    //   }
    //   return this.campaigns.filter( ( item ) => {
    //     return item.title
    //       .toString()
    //       .toLowerCase()
    //       .includes( this.search.toString().toLowerCase() ) && item.status === false;
    //   } );
    // }
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
