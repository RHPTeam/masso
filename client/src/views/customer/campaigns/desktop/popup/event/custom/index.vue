<template>
  <div class="main p_3 position_relative" v-if="caseEvent">
    <div class="section" v-if="caseEvent.post === 0" >
      <div class="alert alert_success">
        Chế độ tự động đăng bài vào khung giờ vàng, giúp việc tự động hóa tài khoản facebook của bạn một cách dễ dàng.
        Hệ thống sẽ dựa vào thuật toán của facebook để tính toán ra các khung giờ vàng và đăng các bài viết được random ngẫu nhiên lên trang cá nhân của bạn.
      </div>
      <div class="r">
        <div class="c_6">
          <div class="section--content">
            <div class="d_flex flex_column">
              <div class="card mb_3" role="type" aria-label="Type Post" @click="selectPostType( 1 )">
                <div class="card_body">
                  <h5 class="card-title">Tùy chọn đăng bài viết từ danh mục</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
              </div>
              <div class="card" role="type" aria-label="Type Post" @click="selectPostType( 2 )">
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
      :event="event"
      v-else-if="caseEvent.post === 1"
    />
    <!-- End: Show option category -->
    <!-- Start: Show option detail -->
    <custom-post
      v-else-if="caseEvent.post === 2"
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
  props: {
    event: Object
  },
  computed: {
    caseEvent() {
      return this.$store.getters.caseEvent;
    }
  },
  methods: {
    selectPostType( value ) {
      this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: value
      } );
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
      color: $mainDarkLight;
    }
  }
</style>
