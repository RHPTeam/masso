<template>
  <div class="main--header mb_3" :data-theme="currentTheme">
    <!-- Start: Header Top -->
    <div class="r main--header-top">
      <div class="c_md_6 top--left">
        <div class="title">{{ campaignDetail.title }}</div>
      </div>
      <div class="c_md_6 top--right">
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
        <div class="new--event mr_3">
          <button class="btn btn--add">Thêm sự kiện</button>
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
    </div>
  </div>
</template>

<script>
export default {
  props: [ "view" ],
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
