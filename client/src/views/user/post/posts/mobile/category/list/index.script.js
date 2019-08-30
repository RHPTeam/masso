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
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categories() {
      return this.$store.getters.categoriesPage;
    },
    categoriesPageSize() {
      return this.$store.getters.categoriesPageSize;
    },
    statusCategories() {
      return this.$store.getters.statusCategories;
    },
    gestureUser() {
      return this.$store.getters.gestureUser;
    }
  },  
  watch: {
    gestureUser(value) {
      if (value === 16) {
        this.currentPage = 1;
      }
    }
  },
  async created() {
    const noCategory = this.$store.getters.categoriesPage;
    if( noCategory.length === 0 ) {
      await this.$store.dispatch("getCategoriesByPageMobile", {
        size: this.pageSize,
        page: this.currentPage
      });
    }
  },
  methods: {
    async loadMore() {
      this.$store.dispatch("actionCursor", 18);
      this.currentPage += 1;

      await this.$store.dispatch("getCategoriesByPageMobile", {
        size: this.pageSize,
        page: this.currentPage
      });
    },
  }
};
