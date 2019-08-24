<template>
  <div class="rc--view rc--timeGridWeek-view rc--timeGrid-view">
    <table>
      <thead class="rc--head">
        <tr>
          <td class="rc--head-container rc--widget-header">
            <div class="rc--row rc--widget-header">
              <table>
                <thead>
                  <tr v-if="view === 'week'">
                    <th
                      class="rc--axis rc--widget-header"
                      style="width: 42px;"
                    ></th>
                    <th
                      class="rc--day-header rc--widget-header"
                      v-for="(day, i) in weekDays"
                      :key="i"
                      :data="day.time"
                    >
                      {{ day.text }}
                    </th>
                  </tr>
                  <tr v-if="view === 'day'">
                    <th
                      class="rc--axis rc--widget-header"
                      style="width: 42px;"
                    ></th>
                    <th class="rc--day-header rc--widget-header">
                      {{ dayFullName[activeDay.getDay()] }}
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </td>
        </tr>
      </thead>
      <tbody class="rc--body">
        <tr>
          <td class="fc-widget-content">
            <rc-week-time-grid
              v-if="view === 'week'"
              :eventsOfWeek="eventsOfWeek"
              :timePoint="timePoint"
              :weekDays="weekDays"
              @closeCardHover="isShowCardHover = $event"
              @eventClick="eventClick($event)"
              @eventHover="eventHover($event)"
              @getEvents="eventsPopupData = $event"
              @setLeftVal="leftVal = $event"
              @setRightVal="rightVal = $event"
              @setTopVal="topVal = $event"
              @showMorePopover="showMorePopover($event)"
              @timeClick="timeClick($event)"
            />
            <rc-day-time-grid
              v-if="view === 'day'"
              :eventOfDay="eventOfDay"
              :timePoint="timePoint"
              :activeDay="activeDay"
              @closeCardHover="isShowCardHover = $event"
              @eventClick="eventClick($event)"
              @eventHover="eventHover($event)"
              @getEvents="eventsPopupData = $event"
              @setLeftVal="leftVal = $event"
              @setRightVal="rightVal = $event"
              @setTopVal="topVal = $event"
              @showMorePopover="showMorePopover($event)"
              @timeClick="timeClick($event)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Popover -->
    <transition name="fade">
      <rc-more-popover
        v-if="isShowMorePopover"
        @closeMorePopover="isShowMorePopover = $event"
        @eventClick="eventClick($event)"
        :eventsPopupData="eventsPopupData"
        :leftVal="leftVal"
        :rightVal="rightVal"
        :topVal="topVal"
      ></rc-more-popover>
    </transition>
    <!-- Card Hover -->
    <transition name="fade">
      <rc-card-hover
        v-if="isShowCardHover"
        :eventData="eventHoverData"
        :leftVal="leftVal"
        :rightVal="rightVal"
        :topVal="topVal"
      ></rc-card-hover>
    </transition>
  </div>
</template>

<script>
import RcCardHover from "../../popover/cardhover";
import RcDayTimeGrid from "./day-time-grid/index";
import RcMorePopover from "../../popover/more/index";
import RcWeekTimeGrid from "./week-time-grid/index";

export default {
  components: {
    RcCardHover,
    RcDayTimeGrid,
    RcMorePopover,
    RcWeekTimeGrid,
  },
  props: [ "activeDay", "eventOfDay", "eventsOfWeek", "dayFullName", "timePoint", "view", "weekDays" ],
  data() {
    return {
      eventsPopupData: [],
      eventHoverData: {},
      isShowMorePopover: false,
      isShowCardHover: false,
      leftVal: null,
      rightVal: null,
      topVal: null
    };
  },
  methods: {
    eventClick( data ) {
      this.$emit( "eventClick", data );
    },
    eventHover( data ) {
      this.isShowCardHover = true;
      this.eventHoverData = data;
      if ( this.isShowMorePopover === true ) {
        this.isShowMorePopover = false;
      }
    },
    showMorePopover( val) {
      this.isShowMorePopover = val;
      if ( this.isShowCardHover === true ) {
        this.isShowCardHover = false;
      }
    },
    timeClick( data ) {
      this.$emit( "timeClick", data );
    }
  }
};
</script>

<style lang="scss">
@import "../../../style";
</style>
