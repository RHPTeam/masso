import ItemCategories from "./item";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    ItemCategories,
    VuePerfectScrollbar
  },
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
    if( this.$router.name === 'post_posts') {
      const categoryNo = this.$store.getters.categoriesPage;
      if( categoryNo.length === 0 ) {
        const dataSender = {
          size: 25,
          page: 1
        };
        this.$store.dispatch( "getCategoriesByPage", dataSender );
      }

      const defaultNumberNo = this.$store.getters.allCateDefault;  
      if ( defaultNumberNo.length === 0 ) {
        this.$store.dispatch("getCategoryDefault");
      }
    }
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
