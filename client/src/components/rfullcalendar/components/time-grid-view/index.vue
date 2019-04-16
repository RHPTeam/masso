<template>
  <div class="rc--view rc--timeGridWeek-view rc--timeGrid-view">
    <table>
      <thead class="rc--head">
        <tr>
          <td class="rc--head-container rc--widget-header">
            <div
              class="rc--row rc--widget-header"
              style="border-right-width: 1px; margin-right: 16px;"
            >
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
              :timePoint="timePoint"
              :weekDays="weekDays"
              @setTopVal="topVal = $event"
              @setLeftVal="leftVal = $event"
              @showMorePopover="showMorePopover = $event"
            />
            <rc-day-time-grid
              v-if="view === 'day'"
              :timePoint="timePoint"
              :activeDay="activeDay"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Popover -->
    <rc-more-popover
      v-if="showMorePopover"
      @closeMorePopover="showMorePopover = $event"
      :topVal="topVal"
      :leftVal="leftVal"
    />
  </div>
</template>

<script>
import RcDayTimeGrid from "./day-time-grid/index";
import RcMorePopover from "../more-popover/index";
import RcWeekTimeGrid from "./week-time-grid/index";
export default {
  props: ["activeDay", "dayFullName", "timePoint", "view", "weekDays"],
  data() {
    return {
      showMorePopover: false,
      topVal: 0,
      leftVal: 0
    };
  },
  components: {
    RcDayTimeGrid,
    RcMorePopover,
    RcWeekTimeGrid
  }
};
</script>

<style lang="scss">
@import "../../style";
</style>
