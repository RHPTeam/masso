<template>
  <div class="target" :data-theme="currentTheme">
    <div class="header d_flex align_items_center mb_2">
      <!-- Start: Title header -->
      <div class="icon mr_2 d_flex align_items_center">
        <span>Nơi đăng</span>
      </div>
      <!-- End: Title header -->
    </div>
    <!-- Start: Option Post detail -->
    <div class="body mb_4 px_3">
      <div class="r">
        <!-- Start: FB Timeline -->
        <div class="c_md_4 pl_0">
          <div class="card"
               :class="{ active: targetType === 3 }"
               @click="selectTargetType( 3 )"
          >
            <div class="card_body d_flex align_items_center">
              <div class="card--icon d_flex align_items_center justify_content_center mr_2"
                   :style="{ backgroundColor: '#ffb94a' }"
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
        <!-- Start: FB Timeline -->
        <!-- Start: Target Group -->
        <div class="c_md_4 px_2 group">
          <div class="card disabled"
               :class="{ active: targetType === 1 }"
               @click="selectTargetType( 3 )"
          >
            <div class="card_body d_flex align_items_center">
              <div class="card--icon d_flex align_items_center justify_content_center mr_2"
                   :style="{ backgroundColor: '#ffb94a' }"
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
        <div class="c_md_4 pr_0 option">
          <div class="card disabled"
               :class="{ active: targetType === 2 }"
               @click="selectTargetType( 3 )"
          >
            <div class="card_body d_flex align_items_center">
              <div class="card--icon d_flex align_items_center justify_content_center mr_2"
                   :style="{ backgroundColor: '#ffb94a' }"
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
                <div class="title mb_1">Tùy chọn</div>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Target Custom -->
      </div>
    </div>
    <!-- End: Option Post detail -->

    <!-- Start: Show Option Group -->
    <target-group v-if="targetType === 1" />
    <!-- End: Show Option Group -->

    <!-- Start: Show Option Page -->
    <target-custom v-else-if="targetType=== 2" />
    <!-- End: Show Option Page -->

    <!-- Start: Show Option Timeline -->
    <target-timeline
      v-else-if="targetType === 3"
      :postSchedule="postSchedule"
      @updatePostSchedule="updatePostSchedule($event)"
    />
    <!-- End: Show Option Timeline -->
  </div>
</template>

<script>
import TargetGroup from "./category";
import TargetCustom from "./custom";
import TargetTimeline from "./timline";

export default {
  components: {
    TargetGroup,
    TargetCustom,
    TargetTimeline
  },
  props: [ "postSchedule" ],
  data() {
    return {
      isShowOptionTarget: "none",
      targetType: 3
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    selectTargetType( value ) {
      this.targetType = value;
    },
    updatePostSchedule( val ) {
      this.$emit( "updatePostSchedule", val );
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
