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
      <!-- End: Title header -->
    </div>
    <!-- Start: Option Post detail -->
    <div class="body d_flex align_items_center justify_content_between mb_2" v-if="caseEvent.target === 0">
      <div class="card mr_2" @click="selectTargetType( 1 )">
        <div class="card_body">
          <h5 class="mb_1">Đăng tới nhóm cụ thể</h5>
          <div>Tùy chọn tới nhóm mà bạn đã tạo trong danh mục nhóm và trang</div>
        </div>
      </div>
      <div class="card ml_2" @click="selectTargetType( 2 )">
        <div class="card_body">
          <h5 class="mb_1">Đăng tới nơi tùy chỉnh</h5>
          <div>Tùy chọn tới nhóm và trang mà bạn tham gia trên facebook</div>
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

    <!-- Start: Option Timer -->
      <timer-post/>
    <!-- End: Option Timer -->
  </div>
</template>

<script>
import TargetGroup from "./category";
import TargetCustom from "./custom";
import TimerPost from "../time";

import FunctionLocalStorage from "@/utils/functions/localStorage";

export default {
  components: {
    TargetGroup,
    TargetCustom,
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
    }
  },
  methods: {
    resetTargetType() {
      this.$store.dispatch( "setCaseEvent", {
        key: "target",
        value: 0
      } );
    },
    selectTargetType( value ) {
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
      cursor: pointer;
      width: 50%;
      h5 {
        font-weight: 600;
      }
    }
  }
}
</style>
