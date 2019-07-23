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
            <icon-base icon-name="Lịch sử" width="24" height="24" viewBox="0 0 480 480" class="mr_2">
              <icon-history />
            </icon-base>
          </div>
          <div @click="showCreateEvent" v-if="campaign.status === true">
            <icon-base
              icon-name="Thêm sự kiện"
              width="24"
              height="24"
              viewBox="0 0 68 68"
              class="mr_1"
            >
              <icon-plus />
            </icon-base>
          </div>
        </div>
      </div>
    <VuePerfectScrollbar class="scroll--campaign">
      <div class="items--body mt_3 px_2">
        <div class="top d_flex align_items_center mb_2">
          <contenteditable
            class="editable name"
            tag="div"
            placeholder="Nhập tên..."
            :noNL="true"
            :contenteditable="true"
            v-model='campaign.title'
            @returned="updateTitleCampaign()"
          />
          <div class="active ml_auto">
            <toggle-switch
              @change="updateCampaignStatus()"
              v-model="campaign.status"
              :sync="true"
            />
          </div>
        </div>
        <div class="main">
          <!-- Start: FullCalendar -->
          <!-- <fullcalendar
            :events="campaignDetail._events"
            :theme="currentTheme"
            :view="calendarView"
            :disabledView="campaign.status"
          /> -->
          <!-- End: FullCalendar -->
          <!-- Start: Date time picker -->
          <date-picker-inline :inline="true" v-model="dateStartedAtDatePicker" @input="changeStartedAt"/>
          <!-- End: Date time picker -->

          <!-- Start: Event of Day -->
          <div class="event mt_2 px_2">
            <!-- <div class="items no--event text_center">Không có sự kiện nào</div> -->
            <div class="items text_center" v-if="eventsOfDay.length === 0">Không có sự kiện nào</div>
            <div class="items d_flex align_items_center" v-else v-for="(item, index) in eventsOfDay" :key="index" @click="openEventPopup(item)">
              <div class="time item">{{ formatTime(item.started_at) }}</div>
              <div class="item color mx_3">
                <span :style="{ backgroundColor: item.color }"></span>
              </div>
              <div class="name item">{{ item.title }}</div>
            </div>
          </div>
          <!-- End: Event of Day -->
        </div>
      </div>
    </VuePerfectScrollbar>
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