<template>
  <vue-perfect-scrollbar class="window d_flex align_items_start justify_content_center">
    <div class="container">
      <div class="wrapper position_relative">
        <div class="btn--close position_absolute d_flex align_items_center justify_content_center"
             @click="closePopup()"
        >
          <icon-base
            class="icon--close"
            icon--name="Hủy"
            height="16px"
            width="16px"
            viewBox="0 0 20 20"
          >
            <icon-close></icon-close>
          </icon-base>
        </div>
        <div class="main">
          <!-- Start: Header -->
          <app-header
            :event="event"
            @close="$emit('close', $event)"
          />
          <!-- End: Header -->
          <!-- Start: Body -->
          <div class="body d_flex px_4" v-if="event">
            <div class="body--content">
              <!-- Start: Post Custom -->
              <post-custom
                @setErrorPost="errorPost = $event"
              />
              <!-- End: Post Custom -->
              <div class="alert--text" v-if="errorPost === true">
                Vui lòng chọn bài đăng để hoàn tất việc tạo sự kiện!
              </div>
              <!-- Start: Post Location -->
              <post-location
                @setErrorLocation="errorLocation = $event"
              />
              <div class="alert--text" v-if="errorLocation === true">
                Vui lòng chọn nơi đăng để hoàn tất việc tạo sự kiện!
              </div>
              <!-- End: Post Location -->
              <!-- Start: Post Time -->
              <select-time class="mt_4"/>
              <!-- End: Post Time -->
            </div>
            <div class="body--sidebar">
              <app-sidebar></app-sidebar>
            </div>
          </div>
          <!-- End: Body -->
          <div class="footer d_flex align_items_center justify_content_between py_3 px_3">
            <div class="footer--left">
              <div class="left" v-if="event._id">
                <label @click="isDeleteEvent = true">Xóa sự kiện</label>
              </div>
            </div>
            <div class="footer-right">
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
    </div>

    <!-- Start: POPUP DELETE-->
    <delete-event
      v-if="isDeleteEvent === true"
      title="Xóa sự kiện trong chiến dịch"
      @closePopup="changeStatusDelete($event)"
      storeActionName="Xóa sự kiện"
      :targetData="event"
      typeName="sự kiện"
    ></delete-event>
    <!--End: POPUP DELETE-->
  </vue-perfect-scrollbar>
</template>

<script>
import AppHeader from "./components/header/index";
import AppSidebar from  "./components/sidebar";
import DeleteEvent from "./components/popup/delete";
import SelectTime from "./components/popup/time";
import PostCustom from "./components/postcontent";
import PostLocation from "./components/postlocation";

export default {
  components: {
    AppHeader,
    AppSidebar,
    DeleteEvent,
    SelectTime,
    PostCustom,
    PostLocation
  },
  data() {
    return {
      isShowOptionTime: false,
      errorPost: false,
      errorLocation: false,
      errorData: [],
      isDeleteEvent: false
    }
  },
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
  created(){
    this.$store.dispatch( "getAllPost" );
  },
  methods: {
    closePopup(){
      this.$store.dispatch( "setCaseEvent", {
        key: "popup",
        value: false
      } );

      this.$store.dispatch( "setEventReset" );
    },
    close(){
      this.$store.dispatch( "setCaseEvent", {
        key: "popup",
        value: false
      } );
    },
    async createNewEvent() {
      if ( this.event.post_custom.length === 0 && !this.event.post_category ) {
        this.errorPost = true;
        return false;
      } else if ( this.event.target_custom.length === 0 &&
        !this.event.target_category &&
        this.event.timeline.length === 0
      ) {
        this.errorLocation = true;
        return false;
      }

      // Close popup
      this.close();

      await this.$store.dispatch( "createEvent", {
        campaignId: this.$route.params.campaignId,
        event: this.event
      } );

      this.$store.dispatch( "setEventReset" );
    },
    changeStatusDelete(val){
      this.isDeleteEvent = val;
      this.close();
    },
    async updateEvent() {
      // Close popup
      this.close();

      // Convert event timeline to accounts id array
      let fbAccounts  = [];
      this.event.timeline.forEach( ( account ) => {
        fbAccounts.push( account._id );
      } );
      this.event.timeline = fbAccounts;

      console.log(this.event);

      await this.$store.dispatch( "updateEvent", {
        campaignId: this.$route.params.campaignId,
        event: this.event
      } );

      this.$store.dispatch( "setEventReset" );
    }
  },
}
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
