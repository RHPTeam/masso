<template>
  <div class="post--targets-group">
    <div class="desc mb_2">Chọn nhóm bạn muốn đăng</div>
    <div class="c_md_6 pl_0 pr_3">
      <div class="multiselect--custom mb_2">
        <multiselect
          label="title"
          placeholder="Chọn nhóm"
          @input="postGroupSelected = $event"
          :options="postGroupsName"
        ></multiselect>
      </div>
    </div>
    <div class="total--detail">Bao gồm
      <span>{{ getPostGroupByName(postGroupSelected) ? getPostGroupByName(postGroupSelected)._pages.length : 0 }}  nhóm</span> và
      <span>{{ getPostGroupByName(postGroupSelected) ? getPostGroupByName(postGroupSelected)._groups.length : 0}} trang</span> được sử dụng.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postGroupSelected: {}
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
  methods: {
    getPostGroupByName( name ) {
      let res;

      this.postGroups.forEach( ( item ) => {
        if ( item.title === name ) {
          res = item;
        }
      } );

      return res;
    }
  }
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
