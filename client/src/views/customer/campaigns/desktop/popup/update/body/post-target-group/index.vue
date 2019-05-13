<template>
  <div class="post--targets-group">
    <div class="desc mb_2">Chọn nhóm bạn muốn đăng</div>
    <div class="c_md_6 pl_0 pr_3">
      <div class="multiselect--custom mb_2">
        <multiselect
          label="title"
          placeholder="Chọn nhóm"
          @input="postGroupSelected"
          :options="postGroups"
          v-model="eventDetail.target_category"
        ></multiselect>
      </div>
      <div class="total--detail text_right">
        Bao gồm {{ eventDetail.target_category.length }} nhóm được sử dụng
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    eventDetail: {
      type: Object
    }
  },
  data() {
    return {

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
    },
    postGroupSelected() {
      const dataSender = {
        campId: this.$route.params.campaignId,
        content: this.eventDetail
      };
      this.$store.dispatch( "updateEvent", dataSender );
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
