import PopupConfirmPassword from './popup/confirmpassword';
import PopupChangeName from './popup/changename';
import PopupChangePassword from './popup/changepassword';
import PopupChangePhone from './popup/changephone';
import PopupKeywords from './popup/keywords';

import PopupDelete from './components/deletekeyword';
export default {
  filters: {
    getFirstLetter(string) {
      if (typeof string == 'undefined') {
        return;
      }
      if (string.length === 0) {
        return;
      }
      return string.charAt(0).toUpperCase();
    }
  },
  props: ['user'],
  components: {
    PopupConfirmPassword,
    PopupChangeName,
    PopupChangePassword,
    PopupChangePhone,
    PopupKeywords,
    PopupDelete
  },
  data() {
    return {
      isDropZone: false,
      isShowInfoUser: false,
      isShowKeywords: false,
      isShowPopupDelete: false,
      isConfirmDelete: false,
      selectedKeywordIndex: 0
    };
  },
  methods: {
    showChangeName() {
      // this.isShowChangeName = true;
      this.$store.dispatch('actionCursor', 61);
      this.isShowInfoUser = true;
    },
    showChangePassword() {
      this.$store.dispatch('actionCursor', 63);
      this.isShowInfoUser = true;
    },
    showChangePhoneNumber() {
      this.$store.dispatch('actionCursor', 62);
      this.isShowInfoUser = true;
    },
    showKeywords() {
      this.isShowKeywords = true;
    },
    showPopupDelete() {
      this.isShowPopupDelete = true;
    },
    confirmDelete(event) {
      if (event === true) {
        this.user.keywords.splice(this.selectedKeywordIndex, 1);
        this.$store.dispatch('updateUser', this.user).then(() => {
          this.isShowPopupDelete = false;
        });
      }
    },
    async logout() {
      await this.$store.dispatch('logout');
      window.location.href = `${process.env.VUE_APP_PARENT_URL}/#/redirect`;
    }
  }
};
