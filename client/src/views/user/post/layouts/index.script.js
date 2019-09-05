import AppHeader from './desktop/header';
import AppSidebar from './desktop/sidebar';
import AppNotification from './desktop/components/notification';
import AppExpire from './desktop/components/expire';
import GuidePopup from './desktop/components/guide';
import instantPostButton from './desktop/components/instantPostButton';

import HeaderMobile from './mobile/header';
import FooterMobile from './mobile/footer';

export default {
  components: {
    AppHeader,
    AppSidebar,
    AppNotification,
    AppExpire,
    GuidePopup,
    HeaderMobile,
    FooterMobile,
    instantPostButton,

  },
  data() {
    return {
      statusNetwork: true,
      showExpire: false,
      innerWidth: 0
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    variableControlGuide() {
      return this.$store.getters.variableControlGuide;
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
  methods: {
    getWindowWidth(event) {
      this.innerWidth = window.innerWidth;
    }
  }
};
