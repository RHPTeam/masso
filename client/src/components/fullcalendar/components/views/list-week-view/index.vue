<template>
  <div class="rc--view rc--listWeek-view rc--list-view rc--widget-content">
    <div class="rc--scroller" style="overflow: hidden auto; height: 672px;">
      <table class="rc--list-table ">
        <tbody v-if="eventsOfWeek.length !== 0">
          <!-- Sunday -->
          <tr class="rc--list-heading"
              :date="weekDays[0].time"
              v-if="filterEventsByDay( weekDays[0].time ).length !== 0"
          >
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">
                {{ dayFullName[new Date(weekDays[0].time).getDay()] }}
              </div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[0].time) }}
              </div>
            </td>
          </tr>
          <tr
            class="rc--list-item"
            v-for="( event, index ) in filterEventsByDay( weekDays[0].time )"
            :key="`Sun${index}`"
            @click="eventClick( event )"
          >
            <td class="rc--list-item-time rc--widget-content">{{ formatTime(event.started_at) }}</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot"
                    :style="{ backgroundColor: event.color }"
              ></span>
            </td>
            <td class="rc--list-item-title rc--widget-content">
              <a>{{ event.title }}</a>
              <transition name="fade">
                <rc-card-hover
                  class="rc--card-hover-control"
                  :eventData="event"
                  :leftVal="null"
                  :rightVal="0"
                  :topVal="0"
                ></rc-card-hover>
              </transition>
            </td>
          </tr>

          <!-- Monday -->
          <tr class="rc--list-heading"
              :date="weekDays[1].time"
              v-if="filterEventsByDay( weekDays[1].time ).length !== 0"
          >
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">
                {{ dayFullName[new Date(weekDays[1].time).getDay()] }}
              </div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[1].time) }}
              </div>
            </td>
          </tr>
          <tr
            class="rc--list-item"
            v-for="( event, index ) in filterEventsByDay( weekDays[1].time )"
            :key="`Mon${index}`"
            @click="eventClick( event )"
          >
            <td class="rc--list-item-time rc--widget-content">{{ formatTime(event.started_at) }}</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot"
                    :style="{ backgroundColor: event.color }"
              ></span>
            </td>
            <td class="rc--list-item-title rc--widget-content">
              <a>{{ event.title }}</a>
              <transition name="fade">
                <rc-card-hover
                  class="rc--card-hover-control"
                  :eventData="event"
                  :leftVal="null"
                  :rightVal="0"
                  :topVal="0"
                ></rc-card-hover>
              </transition>
            </td>
          </tr>

          <!-- Tuesday -->
          <tr class="rc--list-heading"
              :date="weekDays[2].time"
              v-if="filterEventsByDay( weekDays[2].time ).length !== 0"
          >
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">
                {{ dayFullName[new Date(weekDays[2].time).getDay()] }}
              </div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[2].time) }}
              </div>
            </td>
          </tr>
          <tr
            class="rc--list-item"
            v-for="( event, index ) in filterEventsByDay( weekDays[2].time )"
            :key="`Tue${index}`"
            @click="eventClick( event )"
          >
            <td class="rc--list-item-time rc--widget-content">{{ formatTime(event.started_at) }}</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot"
                    :style="{ backgroundColor: event.color }"
              ></span>
            </td>
            <td class="rc--list-item-title rc--widget-content">
              <a>{{ event.title }}</a>
              <transition name="fade">
                <rc-card-hover
                  class="rc--card-hover-control"
                  :eventData="event"
                  :leftVal="null"
                  :rightVal="0"
                  :topVal="0"
                ></rc-card-hover>
              </transition>
            </td>
          </tr>

          <!-- Wednesday -->
          <tr class="rc--list-heading"
              :date="weekDays[3].time"
              v-if="filterEventsByDay( weekDays[3].time ).length !== 0"
          >
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">
                {{ dayFullName[new Date(weekDays[3].time).getDay()] }}
              </div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[3].time) }}
              </div>
            </td>
          </tr>
          <tr
            class="rc--list-item"
            v-for="( event, index ) in filterEventsByDay( weekDays[3].time )"
            :key="`Wed${index}`"
            @click="eventClick( event )"
          >
            <td class="rc--list-item-time rc--widget-content">{{ formatTime(event.started_at) }}</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot"
                    :style="{ backgroundColor: event.color }"
              ></span>
            </td>
            <td class="rc--list-item-title rc--widget-content">
              <a>{{ event.title }}</a>
              <transition name="fade">
                <rc-card-hover
                  class="rc--card-hover-control"
                  :eventData="event"
                  :leftVal="null"
                  :rightVal="0"
                  :topVal="0"
                ></rc-card-hover>
              </transition>
            </td>
          </tr>

          <!-- Thursday -->
          <tr class="rc--list-heading"
              :date="weekDays[4].time"
              v-if="filterEventsByDay( weekDays[4].time ).length !== 0"
          >
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">
                {{ dayFullName[new Date(weekDays[4].time).getDay()] }}
              </div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[4].time) }}
              </div>
            </td>
          </tr>
          <tr
            class="rc--list-item"
            v-for="( event, index ) in filterEventsByDay( weekDays[4].time )"
            :key="`Thu${index}`"
            @click="eventClick( event )"
          >
            <td class="rc--list-item-time rc--widget-content">{{ formatTime(event.started_at) }}</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot"
                    :style="{ backgroundColor: event.color }"
              ></span>
            </td>
            <td class="rc--list-item-title rc--widget-content">
              <a>{{ event.title }}</a>
              <transition name="fade">
                <rc-card-hover
                  class="rc--card-hover-control"
                  :eventData="event"
                  :leftVal="null"
                  :rightVal="0"
                  :topVal="0"
                ></rc-card-hover>
              </transition>
            </td>
          </tr>

          <!-- Friday -->
          <tr class="rc--list-heading"
              :date="weekDays[5].time"
              v-if="filterEventsByDay( weekDays[5].time ).length !== 0"
          >
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">
                {{ dayFullName[new Date(weekDays[5].time).getDay()] }}
              </div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[5].time) }}
              </div>
            </td>
          </tr>
          <tr
            class="rc--list-item"
            v-for="( event, index ) in filterEventsByDay( weekDays[5].time )"
            :key="`Fri${index}`"
            @click="eventClick( event )"
          >
            <td class="rc--list-item-time rc--widget-content">{{ formatTime(event.started_at) }}</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot"
                    :style="{ backgroundColor: event.color }"
              ></span>
            </td>
            <td class="rc--list-item-title rc--widget-content">
              <a>{{ event.title }}</a>
              <transition name="fade">
                <rc-card-hover
                  class="rc--card-hover-control"
                  :eventData="event"
                  :leftVal="null"
                  :rightVal="0"
                  :topVal="0"
                ></rc-card-hover>
              </transition>
            </td>
          </tr>

          <!-- Saturday -->
          <tr class="rc--list-heading"
              :date="weekDays[6].time"
              v-if="filterEventsByDay( weekDays[6].time ).length !== 0"
          >
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">
                {{ dayFullName[new Date(weekDays[6].time).getDay()] }}
              </div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[6].time) }}
              </div>
            </td>
          </tr>
          <tr
            class="rc--list-item"
            v-for="( event, index ) in filterEventsByDay( weekDays[6].time )"
            :key="`Sat${index}`"
            @click="eventClick( event )"
          >
            <td class="rc--list-item-time rc--widget-content">{{ formatTime(event.started_at) }}</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot"
                    :style="{ backgroundColor: event.color }"
              ></span>
            </td>
            <td class="rc--list-item-title rc--widget-content">
              <a>{{ event.title }}</a>
              <transition name="fade">
                <rc-card-hover
                  class="rc--card-hover-control"
                  :eventData="event"
                  :leftVal="null"
                  :rightVal="0"
                  :topVal="0"
                ></rc-card-hover>
              </transition>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="rc--list-empty">Không có sự kiện nào.</tr>
        </tbody>
      </table>
    </div>

    <!-- Popover -->
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

export default {
  components: {
    RcCardHover
  },
  props: [ "eventsOfWeek", "dayFullName", "monthName", "weekDays" ],
  methods: {
    eventClick( data ) {
      this.$emit( "eventClick", data );
    },
    filterEventsByDay( d ) {
      const day = new Date( d ).getDay();

      return this.eventsOfWeek.filter( ( event ) => {
        const eventStartDay = new Date( event.started_at ).getDay();

        return eventStartDay === day;
      } );
    },
    formatDate( d ) {
      const time = new Date( d );

      return `${String( time.getDate() ).padStart( 2, "0" )} ${
        this.monthName[ time.getMonth() ]
      }, ${time.getFullYear()}`;
    },
    formatTime( d ) {
      const dateTime = new Date( d ),
            hours = String( dateTime.getHours() ).padStart( 2, "0"),
            mins = String( dateTime.getMinutes() ).padStart( 2, "0" );

      return `${hours}:${mins}`;
    }
  }
};
</script>

<style lang="scss">
@import "../../../style";
</style>
