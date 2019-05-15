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
            <date-picker class="time" role="date" v-model="dateNow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateNow: new Date()
    }
  },
  watch: {
    dateNow(val){
      localStorage.setItem( "startAt", val );
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
  }
</style>
