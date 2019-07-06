<template>
  <div class="header mb_3">
    <div v-if="!agency.expire"></div>
    <div v-else class="d_flex align_items_center">
      <div class="item mr_3">{{agency.expire.leftTime}} (tháng)</div>
      <div class="item">{{agency.expire.usedTime}} (tháng)</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    agency(){
      return this.$store.getters.agency;
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  .item {
    padding: 3rem;
    border: 1px solid #27292d;
    border-radius: .625rem;
    background-color: #27292d;
  }
}
</style>
