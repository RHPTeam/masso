<template>
  <div class="post--time mt_4">
    <div class="title mb_2">
      <icon-base
        class="icon--sort-down"
        icon="icon--sort-down"
        width="14px"
        heigh="14px"
        viewBox="0 0 14 14"
      >
        <icon-sort-down></icon-sort-down>
      </icon-base>
      Thời gian
    </div>
    <div class="px_3">
      <div class="post--time-item d_flex align_items_center mb_3">
        <div class="item--label mr_3">Thời gian bắt đầu:</div>
        <div class="item--input d_flex align_items_center">
          <input class="form_control text_center input--time mr_2"
                 type="time"
          >
          <datepicker
            class="time--datepicker"
          />
        </div>
      </div>
      <div class="post--time-item d_flex align_items_center">
        <div class="item--label mr_3">Thời gian chờ giữa các lần gửi:</div>
        <div class="item--input d_flex align_items_center mr_2">
          <select-box
            :options="timeValues"
            :selected="timeValueSelected"
            @updateSelected="timeValueSelected = $event"
          />
        </div>
        <div class="item--input d_flex align_items_center">
          <select-box
            :options="timeUnits"
            :selected="timeUnitSelected"
            @updateSelected="timeUnitSelected = $event"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "@/components/datepicker";
import SelectBox from "./selectbox"

export default {
  components: {
    Datepicker,
    SelectBox
  },
  data() {
    return {
      timeUnits: [
        { id: 'min', name: 'phút' },
        { id: 'hour', name: 'giờ' },
        { id: 'day', name: 'ngày' }
      ],
      timeUnitSelected: { id: 'min', name: 'phút' },
      timeValues: [
        { id: 0, name: 1 },
        { id: 1, name: 2 },
        { id: 2, name: 3 },
        { id: 3, name: 4 },
        { id: 4, name: 10 },
        { id: 5, name: 15 },
        { id: 6, name: 20 },
        { id: 7, name: 25 },
      ],
      timeValueSelected: { id: 4, name: 10 },
    }
  }
}
</script>

<style scoped lang="scss">
  .post--time {
    .title {
      color: #666;
      font-weight: 600;
      .icon--sort-down {
        vertical-align: middle;
        vertical-align: -webkit-baseline-middle;
      }
    }
    .post--time-item {
      .item--input {
        input {
          border: 0;
          border-radius: .625rem;
          height: 40px;
          line-height: 40px;
          text-align: center;
          &:focus {
            border: 0;
            box-shadow: none;
            outline: 0;
          }
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            /* display: none; <- Crashes Chrome on hover */
            -webkit-appearance: none;
            margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
          }

          &[type=number] {
            -moz-appearance:textfield; /* Firefox */
          }
        }
        .input--number {
          width: 80px;
        }
        .input--time {
          width: 109px;
        }
      }
    }
  }
</style>
