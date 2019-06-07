export default {
  data() {
    return {
      isShowFlagDropdown: false,
    }
  },
  methods: {    
    closeFlagDropdown(){
      this.isShowFlagDropdown = false;
    },
    showFlagDropdown(){
      this.isShowFlagDropdown = true;
    }
  },
    computed: {
      currentTheme() {
        return this.$store.getters.themeName;
      },
      collapseMenu() {
        return this.$store.getters.collapseMenu;
      }
    }
  };