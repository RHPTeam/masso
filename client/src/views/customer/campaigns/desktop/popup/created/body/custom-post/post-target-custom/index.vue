<template>
  <div class="post--targets-group">
    <div class="r">
      <!--Start: Setup custom post -->
      <div class="c_md_6 pl_0 pr_3">
        <div class="desc mb_2">Chọn nhóm bạn muốn đăng</div>
        <div class="multiselect--custom mb_2">
          <multiselect
            multiple
            label="name"
            placeholder="Chọn nhóm"
            @input="updateGroupFaceSelected"
            :options="facebookGroups"
          ></multiselect>
        </div>
        <div class="total--detail text_right">
          Bao gồm {{ facebookGroups.length }} nhóm đã sử dụng
        </div>
      </div>
      <!--End: Setup custom post-->
      <!--Start: Setup custom post-->
      <div class="c_md_6 pl_0 pr_3">
        <div class="desc mb_2">Chọn trang bạn muốn đăng</div>
        <div class="multiselect--custom mb_2">
          <multiselect
            multiple
            label="name"
            placeholder="Chọn nhóm"
            @input="updatePageSelected"
            :options="facebookPages"
          ></multiselect>
        </div>
        <div class="total--detail text_right">
          Bao gồm {{ facebookPages.length }} trang đã sử dụng
        </div>
      </div>
      <!--End: Setup custom post-->
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    facebookGroups() {
      return this.$store.getters.facebookGroups;
    },
    facebookPages() {
      return this.$store.getters.facebookPages;
    },
  },
  methods: {
    updateGroupFaceSelected( val ) {
      // get id from value then push
      const dataSender = val.map(item => {
        return {
          typeTarget: 0,
          id: item.groupId
        }
      });
      this.$emit( "pushGroupFacebook", dataSender );
    },
    updatePageSelected( val ) {
      const dataSender = val.map(item => {
        return {
          typeTarget: 1,
          id: item.pageId
        }
      });
      this.$emit( "pushPagesFacebook", dataSender );
    }
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
