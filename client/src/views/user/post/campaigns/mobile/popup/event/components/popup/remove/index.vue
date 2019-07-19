<template>
  <div class="popup">
    <!-- Start: Header -->
    <div class="popup--header position_relative px_2 pt_2">
      <div class="popup--title text_center mt_1">
        <span>Xóa </span>
        <span>{{ title }}</span>
      </div>
    </div>
    <!-- End: Header -->
    <!-- Start: Body -->
    <div class="popup--body px_2">
      <div class="popup--description">{{ description }}</div>
    </div>
    <!-- End: Body -->
    <!-- Start: Footer -->
    <div class="popup--footer px_2">
      <button class="btn_delete save mx_auto" @click="submit()">Xóa</button>
    </div>
    <div class="cancel my_2 text_center" @click.prevent="closePopup">
      Hủy
    </div>
    <!-- End: Footer -->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    }
  },
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    },
    submit() {
      this.$store.dispatch( "setEvent", {
        key: "plugins",
        value: ""
      } );
    }
  }
}
</script>

<style scoped lang="scss">
@import "./index.style.scss";
</style>
