<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <!-- Start: Modal Header -->
    <div class="modal--header d_flex align_items_center justify_content_between">
      <div @click="close">
        <icon-base
          icon-name="arrow-down"
          class="arrow-down"
          width="20"
          height="20"
          viewBox="0 0 130 130"
        >
          <icon-arrow-down />
        </icon-base>
      </div>
      <div class="title m_auto">Lịch sử sự kiện</div>
    </div>
    <!-- End: Modal Header -->
    <!-- Start: Modal Body -->
    <vue-perfect-scrollbar class="modal--scroll">
      <div class="modal--body px_3 py_2">
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
