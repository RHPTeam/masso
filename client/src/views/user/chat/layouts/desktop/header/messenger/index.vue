<template>
  <div class="messenger--wrapper" :data-theme="currentTheme">
    <div class="messenger--content">
      <!-- Start: Notification Header -->
      <div class="messenger--header d_flex align_items_center justify_content_between">
        <div class="title">Tin nhắn</div>
        <div class="action">{{ $t("chat.layout.notification.readAll") }}</div>
      </div>
      <!-- End: Notification Header -->
      <!-- Start: Notification List -->
      <VuePerfectScrollbar class="messenger--body">
        <div class="messenger--list">
          <div class="messenger--list-item d_flex align_items_center"
               v-for="(item, index) in messages"
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
            <div class="item--action">
              <div class="btn--more text_right"
                   @click="showActionDropdown(index)"
              >
                <icon-base
                  :class="[isShowActionDropdown === index ? 'active' : null]"
                  width="24px"
                  height="10px"
                  viewBox="0 0 400 400"
                >
                  <icon-three-dots-horiz/>
                </icon-base>
              </div>
              <div class="dropdown--menu position_absolute"
                   v-if="isShowActionDropdown === index"
              >
                <div class="dropdown--menu-item"
                     @click="closeDropdown()"
                >{{ $t("chat.layout.notification.removeNoti") }}</div>
                <div class="dropdown--menu-item"
                     v-if="item.status"
                     @click="closeDropdown()"
                >{{ $t("chat.layout.notification.noRead") }}</div>
                <div class="dropdown--menu-item"
                     v-else
                     @click="closeDropdown()"
                >{{ $t("chat.layout.notification.read") }}</div>
              </div>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>
      <!-- End: Notification List -->
      <!-- Start: Notification Footer -->
      <div class="messenger--footer text_center">
        <div class="btn--see-all"
             @click="gotoMessenger()"
        >Xem tất cả trong Trò chuyện</div>
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
  props: [ "messages" ],
  data() {
    return {
      isShowActionDropdown: null
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeDropdown() {
      this.isShowActionDropdown = null;
    },
    gotoMessenger() {
      const routeData = this.$router.resolve( { name: "messenger" } );

      window.open(routeData.href, '_blank');
      this.$emit( "closeDropdown", false );
    },
    showActionDropdown( index ) {
      this.isShowActionDropdown = index;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "index.style";
</style>
