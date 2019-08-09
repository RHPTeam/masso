<template>
  <div class="notification--wrapper" :data-theme="currentTheme">
    <div class="notification--content" v-click-outside="close">
      <!-- Start: Notification Header -->
      <div class="notification--header d_flex align_items_center justify_content_between">
        <div class="title">Thông báo</div>
        <div class="action"> Đánh dấu tất cả là đã đọc</div>
      </div>
      <!-- End: Notification Header -->
      <!-- Start: Notification List -->
      <VuePerfectScrollbar class="notification--body">
        <div class="notification--list">
          <div v-if="this.$store.getters.helpStatus === 'loading'">
            <loading-component/>
          </div>
          <div v-else>
            <div v-if="blogHelp && blogHelp.length === 0" class="text_center py_2">
              Bạn chưa có thông báo nào.
            </div>
            <div
              v-else
              class="notification--list-item d_flex align_items_center"
              v-for="(item, index) in blogHelp"
              :key="index"
              :class="[ item.status ? 'item--read' : '' ]"
              @click="goToHelpDetail(item.slug)"
            >
              <div class="item--image">
                <icon-base
                  width="40"
                  height="40"
                  viewBox="0 0 512 512"
                >
                  <icon-technical/>
                </icon-base>
              </div>
              <div class="item--info">
                <div class="item--content mb_1">{{ item.title }}</div>
                <div class="item--time">{{ time }}</div>
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
                  >Gỡ thông báo này</div>
                  <div class="dropdown--menu-item"
                       v-if="item.status"
                       @click="closeDropdown()"
                  >Đánh dấu là chưa đọc</div>
                  <div class="dropdown--menu-item"
                       v-else
                       @click="closeDropdown()"
                  >Đánh dấu là đã đọc</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>
      <!-- End: Notification List -->
      <!-- Start: Notification Footer -->
      <div class="notification--footer text_center">
        <div
          class="btn--see-all"
          @click="redirectToHelp"
        >
          Xem tất cả
        </div>
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
  data() {
    return {
      isShowActionDropdown: null,
      time: "Vừa xong",
      image: "data:image/png;base64,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"
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    blogHelp(){
      return this.$store.getters.blogs;
    }
  },
  async created(){
    await this.$store.dispatch("getBlogHelp");
  },
  methods: {
    closeDropdown() {
      this.isShowActionDropdown = null;
    },
    close(){
      this.$emit("close", false);
    },
    seeAllNotifications() {
      this.$router.push( { name: "post_notifications" } );
      this.$emit( "closeDropdown", false );
    },
    showActionDropdown( index ) {
      this.isShowActionDropdown = index;
    },
    redirectToHelp() {
      const routes = `${process.env.VUE_APP_PARENT_URL}/#/help`;
      window.open(routes, '_blank');
      this.close();
    },
    goToHelpDetail(val){
      const routes = `${process.env.VUE_APP_PARENT_URL}/#/help/` + val;
      window.open(routes, '_blank');
      this.close();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
