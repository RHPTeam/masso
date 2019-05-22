<template>
  <div class="main p_3 position_relative" v-if="caseEvent">
    <div class="section" v-if="caseEvent.post === 0" >
      <div class="r">
        <div class="c_6">
<!--<<<<<<< HEAD-->
<!--          <div class="section&#45;&#45;content">-->
<!--            <div class="d_flex flex_column">-->
<!--              <div class="card mb_3" role="type" aria-label="Type Post" @click="selectPostType( 1 )">-->
<!--                <div class="card_body">-->
<!--                  <h5 class="card-title">Tùy chọn đăng bài viết từ danh mục</h5>-->
<!--                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="card" role="type" aria-label="Type Post" @click="selectPostType( 2 )">-->
<!--                <div class="card_body">-->
<!--                  <h5 class="card-title">Tùy chọn đăng bài viết từ các nhóm cụ thể</h5>-->
<!--                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>-->
<!--                </div>-->
<!--              </div>-->
          <div class="card" role="type" aria-label="Type Post" @click="selectPostType( 1 )">
            <div class="card_body text_center">
              <div class="card--icon d_flex align_items_center justify_content_center mx_auto mb_3"
                   :style="{backgroundColor: event.color}"
              >
                <icon-base
                  class="icon--categories"
                  height="52px"
                  width="54px"
                  viewBox="0 0 460 460"
                >
                  <icon-categories></icon-categories>
                </icon-base>
              </div>
              <div class="card--content">
                <h3 class="h5">Đăng bài viết từ danh mục</h3>
                <div class="card--text">Hệ thống sẽ lấy ngẫu nhiên các bài viết trong danh mục để đăng lên nơi bạn thiết lập.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="c_6">
          <div class="card" role="type" aria-label="Type Post" @click="selectPostType( 2 )">
            <div class="card_body text_center">
              <div class="card--icon d_flex align_items_center justify_content_center mx_auto mb_3"
                   :style="{backgroundColor: event.color}"
              >
                <icon-base
                  class="icon--reply-post"
                  height="56px"
                  width="50px"
                  viewBox="0 0 500 500"
                >
                  <icon-reply-post></icon-reply-post>
                </icon-base>
              </div>
              <div class="card--content">
                <h3 class="h5">Tùy chọn đăng bài viết cụ thể</h3>
                <div class="card--text">Bạn có thể tùy chỉnh các bài viết mà bạn muốn, và thiết lập các thông tin nâng cao và chi tiết hơn.</div>
              </div>
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
    border: 0;
    border-radius: .5rem;
    cursor: pointer;
    color: $mainDarkLight;
    height: 100%;
    transition: all .4s ease;
    &:hover {
      box-shadow: 0 0 8px rgba(0, 0, 0, .1);
    }
    .card_body {
      .card--icon {
        border-radius: 100%;
        height: 100px;
        opacity: .75;
        transition: background-color 1s ease;
        width: 100px;
        svg {
          color: #fff;
          stroke: #fff;
          stroke-width: 1;
          &.icon--reply-post {
            margin-left: 4px;
          }
          &.icon--categories {
            stroke-width: 6;
          }
        }
      }
      .card--content {
        .card--text {
          color: #999;
          font-size: .825rem;
        }
      }
    }
  }
}
</style>
