<template>
  <div class="notification--wrapper" :data-theme="currentTheme">
    <div class="notification--content">
      <!-- Start: Notification Header -->
      <div class="notification--header d_flex align_items_center justify_content_between">
        <div class="title">Thông báo</div>
        <div class="action"> Đánh dấu tất cả là đã đọc</div>
      </div>
      <!-- End: Notification Header -->
      <!-- Start: Notification List -->
      <VuePerfectScrollbar class="notification--body">
        <div class="notification--list">
          <div class="notification--list-item d_flex align_items_center"
               v-for="(item, index) in notifications"
               :key="index"
               :class="[ item.status ? 'item--read' : '' ]"
          >
            <div class="item--image">
              <img :src="item.image" alt="">
            </div>
            <div class="item--info">
              <div class="item--content mb_1">{{ item.content }}</div>
              <div class="item--time">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>
      <!-- End: Notification List -->
      <!-- Start: Notification Footer -->
      <div class="notification--footer text_center">
        <div class="btn--see-all"
             @click="seeAllNotifications()"
        >Xem tất cả</div>
      </div>
      <!-- End: Notification Footer -->
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    VuePerfectScrollbar
  },
  props: [ "notifications" ],
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    seeAllNotifications() {
      this.$router.push( { name: "notifications" } );
      this.$emit( "closeDropdown", false );
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
