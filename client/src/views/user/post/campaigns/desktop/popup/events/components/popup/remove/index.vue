<template>
  <div class="popup">
    <!-- Start: Header -->
    <div class="popup--header position_relative mx_3 pt_2">
      <div class="popup--title text_center mt_1">
        <span>Xóa </span>
        <span>{{ title }}</span>
      </div>
      <div class="btn--close position_absolute"
           @click.prevent="closePopup"
      >
        <icon-base
          class="icon--close"
          icon--name="Hủy"
          height="12px"
          width="12px"
          viewBox="0 0 20 20"
        >
          <icon-close></icon-close>
        </icon-base>
      </div>
    </div>
    <!-- End: Header -->
    <!-- Start: Body -->
    <div class="popup--body mx_3">
      <div class="popup--description">{{ description }}</div>
    </div>
    <!-- End: Body -->
    <!-- Start: Footer -->
    <div class="popup--footer mx_3 mt_2">
      <div class="d_flex">
        <button class="btn btn_success save" @click="submit()">Xóa</button>
      </div>
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
