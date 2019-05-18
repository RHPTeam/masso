<template>
  <div class="page d_flex align_items_center">
    <div class="item mr_2">
      <div class="title mb_2">Chọn nhóm bạn muốn đăng</div>
      <div class="main">
        <multiselect
          multiple
          label="name"
          :options="faceGroupPost"
          @input="selectGroupFacebook"
        />
      </div>
      <div class="desc text_right mt_2">Bao gồm 0 nhóm đã sử dụng</div>
    </div>
    <div class="item ml_2">
      <div class="title mb_2">Chọn nhóm bạn muốn đăng</div>
      <div class="main">
        <multiselect
          multiple
          label="name"
          :options="facePagePost"
          @input="selectPageFacebook"
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
      custom: []
    }
  },
  computed: {
    faceGroupPost(){
      return this.$store.getters.facebookGroups;
    },
    facePagePost(){
      return this.$store.getters.facebookPages;
    }
  },
  methods: {
    selectGroupFacebook( value ) {
      const groupListSelect = value.map( group => {
        return {
          typeTarget: 0,
          id: group.groupId
        };
      } );

      this.$store.dispatch( "setEventSpecial", {
        key: "target_custom",
        value: groupListSelect
      } )
    },
    selectPageFacebook( value ) {
      const pageListSelect = value.map( page => {
        return {
          typeTarget: 1,
          id: page.pageId
        };
      } );

      this.$store.dispatch( "setEventSpecial", {
        key: "target_custom",
        value: pageListSelect
      } );
    }
  },
}
</script>

<style lang="scss" scoped>
.page {
  .item {
    width: 50%;
    .main {
      border: 1px solid $border-color;
      border-radius: calc(.5rem + 2px);
    }
  }
}
</style>
