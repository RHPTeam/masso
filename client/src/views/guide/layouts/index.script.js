import AppHeader from "@/views/guide/layouts/desktop/header";

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
    AppHeader
  }
};
