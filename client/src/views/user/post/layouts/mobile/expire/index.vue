<template>
  <div class="main" :data-theme="currentTheme">
    <div class="pricing--plan">
      <div class="plan--expire">
        Tài khoản sử dụng đến ngày:
        <b>02/08/2019</b>
      </div>
      <div class="plan--table">
        <div class="table--card" id="cards">
          <div class="card">
            <div class="card--type">1 tháng</div>
            <div class="card--price">2.800.000</div>
            <div class="card--fbaccount">
              Tài khoản:
              <b>1</b>
            </div>
            <div class="card--page">
              Page:
              <b>5</b>
            </div>
            <div class="card--group">
              Group:
              <b>500</b>
            </div>
            <div class="card--find-trending-content">Tìm nội dung hot</div>
            <div class="card--auto-post">Tự động đăng bài</div>
            <div class="card--auto-like">Tự động like</div>
            <div class="card--auto-addfriend">Tự động thêm bạn</div>
            <div class="card--auto-unfriend">Tự động huỷ kết bạn</div>
            <button class="card--btn-buy">Đăng ký</button>
          </div>
          <div class="card">
            <div class="card--type">1 tháng</div>
            <div class="card--price">2.800.000</div>
            <div class="card--fbaccount">
              Tài khoản:
              <b>1</b>
            </div>
            <div class="card--page">
              Page:
              <b>5</b>
            </div>
            <div class="card--group">
              Group:
              <b>500</b>
            </div>
            <div class="card--find-trending-content">Tìm nội dung hot</div>
            <div class="card--auto-post">Tự động đăng bài</div>
            <div class="card--auto-like">Tự động like</div>
            <div class="card--auto-addfriend">Tự động thêm bạn</div>
            <div class="card--auto-unfriend">Tự động huỷ kết bạn</div>
            <button class="card--btn-buy">Đăng ký</button>
          </div>
          <div class="card">
            <div class="card--type">1 tháng</div>
            <div class="card--price">2.800.000</div>
            <div class="card--fbaccount">
              Tài khoản:
              <b>1</b>
            </div>
            <div class="card--page">
              Page:
              <b>5</b>
            </div>
            <div class="card--group">
              Group:
              <b>500</b>
            </div>
            <div class="card--find-trending-content">Tìm nội dung hot</div>
            <div class="card--auto-post">Tự động đăng bài</div>
            <div class="card--auto-like">Tự động like</div>
            <div class="card--auto-addfriend">Tự động thêm bạn</div>
            <div class="card--auto-unfriend">Tự động huỷ kết bạn</div>
            <button class="card--btn-buy">Đăng ký</button>
          </div>
        </div>
        <div class="table--indicator">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("close", false);
    },
    scrollNext(event) {
      console.log(event);
      // document.getElementById("cards").scrollLeft += 500;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
