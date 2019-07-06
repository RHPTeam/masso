<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <!-- Start: Modal Header -->
    <div class="modal--header d_flex align_items_center justify_content_between">
      <div class="title">Lịch sử sự kiện</div>
      <div class="btn--close"
           @click="close"
      >
        <icon-base
          class="icon--close"
          width="14px"
          height="14px"
          viewBox="0 0 18 18"
        >
          <icon-cancel></icon-cancel>
        </icon-base>
      </div>
    </div>
    <!-- End: Modal Header -->
    <!-- Start: Modal Body -->
    <vue-perfect-scrollbar class="modal--scroll">
      <div class="modal--body p_3">
        <div class="history--list">
          <item-history
            v-for="( item, index ) in campaignDetail"
            :key="index"
            :item="item"
          />
        </div>
      </div>
    </vue-perfect-scrollbar>
    <!-- End: Modal Body -->
  </div>
</template>

<script>
import ItemHistory from "./item";
export default {
  components: {
    ItemHistory
  },
  props: ["currentTheme"],
  computed: {
    campaignDetail(){
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.$store.getters.campaignDetail.logs.content.reverse();
    }
  },
  methods: {
    close() {
      this.$emit( "close", false );
    }
  }
}
</script>

<style scoped lang="scss">
@import "index.style";
</style>
