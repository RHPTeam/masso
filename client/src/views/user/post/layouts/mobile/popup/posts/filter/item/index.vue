<template>
  <div class="item d_flex align_items_center" @click="updateFilterSelected(item)">
    <span class="title">{{ item.title }}</span>
    <span class="ml_auto mr_2">
      <icon-base
        icon-name="arrow-down"
        class="icon--arrow-right"
        width="10"
        height="10"
        viewBox="0 0 130 130"
      >
        <icon-arrow-down />
      </icon-base>
    </span>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    updateFilterSelected( data ) {
      this.$emit( "updateFilterSelected", data );
      this.closePopup();
    }
  }
};
</script>

<style scoped lang="scss">
.icon--arrow-right {
  transform: rotate(-90deg);
}
.title {
   white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  display: block;
}
</style>