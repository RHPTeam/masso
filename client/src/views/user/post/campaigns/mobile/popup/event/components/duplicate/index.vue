<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog">
      <!-- Start: Header -->
      <div class="modal--header d_flex align_items_center">
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
        <p class="name--modal mb_0 m_auto">Sao chép sự kiện</p>
        <div class="active mr_2" @click="duplicateEvent">Xong</div>
      </div>
      <!-- End: Header -->
      <!-- Start: Body -->
      <div class="modal--body mx_3">
        <!-- Start: Time -->
        <div class="form--group mb_3">
          <div class="title mb_2">
            Bắt đầu
          </div>
          <div class="row d_flex align_items_center">
            <div class="col">
              <input type="text"
                    :class="inputTimeInvalid ? 'error' : null"
                    placeholder="hh:mm"
                    v-model="timeStartedAt"
                    v-click-outside="resetTimeStartedAt"
              >
            </div>
            <div class="col">
              <date-picker
                format="DD/MM/YYYY"
                v-model="dateStartedAt"
              ></date-picker>
            </div>
          </div>
        </div>
        <!-- End: Time -->
        <!-- Start: Campaign -->
        <div class="form--group">
          <div class="title mb_2">
            Sao chép tới
          </div>
          <multiselect
            label="title"
            class="form--control"
            v-model="campaignSelected"
            :options="convertCampaigns"
            placeholder="Chọn chiến dịch"
            v-click-outside="resetCampaignSelected"
          ></multiselect>
        </div>
        <!-- End: Campaign -->
      </div>
      <!-- End: Body -->
      <!-- Start: Footer -->
      <div class="modal--footer mx_3 mt_2">
      </div>
      <!-- End: Footer -->
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
