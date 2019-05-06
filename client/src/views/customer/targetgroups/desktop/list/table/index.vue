<template>
  <div class="table my_3" :data-theme="currentTheme">
    <!-- User Table Header -->
    <div class="table--item item--header d_flex align_content_center py_3">
      <div class="checkbox">
        <span class="checkbox--control">
          <input type="checkbox" class="checkbox--control-input">
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
      <div class="type">
        <span
          class="sort"
          @click="sortUsersByProperty(isSort[1], 1)"
          :class="[
            isSort[1].asc === true || isSort[1].desc === true ? 'active' : ''
          ]"
        >
          Loại
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
      <div class="account">
        <span
          class="sort"
          @click="sortUsersByProperty(isSort[1], 1)"
          :class="[
            isSort[1].asc === true || isSort[1].desc === true ? 'active' : ''
          ]"
        >
          Tài khoản
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
    </div>
    <!-- End User Table Header -->

    <div class="table--item item--body d_flex align_content_center py_3" v-for="(item, index) in users" :key="index">
      <div class="checkbox">
        <span class="checkbox--control">
          <input
            type="checkbox"
            class="checkbox--control-input"
            :value="item._id"
          >
          <span class="checkbox--control-checkmark"></span>
        </span>
      </div>
      <div class="name">
        <div class="name--text">
          <span class="btn--action">{{ item.name }}</span>
        </div>
      </div>
      <div class="type">
        <span class="btn--action">{{ showType(item.type) }}</span>
      </div>
      <div class="account">
        <span class="btn--action">{{ item.account }}</span>
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
