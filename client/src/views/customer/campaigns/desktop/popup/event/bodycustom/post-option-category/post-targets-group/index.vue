<template>
  <div class="post--targets-group">
    <div class="desc mb_2">Chọn nhóm bạn muốn đăng</div>
    <div class="c_md_6 pl_0 pr_3">
      <div class="multiselect--custom mb_2">
        <multiselect
          label="title"
          placeholder="Chọn nhóm"
          v-model="categorySelected"
          :options="postGroupsName"
        ></multiselect>
      </div>
    </div>
    <div class="total--detail">Bao gồm
      <span>{{ postGroups._pages.length }}  nhóm</span> và
      <span>{{ postGroups._groups.length }} trang</span> được sử dụng.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categorySelected: ""
    }
  },
  computed: {
    postGroups() {
      return this.$store.getters.postGroups;
    },
    postGroupsName() {
      let arr = [];

      this.postGroups.forEach( ( item ) => {
        arr.push( item.title );
      } );

      return arr;
    }
  },
  async created() {
    await this.$store.dispatch("getAllPostGroups");
  },
}
</script>

<style lang="scss" scoped>
.post--targets-group {
  .desc {

  }
  .multiselect--custom {
    background-color: #fff;
    border-radius: .625rem;
  }
}
</style>
