<template>
  <div class="main--header mb_3" :data-theme="currentTheme">
    <!-- Start: Header Top -->
    <div class="main--header-top d_flex justify_content_between align_items_center">
      <div class="top--left d_flex align_items_center mr_auto">
        <div class="btn--back mr_3"
             @click="goBack"
             v-if="historyRouteLength > 1"
        >« Quay lại</div>
        <div class="title">
          <contenteditable
            class="editable"
            tag="div"
            placeholder="Nhập tên..."
            :noNL="true"
            :contenteditable="true"
            v-model='campaignDetail.title'
            @returned="updateCampaign()"
          />
        </div>
      </div>
      <div class="top--right d_flex align_items_center ml_auto">
        <div class="time--duration">
          <icon-base
            class="ic--calendar mr_2"
            icon-name="menu"
            width="20"
            height="20"
            viewBox="0 0 26 26"
          >
            <icon-calendar />
          </icon-base>
          <span>{{ formatDate( campaignDetail.started_at ) + ' - Chưa xác định'  }}</span>
        </div>
        <div class="history ml_2" @click="showHistory">Hoạt động</div>
      </div>
    </div>
    <!-- End: Header Top -->
    <!-- Start: Header Action -->
    <div class="r main--header-action mt_3">
      <div class="c_md_12 c_lg_6 mb_md_3 action--left d_flex align_items_center">
        <div class="btn--control mr_3">
          <button class="btn btn--orange" @click="openPopupCreateEvent"
          >Thêm sự kiện</button>

        </div>
        <div class="campaing--status d_flex align_items_center">
          <div class="status--name mr_2" v-if="campaignDetail.status">
            Đang hoạt động
          </div>
          <div class="status--name mr_2" v-else>
            Ngừng hoạt động
          </div>
          <toggle-switch
            @change="updateCampaignStatus()"
            :value="campaignDetail.status"
            :sync="true"
          />
        </div>
      </div>
      <div class="c_md_12 c_lg_6 acion--right">
        <div class="btn--group">
          <button
            class="btn btn--custom"
            :class="[view === 'month' ? 'view--active' : '']"
            @click="updateCalendarView('month')"
          >
            Tháng
          </button>
          <button
            class="btn btn--custom"
            :class="[view === 'week' ? 'view--active' : '']"
            @click="updateCalendarView('week')"
          >
            Tuần
          </button>
          <button
            class="btn btn--custom"
            :class="[view === 'day' ? 'view--active' : '']"
            @click="updateCalendarView('day')"
          >
            Ngày
          </button>
          <button
            class="btn btn--custom"
            :class="[view === 'list' ? 'view--active' : '']"
            @click="updateCalendarView('list')"
          >
            Danh sách
          </button>
        </div>
      </div>
      <!-- End: Header Action -->
      <!--	Start: Create Campaign Popup	-->
      <transition name="popup">
        <app-event
          v-if="caseEvent.popup === true"
          @close="close( $event )"
        />
      </transition>
      <!--	End: Create Campaign Popup	-->
      <transition name="slide-fade">
        <app-history
          v-if="isShowHistory"
          :currentTheme="currentTheme"
          @close="isShowHistory = $event"
        ></app-history>
      </transition>
    </div>
  </div>
</template>

<script>
import AppHistory from "../history";
import AppEvent from "@/views/user/post/campaigns/desktop/popup/event";

let typingTimer;


export default {
  components: {
    AppEvent,
    AppHistory
  },
  props: [ "view" ],
  data() {
    return {
      isShowHistory: false,
      historyRouteLength: 0
      // isShowCreateEvent: false,
      // event: 1
    }
  },
  computed: {
    campaignDetail() {
      return this.$store.getters.campaignDetail;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    caseEvent() {
      return this.$store.getters.caseEvent;
    }
  },
  created() {
    this.historyRouteLength = window.history.length;
  },
  methods: {
    clearTypingTimer() {
      clearTimeout( typingTimer );
    },
    close( value ) {
      this.$store.dispatch( "setCaseEvent", {
        key: "popup",
        value: value
      } );
    },
    formatDate( d ) {
      const dateTime = new Date(d),
            date = String(dateTime.getDate()).padStart(2, "0"),
            month = String(dateTime.getMonth() + 1).padStart(2, "0"),
            year = dateTime.getFullYear();

      return `${date}/${month}/${year}`;
    },
    goBack() {
      this.$router.go(-1);
      this.$store.dispatch("setCampainControl", 0);
    },
    openPopupCreateEvent() {
      this.$store.dispatch( "setCaseEvent", {
        key: "popup",
        value: true
      } );
    },
    updateCalendarView( val ) {
      this.$emit( "updateCalendarView", val );
    },
    updateCampaignStatus() {
      const campaignId = this.campaignDetail._id;

      this.$store.dispatch( "updateCampaignStatus", campaignId );
    },
    async upTypingText( campaign ) {
      await clearTimeout( typingTimer );

      typingTimer = await setTimeout( this.updateCampaign( campaign ), 1000);
    },
    updateCampaign() {
      const objSender = {
        campId: this.campaignDetail._id,
        campaign: {
          title: this.campaignDetail.title
        }
      };
      this.$store.dispatch( "updateCampaignDetail", objSender );
    },
    async showHistory() {
      const campaignId = this.$route.params.campaignId;
      await this.$store.dispatch( "getCampaignDetail", campaignId );
      this.isShowHistory = !this.isShowHistory;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
