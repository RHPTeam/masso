<template>
  <div class="result--item d_flex align_items_center px_3 py_2">
    <div class="name text_left">{{post.title}}</div>
    <div class="categories text_left">
      <span v-for="(item, index) in post._categories" :key="index">{{item.title + ', '}}</span>
    </div>
    <div class="content text_left">{{post.content}}</div>
    <div class="action">
      <div class="btn--choose text_center m_auto" @click="selectPost(post)">Chọn</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    },
  },
  data() {
    return {
      listOption: []
    }
  },
  mounted(){
    if (localStorage.listSelectOption) {
      this.listOption = JSON.parse(localStorage.getItem('listSelectOption'));
    }
  },
  methods: {
    selectPost( val ) {
      console.log( val );
      this.listOption.push( val );
      localStorage.setItem("listSelectPost", JSON.stringify(this.listOption));
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../index.style";
</style>
