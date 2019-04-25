/* eslint-disable prettier/prettier */
import AppHeader from "@/views/customer/layouts/desktop/header";
import AppSidebar from "@/views/customer/layouts/desktop/sidebar";

export default {
  data() {
    return {
      timer: ""
    };
  },
  async created() {
    this.startUpdateTimer();
  },
  beforeDestroy() {
    this.stopUpdateTimer();
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    setTimer() {
      this.timer = new Date( Date.now() );
    },
    startUpdateTimer() {
      this.timer = setInterval( this.setTimer, 1000 );
    },
    stopUpdateTimer() {
      clearInterval( this.timer );
    }
  },
  watch: {
    timer( value ) {
      if ( !value ) {
        return;
      }
      if ( typeof value === "number" ) {
        return;
      }
      if ( parseInt( value.getHours() ) > 5 && parseInt( value.getHours() ) < 18 ) {
        this.$store.dispatch( "changeThemeName", "light" );
      } else if (
        ( parseInt( value.getHours() ) >= 18 && parseInt( value.getHours() ) <= 23 ) || ( parseInt( value.getHours() ) >= 0 && parseInt( value.getHours() ) <= 5 )
      ) {
        this.$store.dispatch( "changeThemeName", "light" );
      }
    }
  },
  components: {
    AppHeader,
    AppSidebar
  }
};
