<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content modal--event p_0">
        <!-- Start: Modal Header -->
        <event-modal-header
          :colors="colors"
          :eventDetail="eventDetail"
          :isShowAlert="isShowAlert"
          @closePopup="closePopup($event)"
          @changeColor="eventDetail.color = $event"
          @changeTitle="changeTitle($event)"
          @updateAutopost="changeAutopost($event)"
          @updateEvent="updateEvent($event)"
        />
        <!-- End: Modal Header -->
        <!-- Start: Modal Body Autopost -->
        <div class="modal--event-body" v-if="eventDetail.type_event === 0">
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
          v-if="eventDetail.type_event === 1"
        >
          <event-modal-body-custom
            :eventDedault="eventDedault"
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
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    EventModalBodyCustom,
    EventModalHeader,
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
        "type_event": 0,
        "status": false,
        "break_point": 15
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
      // console.log(this.$store.getters.eventDetail);
      return this.$store.getters.eventDetail;
    }
  },
  methods: {
    closePopup( data ) {
      this.$emit( "closePopup", data );
    },
    changeAutopost: function (val) {
      val === true ? this.eventDetail.type_event = 0 : this.eventDetail.type_event = 1;
    },
    changeColor( color ) {
      this.eventDetail.color = color;
    },
    changeTitle( title ) {
      this.eventDetail.title = title;
    },
    updateEvent( val ) {
      const dataSender = {
        campaignsId: this.campaignsId,
        content: this.eventDedault
      };
      console.log( dataSender );
      if( val === '' ) {
        this.isShowAlert = true;
      } else {
        this.$store.dispatch( "createdNewEvent", dataSender );
        this.closePopup();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "./index.default";
  @import "./index.style";
</style>
