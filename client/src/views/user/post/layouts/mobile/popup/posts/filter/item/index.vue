<template>
  <div class="item d_flex" @click="updateFilterSelected(item)">
    <span>{{ item.title }}</span>
    <span class="ml_auto mr_2">
      <icon-base class="icon--go-to" icon-name="Submit" width="22" height="22" viewBox="0 0 33 33">
        <icon-arrow-right />
      </icon-base>
    </span>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    updateFilterSelected( data ) {
      this.$emit( "updateFilterSelected", data );
      this.closePopup();
    },
    closePopup() {
      this.$emit("closePopup", false);
    }
  }
};
</script>

<style scoped>
</style>