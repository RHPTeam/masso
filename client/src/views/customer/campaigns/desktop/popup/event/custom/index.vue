<template>
  <div class="main p_3 position_relative">
    <div class="section" v-show="isShowOption === 'none'">
      <div class="alert alert_success">
        Chế độ tự động đăng bài vào khung giờ vàng, giúp việc tự động hóa tài khoản facebook của bạn một cách dễ dàng.
        Hệ thống sẽ dựa vào thuật toán của facebook để tính toán ra các khung giờ vàng và đăng các bài viết được random ngẫu nhiên lên trang cá nhân của bạn.
      </div>
      <div class="r">
        <div class="c_6">
          <div class="section--content">
            <div class="d_flex flex_column">
              <div class="card mb_3" role="type" aria-label="Type Post" @click="showOptionCategory">
                <div class="card_body">
                  <h5 class="card-title">Tùy chọn đăng bài viết từ danh mục</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
              </div>
              <div class="card" role="type" aria-label="Type Post" @click="showOptionCustom">
                <div class="card_body">
                  <h5 class="card-title">Tùy chọn đăng bài viết từ các nhóm cụ thể</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="c_6">
          <div class="card" role="type">
            <div class="card_body">
              <h5 class="card_title">Điều bạn cần biết?</h5>
              <div class="card_text">Hello mother fucker</div>
              <div class="card_text">Hello mother fucker</div>
              <div class="card_text">Hello mother fucker</div>
              <div class="card_text">Hello mother fucker</div>
              <div class="card_text">Hello mother fucker</div>
              <div class="card_text">Hello mother fucker</div>
              <div class="card_text">Hello mother fucker</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Start: Show option category -->
    <category-post
      v-show="isShowOption === 'category'"
      @closeCate="isShowOption = $event"
    />
    <!-- End: Show option category -->
    <!-- Start: Show option detail -->
    <custom-post
      v-show="isShowOption === 'custom'"
    />
    <!-- End: Show option detail -->
  </div>
</template>

<script>
import CategoryPost from "./category";
import CustomPost from "./detail";
export default {
  components: {
    CategoryPost,
    CustomPost
  },
  data() {
    return {
      dateNow: new Date(),
      isShowOption: "none"
    }
  },
  methods: {
    showOptionCategory() {
      this.isShowOption = 'category';
    },
    showOptionCustom() {
      this.isShowOption = 'custom';
    }
  },
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
      color: $mainDarkLight;
    }
  }
</style>
