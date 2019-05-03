<template>
  <div class="info d_flex justify_content_between mt_4" :data-theme="currentTheme">
    <!--Start: Info Left Component-->
    <div class="info--left d_flex">
      <div class="segment--name mr_1">
        <contenteditable
          class="editable"
          tag="div"
          placeholder="Nhập tên..."
          :contenteditable="true"
          v-model="groupName"
        />
      </div>
      <div class="segment--total">
        <span class="font_weight_bold">0 trong số</span>
        9 người
      </div>
      <div class="segment--search ml_3">
        <input type="text" placeholder="Tìm kiếm bạn bè..." v-model="search">
      </div>
    </div>
    <!--End: Info Left Component-->
    <!--Start: Info Right Component-->
    <div class="info--right d_flex">
      <!--Start: Add Member to Group Component-->
      <div class="action mr_2" @click="showAddtoGrPopup">Thêm vào nhóm</div>
      <!--End: Add Member to Group Component-->
      <!--Start: Delete Member in Group Component-->
      <div class="action mr_2" @click="showDeleteFrPopup">Xóa</div>
      <!--End: Delete Member in Group Component-->
      <!--Start: Export Data Component-->
      <div class="action export disabled position_relative mr_2">
        Xuất dữ liệu
        <div class="action--tooltip">
          <app-tooltip/>
        </div>
      </div>
      <!--End: Export Data Component-->
      <!--Start: Filter Friend By Account Component-->
      <div class="action sequence--menu mr_2">
        <div
          class="btn--sequence"
          @click="showSequenceDropdown = !showSequenceDropdown"
          v-click-outside="closeSequenceDropdown"
        >
          Yen Dang
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
          <div class="dropdown--item px_3">Yen Dang</div>
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
