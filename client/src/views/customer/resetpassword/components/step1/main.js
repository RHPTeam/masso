/* eslint-disable prettier/prettier */
import AppAlert from "@/components/shared/alert";

export default {
  data() {
    return {
      email: "",
      errorText: "",
      statusClassError: false,
      statusClassPassed: false
    };
  },
  watch: {
    email( value ) {
      const regexEmail = new RegExp(
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
      );

      this.errorText = "Email không khả dụng cho định dạng!";
      this.statusClassError = true;
      this.statusClassPassed = false;
      if ( regexEmail.test( value.toLowerCase() ) ) {
        this.errorText = "";
        this.statusClassError = false;
        this.statusClassPassed = true;
      } else if ( value.length === 0 ) {
        this.errorText = "";
        this.statusClassError = false;
        this.statusClassPassed = false;
      }
    }
  },
  methods: {
    async sendMail() {
      await this.$store.dispatch( "resetPassword", this.email );
      this.$router.push( { name: "step2" } );
    }
  },
  components: {
    AppAlert
  }
};
