<template>
  <div class="main--header mb_3" :data-theme="currentTheme">
    <!-- Start: Header Top -->
    <div class="main--header-top d_flex justify_content_between align_items_center">
      <div class="top--left d_flex align_items_center">
        <div class="title">
          <contenteditable
            class="editable"
            tag="div"
            placeholder="Nhập tên..."
            :noNL="true"
            :contenteditable="true"
            v-model='campaignDetail.title'
            @returned="updateCampaign( campaignDetail )"
          />
        </div>
      </div>
      <div class="top--right">
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
      </div>
    </div>
    <!-- End: Header Top -->
    <!-- Start: Header Action -->
    <div class="r main--header-action mt_3">
      <div class="c_md_6 action--left d_flex align_items_center">
        <div class="btn--control mr_3">
          <button class="btn btn--orange" 
                  @click="isShowCreateEvent = true"
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
      <div class="c_md_6 acion--right">
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
        <create-new-event
          v-if="isShowCreateEvent === true"
          :campaignsId="campaignDetail._id"
          @closePopup="isShowCreateEvent = $event"
        />
      </transition>
      <!--	End: Create Campaign Popup	-->
    </div>
  </div>
</template>

<script>
import CreateNewEvent from "../../popup/created/";
let typingTimer;

export default {
  components: {
    CreateNewEvent
  },
  props: [ "view" ],
  data() {
    return {
      isShowCreateEvent: false
    }
  },
  computed: {
    campaignDetail() {
      return this.$store.getters.campaignDetail;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    clearTypingTimer() {
      clearTimeout( typingTimer );
    },
    formatDate( d ) {
      const dateTime = new Date(d),
            date = String(dateTime.getDate()).padStart(2, "0"),
            month = String(dateTime.getMonth() + 1).padStart(2, "0"),
            year = dateTime.getFullYear();
      
      return `${date}/${month}/${year}`;
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
    updateCampaign( campaign ) {
      const objSender = {
        campId: campaign._id,
        campaign: {
          title: campaign.title
        }
      };

      this.$store.dispatch( "updateCampaignDetail", objSender );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
