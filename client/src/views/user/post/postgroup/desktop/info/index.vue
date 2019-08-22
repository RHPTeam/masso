<template>
  <div class="info d_flex justify_content_between mt_4" :data-theme="currentTheme">
    <!--Start: Info Left Component-->
    <div class="info--left d_flex mr_auto">
      <div class="segment--total"
            v-if="groupSelected === false"
      >
        <span class="font_weight_bold">
          {{ postGroupGroupsSelected.length + postGroupPagesSelected.length + postProfileSelected.length }} trong số</span>
        {{ facebookGroups.length + facebookPages.length }} đã chọn
      </div>
      <div class="segment--total" v-else>
        <span class="font_weight_bold">
          {{ postGroupGroupsSelected.length + postGroupPagesSelected.length + postProfileSelected.length }} trong số</span>
        {{ Number( postGroupDetail._pages ? postGroupDetail._pages.length : 0 ) +
            Number( postGroupDetail._groups ? postGroupDetail._groups.length : 0 )
        }} đã chọn
      </div>
    </div>
    <!--End: Info Left Component-->
    <!--Start: Info Right Component-->
    <div class="info--right d_flex ml_auto">
      <!--Start: Update again pages & groups-->

      <div class="wrap position_relative mr_2">
        <div
          class="action"
          @click="isShowUpdateFanpage = !isShowUpdateFanpage"
        >
          Cập nhật Fanpage
        </div>
        <div
          class="update position_absolute"
          v-if="isShowUpdateFanpage  === true"
          v-click-outside="closeUpdateFanpage"
        >
          <div
            class="update--item px_3 py_2"
            v-if="accountsFB && accountsFB.length === 0"
          >
            Chưa có tài khoản áp dụng
          </div>
          <div
            class="update--item px_3 py_2"
            v-else
            v-for="(item, aindex) in accountsFB"
            :key="aindex"
            @click="updateFanpageFacebook(item)"
          >
            {{item.userInfo.name}}
          </div>
        </div>
      </div>

      <div class="wrap position_relative mr_2">
        <div
          class="action"
          @click="isShowUpdateGroup = !isShowUpdateGroup"
        >
          Cập nhật Group
        </div>
        <div
          class="update position_absolute"
          v-if="isShowUpdateGroup === true"
          v-click-outside="closeUpdateGroup"
        >
          <div
            class="update--item px_3 py_2"
            v-if="accountsFB && accountsFB.length === 0"
          >
            Chưa có tài khoản áp dụng
          </div>
          <div
            class="update--item px_3 py_2"
            v-else
            v-for="(item, aindex) in accountsFB"
            :key="aindex"
            @click="updateGroupFacebook(item)"
          >
            {{item.userInfo.name}}
          </div>
        </div>
      </div>
       <!--<div class="action mr_2" @click="updateFanpageFacebook" >
        Cập nhật Fanpage
      </div>
      <div class="action mr_2" @click="updateGroupFacebook" >
        Cập nhật Group
      </div>-->
      <!--End: Update again pages & groups-->
      <!--Start: Remove  selected pages & groups-->
      <div class="action mr_2"
         v-if="postGroupGroupsSelected.length !== 0 && groupSelected === true ||
               postGroupPagesSelected.length !== 0 && groupSelected === true ||
                postProfileSelected.length !== 0 && groupSelected === true"
         @click="showDeletePopup"
      >
        Xóa khỏi nhóm
      </div>
      <!--Start: Remove  selected pages & groups-->
      <!--Start: Add  selected pages & groups-->
      <div class="action mr_2"
           @click="showAddtoGrPopup"
           v-if="postGroupGroupsSelected.length !== 0 || postGroupPagesSelected.length !== 0 || postProfileSelected.length !== 0"
      >Thêm vào nhóm</div>
      <!--Start: Add  selected pages & groups-->
      <!--Start: Filter Friend By Account Component-->
      <div class="action dropdown--menu mr_2">
        <div
          class="btn--dropdown"
          @click="showDropdown = !showDropdown" v-click-outside="closeShowDropdown"
        >
          {{ typeFilterSelected }}
          <icon-base
            class="ml_1"
            icon-name="Lựa chọn"
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
               @click="updateTypeSelected('Cá nhân')"
          >Trang Cá nhân</div>
          <div class="dropdown--item px_3"
               @click="updateTypeSelected('Trang')"
          >Fanpage Facebook</div>
          <div class="dropdown--item px_3"
               @click="updateTypeSelected('Nhóm')"
          >Group Facebook</div>
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
    <transition name="popup">
    <delete-popup
      v-if="isShowDeletePopup"
      :data-theme="currentTheme"
      :multiple="true"
      title="Xoá nhóm và trang"
      description="Các nhóm và trang đã chọn sẽ bị xóa khỏi nhóm "
      @closePopup="isShowDeletePopup = $event"
      storeActionName="deletePagesNGroupsFromPostGroup"
      :targetData="targetDeletePopupData"
      :targetName="postGroupDetail.title"
    ></delete-popup>
    </transition>
  </div>
</template>


<script src="./index.script"></script>

<style scoped lang="scss">
@import "index.style";
</style>
