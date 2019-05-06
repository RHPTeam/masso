<template>
  <div class="info d_flex justify_content_between mt_4" :data-theme="currentTheme">
    <!--Start: Info Left Component-->
    <div class="info--left d_flex">
      <div class="segment--total">
        <span class="font_weight_bold">0 trong số</span>
        9 đã chọn
      </div>
    </div>
    <!--End: Info Left Component-->
    <!--Start: Info Right Component-->
    <div class="info--right d_flex">
      <div class="action mr_2" @click="showDeleteFrPopup">Xóa</div>
      <div class="action mr_2" @click="showAddtoGrPopup">Thêm vào nhóm</div>
      <!--Start: Filter Friend By Account Component-->
      <div class="action sequence--menu mr_2">
        <div
          class="btn--sequence"
          @click="showSequenceDropdown = !showSequenceDropdown"
        >
          Tất cả
          <icon-base
            class="ml_1"
            icon-name="icon-arrow-down"
            width="14"
            height="14"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down/>
          </icon-base>
        </div>
        <div class="dropdown text_left" v-show="showSequenceDropdown">
          <div class="dropdown--item px_3" @click="updateAccountSelected()">Tất cả</div>
          <div class="dropdown--item px_3">Trang</div>
          <div class="dropdown--item px_3">Nhóm</div>
        </div>
      </div>
      <!--End: Filter Friend By Account Component-->
    </div>
    <!--End: Info Right Component-->

    <!--*********** POPUP *************-->
    <transition name="popup">
      <delete-friends-popup
        v-if="isShowDeleteFrPopup === true"
        :data-theme="currentTheme"
        title="Xoá bạn bè khỏi nhóm"
        :isShowDeletePopup="isShowDeleteFrPopup"
        @closeAddPopup="isShowDeleteFrPopup = $event"
        groupTarget="Khách Hàng Tiềm Năng"
      ></delete-friends-popup>
      <add-group-popup
        v-if="isShowAddtoGrPopup === true"
        :data-theme="currentTheme"
        :isShowDeleteFrPopup="isShowAddtoGrPopup"
        @closeAddPopup="isShowAddtoGrPopup = $event"
      ></add-group-popup>
    </transition>
  </div>
</template>


<script src="./index.script"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
