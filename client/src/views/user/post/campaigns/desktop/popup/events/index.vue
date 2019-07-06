<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content">
        <!-- Start: Modal Header -->
        <app-header
          :event="event"
          @close="$emit( 'close', $event )"
        />
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="body p_4" v-if="event">
          <post-custom />
          <post-location />
        </div>
        <!-- End: Modal Body -->
        <div class="bottom d_flex align_items_center justify_content_end py_4 px_3">
          <div class="left position_relative mr_3">
            <label @click="isShowOptionTime = true">Tùy chỉnh thời gian đăng</label>
            <div class="select--time position_absolute" v-if="isShowOptionTime === true">
              <select-time @close="isShowOptionTime = $event" />
            </div>
          </div>
          <div class="right" v-if="event._id">
            <label @click="updateEvent">Cập nhật</label>
          </div>
          <div class="right" v-else>
            <label @click="createNewEvent">Tạo mới</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/header/index";
import SelectTime from "./components/popup/time";
import PostCustom from "./components/select";
import PostLocation from "./components/postlocation";

export default {
  components: {
    AppHeader,
    SelectTime,
    PostCustom,
    PostLocation
  },
  data() {
    return {
      isShowOptionTime: false,
      error: false,
      errorData: []
    }
  },
  // data () {
  //   return {
  //     isTypeEvent: false,
  //   }
  // },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    event() {
      return this.$store.getters.event;
    },
    caseEvent(){
      return this.$store.getters.caseEvent;
    }
  },
  methods: {
    closePopup(){
      this.$emit("closePopup", false);
    },
    close(){
      this.$store.dispatch( "setCaseEvent", {
        key: "popup",
        value: false
      } );
      this.$store.dispatch( "setEventReset" );
    },
    // close() {
    //   this.isShowOptionTime = false;
    // },
    async createNewEvent() {
      // if ( this.event.type_event === 1 ) {
      //   this.$store.dispatch( "setEventRemove", "break_point" );
      //   this.$store.dispatch( "setEventRemove", "post_custom" );
      //   this.$store.dispatch( "setEventRemove", "target_custom" );
      // } else if ( this.event.type_event === 0 ) {
      //
      // }

      if ( this.event.post_custom.length === 0 && !this.event.post_category ) {
        this.errorData.push( "Vui lòng chọn bài đăng để hoàn tất việc tạo sự kiện!" );
        return false;
      } else if ( this.event.target_custom.length === 0 &&
        !this.event.target_category &&
        this.event.timeline.length === 0
      ) {
        this.errorData.push( "Vui lòng chọn nơi đăng để hoàn tất việc tạo sự kiện!" );
        return false;
      }
      // else if ( this.event.hasOwnProperty( "post_category" ) ) {
      //   const categoryFilter = this.categories.filter( ( item ) => {
      //     return item._id === this.event.post_category._id;
      //   } );
      //
      //   if ( categoryFilter[0].totalPosts === 0 ) {
      //     this.errorData.push( "Danh mục đã chọn không có bài viết nào!" );
      //     return false;
      //   }
      // }


      await this.$store.dispatch( "createEvent", {
        campaignId: this.$route.params.campaignId,
        event: this.event
      } );
      // Close popup
      this.close();
      // Return popup start
      /*this.$store.dispatch( "setEvent", {
        key: "title",
        value: ""
      } );
      this.$store.dispatch( "setEvent", {
        key: "type_event",
        value: 0
      } );
      this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: 1
      } );
      this.$store.dispatch( "setEvent", {
        key: "break_point",
        value: 15
      } );
      this.$store.dispatch( "setEvent", {
        key: "post_custom",
        value: []
      } );
      this.$store.dispatch( "setEvent", {
        key: "target_custom",
        value: []
      } );

      this.$store.dispatch( "setEventReset" );*/
    },
    changeStatusDelete(val){
      this.isDeleteEvent = val;
      this.close();
    },
    async updateEvent() {
      // this.error = false;
      // this.errorData = [];
      // // Check validator
      // if ( this.event.title.length === 0 ) {
      //   this.error = true;
      //   return false;
      // }

      // if ( this.event.type_event === 1 ) {
      //   this.$store.dispatch( "setEventRemove", "break_point" );
      //   this.$store.dispatch( "setEventRemove", "post_custom" );
      //   this.$store.dispatch( "setEventRemove", "target_custom" );
      // } else if ( this.event.type_event === 0 ) {
      //   if ( this.event.post_custom.length === 0 && !this.event.post_category ) {
      //     this.errorData.push( "Vui lòng chọn bài đăng để hoàn tất việc tạo sự kiện!" );
      //     return false;
      //   } else if ( this.event.target_custom.length === 0 &&
      //     !this.event.target_category &&
      //     this.event.timeline.length === 0
      //   ) {
      //     this.errorData.push( "Vui lòng chọn nơi đăng để hoàn tất việc tạo sự kiện!" );
      //     return false;
      //   } else if ( this.event.hasOwnProperty( "post_category" ) ) {
      //     const categoryFilter = this.categories.filter( ( item ) => {
      //       return item._id === this.event.post_category._id;
      //     } );
      //
      //     if ( categoryFilter[0].totalPosts === 0 ) {
      //       this.errorData.push( "Danh mục đã chọn không có bài viết nào!" );
      //       return false;
      //     }
      //   }
      // }



      await this.$store.dispatch( "updateEvent", {
        campaignId: this.$route.params.campaignId,
        event: this.event
      } );

      // Close popup
      this.close();

      // Return popup start
      /*this.$store.dispatch( "setEvent", {
        key: "title",
        value: ""
      } );
      this.$store.dispatch( "setEvent", {
        key: "type_event",
        value: 0
      } );
      this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: 1
      } );
      this.$store.dispatch( "setEvent", {
        key: "break_point",
        value: 15
      } );
      this.$store.dispatch( "setEvent", {
        key: "post_custom",
        value: []
      } );
      this.$store.dispatch( "setEvent", {
        key: "target_custom",
        value: []
      } );

      this.$store.dispatch( "setEventReset" );*/
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "index.style";
</style>
