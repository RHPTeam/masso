export default {
  props: ["currentTheme"],
  methods: {
    closePopup() {
      this.$emit("close", false);
    }
  },
};
