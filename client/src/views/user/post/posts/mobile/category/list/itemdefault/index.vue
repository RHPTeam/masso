<template>
  <div class="item--body d_flex align_items_center px_3 py_2">
    <div class="col col--category px_2">{{ item.title }}</div>
    <div class="col col--posts text_center px_2"> {{item.postList.length}}</div>
    <div class="col col--description px_2">
      <div class="col--description-text">

      </div>
    </div>
    <div class="col col--action px_4 text_center"

    >
      <span>
        <span class="mx_1" @click="showListPostInCategory">
          <icon-base
            width="20"
            height="20"
            viewBox="0 0 18 18"
          >
            <icon-info />
          </icon-base>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "item" ],
  methods: {
    async showListPostInCategory(){
      await this.$store.dispatch("showPostCateDefaultById", this.item._id);
      await this.$store.dispatch("setPostCateDefault", 1);
      this.$router.push({name: "post_posts"});
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../index.style";
  .action--disabled {
    span {
      svg {
        color: #999 !important;
        cursor: not-allowed !important;
        opacity: .5 !important;
        &:hover {
          color: #999 !important;
        }
      }
    }
  }
</style>
