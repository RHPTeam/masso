<template>
  <div class="item--body d_flex align_items_center">
    <div class="col col--category pl_3 pr_2">{{ item.title }}</div>
    <div class="col col--posts text_center">{{item.postList.length}}</div>
    <div class="action align_items_center">
      <span class="ml_2"  @click="duplicateCategories">
        <icon-base
          icon-name="duplicate"
          width="20"
          height="20"
          viewBox="0 0 520 520"
        >
          <icon-copy />
        </icon-base>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {    
    async duplicateCategories(){
      await this.$store.dispatch("duplicateCategoriesDefault", this.item._id);
      // this.$router.push({name: "post_postCategories"});
    }
  },
};
</script>

<style scoped lang="scss">
@import "../index.style"
</style>