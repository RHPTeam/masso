<template>
  <div class="segments">
    <segments-list
      @groupSelected="groupSelected = $event"
      @changeSelectedGroup="groupSelected = $event"
      :groupSelected="groupSelected"
    ></segments-list>
    <segments-attribute
      v-if="showFilterFriend === true"
      :selectFilter="selectFilter"
      @openResultsFilter="selectFilter = $event"
      @hiddenDefault="resultsDefault = $event"
      @closeFilter="showFilterFriend = $event"
    ></segments-attribute>
    <segments-content
      :groupSelected="groupSelected"
      :selectFilter="selectFilter"
      :sizeDefault="sizeDefault"
      :resultsDefault="resultsDefault"
      @changedSize="changeSizeDefault($event)"
      @changeResultDefault="resultsDefault = $event"
      @openFilter="showFilterFriend = $event"
    ></segments-content>
  </div>
</template>

<script>
import SegmentsList from "./components/segments-list";
import SegmentsAttribute from "./components/segments-attribute";
import SegmentsContent from "./components";

export default {
  components: {
    SegmentsList,
    SegmentsAttribute,
    SegmentsContent
  },
  data() {
    return {
      groupSelected: false,
      selectFilter: false,
      resultsDefault: true,
      showFilterFriend: false,
      sizeDefault: 25
    };
  },
  methods: {
    changeSizeDefault(val) {
      this.sizeDefault = val.size
    }
  },
};
</script>

<style lang="scss" scoped>
.segments {
  font-size: 14px;
  text-align: left;
}
</style>
