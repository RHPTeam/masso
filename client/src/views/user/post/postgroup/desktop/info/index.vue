<template>
  <div class="info d_flex justify_content_between mt_4" :data-theme="currentTheme">
    <!--Start: Info Left Component-->
    <div class="info--left d_flex">
      <div class="segment--total"
            v-if="groupSelected === false"
      >
        <span class="font_weight_bold">
          {{ postGroupGroupsSelected.length + postGroupPagesSelected.length }} trong số</span>
        {{ facebookGroups.length + facebookPages.length }} đã chọn
      </div>
      <div class="segment--total" v-else>
        <span class="font_weight_bold">
          {{ postGroupGroupsSelected.length + postGroupPagesSelected.length }} trong số</span>
        {{ Number( postGroupDetail._pages ? postGroupDetail._pages.length : 0 ) +
            Number( postGroupDetail._groups ? postGroupDetail._groups.length : 0 )
        }} đã chọn
      </div>
    </div>
    <!--End: Info Left Component-->
    <!--Start: Info Right Component-->
    <div class="info--right d_flex">
      <div class="action mr_2"
           @click="showAddtoGrPopup"
           v-if="postGroupGroupsSelected.length !== 0 || postGroupPagesSelected.length !== 0"
      >Thêm vào nhóm</div>
      <!--Start: Filter Friend By Account Component-->
      <div class="action dropdown--menu mr_2">
        <div
          class="btn--dropdown"
          @click="showDropdown = !showDropdown"
        >
          {{ typeFilterSelected }}
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
        <div class="dropdown text_left" v-show="showDropdown">
          <div class="dropdown--item px_3"
               @click="updateTypeSelected('Tất cả')"
          >Tất cả</div>
          <div class="dropdown--item px_3"
               @click="updateTypeSelected('Trang')"
          >Trang</div>
          <div class="dropdown--item px_3"
               @click="updateTypeSelected('Nhóm')"
          >Nhóm</div>
        </div>
      </div>
      <!--End: Filter Friend By Account Component-->
    </div>
    <!--End: Info Right Component-->

    <!--*********** POPUP *************-->
    <transition name="popup">
      <add-group-popup
        v-if="isShowAddtoGrPopup === true"
        :data-theme="currentTheme"
        @closePopup="isShowAddtoGrPopup = $event"
      ></add-group-popup>
    </transition>
  </div>
</template>


<script src="./index.script"></script>

<style scoped lang="scss">
@import "index.style";
</style>
