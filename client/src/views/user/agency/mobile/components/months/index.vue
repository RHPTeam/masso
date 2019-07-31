<template>
  <div class="header mb_3">
    <div v-if="!agency.expire"></div>
    <div v-else class="content">
      <div class="item mb_2">
        <label>Thời gian còn lại</label>
        <span class="font_weight_bold time">{{agency.expire.leftTime}}</span> (tháng)
      </div>
      <div class="item mb_2">
        <label>Thời gian đã sử dụng</label>
        <span class="font_weight_bold time">{{agency.expire.usedTime}}</span> (tháng)
      </div>
      <div class="item mb_2 upgrade">
        <label>Đang nâng cấp</label>
        <div class="time"></div>
      </div>
    </div>
    <div class="link py_2 px_3 mt_3">
      <div class="title mb_2">Link giới thiệu</div>
      <div class="content">
        <a href="javascript:void(0)">{{agency.linkAffiliate}}</a>
      </div>
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
    background-color: #27292d;
    // border: 1px solid #444;
    // margin-bottom: 1rem;
    display: flex;
    width: 100%;
    text-align: left;
    padding: 1rem;
    border-radius: 0.625rem;
    .time {
      margin-left: auto;
      padding-right: 0.3rem;
      color: #ffb94a;
    }
  }
  .link {
    background-color: #27292d;
    border-radius: 0.625rem;
    .title {
      color: #ffb94a;
      font-weight: 600;
    }
    .content {
      width: 90%;
      white-space: nowrap; 
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
