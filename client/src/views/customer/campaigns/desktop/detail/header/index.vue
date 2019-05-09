<template>
  <div class="main--header mb_3" :data-theme="currentTheme">
    <!-- Start: Header Top -->
    <div class="main--header-top d_flex justify_content_between align_items_center">
      <div class="top--left d_flex align_items_center">
        <div class="status" :class="[ campaignDetail.status ? 'status--active' : 'status--deactive' ]">
          {{ campaignDetail.status ? 'Đang hoạt động' : 'Đã ngừng' }}
        </div>
        <div class="title ml_2">
          <contenteditable
            class="editable"
            tag="div"
            placeholder="Nhập tên..."
            :contenteditable="true"
            v-model='campaignDetail.title'
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
          <button class="btn" :class="[ campaignDetail.status ? 'btn--red' : 'btn--orange' ]">
            <icon-base
              class="icon icon--play"
              icon-name="icon-play"
              width="14"
              height="16"
              viewBox="0 0 13.955 16"
              v-if="!campaignDetail.status"
            >
              <icon-play/>
            </icon-base>
            <icon-base
              class="icon icon--stop"
              icon-name="icon-stop"
              width="14"
              height="14"
              viewBox="0 0 300 300"
              v-if="campaignDetail.status"
            >
              <icon-stop/>
            </icon-base>
            {{ campaignDetail.status ? 'Dừng' : 'Bắt đầu' }}
          </button>
        </div>
        <div class="btn--control" @click="isShowCreateEvent = true">
          <button class="btn btn---outline-orange">Thêm sự kiện</button>
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
