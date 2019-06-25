import ConvertUnicode from "@/utils/functions/string";
import DeletePopup from "@/components/popups/delete";
import ItemPost from "./item/index";
import PostNowPopup from "../../../popups/postnow";

export default {
  components: {
    DeletePopup,
    ItemPost,
    PostNowPopup
  },
  props: [ "currentPage", "filterCategorySelected", "filterShowSelected", "search" ],
  data() {
    return {
      isShowDeletePopup: false,
      isShowPostNowPopup: false,
      isSort: [
        {
          name: "title",
          asc: false,
          desc: false
        }
      ],
      postSelected: {},
      targetDataDelete: {}
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allPost() {
      return this.$store.getters.allPost;
    }
  },
  async created  () {
    const dataSender = {
      size: this.filterShowSelected.id,
      page: this.currentPage
    };
    // const page = this.$store.getters.postsPageSize;
    // if(page === undefined || page === '') {
    //   await this.$store.dispatch("setPageSizeDefault", 1);
    // }
    await this.$store.dispatch("setPageSizeDefault", 1);
    await this.$store.dispatch( "getPostsByPage", dataSender );
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
    showDeletePopup( post ) {
      this.postSelected = post;
      this.targetDataDelete = {
        id: post._id,
        page: this.currentPage,
        size: this.filterShowSelected.id
      };
      this.isShowDeletePopup = true;
    },
    showPostNowPopup( post ) {
      this.postSelected = post;
      this.isShowPostNowPopup = true;
    },
    sortPostsByProperty( sortSelected, index ) {
      const attr = sortSelected.name;

      // Sort Ascending
      if ( sortSelected.asc === false ) {
        this.allPost.sort( ( a, b ) => {
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
        this.allPost.sort( ( a, b ) => {
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
  }
};
