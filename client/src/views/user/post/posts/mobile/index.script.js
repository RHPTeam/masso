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
      isShowCategoryForm: false,
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
      this.$store.dispatch("actionCursor", 11);
      this.$router.push({ name: 'post_posts', query: { size: 25, page: 1 } });
    },
    showCategory() {
      this.$store.dispatch("actionCursor", 12);
      this.$router.push({ name: "post_postCategories", query: { size: 25, page: 1 } });
    },
    showCategoryForm() {
      this.$store.dispatch("actionCursor", 13);
      this.$router.push({ name: 'categories_default' });
    },
    async showPopupSearch() {
      await this.$router.replace( {
        name: "post_posts",
        query: {
          search: '',
          size: 25,
          page: 1
        }
      } );
      this.isShowPopupSearch = true;
    }
  },
  created() {
    
  },
};