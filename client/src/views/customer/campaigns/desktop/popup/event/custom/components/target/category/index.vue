<template>
  <div class="group">
    <div class="body">
      <div class="title mb_2">Chọn nhóm bạn muốn đăng</div>
      <div class="main">
        <multiselect
          label="title"
          :clearable="false"
          :options="groupPost"
          @input="selectGroupPost"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    groupPost(){
      return this.$store.getters.postGroups;
    }
  },
  methods: {
    selectGroupPost( value ) {
      this.$store.dispatch( "setEvent", {
        key: "target_category",
        value: value._id
      } );
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
