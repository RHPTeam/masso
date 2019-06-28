<template>
  <div class="main position_relative" v-if="caseEvent" :data-theme="currentTheme">
    <div class="section d_flex align_items_center mb_4">
      <div class="tabs"
           role="category"
           :style="[ caseEvent.post === 1 ? { borderColor: event.color, color: event.color } : null ]"
           @click="selectPostType( 1 )"
      >
        <div
          class="d_flex align_items_center justify_content_center"
        >
          <div class="title mr_2">Đăng bài viết từ danh mục</div>
          <div class="icon position_relative">
            <icon-base
              class="icon--info"
              :style="[ caseEvent.post === 1 ? { stroke: event.color, color: event.color } : null ]"
              height="14"
              width="14"
              viewBox="0 0 18 18"
              icon-name="Thông tin"
            >
              <icon-info/>
            </icon-base>
            <div class="card--text position_absolute">Tự động lựa chọn bài viết trong danh mục và đăng tới nơi thiết lập.</div>
          </div>
        </div>
      </div>
      <div class="tabs"
           role="custom"
           :style="[ caseEvent.post === 2 ? { borderColor: event.color, color: event.color } : null ]"
           @click="selectPostType( 2 )"
      >
        <div
          class="d_flex align_items_center justify_content_center"
        >
          <div class="title mr_2">Tùy chọn đăng bài viết cụ thể</div>
          <div class="icon position_relative">
            <icon-base
              class="icon--info"
              :style="[ caseEvent.post === 2 ? { stroke: event.color, color: event.color } : null ]"
              height="14"
              width="14"
              icon-name="Thông tin"
              viewBox="0 0 18 18"
            >
              <icon-info/>
            </icon-base>
            <div class="card--text position_absolute">Cho phép tùy chọn các bài viết mong muốn và đăng tới nơi thiết lập.</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Start: Show option category -->
    <category-post
      class="px_3 pb_3"
      :event="event"
      v-if="caseEvent.post === 1"
    />
    <!-- End: Show option category -->
    <!-- Start: Show option detail -->
    <custom-post
      class="px_3 pb_3"
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
    currentTheme() {
      return this.$store.getters.themeName;
    },
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
        this.$store.dispatch( "setEventRemove", "post_category" );
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
    border-bottom: 2.25px solid transparent;
    background-color: #27292d;
    cursor: pointer;
    color: #ccc;
    font-weight: 600;
    flex: 0.5;
    padding: .65rem;
    transition: all .4s ease;
    &:hover{
      color: #999;
      .icon {
        .icon--info {
          color: #666;
          stroke: #666;
        }
      }
    }
    .title {
      font-size: .875rem;
    }
    .icon {
      &:hover {
        > .card--text {
          display: block;
        }
      }
      .icon--info {
        color: #999999;
        stroke: #999999;
        stroke-width: .5;
        transition: all .4s ease;
      }
    }
    .card--text {
      background: #2f3136;
      box-shadow: 0 0 10px rgba(0, 0, 0, .1);
      border: 1px solid #484848;
      border-radius: .25rem;
      color: #ccc;
      display: none;
      font-size: .825rem;
      font-weight: normal;
      right: -30px;
      top: 110%;
      padding: .375rem .75rem;
      width: 300px;
      z-index: 9;
    }
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

// ========================= CHANGE THEME

// dark
.main[data-theme="dark"] {
  background-color: #2f3136;
  .section {
    
  }
}
</style>
