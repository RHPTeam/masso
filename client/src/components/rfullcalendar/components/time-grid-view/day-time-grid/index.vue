<template>
  <div class="rc--time-grid-container" style="overflow: hidden;">
    <div class="rc--time-grid">
      <div class="rc--bg">
        <table>
          <tbody>
            <tr>
              <td class="rc--axis rc--widget-content" style="width: 42px;"></td>
              <td
                class="rc--day rc--widget-content"
                :data="activeDay"
                :class="[isToday(new Date(activeDay)) ? 'rc--today' : '']"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="rc--slats">
        <table>
          <tbody>
            <tr
              v-for="(time, index) in timePoint"
              :key="index"
              :data-time="time"
              :class="[index % 2 != 0 ? 'rc--minor' : '']"
            >
              <!-- Even Hours -->
              <td
                v-if="index % 2 === 0"
                class="rc--axis rc--time rc--widget-content"
                style="width: 42px; height: 28px; font-size: .85rem;"
              >
                <span>{{ time }}</span>
              </td>
              <td v-if="index % 2 === 0" class="rc--widget-content"></td>

              <!-- Odd hours -->
              <td
                v-if="index % 2 != 0"
                class="rc--axis rc--time rc--widget-content"
                style="width: 42px; height: 28px; font-size: .85rem;"
              ></td>
              <td v-if="index % 2 != 0" class="rc--widget-content"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr class="rc--divider rc--widget-header" style="display:none" />
      <div class="rc--content-skeleton">
        <table>
          <tbody>
            <tr>
              <td class="rc--axis" style="width: 42px;"></td>
              <td id="eventColumWidth">
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container">
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable"
                      style="top: 464px; bottom: -493px;"
                    >
                      <div class="rc--content">
                        <div class="rc--content-flex">
                          <div
                            class="rc--content-bg rc--bg-green"
                            v-for="(event, index) in events"
                            :key="index"
                          >
                            <div
                              class="rc--title"
                              @click="eventClick(event.name, event.time)"
                              ref="events"
                            >
                              {{ event.time + " " + event.name }}
                            </div>
                          </div>
                          <div class="rc--more" @click="showMorePopover(8)">
                            +2 sự kiện
                          </div>
                        </div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable"
                      style="top: 493px; bottom: -522px;"
                    >
                      <div class="rc--content">
                        <div class="rc--content-flex">
                          <div
                            class="rc--content-bg rc--bg-red"
                            @click="eventClick('Happy Hour', '08:30')"
                          >
                            <div class="rc--title">08:30 Happy Hour</div>
                          </div>
                          <div
                            class="rc--content-bg rc--bg-green"
                            @click="eventClick('Meeting', '08:30')"
                          >
                            <div class="rc--title">08:30 Meeting</div>
                          </div>
                        </div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                  </div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Popover -->
    <transition name="fade">
      <rc-more-popover
        v-if="isShowMorePopover"
        @closeMorePopover="isShowMorePopover = $event"
        :leftVal="leftVal"
        :rightVal="rightVal"
        :topVal="topVal"
      />
    </transition>
  </div>
</template>

<script>
import RcMorePopover from "../../more-popover/index";
export default {
  props: ["timePoint", "activeDay"],
  data() {
    return {
      events: [
        { time: "08:00", name: "Khởi động chiến dịch" },
        { time: "08:05", name: "Khuyến mại khủng sinh nhật đầu tiên" },
        { time: "08:10", name: "Khởi động" },
        { time: "08:20", name: "Ngày đầu tiên" },
        { time: "08:25", name: "Giới thiệu sản phẩm mới" },
        { time: "08:25", name: "Chương trình chăm sóc khách hàng đặc biệt" }
      ],
      eventContainer: {},
      eventContainerWidth: 0,
      eventContentWidth: 0,
      isShowMorePopover: false,
      leftVal: null,
      rightVal: 0,
      topVal: null
    };
  },
  mounted() {
    this.$nextTick(function() {
      const container = document.querySelector("#eventColumWidth");
      this.eventContainer = container;
      window.addEventListener("resize", this.getEventContainerWidth);

      //Init
      this.getEventContainerWidth();

      //event
      let w = 64 + 2 * (this.$refs.events.length - 1);
      this.$refs.events.forEach(item => {
        w = w + item.clientWidth;
      });
      this.eventContentWidth = w;

      if (w > this.eventContainerWidth) {
        this.$refs.events[5].remove();
      }
    });
  },
  methods: {
    eventClick(name, time) {
      const dataEmmit = {
        name: name,
        time: time
      };
      this.$emit("eventClick", dataEmmit);
    },
    getEventContainerWidth() {
      this.eventContainerWidth = this.eventContainer.offsetWidth;
    },
    isToday(day) {
      const now = new Date(); // now date time
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // now date at 00:00:00
      if (day.toDateString() === today.toDateString()) {
        return true;
      } else return false;
    },
    showMorePopover(timePoint) {
      const timeGridContainerHeight = 1392; // 29*48

      // calculate height of more popover element
      const eventCount = 6; // number of events
      const popoverHeight = 50 + eventCount * 20;

      // set top and left popover style
      let topVal = timePoint * 2 * 29;

      if (topVal + popoverHeight >= timeGridContainerHeight) {
        topVal = topVal - popoverHeight + 57;
      }

      this.topVal = topVal;
      this.isShowMorePopover = true;
    }
  },
  components: {
    RcMorePopover
  }
};
</script>

<style lang="scss">
@import "../../../style";
</style>
