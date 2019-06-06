import AppFooter from  "./desktop/footer";
import AppHeader from  "./desktop/header";

export default {
  components: {
    AppFooter,
    AppHeader
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
};
