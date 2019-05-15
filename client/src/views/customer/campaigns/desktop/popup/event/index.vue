<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content">
        <!-- v-click-outside="close"-->
        <!-- Start: Modal Header -->
        <app-header :status="isTypeEvent" @change="isTypeEvent = $event" @closeNow="close($event)" />
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="body">
          <vue-perfect-scrollbar>
            <app-auto v-if="isTypeEvent === true" />
            <app-custom v-if="isTypeEvent === false" />
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
  data () {
    return {
      isTypeEvent: false
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  async created(){
    await this.$store.dispatch( "getAllCategories" );
    await this.$store.dispatch( "getAllPostGroups" );
    await this.$store.dispatch( "getAllPost" );
    await this.$store.dispatch( "getFacebookGroups" );
    this.$store.dispatch( "getFacebookPages" );
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
