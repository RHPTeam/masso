<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content modal--event p_0">
        <!-- Start: Modal Header -->
          <event-modal-header
            :activeColor="activeColor"
            :autopost="autopost"
            :colors="colors"
            :eventData="eventData"
            @closePopup="closePopup($event)"
            @changeColor="activeColor = $event"
            @updateAutopost="autopost = $event"
          />
        <!-- End: Modal Header -->
        <!-- Start: Modal Body Autopost -->
        <div class="modal--event-body" v-if="autopost === true">
          <div class="body--autopost d_flex align_items_center justify_content_center" >
            Autopost was turn on.
          </div>
        </div>
        <!-- End: Modal Body Autopost -->
        <!-- Start: Modal Body Custom -->
        <VuePerfectScrollbar class="modal--event-scroll" v-if="autopost === false">
          <event-modal-body-custom/>
        </VuePerfectScrollbar>
        <!-- End: Modal Body Custom -->
      </div>
    </div>
  </div>
</template>

<script>
import EventModalBodyCustom from "./body-custom"
import EventModalHeader from "./header"
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  props: ["eventData"],
  data() {
    return {
      activeColor: { name: "orange", code: "#FFB94A" },
      autopost: true,
      colors: [
        { name: "blue", code: "#85CFFF" },
        { name: "violet", code: "#BE92E3" },
        { name: "green", code: "#7BD48A" },
        { name: "gray", code: "#999999" },
        { name: "orange", code: "#FFB94A" },
        { name: "red", code: "#FF8787" }
      ]
    };
  },
  methods: {
    closePopup(data) {
      this.$emit("closePopup", data);
    }
  },
  components: {
    EventModalBodyCustom,
    EventModalHeader,
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss" scoped>
@import "../style";
@import "./style";
</style>
