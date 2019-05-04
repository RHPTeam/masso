<template>
    <div class="item--body d_flex align_items_center px_3 py_2">
      <!-- <div v-if="StringFunction.convertUnicode( item.title ).toLowerCase().trim() === 'chua phan loai'"></div> -->
      <div>
        <div class="col col--checkbox px_2">
        <label class="custom--checkbox mb_0">
          <input type="checkbox" />
        </label>
      </div>
      </div>
      <div class="col col--category px_2">{{ item.title }}</div>
      <div class="col col--posts text_center px_2">{{ item.ammout }}</div>
      <div class="col col--description px_2">
        <div class="col--description-text">
          {{ item.description }}
        </div>
      </div>
      <div class="col col--action px_4 text_center">
        <span class="mx_1" @click="showCategories">
          <icon-base icon-name="icon-edit" viewBox="0 0 20 20">
            <icon-edit />
          </icon-base>
        </span>
        <span class="mx_1" @click="deleteCagories">
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </span>
      </div>
    </div>
</template>

<script>
import StringFunction from "@/utils/string.util";
import DeleteItem from "./delete"
export default {
  props: [ "item" ],
  methods: {
    async showCategories () {
      await this.$store.dispatch( "getCategoriesById", this.item._id );
      this.$emit( "update", true );
    },
    deleteCagories () {
      this.$store.dispatch( "deleteCategories", this.item._id );
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../index.style";
</style>
