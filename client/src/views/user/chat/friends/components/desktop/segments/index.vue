<template>
  <div class="segments--content mt_4">
    <segments-content-top
      :accountSelected="accountSelected"
      :groupSelected="groupSelected"
      @updateAccountSelected="accountSelected = $event"
      @updateSearch="keywordSearch = $event"
    ></segments-content-top>

    <segments-content-users-table
      :accountSelected="accountSelected"
      :groupSelected="groupSelected"
      :keywordSearch="keywordSearch"
      :selectFilter="selectFilter"
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
  props: ["groupSelected", "selectFilter", "resultsDefault"],
  data() {
    return {
      keywordSearch: "",
      accountSelected: {
        id: "all",
        name: "Tất cả"
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
