import AppHeader from "./header";
import AppSidebar from "./sidebar";

export default {
  components: {
    AppHeader,
    AppSidebar
  },
  data() {
    return {
      timer: "",
      interval: null
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
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
        this.$store.dispatch( "changeThemeName", "dark" );
      }
    }
  },
  async created() {
    this.startUpdateTimer();
    await this.$store.dispatch( "getUserInfo" );
  },
  beforeDestroy() {
    this.stopUpdateTimer();
    clearInterval( this.interval );
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
};
