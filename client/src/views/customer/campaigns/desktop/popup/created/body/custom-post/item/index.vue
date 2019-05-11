<template>
  <div class="item--body d_flex align_items_center px_3 py_2" >
    <div class="col col--name px_2">
      <div class="col col--name-text">
        {{ item.title }}
      </div>
    </div>
    <div class="col col--category px_2">
      <span v-for="(name, index) in item._categories" :key="`n-${index}`">{{ name.title + ', ' }}</span>
    </div>
    <div class="col col--content px_2">
      <div class="col--content-text">
        {{ item.content }}
      </div>
    </div>
    <div class="col col--checkbox px_2">
      <icon-base
        class="icon--drop"
        icon-name="arrow"
        width="20"
        height="20"
        viewBox="0 0 40 40"
      >
        <icon-delete></icon-delete>
      </icon-base>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../index.style";
</style>
