<template>
  <div class="content">
    <div class="breadcrumb d_flex align_items_center" @click="comeBackOptionPost">
      <div class="btn--back">
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
      <div class="breadcrumb--text">Tùy chỉnh đăng bài</div>
    </div>
    <div v-show="isShowSearch === false">
      <div class="desc d_flex align_items_center justify_content_between mb_2">
        <div class="btn--left d_flex align_items_center justify_content_center" @click="isShowSearch = true">
          Chọn
        </div>
        <div v-show="isShowSearch === false">Đã chọn 5 trong số 20 bài viết</div>
      </div>
      <div class="wrapper">
        <vue-perfect-scrollbar class="wrap--table">
          <div class="item--header d_flex align_items_center px_3 py_2">
            <div class="col col--name px_2">Tên bài viết</div>
            <div class="col col--category px_2">Danh mục</div>
            <div class="col col--content px_2">Nội dung</div>
            <div class="col col--checkbox px_2">
              <label class="custom--checkbox mb_0">
                <input type="checkbox" />
              </label>
            </div>
          </div>
          <div v-for="(item, index) in allPost" :key="`p-${index}`">
            <item :item="item" />
          </div>
        </vue-perfect-scrollbar>
      </div>
    </div>
    <!--  Start: search post  -->
    <transition name="search">
      <search-post
        v-if="isShowSearch === true"
        @back="isShowSearch = $event"
        @pushIdContentToArray="pushIdToArray($event)"
      />
    </transition>
    <!-- End: search post -->

    <div class="content--wrapper mt_2" v-show="isShowSearch === false">
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
                 @click="showOptionCustomPage"
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
        <!-- End: Options Group -->
        <!-- Start: Post Targets Group-->
        <post-targets-group
          class="px_3 mt_3"
          v-if="optionPostTarget === 'group'"
          @updateGroupToMiddleComponent="updateGroup($event)"
        />
        <!-- Start: Post Targets Group-->
        <!-- Start: Post Targets Group-->
        <post-targets-custom
          class="px_3 mt_3"
          v-if="optionPostTarget === 'custom'"
          @pushGroupFacebook="updateGroupFacebook($event)"
          @pushPagesFacebook="updatePagesFacebook($event)"
        />
        <!-- Start: Post Targets Group-->
      </div>
      <!-- End: Post Targets -->
      <!--  Start: Setup time  -->
      <post-time
        @updateTimeBreakPoint="updateTimeBreakPointToMiddleComponent($event)"
        @updateDateToMiddleComponent="updateDateToMiddleComponent($event)"
        @updateTimeToMiddleComponent="updateTimeToMiddleComponent($event)"
      />
      <!--  End: Setup time  -->
    </div>
  </div>
</template>

<script>
import SearchPost from "./search";
import PostTime from "../custom-time";
import Item from "./item";
import PostTargetsGroup from "./post-target-group";
import PostTargetsCustom from "./post-target-custom";
export default {
  components:{
    SearchPost,
    PostTime,
    Item,
    PostTargetsGroup,
    PostTargetsCustom
  },
  data() {
    return {
      isShowSearch: false,
      optionPostTarget: "none",
      targetDefault: {
        "target_custom": {},
        "target_category": []
      }
    }
  },
  computed: {
    allPost() {
      return this.$store.getters.allPost;
    }
  },
  methods: {
    comeBackOptionPost() {
      this.$emit( "comeBack", "none" );
    },
    updateTimeBreakPointToMiddleComponent( val ){
      this.$emit( "attachTimeCustomBreakPoint", val );
    },
    updateDateToMiddleComponent( val ){
      this.$emit( "attachDateCustom", val );
    },
    updateTimeToMiddleComponent( val ){
      this.$emit( "attachTimeCustom", val );
    },
    updateGroup( val ){
      // this.targetDefault.target_category.push( val );
      // delete this.targetDefault.target_custom;
      // console.log(this.targetDefault);
      this.$emit( "attachGroupCustom", val );
    },
    updateGroupFacebook( val ){
      // this.targetDefault.target_custom =  val;
      // delete this.eventDedault.target_category;
      // console.log(this.targetDefault);
      // // const dataSender = this.targetDefault.target_custom.map(item => {
      // //
      // // })
      console.log( "group" )
      console.log( val )
      this.$emit( "attachGroupFacebookCustom", val );
    },
    updatePagesFacebook( val){
      // this.targetDefault.target_custom = val;
      // delete this.eventDedault.target_category;
      // console.log(this.targetDefault);
      console.log( "page" )
      console.log( val )
      this.$emit( "attachPagesFacebookCustom", val );
    },
    pushIdToArray( val ) {
      this.$emit( "attachPostCustom", val );
    },
    showOptionCustomPage(){
      this.$store.dispatch( "getFacebookGroups" );
      this.$store.dispatch( "getFacebookPages" );
      this.optionPostTarget = 'custom';
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "index.style";
    .btn--left {
      background-color: #ffb94a;
      border: none;
      border-radius: .5rem;
      color: #ffffff;
      cursor: pointer;
      height: 30px;
      width: 80px;
    }
</style>
