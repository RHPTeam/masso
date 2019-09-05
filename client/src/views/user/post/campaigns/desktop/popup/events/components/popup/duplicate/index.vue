<template>
  <div class="popup">
    <!-- Start: Header -->
    <div class="popup--header position_relative mx_3 pt_2">
      <div class="popup--title text_center mt_1">Sao chép sự kiện</div>
      <div class="btn--close position_absolute"
           @click.prevent="closePopup"
      >
        <icon-base
          class="icon--close"
          icon--name="Hủy"
          height="12px"
          width="12px"
          viewBox="0 0 20 20"
        >
          <icon-close></icon-close>
        </icon-base>
      </div>
    </div>
    <!-- End: Header -->
    <!-- Start: Body -->
    <div class="popup--body mx_3">
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
        <r-select
          label="title"
          track-by="title"
          class="form--control"
          :maxHeight="220"
          v-model="campaignSelected"
          :options="convertCampaigns"
          placeholder="Chọn chiến dịch"
          v-click-outside="resetCampaignSelected"
        ></r-select>
      </div>
      <!-- End: Campaign -->
    </div>
    <!-- End: Body -->
    <!-- Start: Footer -->
    <div class="popup--footer mx_3 mt_2">
      <div class="d_flex">
        <button class="btn btn_success save" @click="duplicateEvent">Tạo</button>
      </div>
    </div>
    <!-- End: Footer -->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
