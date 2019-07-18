<template>
  <div class="wrap" :data-theme="currentTheme">
    <div class="custom" v-if="caseEvent.libraries === 0">
      <!-- Start: Body -->
      <div class="body p_3 mb_4">
        <div class="body--top mb_2">
          <div class="left d_flex align_items_center mb_2">
            <div class="title mr_2">Danh sách bài viết</div>
            <div
              class="btn--change text_center"
              :style="[ { borderColor: event.color }, { color: event.color } ]"
              @click="selectFromLibraries"
            >Kho nội dung</div>
          </div>
          <div class="right">
            <div class="selected">
              Đã chọn
              <span>{{ event.post_custom.length }}</span> trong số
              <span>20</span> bài viết
            </div>
          </div>
        </div>
        <!--Start: Results Option Post detail -->
        <div class="wrapper">
          <!-- <div
            class="text_warning mb_3"
          >Khuyên dùng! Một bài viết không được đăng quá 5 vị trí khác nhau. Điều này, giúp tài khoản của bạn an toàn, spam, vi phạm tiêu chuẩn công động, v.v</div> -->

          <div class="content">
            <div
              class="item--empty text_center pt_3 pb_2"
              v-if="event.post_custom.length === 0"
            >Chưa có bài viết nào được chọn</div>
            <div
              v-else
              class="item--body d_flex align_items_center py_2"
              v-for="(post, index) in event.post_custom"
              :key="`d-${index}`"
            >
              <div class="item pl_2">
                <div class="name--post">{{post.title}}</div>
                <div class="name--category">
                  <span
                    v-for="(cate, index) in post._categories"
                    :key="`c-${index}`"
                  >{{cate.title + [ index === post._categories.length - 1 ? null : ', ' ] }}</span>
                </div>
              </div>
              <div class="action remove ml_auto text_center px_2" @click="removePostSelect(post._id)">
                <icon-base
                  class="icon--remove"
                  width="18px"
                  height="18px"
                  viewBox="0 0 16 16"
                  icon-name="Xóa"
                >
                  <icon-remove></icon-remove>
                </icon-base>
              </div>
            </div>
          </div>
        </div>
        <!--End: Results Option Post detail -->
      </div>
      <!-- End: Body -->
      <!-- Start: Bottom -->
      <div class="bottom">
        <!--Start: Post detail -->
        <!-- <global-option /> -->
        <!--End: Post detail -->
      </div>
      <!-- End: Bottom -->
    </div>
    <!--Start: Show Option Post detail -->
    <custom-option v-if="caseEvent.libraries === 1" />
    <!--End: Show Option Post detail -->
  </div>
</template>

<script>
import CustomOption from "./option/index";
// import GlobalOption from "../components/target/index";

export default {
  components: {
    CustomOption
    // GlobalOption
  },
  props: ["event"],
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    caseEvent() {
      return this.$store.getters.caseEvent;
    },
    // event() {
    //   return this.$store.getters.event;
    // }
  },
  methods: {
    resetPostType() {
      this.$store.dispatch("setCaseEvent", {
        key: "target",
        value: 0
      });
      this.$store.dispatch("setCaseEvent", {
        key: "post",
        value: 0
      });
      // Assign post_custom with empty array
      this.$store.dispatch("setEvent", {
        key: "post_custom",
        value: []
      });
      // Remove target_category
      // this.$store.dispatch( "setEventRemove", "target_category" );
    },
    removePostSelect(id) {
      this.$store.dispatch("setEventPostRemove", id);
    },
    selectFromLibraries() {
      this.$store.dispatch("setCaseEvent", {
        key: "libraries",
        value: 1
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
