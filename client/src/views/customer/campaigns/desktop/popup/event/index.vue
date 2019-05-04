<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content modal--event p_0">
        <!-- Start: Modal Header -->
        <event-modal-header
          :colors="colors"
          :eventData="eventData"
          @closePopup="closePopup($event)"
          @changeColor="changeColor($event)"
          @updateAutopost="changeAutopost($event)"
        />
        <!-- End: Modal Header -->
        <!-- Start: Modal Body Autopost -->
        <transition name="fade">
          <div class="modal--event-body" v-if="eventData.typeEvent === 0">
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
        </transition>
        <!-- End: Modal Body Autopost -->
        <!-- Start: Modal Body Custom -->
        <transition name="fade">
          <VuePerfectScrollbar
            class="modal--event-scroll"
            v-if="eventData.typeEvent === 1"
          >
            <event-modal-body-custom />
          </VuePerfectScrollbar>
        </transition>
        <!-- End: Modal Body Custom -->
      </div>
    </div>
  </div>
</template>

<script>
import EventModalBodyCustom from "./body-custom";
import EventModalHeader from "./header";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    EventModalBodyCustom,
    EventModalHeader,
    VuePerfectScrollbar
  },
  props: [ "eventData" ],
  data() {
    return {
      colors: [ "#85CFFF", "#BE92E3", "#7BD48A", "#999999", "#FFB94A", "#FF8787" ] // blue, violet, green, gray, orange, red
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup( data ) {
      this.$emit( "closePopup", data );
    },
    changeAutopost: function (val) {
      val === true ? this.eventData.typeEvent = 0 : this.eventData.typeEvent = 1;
    },
    changeColor( color ) {
      this.eventData.color = color;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style";
@import "./index.style";
</style>
