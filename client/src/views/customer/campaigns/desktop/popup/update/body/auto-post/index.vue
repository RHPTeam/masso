<template>
  <div class="post--content-detail">
    <div class="breadcrumb">
      <div class="btn--back" @click="comeBackOptionPost">
        <icon-base
          class="icon--arrow-left"
          icon-name="arrow"
          width="18"
          height="22"
          viewBox="0 0 28 28"
        >
          <icon-arrow-left></icon-arrow-left>
        </icon-base>
      </div>
      <div class="breadcrumb--text">Tự động đăng bài viết từ danh mục</div>
    </div>
    <div class="content--wrapper">
      <!-- Start: Category -->
      <div class="category px_3">
        <div class="desc mb_2">Vui lòng chọn một danh mục bài viết</div>
        <div class="r">
          <div class="c_md_5">
            <div class="multiselect--custom">
              <multiselect
                label="title"
                :options="categories"
                placeholder="Chọn danh mục"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- End: Category -->
      <!-- Start: Post Targets -->
      <div class="post--targets mt_4">
        <div class="title d_flex align_items_center mb_2">
          <div class="mr_2 d_flex align_items_center">
            <icon-base
              class="icon--sort-down"
              icon="icon--sort-down"
              width="14px"
              heigh="5px"
              viewBox="0 0 14 14"
            >
              <icon-sort-down></icon-sort-down>
            </icon-base>
            Nơi đăng
          </div>
          <div class="option--selected"
               v-if="optionPostTarget === 'group'"
          >
            <span class="mr_2">Đăng tới nhóm đã lưu.</span>
            <span @click="optionPostTarget = 'none'">Thay đổi</span>
          </div>
          <div class="option--selected"
               v-if="optionPostTarget === 'custom'"
          >
            <span class="mr_2">Tùy chỉnh nơi đăng cụ thể.</span>
            <span @click="optionPostTarget = 'none'">Thay đổi</span>
          </div>
        </div>
        <!-- Start: Options Group -->
        <div class="r options--group px_3"
             v-if="optionPostTarget === 'none'"
        >
          <div class="c_md_6">
            <div class="options--item d_flex align_items_center justify_content_between"
                 @click="optionPostTarget = 'group'"
            >
              <div class="item--content">
                <div class="name mb_1">Đăng tới nhóm cụ thể</div>
                <div class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</div>
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
          <div class="c_md_6">
            <div class="options--item d_flex align_items_center justify_content_between"
                 @click="optionPostTarget = 'group'"
            >
              <div class="item--content">
                <div class="name mb_1">Tùy chọn nơi đăng cụ thể</div>
                <div class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</div>
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
        <!-- Start: Options Group -->
        <!-- Start: Post Targets Group-->
        <post-targets-group
          class="px_3 mt_3"
          v-if="optionPostTarget === 'group'"
        />
        <!-- Start: Post Targets Group-->
      </div>
      <!-- Start: Post Targets -->
      <post-time></post-time>
    </div>
  </div>
</template>

<script>
import PostTargetsGroup from "./post-target-group";
import PostTime from "../custom-time";

export default {
  components: {
    PostTargetsGroup,
    PostTime
  },
  data() {
    return {
      optionPostTarget: "none"
    }
  },
  computed: {
    categories() {
      if ( this.$store.getters.categories === undefined ) return;
      return this.$store.getters.categories;
    },
  },
  methods: {
    comeBackOptionPost() {
      this.$emit( "return", "none" );
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./index.style.scss";
</style>
