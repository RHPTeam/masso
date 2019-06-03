<template>
  <div class="top d_flex r m_0" :data-theme="currentTheme">
    <!--Start: Top Left Component-->
    <div class="top--left d_flex c_md_12 mb_3 c_xl_6 c_lg_12 px_0">
      <!-- <div class="segment--name mr_1">
        <contenteditable
          class="editable"
          tag="div"
          placeholder="Nhập tên..."
        />
      </div>-->
      <div class="segment--total">
        <span class="font_weight_bold">1
          <span>{{ $t("chat.friends.table.top.left.inNumber") }}</span>
        </span>
        2
        <span>{{ $t("chat.friends.table.top.left.people") }}</span>
      </div>
      <div class="segment--search ml_3">
        <input
          type="text"
          :placeholder="$t('chat.friends.table.top.left.placeholderSearch')"
          @keydown.enter="searchFriendFacebook"
          v-model="keySearch"
        />
      </div>
    </div>
    <!--End: Top Left Component-->
    <!--Start: Top Right Component-->
    <div class="top--right d_flex c_md_12 c_xl_6 c_lg_12 px_0">
      <!--Start: Add Member to Group Component-->
      <div class="action mr_2" @click="isShowAddtoGrPopup = true">{{ $t("chat.friends.table.top.right.addInGroup") }}</div>
      <!--End: Add Member to Group Component-->
      <!--Start: Delete Member in Group Component-->
      <div class="action mr_2 d_none">{{ $t("chat.friends.table.top.right.delete") }}</div>
      <!--End: Delete Member in Group Component-->
      <!--Start: Export Data Component-->
      <!-- <div class="action export disabled position_relative mr_2">
        {{ $t("chat.friends.table.top.right.exportData") }}
        <div class="action--tooltip">
          <app-tooltip/>
        </div>
      </div> -->
      <!--End: Export Data Component-->
      <!--Start: Filter Friend By Account Component-->
      <div class="action sequence--menu mr_2">
        <div class="btn--sequence" @click="showUsers = !showUsers" v-click-outside="closeShowUsers">
          {{ $t("chat.friends.table.top.right.all") }}
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
        <div class="dropdown text_left" v-show="showUsers">
          <div class="dropdown--item px_3" v-for="item in $t('chat.friends.table.top.right.dropdown')" :key="item">{{ item }}</div>
        </div>
      </div>
      <!--End: Filter Friend By Account Component-->
      <!-- Start: Options choose attr or group -->
      <div class="action sequence--menu mr_2">
        <div class="btn--sequence" @click="showAttribute">
          Attribute
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
        <div class="dropdown text_left" v-if="isShowOptionsAttribute === true" v-click-outside="closeShowAttribute">
          <div class="dropdown--item px_3" @click="closeShowAttribute">Attribute</div>
          <div class="dropdown--item px_3" @click="closeShowAttribute">Group</div>
        </div>
      </div>
      <!-- End: Options choose attr or group -->
      <!--Start: Number Displayed of Member Component-->
      <!--      <div class="action sequence&#45;&#45;menu">-->
      <!--        <div class="btn&#45;&#45;sequence" @click="statusNumberDisplayedDropdown = !statusNumberDisplayedDropdown"-->
      <!--             v-click-outside="closeNumberDisplayedDropdown">-->
      <!--          5-->
      <!--          <icon-base-->
      <!--            class="ml_1"-->
      <!--            icon-name="icon-arrow-down"-->
      <!--            width="14"-->
      <!--            height="14"-->
      <!--            viewBox="0 0 160 160"-->
      <!--          >-->
      <!--            <icon-arrow-down />-->
      <!--          </icon-base>-->
      <!--        </div>-->
      <!--        <div class="dropdown text_left" v-show="statusNumberDisplayedDropdown">-->
      <!--          <div class="dropdown&#45;&#45;item px_3">Tất cả</div>-->
      <!--          <div class="dropdown&#45;&#45;item px_3">05</div>-->
      <!--          <div class="dropdown&#45;&#45;item px_3">15</div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--End: Number Displayed of Member Component-->
    </div>
    <!--End: Top Right Component-->

    <!--*********** POPUP *************-->
     <transition name="popup">
      <delete-friends-popup
        v-if="isShowDeleteFrPopup === true"
        :data-theme="currentTheme"
        title="Xoá bạn bè khỏi nhóm"
        :isShowDeletePopup="isShowDeleteFrPopup"
        @closeAddPopup="isShowDeleteFrPopup = $event"
        :groupTarget="groupInfo"
        type="friends"
      ></delete-friends-popup>
      <addto-group-popup
        v-if="isShowAddtoGrPopup === true"
        :data-theme="currentTheme"
        :isShowDeleteFrPopup="isShowAddtoGrPopup"
        @closeAddPopup="isShowAddtoGrPopup = $event"
      ></addto-group-popup>
    </transition>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";

.top--right{
  justify-content: flex-end;
}
@media only screen and (max-width: 1199px) and (min-width: 768px){
  .top--left{
    position: relative;
    .segment--total{
      position: absolute;
      right: 0;
    }
    .segment--search{
      margin-left: 0!important;
    }
  }
  .top--right{
    justify-content: flex-start;
  }
}
</style>
