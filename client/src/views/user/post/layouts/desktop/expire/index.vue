<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content" v-click-outside="closePopup">
        <div class="pricing--plan">
          <div class="logo">
            <icon-base
              class="logo--icon"
              icon-name="ZinBee"
              width="132.92"
              height="49.73"
              viewBox="0 0 250.446 93.703"
            >
              <icon-logo />
            </icon-base>
          </div>
          <div class="header">
            <div class="header--title">Gia hạn tài khoản</div>
          </div>
          <div @click="closePopup" class="close">
            <icon-base
              class="close--icon"
              icon--name="Hủy"
              height="20px"
              width="20px"
              viewBox="0 0 20 20"
            >
              <icon-close />
            </icon-base>
          </div>
          <div class="table">
            <div class="table--card">
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
                <div class="card--type">6 tháng</div>
                <div class="card--price">16.199.000</div>
                <div class="card--fbaccount">
                  Tài khoản:
                  <b>2</b>
                </div>
                <div class="card--page">
                  Page:
                  <b>10</b>
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
                <div class="card--btn-buy">Đăng ký</div>
              </div>
              <div class="card">
                <div class="card--type">1 năm</div>
                <div class="card--price">28.799.000</div>
                <div class="card--fbaccount">
                  Tài khoản:
                  <b>2</b>
                </div>
                <div class="card--page">
                  Page:
                  <b>30</b>
                </div>
                <div class="card--group">
                  Group:
                  <b>1000</b>
                </div>
                <div class="card--find-trending-content">Tìm nội dung hot</div>
                <div class="card--auto-post">Tự động đăng bài</div>
                <div class="card--auto-like">Tự động like</div>
                <div class="card--auto-addfriend">Tự động thêm bạn</div>
                <div class="card--auto-unfriend">Tự động huỷ kết bạn</div>
                <div class="card--btn-buy">Đăng ký</div>
              </div>
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
