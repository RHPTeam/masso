<template>
  <div class="post--content-detail">
    <div class="breadcrumb">
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
                v-model="eventDetail.post_category"
                @input="updateCate"
                :options="categories"
                placeholder="Chọn danh mục"
              >
                <template slot="option" slot-scope="option">
                  <span>{{ option.title }}</span>
                </template>
              </multiselect>
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
                 @click="showOptionPostGroupOfUser"
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
                 @click="showOptionPostPage"
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
        <!-- Start: Post Targets Custom-->
        <post-targets-custom
          class="px_3 mt_3"
          v-if="optionPostTarget === 'custom'"
          :eventDetail="eventDetail"
        />
        <!-- Start: Post Targets Custom-->
        <!-- Start: Post Targets Group-->
        <post-targets-group
          v-if="optionPostTarget === 'group'"
          class="px_3 mt_3"
          :eventDetail="eventDetail"
        />
        <!-- Start: Post Targets Group-->
      </div>
      <!-- Start: Post Targets -->
      <post-time :eventDetail="eventDetail" />
    </div>
  </div>
</template>

<script>
import PostTargetsGroup from "../post-target-group";
import PostTargetsCustom from "../post-target-custom";
import PostTime from "../custom-time";

export default {
  components: {
    PostTargetsGroup,
    PostTargetsCustom,
    PostTime
  },
  props: {
    eventDetail: {
      type: Object
    }
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
    },
    showOptionPostGroupOfUser(){
      this.$store.dispatch( "getAllPostGroups" );
      delete this.eventDetail.target_custom;
      this.optionPostTarget = 'group';
    },
    showOptionPostPage(){
      this.$store.dispatch( "getFacebookGroups" );
      this.$store.dispatch( "getFacebookPages" );
      delete this.eventDetail.target_category;
      this.optionPostTarget = 'custom';
    },
    updateCate(){
      const objSender = {
        campId: this.$route.params.campaignId,
        content: this.eventDetail
      };
      this.$store.dispatch( "updateEvent", objSender);
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./index.style.scss";
</style>
