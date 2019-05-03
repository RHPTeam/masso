<template>
  <div
    class="modal--wrapper position_fixed d_flex justify_content_center align_items_center"
  >
    <div class="modal--content">
      <div class="modal--header pl_4 pr_4 pt_3 pb_3">Cấu hình tài khoản</div>
      <div class="modal--body pt_3 pb_0 pl_4 pr_4">
        <div class="user d_flex justify_content_start align_items_center mb_4">
          <div class="user--avatar mr_4">
            <div
              v-if="user.imageAvatar"
              class="avatar--content avatar--img position_relative d_block"
              :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
            ></div>
            <div
              v-else
              class="avatar--content avatar--default position_relative d_block"
            >
              <span class="position_absolute">{{
                user.name | getFirstLetter
              }}</span>
            </div>
          </div>
          <div class="user--info">
            <div class="user--info-name mb_2">{{ user.name }}</div>
            <div class="user--info-mail">{{ user.email }}</div>
          </div>
        </div>
        <div class="edit">
          <div
            class="edit--status d_flex justify_content_between align_items_center mb_3"
          >
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="check-active"
                class="mr_3"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-check-active /> </icon-base
              >Kích hoạt:
            </div>
            <div class="status--radio">
              <input
                id="check-active"
                class="radio"
                type="checkbox"
                :checked="user.status"
                @change="updateStatus"
              />
              <label for="check-active"></label>
            </div>
          </div>
          <div
            class="edit--account d_flex justify_content_between align_items_center mb_3"
          >
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="infinity"
                class="mr_3"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-infinity /> </icon-base
              >Số lượng tài khoản giới hạn:
            </div>
            <div class="account--input">
              <input type="number" v-model="user.maxAccountFb" size="10" />
            </div>
          </div>
          <div
            class="edit--type d_flex justify_content_between align_items_center mb_3"
          >
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="role"
                class="mr_3"
                width="16.667"
                height="20"
                viewBox="0 0 16.667 20"
              >
                <icon-role /> </icon-base
              >Loại tài khoản:
            </div>
            <div class="type--select">
              <div class="select--wrapper position_relative">
                <select v-model="user._role.level">
                  <option
                    v-for="role in roles"
                    :key="role.level"
                    :value="role.level"
                    :selected="role.level === user._role.level ? 'selected' : ''"
                  >{{ role.level }}</option
                  >
                </select>
              </div>
            </div>
          </div>
          <div
            class="edit--time d_flex justify_content_between align_items_center mb_3"
          >
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="hourglass"
                class="mr_3"
                width="15.333"
                height="20"
                viewBox="0 0 15.333 20"
              >
                <icon-hourglass /> </icon-base
              >Ngày hết hạn:
            </div>
            <div class="time--tick position_relative">
              <datepicker
                :readonly="true"
                format="D-M-YYYY"
                name="date-edit"
                :value="formatDateCreate"
                v-model="formatDateCreate"
              ></datepicker>
              <div class="time--tick-icon position_absolute">
                <icon-base
                  icon-name="calendar"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                >
                  <icon-calendar />
                </icon-base>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal--footer d_flex justify_content_end align_items_center pl_4 pr_4 pb_4 pt_2"
      >
        <button class="btn-cancel" @click="closeAddEdit">Hủy</button>
        <button class="btn-done ml_4" @click="updateAccount">Xong</button>
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
