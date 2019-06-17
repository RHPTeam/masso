import DeletePopup from  "@/components/popups/delete";
import CategoryPaginate from "./paginate/index";
import ItemCategories from "./item/index";
import CategoriesDefault from "./itemdefault";

export default {
  components: {
    DeletePopup,
    CategoryPaginate,
    CategoriesDefault,
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
    categoriesDefault(){
      return this.$store.getters.allCateDefault;
    }
  },
  async created() {
    const dataSender = {
      size: this.filterShowSelected.id,
      page: this.currentPage
    };

    await this.$store.dispatch( "getCategoriesByPage", dataSender );
    // await this.$store.dispatch("getCategoryDefault");
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
