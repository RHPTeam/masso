import ItemCategories from "./item";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    ItemCategories,
    VuePerfectScrollbar
  },
  props: [ "currentPage", "filterShowSelected", "search" ],
  data() {
    return {
      isShowDeletePopup: false,
      categoryDelete: {},
      targetDataDelete: {},
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categories() {
      return this.$store.getters.categoriesPage;
    },
    statusCategories() {
      return this.$store.getters.statusCategories;
    }
  },
  async created() {
    // const defaultNumberNo = this.$store.getters.allCateDefault;

    // if ( defaultNumberNo.length === 0 ) {
    //   this.$store.dispatch("getCategoryDefault");
    // }
    
    // const dataSender = {
    //   size: 25,
    //   page: 1
    // };

    // this.$store.dispatch( "getCategoriesByPage", dataSender );
  },
  methods: {
    updateCategory( val ) {
      // this.$emit( "updateCategory", val );
    },
    showDeletePopup( category ) {
      // this.categoryDelete = category;
      // this.targetDataDelete = {
      //   id: category._id,
      //   page: this.currentPage,
      //   size: this.filterShowSelected.id
      // };
      // this.isShowDeletePopup = true;
    },
    updateCurrentPage( val ) {
      // this.$emit( "updateCurrentPage", val );
    }
  }
};
