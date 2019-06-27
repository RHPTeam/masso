<template>
  <div class="target p_3 mb_2" :data-theme="currentTheme">
    <div class="header d_flex align_items_center mb_3">
      <!-- Start: Title header -->
      <div class="icon mr_2 d_flex align_items_center">
        <span>Nơi đăng</span>
      </div>
      <!-- End: Title header -->
    </div>
    <!-- Start: Option Post detail -->
    <div class="body mb_4">
      <div class="r">
        <!-- Start: FB Profile -->
        <div class="c_md_4">
          <div class="card"
               :class="caseEvent.target === 3 ? 'active' : null"
               @click="selectTargetType( 3 )"
          >
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
                  <icon-profile />
                </icon-base>
              </div>
              <div class="card--content">
                <div class="title mb_1">Trang cá nhân</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Start: FB Profile -->
        <!-- Start: Target Group -->
        <div class="c_md_4">
          <div class="card"
               :class="caseEvent.target === 1 ? 'active' : null"
               @click="selectTargetType( 1 )"
          >
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
                <div class="title mb_1">Nhóm đã lưu</div>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Target Group -->
        <!-- Start: Target Custom -->
        <div class="c_md_4">
          <div class="card"
               :class="caseEvent.target === 2 ? 'active' : null"
               @click="selectTargetType( 2 )"
          >
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
                  <icon-conf />
                </icon-base>
              </div>
              <div class="card--content">
                <div class="title mb_1">Tùy chọn nơi đăng</div>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Target Custom -->
      </div>
    </div>
    <!-- End: Option Post detail -->
    <!-- Start: Show Option Group -->
    <target-group v-if="caseEvent.target === 1" />
    <!-- End: Show Option Group -->

    <!-- Start: Show Option Page -->
    <target-custom v-else-if="caseEvent.target === 2" />
    <!-- End: Show Option Page -->

    <!-- Start: Show Option Newfeed -->
    <target-new-feed v-else-if="caseEvent.target === 3" />
    <!-- End: Show Option Newfeed -->
  </div>
</template>

<script>
import TargetGroup from "./category/index";
import TargetCustom from "./custom/index";
import TargetNewFeed from "./newfeed/index";

export default {
  components: {
    TargetGroup,
    TargetCustom,
    TargetNewFeed
  },
  data() {
    return {
      isShowOptionTarget: "none"
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
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
      if ( value === 1 ) {
        this.$store.dispatch( "setEvent", {
          key: "target_custom",
          value: []
        } );

        this.$store.dispatch( "setEvent", {
          key: "timeline",
          value: []
        } );
      } else if ( value === 2 ) {
        this.$store.dispatch( "setEventRemove", "target_category" );

        this.$store.dispatch( "setEvent", {
          key: "timeline",
          value: []
        } );
      } else if ( value === 3 ) {
        this.$store.dispatch( "setEvent", {
          key: "target_custom",
          value: []
        } );

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
  background-color: #fff;
  border-radius: .625rem;
  .icon {
    color: #666;
    svg {
      margin-bottom: -10px;
    }
    span {
      font-weight: 600;
    }
  }
  .target--selected {
    font-size: .825rem;
    .title {
      border: 1px solid;
      border-radius: .375rem;
    }
    .change {
      color: #999;
      cursor: pointer;
      font-style: italic;
      &:hover, &:focus, &:active, &:visited {
        text-decoration: underline;
      }
    }
  }
  .body {
    .card {
      border: 1px solid #e4e4e4;
      border-radius: .5rem;
      cursor: pointer;
      height: 100%;
      transition: all .4s ease;
      &.active {
        box-shadow: 0 0 8px rgba(0, 0, 0, .1);
      }
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


// ========================= CHANGE THEME

// dark
.target[data-theme="dark"] {
  background: #272a2c;
  .header {
    .icon {
      color: #ccc;
    }
  }
  .body {
    .card {
      background: none;
      color: #ccc;
      border-color: #444;
      &.active {
        box-shadow: 0 0 10px rgba(255, 255, 255, .15);
        font-weight: 600;
        transition: all .4s ease;
      }
      &:hover {
        box-shadow: 0 0 10px rgba(255, 255, 255, .15);
      }
    }
  }
}
</style>
