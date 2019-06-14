<template>
  <div class="filter p_3">
    <div
      class="filter--action d_flex align_items_center justify_content_between"
    >
      <!--Start: component filter-->
      <div class="left mr_2">
        <app-filter
        />
      </div>
      <!--End: component filter-->
      <!--Start: Filter icon-->
      <div class="filter--icon d_flex ml_auto">
        <!-- <div class="filter--icon-plus text_center">
          <icon-base
            class="icon-plus"
            icon-name="plus"
            width="20"
            height="20"
            viewBox="0 0 63 63"
          >
            <icon-plus />
          </icon-base>
        </div> -->
        <div class="filter--icon-remove">
          <icon-base
            class="icon-remove"
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 18 18"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>
      <!--End: Filter icon-->
    </div>
      <div >
        <div></div>
        <div class="filter--result text_left mt_4">
          <div class="title">
            <span>{{ $t("chat.broadcast.main.scripts.header.search.see") }}</span>
            <span class="px_1">1</span>
            <span>{{ $t("chat.broadcast.main.scripts.header.search.people") }}</span>
          </div>
          <div class="option--user-list d_flex align_items_center mt_3">
            <div
            >
              <div
                class="option--user-item item d_flex align_items_center justify_content_center mr_2"
              ></div>
            </div>
            <!--        Click show data user in item-->
            <div
              class="option--user-more item text_center"
            >
              AAAA
            </div>
          </div>
        </div>
        <!--    Start: popup show more friends-->
        <!-- <transition name="more">
          <more-friends
            v-if="showMoreFriendFilter === true"
            :infoGroupFilter="infoFriendWithConditonIsNot"
            @close="showMoreFriendFilter = $event"
          />
        </transition> -->
        <!--    End: popup show more friends-->
      <!-- </div> -->
      <!--      End: show result filter attribute with condition-->
    </div>
    <!--End: Result done filter-->
  </div>
</template>
<script>
import AppFilter from "@/components/shared/filter";
import MoreFriend from "./friend";
import BroadcastService from "@/services/modules/chat/broadcast.service";
import StringFunction from "@/utils/functions/string";
export default {
  components: {
    AppFilter,
    MoreFriend
  },
  data() {
    return {
      showFilterAttribute: false,
      showFilterOption: false,
      showMoreFriendFilter: false,
      broadId: null,
      listUserFilter: null,
      userFilter: null,
      showListUserFilterBefore: true,
      showListUserFilterDone: false,
      showResultFilterSegment: false,
      showResultFilterNameAttr: false,
      showResultFilterWithConditionIs: false,
      showResultFilterWithConditionIsNot: false
    };
  },
  computed: {
    // Get info item friends when choose segment
    // infoGroupFilter() {
    //   return this.$store.getters.infoGroupFilter._friends;
    // },
    // // Get info item start 0 to 5 on array item friends
    // filterMember() {
    //   return this.infoGroupFilter.slice(0, 5);
    // },
    // // Get info friends when user choose name attribute
    // infoFriendWithNameAttr() {
    //   return this.$store.getters.filterFriendAttribute;
    // },
    // // Get info item start 0 to 5 on array item friends
    // sliceFriendWithNameAttr() {
    //   return this.infoFriendWithNameAttr.slice(0, 5);
    // },
    // // Get info friends when user choose name attribute with condition is value
    // infoFriendWithConditonIs() {
    //   return this.$store.getters.filterFriendCondition;
    // },
    // // Get info item start 0 to 5 on array item friends with condition is
    // sliceFriendWithConditionIs() {
    //   return this.infoFriendWithConditonIs.slice(0, 5);
    // },
    // // Get info friends when user choose name attribute with condition is not value
    // infoFriendWithConditonIsNot() {
    //   return this.$store.getters.filterFriendConditionIsNot;
    // },
    // // Get info item start 0 to 5 on array item friends with condition is not
    // sliceFriendWithConditionIsNot() {
    //   return this.infoFriendWithConditonIsNot.slice(0, 5);
    // }
  },
  watch: {},
  // show result before fiter
  async created() {
    // let result = await BroadcastService.index();
    // result = result.data.data.filter(
    //   item =>
    //     StringFunction.convertUnicode(item.typeBroadCast)
    //       .toLowerCase()
    //       .trim() === "thiet lap bo hen"
    // );
    // this.broadId = result[0]._id;
    // const dataSender = {
    //   broadId: result[0]._id,
    //   blockId: this.$route.params.scheduleId
    // };
    // let listUser = await BroadcastService.showSchedule(
    //   dataSender.broadId,
    //   dataSender.blockId
    // );
    // this.userFilter = listUser.data.data[0]._friends;
    // this.listUserFilter = this.userFilter.slice(0, 5);
  },
  methods: {
    //Show result default filter
    // showDefaultFilter(event){
    //   this.showListUserFilterBefore = false;
    //   this.showListUserFilterDone = event;
    //   this.showResultFilterNameAttr = event;
    // },
    // // Show result after filter done and hidden option different
    // showResultFilter(event) {
    //   this.showListUserFilterBefore = false;
    //   this.showListUserFilterDone = event;
    // },
    // // show result friends when choose segment and hidden option different
    // showFriendSegment(event) {
    //   this.showResultFilterSegment = event;
    //   this.showResultFilterNameAttr = false;
    //   this.showResultFilterWithConditionIsNot = false;
    //   this.showResultFilterWithConditionIs = false;
    // },
    // // show result friends when choose name attribute and hidden option different
    // showFriendAttr(event) {
    //   this.showResultFilterSegment = false;
    //   this.showResultFilterNameAttr = event;
    //   this.showResultFilterWithConditionIsNot = false;
    //   this.showResultFilterWithConditionIs = false;
    // },
    // // show result friends when choose condition is attribute and hidden option different
    // showFriendConditionIsNot(event) {
    //   this.showResultFilterSegment = false;
    //   this.showResultFilterNameAttr = false;
    //   this.showResultFilterWithConditionIs = false;
    //   this.showResultFilterWithConditionIsNot = event;
    // },
    // // show result friends when choose condition is not attribute and hidden option different
    // showFriendConditionIs(event) {
    //   this.showResultFilterSegment = false;
    //   this.showResultFilterNameAttr = false;
    //   this.showResultFilterWithConditionIsNot = false;
    //   this.showResultFilterWithConditionIs = event;
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "index.style";
</style>
