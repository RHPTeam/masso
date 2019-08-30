<template>
  <div class="main">
    <div class="body--content">
      <post-time />
      <!-- <item-account :item="accountsFB[0]" /> -->
    </div>
  </div>
</template>

<script>
import PostTime from "./PostTime";
import ItemAccount from "./ItemAccount";
export default {
  components: {
    PostTime,
    ItemAccount
  },
  computed: {
    accountsFB() {
      return this.$store.getters.accountsFB;
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 27rem;
  overflow-y: scroll;
  padding: 0.5rem;
}
</style>
