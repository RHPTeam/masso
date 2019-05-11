<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content modal--event p_0">
        <!-- Start: Modal Header -->
        <event-modal-header
          :colors="colors"
          :eventDedault="eventDedault"
          :isShowAlert="isShowAlert"
          @closePopup="closePopup($event)"
          @changeColor="eventDedault.color = $event"
          @changeTitle="changeTitle($event)"
          @updateAutopost="changeAutopost($event)"
          @updateEvent="updateEvent($event)"
        />
        <!-- End: Modal Header -->
        <!-- Start: Modal Body Autopost -->
        <div class="modal--event-body" v-if="eventDedault.type_event === 0">
          <!-- Start: Setup Time Autopost -->
          <time-auto-post
            @updateTimeBreakPoint="eventDedault.break_point = $event"
            @updateDateToMiddleComponent="parseDateSetup($event)"
            @updateTimeToMiddleComponent="parseTimeSetup($event)"
          />
          <!-- Start: Setup Time Autopost -->
          <div
            class="body--autopost d_flex align_items_center justify_content_center"
          >
            <icon-base
              class="ic--autopost"
              icon-name="autopost"
              width="248"
              height="254"
              viewBox="0 0 480 480"
            >
              <icon-autopost/>
            </icon-base>
          </div>
        </div>
        <!-- End: Modal Body Autopost -->
        <!-- Start: Modal Body Custom -->
        <VuePerfectScrollbar
          class="modal--event-scroll"
          v-if="eventDedault.type_event === 1"
        >
          <event-modal-body-custom
            :eventDedault="eventDedault"
            @updateCateFromMiddleComponent="eventDedault.post_category = $event"
            @updateGroupFromMiddleComponent="eventDedault.target_category = $event"
            @updateTimeBreakPointFromMiddleComponent="eventDedault.break_point = $event"
            @updateDateFromMiddleComponent="parseDateSetup($event)"
            @updateTimeFromMiddleComponent="parseTimeSetup($event)"
            @updateTimeBreakPointCustomFromMiddleComponent="eventDedault.break_point = $event"
            @updateGroupCustomFromMiddleComponent="pushGroupCustom($event)"
            @updateGroupFacebookCustomFromMiddleComponent="pushGroupCustom($event)"
            @updatePagesFacebookCustomFromMiddleComponent="pushGroupCustom($event)"
            @updatePostCustomFromMiddleComponent="pushPostCustom($event)"
            @updateDateCustomFromMiddleComponent="parseDateSetup($event)"
            @updateTimeCustomFromMiddleComponent="parseTimeSetup($event)"
          />
        </VuePerfectScrollbar>
        <!-- End: Modal Body Custom -->
      </div>
    </div>
  </div>
</template>

<script>
import EventModalBodyCustom from "./body";
import EventModalHeader from "./header";
import TimeAutoPost from "../created/body/custom-time";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    EventModalBodyCustom,
    EventModalHeader,
    TimeAutoPost,
    VuePerfectScrollbar
  },
  props: {
    campaignsId: {
      type: String
    }
  },
  data() {
    return {
      colors: [ "#85CFFF", "#BE92E3", "#7BD48A", "#999999", "#FFB94A", "#FF8787" ], // blue, violet, green, gray, orange, red
      eventDedault: {
        "color": "#85CFFF",
        "title": "",
        "type_event": 1,
        "post_category": {},
        "post_custom": [],
        "started_at": "",
        "target_category": {},
        "target_custom": []
      },
      dateSetup: {
        minute: null,
        hour: null,
        date: null,
        month: null,
        year: null
      },
      isShowAlert: false,
    };
  },
  computed: {
    campaignDetail() {
      return this.$store.getters.campaignDetail;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    eventDetail() {
      if(Object.entries(this.$store.getters.eventDetail).length === 0 && this.$store.getters.eventDetail.constructor === Object) return;
      return this.$store.getters.eventDetail;
    }
  },
  methods: {
    closePopup( data ) {
      this.$emit( "closePopup", data );
    },
    changeAutopost: function (val) {
      val === true ? this.eventDedault.type_event = 0 : this.eventDedault.type_event = 1;
    },
    changeColor( color ) {
      this.eventDedault.color = color;
    },
    changeTitle( title ) {
      this.eventDedault.title = title;
    },
    updateEvent( val ) {
      if( val === '' ) {
        this.isShowAlert = true;
      } else {
        const result = new Date( this.dateSetup.year, this.dateSetup.month, this.dateSetup.date, this.dateSetup.hour, this.dateSetup.minute, 0 );
        this.eventDedault.started_at = result;
        if( this.eventDedault.type_event === 0 ) {
          delete this.eventDedault.post_category;
          delete this.eventDedault.post_custom;
          delete this.eventDedault.target_category;
          delete this.eventDedault.target_custom;
          const dataSender = {
            campaignsId: this.campaignsId,
            content: this.eventDedault
          };
          console.log(dataSender);
          this.$store.dispatch( "createdNewEvent", dataSender );
        } else if( this.eventDedault.type_event === 1 ) {
          const dataSender = {
            campaignsId: this.campaignsId,
            content: this.eventDedault
          };
          console.log(dataSender);
          this.$store.dispatch( "createdNewEvent", dataSender );
        }
        this.closePopup();
      }
    },
    parseDateSetup( val ){
      this.dateSetup.date = val.date;
      this.dateSetup.month = val.month;
      this.dateSetup.year = val.year;
    },
    parseTimeSetup( val ){
      this.dateSetup.minute = val.minute;
      this.dateSetup.hour = val.hour;
    },
    pushGroupCustom( val ){
      //check item have id don't difference
      this.eventDedault.target_custom.push( val );
      delete this.eventDedault.target_category;
    },
    pushPostCustom( val ){
      this.eventDedault.post_custom.push( val );
      delete this.eventDedault.post_category;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "./index.default";
  @import "./index.style";
</style>
