export default {
  props: [ "isShowDeletePopup", "title", "groupTarget" ],

  data() {
    return {};
  },

  methods: {
    closeAddPopup() {
      this.$emit( "closeAddPopup", false );
    }
  }
};
