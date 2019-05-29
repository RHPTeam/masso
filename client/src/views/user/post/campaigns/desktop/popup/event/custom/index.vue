<template>
  <div class="main p_3 position_relative" v-if="caseEvent">
    <div class="section d_flex align_items_center mb_4">
      <div class="tabs d_flex align_items_center justify_content_center mr_3" :class="isActive === true ? 'active' : 'off'" role="category" @click="selectPostType( 1 )">
        <div class="icon--left mr_2">
          <icon-base
            class="icon--categories"
            height="20"
            width="20"
            viewBox="0 0 525 525"
          >
            <icon-categories></icon-categories>
          </icon-base>
        </div>
        <h3 class="h5 mr_2">Đăng bài viết từ danh mục</h3>
        <div class="icon position_relative">
          <icon-base
            class="icon--edit"
            height="20"
            width="20"
            viewBox="0 0 25 25"
          >
            <icon-info/>
          </icon-base>
          <div class="card--text position_absolute">Tự động lựa chọn bài viết trong danh mục và đăng tới nơi thiết lập.</div>
        </div>
      </div>
      <div class="tabs d_flex align_items_center justify_content_center" :class="{active: isOption}" role="custom" @click="selectPostType( 2 )">
        <div class="icon--left mr_2">
          <icon-base
            class="icon--reply-post"
            height="20"
            width="20"
            viewBox="0 0 500 500"
          >
            <icon-reply-post></icon-reply-post>
          </icon-base>
        </div>
        <h3 class="h5 mr_2">Tùy chọn đăng bài viết cụ thể</h3>
        <div class="icon position_relative">
          <icon-base
            class="icon--edit"
            height="20"
            width="20"
            viewBox="0 0 25 25"
          >
            <icon-info/>
          </icon-base>
          <div class="card--text position_absolute">Cho phép tùy chọn các bài viết mong muốn và đăng tới nơi thiết lập.</div>
        </div>
      </div>
    </div>
    <!-- Start: Show option category -->
    <category-post
      :event="event"
      v-if="caseEvent.post === 1"
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
import CategoryPost from "./category/index";
import CustomPost from "./detail/index";

export default {
  components: {
    CategoryPost,
    CustomPost
  },
  props: {
    event: Object
  },
  data() {
    return {
      isActive: true,
      isOption: false
    }
  },
  computed: {
    caseEvent() {
      return this.$store.getters.caseEvent;
    }
  },
  methods: {
    selectPostType( value ) {
      if(value === 1) {
        this.isOption = false;
        this.isActive = true;
      } else if (value === 2) {
        this.isOption = true;
        this.isActive = false;
      }
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
  color: #ffba3c;
  label {
    color: $mainDark;
  }
  .time[role=date] {
    border: 1px solid $mainDark;
  }
  .tabs {
    cursor: pointer;
    .h5 {
      font-size: 16px;
    }
    .icon {
      &:hover, &:focus, &:active, &:visited {
        > .card--text {
          opacity: 1;
        }
      }
    }
    .card--text {
      background: #ffffff;
      border: 1px solid #e4e4e4;
      border-radius: .25rem;
      left: -100px;
      opacity: 0;
      top: 110%;
      padding: .25rem;
      width: 300px;
      z-index: 9;
    }
  }
  .active {
    border-bottom: 2px solid #ffba3c;
  }
  .off {
    border-bottom: 0 !important;
  }
  div[role="category"] {

  }
  div[role="custom"] {

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
