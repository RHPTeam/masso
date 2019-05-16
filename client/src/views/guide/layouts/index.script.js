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
    },
    homeHelp() {
      return this.$store.getters.getAllHelpHome;
    }
  },
  components: {
    AppHeader,
    AppFooter
  },
  async created() {
    await this.$store.dispatch("getAllHelp");
  },
  methods: {
    goToHomeHelp(){
      this.$router.push("/help");
    },
    goToQuestionsHelp(){
      console.log("b");
      this.$router.push("/help/detail");
    }
  },
  props: {
    // nameExpect:
  }
};
