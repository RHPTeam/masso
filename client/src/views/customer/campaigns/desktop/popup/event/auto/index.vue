<template>
  <div class="main p_3">
    <div class="alert alert_success">
      Chế độ tự động đăng bài vào khung giờ vàng, giúp việc tự động hóa tài khoản facebook của bạn một cách dễ dàng. Hệ thống sẽ dựa vào thuật toán của facebook để tính toán ra các khung giờ vàng và đăng các bài viết được random ngẫu nhiên lên trang cá nhân của bạn.
    </div>
    <div class="section">
      <div class="r">
        <div class="c_12">
          <div class="section--content">
            <label class="mb_3"><b>Ngày áp dụng:</b></label>
            <date-picker class="time" role="date" v-model="event.started_at" @change="updateStartedDate" />
            <div class="space"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dateDisable = new Date();
dateDisable.setDate(dateDisable.getDate() - 1);

export default {
  props: {
    event: Object,
  },
  methods: {
    updateStartedDate( value ) {
      this.$store.dispatch( "setEvent", {
        key: "started_at",
        value: value
      } )
    }
  }
}
</script>

<style lang="scss" scoped>
  .section {
    label {
      color: $mainDark;
    }
    .time[role=date] {
      border: 1px solid $mainDark;
    }
    .space {
      height: 300px;
    }
  }
</style>
