<template>
  <div class="result--item d_flex align_items_center px_3 py_2">
    <div class="name text_left">{{ item.title }}</div>
    <div class="categories text_left">
      <span v-for="(name, index) in item._categories" :key="`nc-${index}`">{{ name.title + ', ' }}</span>
    </div>
    <div class="content text_left">{{ item.content }}</div>
    <div class="action">
      <div class="btn--choose text_center m_auto" @click="addPostFromChildren(item._id)" :class="isActive === true ? 'active' : ''">Chọn</div>
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
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    async addPostFromChildren( val ) {
      await this.$emit( "pushIdPostToArray", val );
      this.isActive = true;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../index.style";
.active {
  background-color: #ffb94a !important;
}
</style>
