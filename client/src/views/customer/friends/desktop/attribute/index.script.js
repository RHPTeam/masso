import AppFilter from "./filter";

export default {
  components: {
    AppFilter
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
