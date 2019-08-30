/* eslint-disable prettier/prettier */
import PopupInfoChange from "../../popup/infochange/index";
import PopupPasswordChange from "../../popup/password/index";

export default {
  components: {
    PopupInfoChange,
    PopupPasswordChange
  },
  props: [ "user" ],
  data() {
    return {
      errorText: {
        newPassword: "",
        confirmNewPassword: ""
      },
      isChangeImage: false,
      isCompare: false,
      isDropZone: false,
      isSwitchSuggest: false,
      isSwitchTutorial: false,
      isSwitchTheme: false,
      oldPassword: "",
      reset: {
        newPassword: "",
        confirmNewPassword: ""
      },
      showCustomTheme: false,
      showModal: false,
      showPopupPasswordChange: false,
      showPopupInfoChange: false,
      statusClassError: {
        newPassword: false,
        confirmNewPassword: false
      },
      statusClassPassed: {
        newPassword: false,
        confirmNewPassword: false
      },
      typeDeletePopup: 0
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async updateUser() {
      this.isComparePassword();
      if ( this.isCompare ) {
        const passwordSender = {
          password: this.oldPassword,
          newPassword: this.newPassword
        };

        this.$store.dispatch( "changePassword", passwordSender );
      }
      this.$store.dispatch( "updateUser", this.user );
    },
    isComparePassword() {
      if ( this.reset.newPassword === "" || this.reset.confirmNewPassword === "" ) {
        return ( this.isCompare = false );
      }
      if ( this.reset.newPassword !== this.reset.confirmNewPassword ) {
        return ( this.isCompare = false );
      }
      return ( this.isCompare = true );
    },
    async closeModalPassword( event ) {
      await this.resetPasswordForm();
      this.showPopupPasswordChange = event;
    },
    resetPasswordForm() {
      this.reset.newPassword = "";
      this.reset.confirmNewPassword = "";
    }
  },
  watch: {
    "user.name"() {
      this.showPopupInfoChange = true;
    },
    "user.phone"() {
      this.showPopupInfoChange = true;
    },
    "reset.newPassword"( value ) {
      this.errorText.newPassword = "Mật khẩu nằm trong khoảng 6-20 kí tự!";
      this.statusClassError.newPassword = true;
      this.statusClassPassed.newPassword = false;
      if ( value.length > 5 && value.length < 20 ) {
        this.errorText.newPassword = "";
        this.statusClassError.newPassword = false;
        this.statusClassPassed.newPassword = true;
      } else if ( value.length === 0 ) {
        this.errorText.newPassword = "";
        this.statusClassError.newPassword = false;
        this.statusClassPassed.newPassword = false;
      }
    },
    "reset.confirmNewPassword"( value ) {
      this.errorText.confirmNewPassword = "Mật khẩu không trùng nhau!";
      this.statusClassError.confirmNewPassword = true;
      this.statusClassPassed.confirmNewPassword = false;
      if ( value === this.reset.newPassword ) {
        this.errorText.confirmNewPassword = "";
        this.statusClassError.confirmNewPassword = false;
        this.statusClassPassed.confirmNewPassword = true;
        this.showPopupPasswordChange = true;
      } else if ( value.length === 0 ) {
        this.errorText.confirmNewPassword = "";
        this.statusClassError.confirmNewPassword = false;
        this.statusClassPassed.confirmNewPassword = false;
      }
    }
  }
};
