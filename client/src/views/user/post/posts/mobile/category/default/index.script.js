import ItemCategoryDefault from "./item";
export default {
  components: {
    ItemCategoryDefault
  },
  data() {
    return {
    }
  },
  computed: {
    categoriesDefault(){
      return this.$store.getters.allCateDefault;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  async created() {
    const defaultNumberNo = this.$store.getters.allCateDefault;

    if ( defaultNumberNo.length === 0 ) {
      this.$store.dispatch("getCategoryDefault");
    }
  },
  methods: {
  }
};
