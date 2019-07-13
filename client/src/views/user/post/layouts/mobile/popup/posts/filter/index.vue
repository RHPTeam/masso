<template>
  <div class="dropdown--filter-post position_fixed">
    <div class="items" @click="closePopup">View All</div>
    <div class="cancel items" @click="closePopup">Hủy</div>
  </div>
</template>

<script>
export default {
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    }
  },
};
</script>

<style scoped lang="scss">
    .dropdown--filter-post {
      width: 90vw;
      // background: #2b2d33;
      // background: #fff;
      // box-shadow: 1px 1px 15px rgba(153, 153, 153, 0.4);
      // border-radius: 0.625rem;
      left: 5vw;
      bottom: 0;
      // color: #333;
      z-index: 10;
      .items {
        color: #333;
        background: #fff;
        margin-bottom: 0.625rem;
        border-radius: 0.625rem;
        padding: 0.5rem 0;
        text-align: center;
        border: 1px solid #ccc;
      }
    }
</style>