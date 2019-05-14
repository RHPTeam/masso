import AppHeader from "@/views/guide/layouts/desktop/header";
import AppFooter from "@/views/guide/layouts/desktop/footer";

export default {
  data() {
    return {
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    AppHeader,
    AppFooter
  }
};
