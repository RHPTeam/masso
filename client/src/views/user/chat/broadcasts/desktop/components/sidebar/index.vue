<!--Left Sidebar Page Script Facebook Desktop-->
<template>
  <div class="group py_3" :data-theme="currentTheme">
    <!--Start: Component Deliver your message now-->
    <div class="group--item now">
      <div class="group--item-header mb_2 text_left">
        <div class="title">
          <span>Tin nhắn gửi ngay</span>
        </div>
        <div class="action"></div>
      </div>
      <div class="group--item-body position_relative">
        <!--        @click.prevent="$router.push({ name: 'f_broadcast_now' })"-->
        <div class="box add" @click.prevent="showTooltip = !showTooltip">
          <icon-base icon-name="add" width="20" height="20" viewBox="0 0 60 60">
            <icon-plus />
          </icon-base>
        </div>
        <div
          class="tooltip--now position_absolute p_2"
          v-if="showTooltip === true"
        >
          Tính năng này đang được phát triển và được cập nhật trong phiên bản
          sắp tới.
        </div>
      </div>
    </div>
    <!--End: Component Deliver your message now-->

    <!--Start: Component Trigger-->
    <!--End: Component Trigger-->

    <!--Start: Component Schedule later-->
    <div class="group--item schedule">
      <div class="group--item-header text_left">
        <div class="title mb_2">
          <span>Thiết lập bộ hẹn</span>
        </div>
        <div class="action"></div>
      </div>
      <div class="group--item-body r m_0">
        <div class="c_xl_6 c_lg_12 c_md_12 text_center px_0 mb_2 setup" @click="goToSchedule">
          <div class="mx_1 content--setup">
            <span>Hang ngay</span>
            <span class="pl_1">xx:xx</span>
          </div>
        </div>
        <div class="c_xl_6 c_lg_12 c_md_12 text_center px_0 mb_2 setup">
          <div class="content--setup mx_1">
            <span>Hang ngay</span>
            <span class="pl_1">12:30</span>
          </div>
        </div>
        <div class="c_xl_6 c_lg_12 c_md_12 text_center px_0 mb_2 setup">
          <div class="content--setup mx_1">
            <icon-base
              icon-name="add"
              width="20"
              height="20"
              viewBox="0 0 60 60"
            >
              <icon-plus />
            </icon-base>
          </div>
        </div>
      </div>

      <loading-component
        v-if="this.$store.getters.statusBroadcast === 'loading'"
      />
      <div
        v-else
        class="group--item-body d_flex flex_wrap justify_content_between"
      >
        <!-- <div class="above d_flex align_items_center justify_content_center mb_2" v-if="isShowAlert === true">
          <p class="above--txt">
            Chiến dịch đã được gửi đi
          </p>
        </div> -->
        <!-- <div
          class="box"
          v-for="(schedule, index) in schedules"
          :key="index"
          @click.prevent="showSchedule(schedule)"
          :class="{ active: isActive == schedule._id }"
        >
          <span>{{ schedule.timeSetting | filteredName }}</span>
        </div> -->
        <!-- <div class="box add" @click="addSchedule">
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 60 60"
          >
            <icon-plus />
          </icon-base>
        </div> -->
      </div>
    </div>
    <!--End: Component Schedule later-->
  </div>
</template>

<script type="text/javascript" src="./sidebar.script.js"></script>

<style scoped lang="scss">
@import "./sidebar.style";
</style>
