<template>
  <div class="modal--event-body px_3 py_4">
    <!-- Start: Post Content Options -->
    <div class="r post--content-options" v-show="isShowOptionPost === 'none'">
      <div class="col--main c_xl_8 c_lg_8 c_md_12">
        <div class="title mb_3">
          Tùy chọn nội dung
        </div>
        <div class="options--group">
          <div class="options--item d_flex align_items_center justify_content_between mb_3"
               @click="showOptionContentAuto"
          >
            <div class="item--content">
              <div class="name mb_1">Tự động đăng bài viết từ danh mục</div>
              <div class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</div>
            </div>
            <div class="item--icon">
              <icon-base
                class="icon--arrow-right"
                :style="[ {color: '#85CFFF'}, {stroke: '#85CFFF'} ]"
                icon-name="arrow"
                width="36"
                height="40"
                viewBox="0 0 28 28"
              >
                <icon-arrow-left></icon-arrow-left>
              </icon-base>
            </div>
          </div>
          <div class="options--item d_flex align_items_center justify_content_between"
               @click="isShowOptionPost = 'custom'"
          >
            <div class="item--content">
              <div class="name mb_1">Tùy chọn đăng bài viết cụ thể</div>
              <div class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</div>
            </div>
            <div class="item--icon">
              <icon-base
                class="icon--arrow-right"
                :style="[ {color: '#85CFFF'}, {stroke: '#85CFFF'} ]"
                icon-name="arrow"
                width="36"
                height="40"
                viewBox="0 0 28 28"
              >
                <icon-arrow-left></icon-arrow-left>
              </icon-base>
            </div>
          </div>
        </div>
      </div>
      <div class="col--support c_xl_4 c_lg_4 c_md_12">
        <div class="content--block">
          <div class="title">Bạn có biết?</div>
          <ul class="content--list">
            <li class="content--list-item mt_2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </li>
            <li class="content--list-item mt_2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </li>
            <li class="content--list-item mt_2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </li>
            <li class="content--list-item mt_2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- End: Post Content Options -->
    <!--Start: Setup auto post-->
    <auto-post
      v-if="isShowOptionPost === 'auto'"
      @return="isShowOptionPost = $event"
      @attachCategories="updateCateToParent($event)"
      @attachGroupSelected="updateGroupToParent($event)"
      @attachTimeBreakPoint="updateTimeBreakPointToParent($event)"
      @attachDate="updateDateToParent($event)"
      @attachTime="updateTimeToParent($event)"
    />
    <!--End: Setup auto post-->
    <!--Start: Setup custom post-->
    <custom-post
      v-if="isShowOptionPost === 'custom'"
      @comeBack="isShowOptionPost = $event"
    />
    <!--End: Setup custom post-->
  </div>
</template>

<script>
import AutoPost from "./auto-post";
import CustomPost from "./custom-post";
export default {
  components: {
    AutoPost,
    CustomPost
  },
  data() {
    return {
      isShowOptionPost: "none"
    }
  },
  methods: {
    updateCateToParent( val ){
      this.$emit( "updateCateFromMiddleComponent", val );
    },
    updateGroupToParent( val ) {
      this.$emit( "updateGroupFromMiddleComponent", val);
    },
    updateTimeBreakPointToParent(val){
      this.$emit( "updateTimeBreakPointFromMiddleComponent", val);
    },
    updateDateToParent(val){
      this.$emit( "updateDateFromMiddleComponent", val);
    },
    updateTimeToParent(val){
      this.$emit( "updateTimeFromMiddleComponent", val);
    },
    showOptionContentAuto() {
      this.$store.dispatch( "getAllCategories" );
      this.isShowOptionPost = 'auto'
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
