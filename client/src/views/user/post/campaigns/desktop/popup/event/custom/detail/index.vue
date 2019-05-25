<template>
  <div class="wrap">
    <div class="custom" v-if="caseEvent.libraries === 0">
      <!-- Start: Top -->
      <div class="top d_flex align_items_center justify_content_between mb_3">
        <div class="top--left"
             @click="resetPostType"
        >≪ Quay lại</div>
        <div class="top--right d_flex align_items_center">
          <div class="mr_2">Tùy chọn đăng bài viết cụ thể</div>
          <div class="icon">
            <icon-base
              class="icon--reply-post"
              :style="[ { color: event.color }, { stroke: event.color } ]"
              height="22px"
              width="18px"
              viewBox="0 0 460 460"
            >
              <icon-reply-post></icon-reply-post>
            </icon-base>
          </div>
        </div>
      </div>
      <!-- End: Top -->
      <!-- Start: Body -->
      <div class="body p_3 mb_4">
        <div class="body--top d_flex align_items_center justify_content_between mb_3">
          <div class="left d_flex align_items_center">
            <div class="title mr_2">Danh sách bài viết</div>
            <div class="btn--change text_center"
                 :style="[ { borderColor: event.color }, { color: event.color } ]"
                 @click="selectFromLibraries"
            >
              Kho nội dung
            </div>
          </div>
          <div class="right">
            <div class="selected">Đã chọn <span>{{ event.post_custom.length }}</span> trong số <span>20</span> bài viết</div>
          </div>
        </div>
        <!--Start: Results Option Post detail -->
        <div class="wrapper">
          <div class="item--header d_flex align_items_center px_3 py_2">
            <div class="col col--name px_2">Tên bài viết</div>
            <div class="col col--category px_2">Danh mục</div>
            <div class="col col--content px_2">Nội dung</div>
            <div class="col col--checkbox px_2">
              <icon-base
                class="icon--remove"
                width="18px"
                height="18px"
                viewBox="0 0 16 16"
              >
                <icon-remove></icon-remove>
              </icon-base>
            </div>
          </div>
          <div>
            <div class="item--empty text_center pt_3" v-if="event.post_custom.length === 0">Chưa có bài viết nào được chọn</div>
            <div v-else class="item--body d_flex align_items_center px_3 py_2" v-for="(post, index) in event.post_custom" :key="`d-${index}`">
              <div class="col col--name px_2">
                <div class="col col--name-text">
                  {{post.title}}
                </div>
              </div>
              <div class="col col--category px_2">
                <span v-for="(cate, index) in post._categories" :key="`c-${index}`">
                  {{cate.title +  [ index === post._categories.length - 1 ? null : ', ' ] }}
                </span>
              </div>
              <div class="col col--content px_2">
                <div class="col--content-text">
                  {{post.content}}
                </div>
              </div>
              <div class="col col--checkbox px_2" @click="removePostSelect(index)">
                <icon-base
                  class="icon--remove"
                  width="18px"
                  height="18px"
                  viewBox="0 0 16 16"
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
        <global-option />
        <!--End: Post detail -->
      </div>
      <!-- End: Bottom -->
    </div>
    <!--Start: Show Option Post detail -->
    <custom-option
      v-if="caseEvent.libraries === 1"
    />
    <!--End: Show Option Post detail -->
  </div>
</template>

<script>
import CustomOption from "./option/index";
import GlobalOption from "../components/target/index";

export default {
  components: {
    CustomOption,
    GlobalOption
  },
  computed: {
    caseEvent() {
      return this.$store.getters.caseEvent;
    },
    event() {
      return this.$store.getters.event;
    }
  },
  methods: {
    resetPostType() {
      this.$store.dispatch( "setCaseEvent", {
        key: "target",
        value: 0
      } );
      this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: 0
      } );
      // Assign post_custom with empty array
      this.$store.dispatch( "setEvent", {
        key: "post_custom",
        value: []
      } );
    },
    selectFromLibraries() {
      this.$store.dispatch( "setCaseEvent", {
        key: "libraries",
        value: 1
      } );
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
