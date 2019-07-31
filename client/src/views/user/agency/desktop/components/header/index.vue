<template>
  <div class="header mb_3">
    <div v-if="!agency.expire"></div>
<<<<<<< HEAD
    <div v-else class="d_flex align_items_center">
      <div class="item mr_3">{{agency.expire.leftTime}} (tháng)</div>
      <div class="item">{{agency.expire.usedTime}} (tháng)</div>
=======
    <div v-else class="r mr_0 ml_0">
      <div class="c_4 item">
        <label>Thời gian còn lại</label>
        <div><span class="font_weight_bold time">{{agency.expire.leftTime}}</span> (tháng)</div>
      </div>
      <div class="c_4 item mr_2 ml_2">
        <label>Thời gian đã sử dụng</label>
        <div><span class="font_weight_bold time">{{agency.expire.usedTime}}</span> (tháng)</div>
      </div>
      <div class="c_4 item">
        <label>Đang nâng cấp</label>
        <div></div>
      </div>
    </div>
    <div class="link py_2 px_3 mt_3">
      <div class="title mb_2">Link giới thiệu</div>
      <div><a href="javascript:void(0)">{{agency.linkAffiliate}}</a></div>
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
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
<<<<<<< HEAD
  .item {
    padding: 1rem;
    border: 1px solid #27292d;
    border-radius: .625rem;
    background-color: #27292d;
    width: 50%;
    text-align: center;
=======
  .r {
    > .c_4 {
      flex: 0 0 32.33333%;
      max-width: 32.33333%;
    }
  }
  .item {
    text-align: center;
    padding: 2rem;
    border: 1px solid #27292d;
    border-radius: .625rem;
    background-color: #27292d;
    .time {
      color: #ffb94a;
    }
  }
  .link {
    background-color: #27292d;
    border-radius: .625rem;
    .title {
      color: #ffb94a;
      font-weight: 600;
    }
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
  }
}
</style>
