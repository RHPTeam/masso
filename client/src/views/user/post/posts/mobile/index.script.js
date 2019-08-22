import PopupSearch from "./posts/popup/search";
import ListPost from "./posts/list";
import Category from "./category";
import CategoryForm from "./category/default";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    ListPost,
    Category,
    VuePerfectScrollbar,
    CategoryForm,
    PopupSearch
  },
  data() {
    return {
      isShowCategory: false,
      isShowPosts: true,
      isShowCategoryDefault: false,
      isShowPopupSearch: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    gestureUser() {
      return this.$store.getters.gestureUser;
    },
    gestureCursorMenuUser() {
      return this.$store.getters.gestureCursorMenuUser;
    }
  },
  methods: {
    async showPosts() {
      const dataSender = {
        page: 1,
        size: 25
      };
      await this.$store.dispatch("getPostsByPage", dataSender);
      this.isShowPosts = true;
      this.isShowCategory = false;
      this.isShowCategoryDefault = false;
      await this.$store.dispatch("actionCursor", 11);
    },
    async showCategory() {
      const dataSender = {
        page: 1,
        size: 25
      };
      await this.$store.dispatch("getCategoriesByPage", dataSender);
      this.isShowPosts = false;
      this.isShowCategory = true;
      this.isShowCategoryDefault = false;
      await this.$store.dispatch("actionCursor", 12);
    },
    showCategoryForm() {
      this.isShowPosts = false;
      this.isShowCategory = false;
      this.isShowCategoryDefault = true;
      this.$store.dispatch("actionCursor", 13);
      
      const defaultNumberNo = this.$store.getters.allCateDefault;  
      if ( defaultNumberNo.length === 0 ) {
        this.$store.dispatch("getCategoryDefault");
      }
    },
    async showPopupSearch() {
      this.isShowPopupSearch = true;
    }
  },
  created() {
    
  },
};
