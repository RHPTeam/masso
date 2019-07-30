<template>
  <div class="top d_flex r m_0" :data-theme="currentTheme">
    <!--Start: Top Left Component-->
    <div class="top--left d_flex c_md_12 mb_3 c_xl_5 c_lg_12 px_0">
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
    <div class="top--right d_flex c_md_12 c_xl_7 c_lg_12 px_0">
      <!--Start: Update Friend Facebook-->
      <div
        class="action mr_2"
        v-if="groupSelected === false"
        @click="updateFriendFacebookToSystem"
      >
        Cập nhật
      </div>
      <!--End: Update Friend Facebook-->

      <!--Start: Add Member to Group Component-->
      <div
        class="action mr_2"
        v-if="selectedUIDs && selectedUIDs.length > 0"
        @click="isShowAddtoGrPopup = true"
      >
        {{ $t("chat.friends.table.top.right.addInGroup") }}
      </div>
      <!--End: Add Member to Group Component-->
      <!--Start: Delete Member in Group Component-->
      <div
        class="action mr_2"
        v-if="friendSelected && friendSelected.length > 0"
        @click="openPopupDeleteFriend"
      >
        {{ $t("chat.friends.table.top.right.delete") }}
      </div>
      <!--End: Delete Member in Group Component-->

      <!--Start: Filter Friend By Account Component-->
      <div class="action sequence--menu mr_2">
        <div
          class="btn--sequence"
          @click="showUsers = !showUsers"
          v-click-outside="closeShowUsers"
        >
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
          <div
            class="dropdown--item d_flex align_items_center px_3"
            @click="showFilterFriendByAtribute"
          >
            <div class="icon--filter d_flex align_items_center justify_content_center">
              <icon-base
                icon-name="Lọc thuộc tính"
                width="18"
                height="18"
                viewBox="0 0 410 410"
              >
                <icon-filter/>
              </icon-base>
            </div>
            <div class="ml_3">Thuộc tính</div>
          </div>
          <div
            class="dropdown--item mt_1 d_flex align_items_center px_3"
            v-for="(account, aindex) in accountFb"
            :key="aindex"
          >
            <div class="avatar mr_3" :style="{backgroundImage: 'url(' + account.userInfo.thumbSrc +')'}"></div>
            <div>{{account.userInfo.name}}</div>
          </div>
        </div>
      </div>
      <!--End: Filter Friend By Account Component-->

      <!--Start: Number Displayed of Member Component-->
      <div class="action sequence--menu">
        <div class="btn--sequence" @click="statusNumberDisplayedDropdown = !statusNumberDisplayedDropdown"
             v-click-outside="closeNumberDisplayedDropdown">
          Hiển thị
          <icon-base
            class="ml_1"
            icon-name="icon-arrow-down"
            width="14"
            height="14"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
        </div>
        <div class="dropdown text_left" v-show="statusNumberDisplayedDropdown">
          <div
            class="dropdown--item px_3"
            v-for="(item, sindex) in currentSize"
            :key="sindex"
            @click="changeCurrentSize(item)"
          >
            {{item.size}}
          </div>
        </div>
      </div>
      <!--End: Number Displayed of Member Component-->
    </div>
    <!--End: Top Right Component-->

    <!--*********** POPUP *************-->
     <transition name="popup">
      <delete-friends-popup
        v-if="isShowDeleteFrPopup === true"
        :data-theme="currentTheme"
        @closePopup="isShowDeleteFrPopup = $event"
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
