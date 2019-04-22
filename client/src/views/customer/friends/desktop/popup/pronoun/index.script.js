export default {
  props: [ "isShowPronounPopup", "userID" ],

  data() {
    return {
      isShowSuggestion: false,
      pronounInput: "",
      filterSuggestionList: [ "Bạn", "Chị", "Anh", "Em", "Cô" ]
    };
  },

  methods: {
    closeAddPopup() {
      this.$emit( "closeAddPopup", false );
    },
    showSuggestion() {
      this.isShowSuggestion = true;
    }
  }
};
