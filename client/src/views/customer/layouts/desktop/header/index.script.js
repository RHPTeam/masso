export default {
  data() {
    return {
      user: {
        imageAvatar: "",
        name: "Đặng Yến",
        emai: "dangyen@gmail.com"
      },
      statusCollapse: false,
      showdropdown: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    collapseMenu() {
      this.statusCollapse = this.$store.getters.collapseMenu;
    }
  },

  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
    },
    toogleSidebar() {
      this.statusCollapse = !this.statusCollapse;
      this.$store.dispatch("changeMenu", this.statusCollapse);
    },
    showDropdown: function() {
      this.showdropdown = !this.showdropdown;
    },
    closeDropdownUser() {
      this.showdropdown = false;
    }
  },

  filters: {
    getFirstLetter(string) {
      return string.charAt(0).toUpperCase();
    }
  }
};
