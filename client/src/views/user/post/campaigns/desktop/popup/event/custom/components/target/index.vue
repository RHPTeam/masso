<template>
  <div class="target">
    <div class="header d_flex align_items_center mb_3">
      <!-- Start: Title header -->
      <div class="icon mr_2 d_flex align_items_center">
        <icon-base
            class="icon--sort-down"
            icon="icon--sort-down"
            width="14px"
            heigh="5px"
            viewBox="0 0 14 14"
        >
          <icon-sort-down></icon-sort-down>
        </icon-base>
        <span>Nơi đăng</span>
      </div>
      <div class="desc" v-if="caseEvent.target === 1">
        <div class="group">
          <span class="title py_1 px_2 mr_3">Đăng tới nhóm cụ thể</span>
          <span class="change" @click="resetTargetType">Thay đổi</span>
        </div>
      </div>
      <div class="desc" v-if="caseEvent.target === 2">
        <div class="page">
          <span class="title px_2 py_1 mr_3">Đăng tới nhóm, trang cụ thể</span>
          <span class="change" @click="resetTargetType">Thay đổi</span>
        </div>
      </div>
      <div class="desc" v-if="caseEvent.target === 3">
        <div class="page">
          <span class="title px_2 py_1 mr_3">Đăng tới trang cá nhân</span>
          <span class="change" @click="resetTargetType">Thay đổi</span>
        </div>
      </div>
      <!-- End: Title header -->
    </div>
    <!-- Start: Option Post detail -->
    <div class="body mb_2" v-if="caseEvent.target === 0">
      <div class="r">
        <div class="c_md_4">
          <div class="card" @click="selectTargetType( 1 )">
            <div class="card_body d_flex align_items_center">
              <div class="card--icon d_flex align_items_center justify_content_center mr_2"
                   :style="{ backgroundColor: event.color }"
              >
                <icon-base
                  class="icon--group"
                  height="22px"
                  width="22px"
                  viewBox="0 0 500 500"
                >
                  <icon-group></icon-group>
                </icon-base>
              </div>
              <div class="card--content">
                <div class="title mb_1">Đăng tới nhóm cụ thể</div>
              </div>
            </div>
          </div>
        </div>
        <div class="c_md_4">
          <div class="card" @click="selectTargetType( 2 )">
            <div class="card_body d_flex align_items_center">
              <div class="card--icon d_flex align_items_center justify_content_center mr_2"
                   :style="{ backgroundColor: event.color }"
              >
                <icon-base
                  class="icon--group"
                  height="22px"
                  width="22px"
                  viewBox="0 0 500 500"
                >
                  <icon-group></icon-group>
                </icon-base>
              </div>
              <div class="card--content">
                <div class="title mb_1">Đăng tới nơi tùy chỉnh</div>
              </div>
            </div>
          </div>
        </div>
        <div class="c_md_4">
          <div class="card" @click="selectTargetType( 3 )">
            <div class="card_body d_flex align_items_center">
              <div class="card--icon d_flex align_items_center justify_content_center mr_2"
                   :style="{ backgroundColor: event.color }"
              >
                <icon-base
                  class="icon--group"
                  height="22px"
                  width="22px"
                  viewBox="0 0 500 500"
                >
                  <icon-group></icon-group>
                </icon-base>
              </div>
              <div class="card--content">
                <div class="title mb_1">Đăng tới trang cá nhân</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End: Option Post detail -->

    <!-- Start: Show Option Group -->
    <target-group v-else-if="caseEvent.target === 1" />
    <!-- End: Show Option Group -->

    <!-- Start: Show Option Page -->
    <target-custom v-else-if="caseEvent.target === 2" />
    <!-- End: Show Option Page -->

    <!-- Start: Show Option Newfeed -->

    <!-- End: Show Option Newfeed -->
    <target-new-feed v-else-if="caseEvent.target === 3" />
    <!-- Start: Option Timer -->
      <timer-post/>
    <!-- End: Option Timer -->
  </div>
</template>

<script>
import TargetGroup from "./category/index";
import TargetCustom from "./custom/index";
import TargetNewFeed from "./newfeed/index";
import TimerPost from "../time/index";

export default {
  components: {
    TargetGroup,
    TargetCustom,
    TargetNewFeed,
    TimerPost
  },
  data() {
    return {
      isShowOptionTarget: "none"
    }
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
    resetTargetType() {
      this.$store.dispatch( "setEvent", {
        key: "target_custom",
        value: []
      } );
      this.$store.dispatch( "setEventRemove", "target_category" );
      this.$store.dispatch( "setCaseEvent", {
        key: "target",
        value: 0
      } );
    },
    selectTargetType( value ) {
      if ( value === 0 ) {
        this.$store.dispatch( "setEvent", {
          key: "target_custom",
          value: []
        } );
      } else if ( value === 1 ) {
        this.$store.dispatch( "setEventRemove", "target_category" );
      }
      this.$store.dispatch( "setCaseEvent", {
        key: "target",
        value: value
      } );
    }
  },
}
</script>

<style lang="scss" scoped>
.target {
    .icon {
      svg {
        margin-bottom: -10px;
      }
      span {
        font-weight: 600;
      }
    }
  .desc {
    .group, .page {
      span.title {
        border: 1px solid $border-color;
        border-radius: .5rem;
      }
      span.change {
        cursor: pointer;
        &:hover, &:focus, &:active, &:visited {
          color: #ffb94a;
          text-decoration: underline;
        }
      }
    }
  }
  .body {
    .card {
      border: 0;
      border-radius: .5rem;
      cursor: pointer;
      height: 100%;
      transition: all .4s ease;
      &:hover {
        box-shadow: 0 0 8px rgba(0, 0, 0, .1);
      }
      .card_body {
        padding: .75rem;
        .card--icon {
          border-radius: 100%;
          height: 36px;
          width: 36px;
          transition: all 1s ease;
          svg {
            color: #fff;
            stroke: #fff;
            opacity: .75;
            &.icon--group {
            }
          }
        }
        .card--content {
          h5 {
            font-weight: 600;
          }
          .card--text {
            color: #999;
            font-size: .825rem;
          }
        }
      }
    }
    .empty {
      border: none !important;
    }
  }
}
</style>
