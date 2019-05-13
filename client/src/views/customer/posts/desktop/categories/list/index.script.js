import DeletePopup from  "@/components/popups/delete";
import CategoryPaginate from "./paginate";
import ItemCategories from "./item";

export default {
  components: {
    DeletePopup,
    CategoryPaginate,
    ItemCategories
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
    filterCategories() {
      return this.categories.filter( ( category ) => {
        return category.title.toString()
          .toLowerCase()
          .includes( this.search.toString().toLowerCase() );
      } );
    }
  },
  async created() {
    const dataSender = {
      size: this.filterShowSelected.id,
      page: this.currentPage
    };

    await this.$store.dispatch( "getCategoriesByPage", dataSender );
  },
  methods: {
    updateCategory( val ) {
      this.$emit( "updateCategory", val );
    },
    showDeletePopup( category ) {
      this.categoryDelete = category;
      this.targetDataDelete = {
        id: category._id,
        page: this.currentPage,
        size: this.filterShowSelected.id
      };
      this.isShowDeletePopup = true;
    },
    updateCurrentPage( val ) {
      this.$emit( "updateCurrentPage", val );
    }
  }
};
