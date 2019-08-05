<template>
  <div class="header mb_3">
    <div v-if="!agency.expire"></div>
    <div v-else class="d_flex align_items_center content">
      <div class="item">
        <label>Thời gian còn lại</label>
        <span class="font_weight_bold time">{{agency.expire.leftTime}}</span> (tháng)
      </div>
      <div class="item mr_2 ml_2">
        <label>Thời gian đã sử dụng</label>
        <span class="font_weight_bold time">{{agency.expire.usedTime}}</span> (tháng)
      </div>
      <div class="item upgrade">
        <label>Đang nâng cấp</label>
        <div class="time"></div>
      </div>
    </div>
    <div class="link py_2 px_3 mt_3">
      <div class="title mb_2">Link giới thiệu</div>
      <div>
        <a href="javascript:void(0)">{{agency.linkAffiliate}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    agency() {
      return this.$store.getters.agency;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  .item {
    width: 33%;
    text-align: center;
    padding: 2rem 0;
    border: 1px solid #27292d;
    border-radius: 0.625rem;
    background-color: #27292d;
    label {
      display: block;
      margin-bottom: 0;
    }
    .time {
      color: #ffb94a;
    }
  }
  .upgrade {
    height: 114px;
  }
  .link {
    background-color: #27292d;
    border-radius: 0.625rem;
    .title {
      color: #ffb94a;
      font-weight: 600;
    }
  }
}
@media screen and (max-width: 980px) {
  .header {
    .content {
      flex-direction: column;
      .item {
        margin-bottom: 1rem;
        display: flex;
        width: 100%;
        text-align: left;
        padding: 1rem;
        .time {
          margin-left: auto;
          padding-right: 0.3rem;
        }
      }
      .upgrade {
        height: 58px;
      }
    }
  }
}
</style>
