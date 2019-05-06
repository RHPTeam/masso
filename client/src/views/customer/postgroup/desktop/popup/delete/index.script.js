export default {
  props: [ "title", "groupTarget" ],

  data() {
    return {};
  },

  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    }
  }
};
