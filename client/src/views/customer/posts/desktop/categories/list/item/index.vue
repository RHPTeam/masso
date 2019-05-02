<template>
  <div>
<!--    If item === undefined-->
<!--    <div v-if="item.title === undefined" class="item&#45;&#45;body d_flex align_items_center px_3 py_2">-->
<!--      <div class="col col&#45;&#45;checkbox px_2">-->
<!--        <label class="custom&#45;&#45;checkbox mb_0">-->
<!--          <input type="checkbox" />-->
<!--        </label>-->
<!--      </div>-->
<!--      <div class="col col&#45;&#45;category px_2">Chưa phân loại</div>-->
<!--      <div class="col col&#45;&#45;posts px_2">0</div>-->
<!--      <div class="col col&#45;&#45;description px_2">-->
<!--        <div class="col&#45;&#45;description-text">-->
<!--          nothing-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="col col&#45;&#45;action px_4 text_center">-->
<!--        <span class="mx_1" @click="showCategories">-->
<!--          <icon-base icon-name="icon-edit" viewBox="0 0 20 20">-->
<!--            <icon-edit />-->
<!--          </icon-base>-->
<!--        </span>-->
<!--        <span class="mx_1" @click="deleteCagories">-->
<!--          <icon-base-->
<!--            icon-name="remove"-->
<!--            width="20"-->
<!--            height="20"-->
<!--            viewBox="0 0 15 15"-->
<!--          >-->
<!--            <icon-remove />-->
<!--          </icon-base>-->
<!--        </span>-->
<!--      </div>-->
<!--    </div>-->
<!--    Else-->
    <div class="item--body d_flex align_items_center px_3 py_2">
      <div class="col col--checkbox px_2">
        <label class="custom--checkbox mb_0">
          <input type="checkbox" />
        </label>
      </div>
      <div class="col col--category px_2">{{ item.data.title }}</div>
      <div class="col col--posts text_center px_2">{{ item.num }}</div>
      <div class="col col--description px_2">
        <div class="col--description-text">
          {{ item.data.description }}
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
  </div>
</template>

<script>
export default {
  props: [ "item" ],
  methods: {
    async showCategories () {
      await this.$store.dispatch( "getCategoriesById", this.item.data._id );
      this.$emit( "update", true );
    },
    deleteCagories () {
      this.$store.dispatch( "deleteCategories", this.item.data._id );
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../index.style";
</style>
