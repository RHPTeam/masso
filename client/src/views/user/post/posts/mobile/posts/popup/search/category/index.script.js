import ItemCategories from "./item";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    ItemCategories,
    VuePerfectScrollbar
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 25,
      isShowDeletePopup: false,
      categoryDelete: {},
      targetDataDelete: {},
    }
  },
  props: ["search"],
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categoriesPageMobile() {
      return this.$store.getters.categoriesPageMobile;
    },
    categoriesPageSize() {
      return this.$store.getters.categoriesPageSize;
    },
    statusCategories() {
      return this.$store.getters.statusCategories;
    }
  },
  async created() {
    // const dataSender = {
    //   keyword: this.search,
    //   page: 1,
    //   size: 25,
    // };
    // await this.$store.dispatch("getCategoriesByKey", dataSender);
  },
  methods: {
    async loadMore() {
      this.currentPage += 1;

      await this.$store.dispatch("getCategoriesByPageMobile", {
        size: this.pageSize,
        page: this.currentPage
      });
    },
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
