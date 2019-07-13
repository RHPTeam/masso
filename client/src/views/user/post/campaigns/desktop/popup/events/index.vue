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
          <div class="body d_flex px_4 pb_4" v-if="event">
            <div class="body--content">
              <!-- Start: Post time -->
              <post-time />
              <!-- End: Post time -->
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
              <!-- Start: Post Activity -->
              <post-activity />
              <!-- End: Post Activity -->
            </div>
            <div class="body--sidebar">
              <app-sidebar
                :errorLocation="errorLocation"
                @showDeletePopup="isDeleteEvent = $event"
              ></app-sidebar>
            </div>
          </div>
          <!-- End: Body -->
        </div>
      </div>
    </div>

    <!-- Start: POPUP DELETE-->
    <transition name="popup">
      <delete-event
        v-if="isDeleteEvent === true"
        title="Xóa sự kiện trong chiến dịch"
        @closePopup="changeStatusDelete($event)"
        storeActionName="Xóa sự kiện"
        :targetData="event"
        typeName="sự kiện"
      ></delete-event>
    </transition>
    <!--End: POPUP DELETE-->
  </vue-perfect-scrollbar>
</template>

<script>
import AppHeader from "./components/header/index";
import AppSidebar from  "./components/sidebar";
import DeleteEvent from "./components/popup/delete";
import PostTime from "./components/posttime";
import PostCustom from "./components/postcontent";
import PostLocation from "./components/postlocation";
import PostActivity from "./components/postactivity";

export default {
  components: {
    AppHeader,
    AppSidebar,
    DeleteEvent,
    PostTime,
    PostCustom,
    PostLocation,
    PostActivity
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
    changeStatusDelete(val){
      this.isDeleteEvent = val;
    },
  },
}
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
