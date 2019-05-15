<template>
  <div class="page d_flex align_items_center">
    <div class="item mr_2">
      <div class="title mb_2">Chọn nhóm bạn muốn đăng</div>
      <div class="main">
        <multiselect
          multiple
          label="name"
          :options="faceGroupPost"
          @input="selectFaceGroupPost"
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
          @input="selectFacePagePost"
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
    selectFaceGroupPost( val ) {
      val.map( item => {
        const data = {
          typeTarget: 0,
          id: item.groupId
        };
        this.custom.push(data);
        // this.custom = [... new Set(this.custom)];
        localStorage.setItem("targetCustom", JSON.stringify(this.custom));
      })
    },
    selectFacePagePost( val ) {
      val.map( item => {
        const data = {
          typeTarget: 1,
          id: item.pageId
        };
        this.custom.push(data);
        // this.custom = [... new Set(this.custom)];
        localStorage.setItem("targetCustom", JSON.stringify(this.custom));
      })
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
