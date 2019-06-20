import DeletePopup from  "@/components/popups/delete";
import CategoryPaginate from "./paginate/index";
import ItemCategories from "./item/index";

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
    categoriesDefault(){
      return this.$store.getters.allCateDefault;
    },
    statusCategories() {
      return this.$store.getters.statusCategories;
    }
  },
  async created() {
    const defaultNumberNo = this.$store.getters.allCateDefault;

    if ( defaultNumberNo.length === 0 ) {
      this.$store.dispatch("getCategoryDefault");
    }
    const dataSender = {
      size: this.filterShowSelected.id,
      page: this.currentPage
    };

    this.$store.dispatch( "getCategoriesByPage", dataSender );
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
