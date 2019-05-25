<template>
  <div class="main p_3">
    <div class="alert alert_success mb_0">
      Chế độ tự động đăng bài vào khung giờ vàng, giúp việc tự động hóa tài khoản Facebook của bạn một cách dễ dàng.
      Hệ thống sẽ dựa vào thuật toán của Facebook để tính toán ra các khung giờ vàng và đăng các bài viết được random ngẫu nhiên lên trang cá nhân của bạn.
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .section {
    label {
      color: $mainDark;
    }
    .time[role=date] {
    }
    .space {
      height: 300px;
    }
  }
</style>
