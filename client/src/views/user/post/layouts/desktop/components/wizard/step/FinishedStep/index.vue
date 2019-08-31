<template>
  <div class="main">Done</div>
</template>

<script>
export default {
  mounted(){
     this.$emit("can-continue", { value: true });
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
