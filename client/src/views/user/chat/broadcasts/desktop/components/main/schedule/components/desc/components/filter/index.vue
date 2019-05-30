<template>
  <div class="filter p_3">
    <div
      class="filter--action d_flex align_items_center justify_content_between"
    >
      <!--Start: component filter-->
      <div class="left mr_3">
        <app-filter
        />
      </div>
      <!--End: component filter-->
      <!--Start: Filter icon-->
      <div class="filter--icon d_flex ml_auto">
        <div class="filter--icon-plus text_center">
          <icon-base
            class="icon-plus"
            icon-name="plus"
            width="20"
            height="20"
            viewBox="0 0 63 63"
          >
            <icon-plus />
          </icon-base>
        </div>
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
    <!--Start: Result before filter-->
    <!-- <div v-if="showListUserFilterBefore === true">
      <div v-if="!userFilter"></div>
      <div class="filter--result text_left mt_2" v-else>
        <div>Tìm thấy X người khả dụng</div>
        <div class="option--user-list d_flex align_items_center mt_3">
          <div>
            <div
              class="option--user-item item d_flex align_items_center justify_content_center mr_2"
            ></div>
          </div> -->
          <!--        Click show data user in group-->
          <!-- <div
            class="option--user-more item text_center"
          >
            AAAAAA
          </div>
        </div>
      </div>
    </div> -->
    <!--End: Result before filter-->

    <!--Start: Result done filter-->
    <!-- <div> -->
      <!-- Start: show result filter with segment -->
      <!-- <div>
        <div></div>
        <div class="filter--result text_left mt_4"> -->
          <!-- <div>Tìm thấy XX người khả dụng</div>
          <div class="option--user-list d_flex align_items_center mt_3">
            <div>
              <div
                class="option--user-item item d_flex align_items_center justify_content_center mr_2"
              ></div>
            </div> -->
            <!--        Click show data user in group-->
            <!-- <div
              class="option--user-more item text_center"
            >
              BBBB
            </div>
          </div>
        </div> -->
        <!--    Start: popup show more friend-->
        <!-- <transition name="more">
          <more-friend
          />
        </transition> -->
        <!--    End: popup show more friend-->
      <!-- </div> -->
      <!--      End: show result filter with segment-->
      <!--      Start: show result filter attribute with name -->
      <!-- <div> -->
        <!-- <div></div>
        <div class="filter--result text_left mt_4">
          <div>Tìm thấy XXX người khả dụng</div>
          <div class="option--user-list d_flex align_items_center mt_3">
            <div >
              <div
                class="option--user-item item d_flex align_items_center justify_content_center mr_2"
              ></div>
            </div> -->
            <!--        Click show data user in group-->
            <!-- <div
              class="option--user-more item text_center"
            >
              BBBB
            </div>
          </div>
        </div> -->
        <!--    Start: popup show more friend-->
        <!-- <transition name="more">
          <more-friend
          />
        </transition> -->
        <!--    End: popup show more friend-->
      <!-- </div> -->
      <!--      End: show result filter attribute with name-->
      <!--      Start: show result filter attribute with condition is -->
      <!-- <div> -->
        <!-- <div></div>
        <div class="filter--result text_left mt_4">
          <div>
            Tìm thấy XXXX người khả dụng
          </div>
          <div class="option--user-list d_flex align_items_center mt_3">
            <div
            >
              <div
                class="option--user-item item d_flex align_items_center justify_content_center mr_2"
              ></div>
            </div> -->
            <!--        Click show data user in group-->
            <!-- <div
              class="option--user-more item text_center"
            >
              AAAAA
            </div> -->
          <!-- </div>
        </div> -->
        <!--    Start: popup show more friend-->
        <!-- <transition name="more">
          <more-friend
          />
        </transition> -->
        <!--    End: popup show more friend-->
      <!-- </div> -->
      <!--      End: show result filter attribute with condition-->
      <!--      Start: show result filter attribute with condition is not -->
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
            <!--        Click show data user in group-->
            <div
              class="option--user-more item text_center"
            >
              AAAA
            </div>
          </div>
        </div>
        <!--    Start: popup show more friend-->
        <!-- <transition name="more">
          <more-friend
            v-if="showMoreFriendFilter === true"
            :infoGroupFilter="infoFriendWithConditonIsNot"
            @close="showMoreFriendFilter = $event"
          />
        </transition> -->
        <!--    End: popup show more friend-->
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
  computed: {
    // Get info group friend when choose segment
    // infoGroupFilter() {
    //   return this.$store.getters.infoGroupFilter._friends;
    // },
    // // Get info item start 0 to 5 on array group friend
    // filterMember() {
    //   return this.infoGroupFilter.slice(0, 5);
    // },
    // // Get info friend when user choose name attribute
    // infoFriendWithNameAttr() {
    //   return this.$store.getters.filterFriendAttribute;
    // },
    // // Get info item start 0 to 5 on array group friend
    // sliceFriendWithNameAttr() {
    //   return this.infoFriendWithNameAttr.slice(0, 5);
    // },
    // // Get info friend when user choose name attribute with condition is value
    // infoFriendWithConditonIs() {
    //   return this.$store.getters.filterFriendCondition;
    // },
    // // Get info item start 0 to 5 on array group friend with condition is
    // sliceFriendWithConditionIs() {
    //   return this.infoFriendWithConditonIs.slice(0, 5);
    // },
    // // Get info friend when user choose name attribute with condition is not value
    // infoFriendWithConditonIsNot() {
    //   return this.$store.getters.filterFriendConditionIsNot;
    // },
    // // Get info item start 0 to 5 on array group friend with condition is not
    // sliceFriendWithConditionIsNot() {
    //   return this.infoFriendWithConditonIsNot.slice(0, 5);
    // }
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
    // // show result friend when choose segment and hidden option different
    // showFriendSegment(event) {
    //   this.showResultFilterSegment = event;
    //   this.showResultFilterNameAttr = false;
    //   this.showResultFilterWithConditionIsNot = false;
    //   this.showResultFilterWithConditionIs = false;
    // },
    // // show result friend when choose name attribute and hidden option different
    // showFriendAttr(event) {
    //   this.showResultFilterSegment = false;
    //   this.showResultFilterNameAttr = event;
    //   this.showResultFilterWithConditionIsNot = false;
    //   this.showResultFilterWithConditionIs = false;
    // },
    // // show result friend when choose condition is attribute and hidden option different
    // showFriendConditionIsNot(event) {
    //   this.showResultFilterSegment = false;
    //   this.showResultFilterNameAttr = false;
    //   this.showResultFilterWithConditionIs = false;
    //   this.showResultFilterWithConditionIsNot = event;
    // },
    // // show result friend when choose condition is not attribute and hidden option different
    // showFriendConditionIs(event) {
    //   this.showResultFilterSegment = false;
    //   this.showResultFilterNameAttr = false;
    //   this.showResultFilterWithConditionIsNot = false;
    //   this.showResultFilterWithConditionIs = event;
    // }
  },
  watch: {},
  components: {
    AppFilter,
    MoreFriend
  }
};
</script>
<style lang="scss" scoped>
@import "index.style";
</style>
