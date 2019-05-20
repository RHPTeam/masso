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
        <div class="body" v-if="event">
          <vue-perfect-scrollbar>
            <app-auto
              v-if="event.type_event === 1"
              :event="event"
            />
            <app-custom
              v-if="event.type_event === 0"
              :event="event"
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
    }
  },
  mounted(){

  },

  created(){
    this.$store.dispatch( "getAllCategories" );
    this.$store.dispatch( "getAllPostGroups" );
    this.$store.dispatch( "getAllPost" );
    this.$store.dispatch( "getFacebookGroups" );
    this.$store.dispatch( "getFacebookPages" );
  },
  // methods: {
  //   close() {
  //     console.log( "cak" );
  //     this.$emit("close", false);
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
