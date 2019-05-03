<template>
  <div class="table my_3" :data-theme="currentTheme">
    <!-- User Table Header -->
    <div class="table--item item--header d_flex align_content_center py_3">
      <div class="checkbox">
        <span class="checkbox--control">
          <input type="checkbox" class="checkbox--control-input" v-model="selectAll">
          <span class="checkbox--control-checkmark"></span>
        </span>
      </div>
      <div class="name">
        <span
          class="sort"
          @click="sortUsersByProperty(isSort[0], 0)"
          :class="[
            isSort[0].asc === true || isSort[0].desc === true ? 'active' : ''
          ]"
        >
          Tên
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].asc === false && isSort[0].desc === false"
          >
            <icon-arrow-down/>
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].asc"
          >
            <icon-arrow-down/>
          </icon-base>
          <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
            v-if="isSort[0].desc"
          >
            <icon-arrow-up/>
          </icon-base>
        </span>
      </div>
      <div class="gender">
        <span
          class="sort"
          @click="sortUsersByProperty(isSort[1], 1)"
          :class="[
            isSort[1].asc === true || isSort[1].desc === true ? 'active' : ''
          ]"
        >
          Giới tính
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[1].asc === false && isSort[1].desc === false"
          >
            <icon-arrow-down/>
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[1].asc"
          >
            <icon-arrow-down/>
          </icon-base>
          <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
            v-if="isSort[1].desc"
          >
            <icon-arrow-up/>
          </icon-base>
        </span>
      </div>
      <div class="pronoun">
        <span
          class="sort"
          @click="sortUsersByProperty(isSort[2], 2)"
          :class="[
            isSort[2].asc === true || isSort[2].desc === true ? 'active' : ''
          ]"
        >
          Danh xưng
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[2].asc === false && isSort[2].desc === false"
          >
            <icon-arrow-down/>
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[2].asc"
          >
            <icon-arrow-down/>
          </icon-base>
          <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
            v-if="isSort[2].desc"
          >
            <icon-arrow-up/>
          </icon-base>
        </span>
      </div>
      <div class="updated-date">
        <span
          class="sort"
          @click="sortUsersByProperty(isSort[3], 3)"
          :class="[
            isSort[3].asc === true || isSort[3].desc === true ? 'active' : ''
          ]"
        >
          Xem lần cuối
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[3].asc === false && isSort[3].desc === false"
          >
            <icon-arrow-down/>
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[3].asc"
          >
            <icon-arrow-down/>
          </icon-base>
          <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
            v-if="isSort[3].desc"
          >
            <icon-arrow-up/>
          </icon-base>
        </span>
      </div>
      <div class="attributes">
        <span class="sort">
          Thuộc tính
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down/>
          </icon-base>
        </span>
      </div>
      <div class="status">
        <span class="sort">
          Trạng thái
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down/>
          </icon-base>
        </span>
      </div>
    </div>
    <!-- End User Table Header -->

    <div class="table--item item--body d_flex align_content_center py_3" v-for="user in users" :key="user._id">
      <div class="checkbox">
        <span class="checkbox--control">
          <input
            type="checkbox"
            class="checkbox--control-input"
            :value="user._id"
          >
          <span class="checkbox--control-checkmark"></span>
        </span>
      </div>
      <div class="name">
        <div class="name--avatar mr_2">
          <img :src="user.profilePicture" alt="ảnh đại diện" width="32px" height="32px">
        </div>
        <div class="name--text">
          <span class="btn--action">{{ user.fullName }}</span>
        </div>
      </div>
      <div class="gender">
        <span class="btn--action">{{ showGender(user.gender) }}</span>
      </div>
      <div class="pronoun">
        <span
          class="btn--action"
          v-if="user.vocate !== 'Chưa thiết lập'"
          @click="showPronounPopup(user._id)"
        >{{ user.vocate | upperCaseFirstLetter }}</span>
        <span class="btn--action" v-else @click="showPronounPopup(user._id)">Chọn để thiết lập</span>
      </div>
      <div class="updated-date">
        <span class="btn--action">
          {{
          user.updatedAt | covertDateUpdatedAt
          }}
        </span>
      </div>
      <div class="attributes">
        <span class="btn--action">None</span>
      </div>
      <div class="status">
        <span class="btn--action">None</span>
      </div>
    </div>

    <!--*********** POPUP *************-->
    <transition name="popup">
      <pronoun-popup
        v-if="isShowPronounPopup === true"
        :data-theme="currentTheme"
        :isShowPronounPopup="isShowPronounPopup"
        :userID="userID"
        @closeAddPopup="isShowPronounPopup = $event"
      ></pronoun-popup>
    </transition>
  </div>
  <!--  -->
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
