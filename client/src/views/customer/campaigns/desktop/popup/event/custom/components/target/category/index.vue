<template>
  <div class="group">
    <div class="body">
      <div class="title mb_2">Chọn nhóm bạn muốn đăng</div>
      <div class="main">
        <multiselect
          label="title"
          :options="groupPost"
          @input="selectGroupPost"
        />
      </div>
      <div class="desc text_right mt_2">Bao gồm 0 nhóm đã sử dụng</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cats: []
    }
  },
  computed: {
    groupPost(){
      return this.$store.getters.postGroups;
    }
  },
  methods: {
    selectGroupPost( val ) {
      localStorage.setItem('targetCategory', val._id);
    }
  },
}
</script>

<style lang="scss" scoped>
  .group {
    .body {
      width: 50%;
      .title  {}
      .main {
        border: 1px solid $border-color;
        border-radius: calc(.5rem + 2px);
      }
      .desc {}
    }
  }
</style>
