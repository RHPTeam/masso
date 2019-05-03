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
              :class="[index % 2 !== 0 ? 'rc--minor' : '']"
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
                v-if="index % 2 !== 0"
                class="rc--axis rc--time rc--widget-content"
                style="width: 42px; height: 28px; font-size: .85rem;"
              ></td>
              <td v-if="index % 2 !== 0" class="rc--widget-content"></td>
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
      ></rc-more-popover>
    </transition>
  </div>
</template>

<script src="./main.js"></script>

<style lang="scss">
@import "../../../../style";
</style>
