<template>
  <div class="segments--content mt_4">
    <segments-content-top
      :accountSelected="accountSelected"
      :groupSelected="groupSelected"
      :sizeDefault="sizeDefault"
      @changeSizeDefault="changeSize($event)"
      @updateAccountSelected="accountSelected = $event"
      @updateSearch="keywordSearch = $event"
      @changeStatusDefault="changeStatusDefault($event)"
      @openFilterFriend ="changeStatusFilter($event)"
    ></segments-content-top>

    <segments-content-users-table
      :accountSelected="accountSelected"
      :groupSelected="groupSelected"
      :keywordSearch="keywordSearch"
      :selectFilter="selectFilter"
      :sizeDefault="sizeDefault"
      :resultsDefault="resultsDefault"
    ></segments-content-users-table>
  </div>
</template>

<script>
import SegmentsContentTop from "./cp-segments-content/top";
import SegmentsContentUsersTable from "./cp-segments-content/users-table";

export default {
  components: {
    SegmentsContentTop,
    SegmentsContentUsersTable
  },
  props: ["groupSelected", "selectFilter", "resultsDefault", "sizeDefault"],
  data() {
    return {
      keywordSearch: "",
      accountSelected: {
        id: "all",
        name: "Tất cả"
      }
    };
  },
  methods: {
    changeStatusDefault(val) {
      this.$emit("changeResultDefault", val);
    },
    changeStatusFilter(val){
      this.$emit("openFilter", val);
    },
    changeSize(val){
      this.$emit("changedSize", val);
    }
  },
};
</script>

<style lang="scss" scoped></style>
