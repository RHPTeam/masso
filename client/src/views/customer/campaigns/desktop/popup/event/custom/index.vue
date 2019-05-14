<template>
  <div class="main p_3">
    <div class="alert alert_success">
      Chế độ tự động đăng bài vào khung giờ vàng, giúp việc tự động hóa tài khoản facebook của bạn một cách dễ dàng. Hệ thống sẽ dựa vào thuật toán của facebook để tính toán ra các khung giờ vàng và đăng các bài viết được random ngẫu nhiên lên trang cá nhân của bạn.
    </div>
    <div class="section">
      <div class="r">
        <div class="c_6">
          <div class="section--content">
            <div class="d_flex flex_column">
              <div class="card mb_3" role="type" aria-label="Type Post">
                <div class="card_body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
              </div>
              <div class="card" role="type" aria-label="Type Post">
                <div class="card_body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="c_6">
          <div class="card">
            <div class="card_body">
              <h5 class="card_title">Điều bạn cần biết?</h5>
              <div class="card_text">Hello mother fucker</div>
            </div>
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

    .card[role=type] {
      cursor: pointer;
    }
  }
</style>
