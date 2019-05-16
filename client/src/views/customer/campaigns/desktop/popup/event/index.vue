<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content">
        <!-- v-click-outside="close"-->
        <!-- Start: Modal Header -->
        <app-header
          :status="isTypeEvent"
          :statusControlButtonEvent="statusUpdateEvent"
          @change="isTypeEvent = $event"
          @closeNow="close($event)"
        />
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="body">
          <vue-perfect-scrollbar>
            <app-auto
              v-if="isTypeEvent === true"
            />
            <app-custom
              v-if="isTypeEvent === false"
            />
          </vue-perfect-scrollbar>
        </div>
        <!-- End: Modal Body -->
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/header";

import AppAuto from "./auto";
import AppCustom from "./custom";

export default {
  components: {
    AppHeader,
    AppAuto,
    AppCustom
  },
  props: {
    statusUpdateEvent: {
      type: Boolean
    }
  },
  data () {
    return {
      isTypeEvent: false,
      eventDefault: {}
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  mounted(){
    if (localStorage.getItem('title')) {
      try {
        this.eventDefault.title = localStorage.getItem('title');
      } catch(e) {
        localStorage.removeItem('title');
      }
    }
    if (localStorage.getItem('breakPoint')) {
      try {
        this.eventDefault.break_point = localStorage.getItem('breakPoint');
      } catch(e) {
        localStorage.removeItem('breakPoint');
      }
    }
    if (localStorage.getItem('color')) {
      try {
        this.eventDefault.color = localStorage.getItem('color');
      } catch(e) {
        localStorage.removeItem('color');
      }
    }
    if (localStorage.getItem('postCategory')) {
      try {
        this.eventDefault.post_category = JSON.parse(localStorage.getItem('postCategory'));
      } catch(e) {
        localStorage.removeItem('postCategory');
      }
    }
    if (localStorage.getItem('postCustom')) {
      try {
        this.eventDefault.post_custom = JSON.parse(localStorage.getItem('postCustom'));
      } catch(e) {
        localStorage.removeItem('postCustom');
      }
    }
    if (localStorage.getItem('targetCategory')) {
      try {
        this.eventDefault.target_category = JSON.parse(localStorage.getItem('targetCategory'));
      } catch(e) {
        localStorage.removeItem('targetCategory');
      }
    }
    if (localStorage.getItem('targetCustom')) {
      try {
        this.eventDefault.target_custom = JSON.parse(localStorage.getItem('targetCustom'));
      } catch(e) {
        localStorage.removeItem('targetCustom');
      }
    }
    if (localStorage.getItem('typeEvent')) {
      try {
        this.eventDefault.type_event = localStorage.getItem('typeEvent');
      } catch(e) {
        localStorage.removeItem('typeEvent');
      }
    }
    if (localStorage.getItem('startAt')) {
      try {
        this.eventDefault.target_category = localStorage.getItem('startAt');
      } catch(e) {
        localStorage.removeItem('startAt');
      }
    }
  },
  async created(){
    await this.$store.dispatch( "getAllCategories" );
    await this.$store.dispatch( "getAllPostGroups" );
    await this.$store.dispatch( "getAllPost" );
    await this.$store.dispatch( "getFacebookGroups" );
    await this.$store.dispatch( "getFacebookPages" );

    const data = this.$store.getters.eventDetail;
    console.log(data);
    localStorage.setItem("breakPoint", data.break_point);
    localStorage.setItem("color", data.color);
    localStorage.setItem("postCategory", JSON.stringify(data.post_category));
    localStorage.setItem("postCustom", JSON.stringify(data.post_custom));
    localStorage.setItem("targetCategory", JSON.stringify(data.target_category));
    localStorage.setItem("targeCustom", JSON.stringify(data.target_custom));
    localStorage.setItem("startAt", data.started_at);
    localStorage.setItem("typeEvent", data.type_event);
    localStorage.setItem("title", data.title);
  },
  methods: {
    close(val) {
      this.$emit("close", val);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
