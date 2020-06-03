export default {
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async readVersionNotification() {
      await this.$emit( "close", true );
      localStorage.setItem( "version", "1.0.3" );
    }
  }
};
