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
    showPosts() {
      const dataSender = {
        page: 1,
        size: 25
      };
      this.$store.dispatch("getPostsByPage", dataSender);
      this.isShowPosts = true;
      this.isShowCategory = false;
      this.isShowCategoryDefault = false;
      this.$store.dispatch("actionCursor", 11);
      // this.$router.push({ name: 'post_posts', query: { size: 25, page: 1 } });
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
      this.$store.dispatch("actionCursor", 12);
      // this.$router.push({ name: "post_postCategories", query: { size: 25, page: 1 } });
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
      // this.$router.push({ name: 'categories_default' });
    },
    async showPopupSearch() {
      this.isShowPopupSearch = true;
    }
  },
  created() {
    
  },
};
