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
                v-for="(day, i) in weekDays"
                :key="i"
                :data="day.time"
                :class="day.status"
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
                  <div class="rc--event-container"></div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container"></div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container"></div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container"></div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container">
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-green"
                      style="top: 464px; bottom: -493px; z-index: 1; left: 0%; right: 0%;"
                      @click="
                        eventClick('Khởi động chiến dịch đầu tiên', '08:00')
                      "
                    >
                      <div class="rc--content">
                        <div class="rc--title">
                          08:00 Khởi động chiến dịch đầu tiên
                        </div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable"
                      style="top: 493px; bottom: -522px;"
                    >
                      <div class="rc--content">
                        <div class="rc--more" @click="showMorePopover(4, 8)">
                          +2 sự kiện
                        </div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-red"
                      style="top: 522px; bottom: -551px; z-index: 1; left: 0%; right: 0%;"
                      @click="
                        eventClick(
                          'Khuyến mại khủng nhân dịp sinh nhật',
                          '09:00'
                        )
                      "
                    >
                      <div class="rc--content">
                        <div class="rc--title">
                          09:00 Khuyến mại khủng nhân dịp sinh nhật
                        </div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable"
                      style="top: 550px; bottom: -579px;"
                    >
                      <div class="rc--content">
                        <div class="rc--more" @click="showMorePopover(4, 9)">
                          +2 sự kiện
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
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container">
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-blue"
                      style="top: 464px; bottom: -493px; z-index: 1; left: 0%; right: 0%;"
                      @click="eventClick('Khởi động chiến dịch', '08:00')"
                    >
                      <div class="rc--content">
                        <div class="rc--title">08:00 Khởi động chiến dịch</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-green"
                      style="top: 696px; bottom: -725px; z-index: 1; left: 0%; right: 0%;"
                      @click="eventClick('Dinner', '20:00')"
                    >
                      <div class="rc--content">
                        <div class="rc--title">12:00 Lunch</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable"
                      style="top: 725px; bottom: -754px;"
                    >
                      <div class="rc--content">
                        <div class="rc--more" @click="showMorePopover(5, 12)">
                          +3 sự kiện
                        </div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-orange"
                      style="top: 1276px; bottom: -1305px; z-index: 1; left: 0%; right: 0%;"
                      @click="eventClick('Sleep', '22:00')"
                    >
                      <div class="rc--content">
                        <div class="rc--title">22:00 Sleep</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable"
                      style="top: 1305px; bottom: -1334px;"
                    >
                      <div class="rc--content">
                        <div class="rc--more" @click="showMorePopover(5, 22)">
                          +6 sự kiện
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
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container">
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-green"
                      style="top: 696px; bottom: -725px; z-index: 1; left: 0%; right: 0%;"
                      @click="eventClick('Dinner', '20:00')"
                    >
                      <div class="rc--content">
                        <div class="rc--title">12:00 Lunch</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable"
                      style="top: 725px; bottom: -754px;"
                    >
                      <div class="rc--content">
                        <div class="rc--more" @click="showMorePopover(6, 12)">
                          +4 sự kiện
                        </div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-green"
                      style="top: 1334px; bottom: -1363px; z-index: 1; left: 0%; right: 0%;"
                      @click="eventClick('Reading', '23:00')"
                    >
                      <div class="rc--content">
                        <div class="rc--title">23:00 Reading</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable"
                      style="top: 1363px; bottom: -1392px;"
                    >
                      <div class="rc--content">
                        <div class="rc--more" @click="showMorePopover(6, 23)">
                          +6 sự kiện
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

<script src="./main.js"></script>

<style lang="scss">
@import "../../../../style";
</style>
