<template>
  <div class="modal--detail-campaign">
    <div class="modal--content">
      <div class="items--header d_flex align_items_center">
        <div @click="closePopup">
          <icon-base
            icon-name="arrow-down"
            class="arrow-down"
            width="20"
            height="20"
            viewBox="0 0 130 130"
          >
            <icon-arrow-down />
          </icon-base>
        </div>
        <div class="active ml_auto d_flex align_items_center">
          <div @click="showHistory">
            <icon-base icon-name="Lịch sử" width="24" height="24" viewBox="0 0 480 480" class>
              <icon-history />
            </icon-base>
          </div>
          <div @click="showCreateEvent">
            <icon-base
              icon-name="Thêm sự kiện"
              width="24"
              height="24"
              viewBox="0 0 68 68"
              class="mr_1 ml_3"
            >
              <icon-plus />
            </icon-base>
          </div>
        </div>
      </div>
      <div class="items--body mt_3 px_2">
        <div class="top d_flex align_items_center">
          <div class="name">{{ campaign.title }}</div>
          <div class="active ml_auto">
            <toggle-switch
              @change="updateCampaignStatus()"
              v-model="campaign.status"
              :sync="true"
            />
          </div>
        </div>
        <div class="main mt_2">
          <!-- Start: FullCalendar -->
          <fullcalendar
            :events="campaignDetail._events"
            :theme="currentTheme"
            :view="calendarView"
            :disabledView="campaign.status"
          />
          <!-- End: FullCalendar -->
        </div>
      </div>
    </div>
    <!-- Start: Transition Popup -->
    <transition name="popup--mobile">
      <popup-history
        :currentTheme="currentTheme"
        @close="isShowHistory = $event"
        v-if="isShowHistory === true"
      />
      <popup-create-event
        v-if="isShowCreateEvent === true"
        @closePopup="isShowCreateEvent = $event"
        :campaign="campaign"
      />
    </transition>
    <!-- End: Transition Popup -->
  </div>
</template>

<script src="./index.script.js">
</script>

<style scoped lang="scss">
@import "./index.style";
</style>