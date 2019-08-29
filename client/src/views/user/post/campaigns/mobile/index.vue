<template>
  <div class="modal--main-mobile" :data-theme="currentTheme">
    <!-- Start: Search -->
    <div class="items--header mx_3 d_flex align_items_center position_relative mb_3">
      <div class="mr_auto search" @click="showPopupSearch">
        <span class="ml_2">
          <icon-base
            class="ic--search"
            icon-name="Tìm kiếm"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <icon-input-search />
          </icon-base>
        </span>
        <input class="search--input" placeholder="Tìm kiếm" type="text" />
      </div>
    </div>
    <!-- End: Search -->
    <!-- Start: Main -->
    <div class="items--body d_flex justify_content_start align_items_center mx_3">
      <div
        class="item text_center"
        @click="showTabCampaign"
        :class="isShowTabCampaign === true ? 'active' : '' "
      >Chiến dịch</div>
      <div
        class="item text_center"
        @click="showTabCampaginDefault"
        :class="isShowTabCampaginDefault === true ? 'active' : '' "
      >Chiến dịch mẫu</div>
    </div>
    <!-- End: Main -->
    <!-- Start: list campaign -->
    <div class="list--data pl_3 mt_2">
      <VuePerfectScrollbar class="scroll-campaign">
        <div class="campaign pr_3" v-if="isShowTabCampaign === true">
          <div
            class="no--campaign text_center"
            v-if="campaigns.length === 0"
          >Không có chiến dịch nào!</div>
          <div v-else>
            <item-campaign
              :item="item"
              v-for="item in campaigns"
              :key="item._id"
              @showDetailPost="showPopupDetailCampaign($event)"
              @showPopupDelete="showPopupDelete($event)"
              @showPopupDuplicateCampaign="showPopupDuplicateCampaign($event)"
            />
            <div class="text_center" v-if="campaignsPagesSize === currentPage"></div>
            <div class="text_center py_3 load--more" @click="loadMore" v-else>Hiển thị thêm...</div>
          </div>
        </div>
        <div class="campaign--default pr_3" v-if="isShowTabCampaginDefault === true">
          <div
            class="no--campaign text_center"
            v-if="campaignsDefault.length === 0"
          >Không có chiến dịch mẫu nào!</div>
          <item-campaign-default
            :item="item"
            v-for="item in campaignsDefault"
            :key="item._id"
            @showPopupCopy="showPopupCopy($event)"
          />
        </div>
      </VuePerfectScrollbar>
    </div>
    <!-- End: list campaign -->
    <!-- Start: Transition Popup -->
    <transition name="popup--mobile">
      <popup-search
        v-if="isShowPopupSearch === true"
        :campaignsDefault="campaignsDefault"
        @closePopupSearch="onClosePopupSearch($event)"
      />
      <popup-detail-campaign
        v-if="isShowPopupDetailCampaign === true"
        @closePopup="isShowPopupDetailCampaign = $event"
        :campaign="selectedCampaign"
      />
    </transition>
    <!-- End: Transition Popup -->
    <!-- Start: Popup delete -->
    <transition name="popup--delete">
      <popup-duplicate-campaign
        @closePopup="isShowPopupDuplicateCampaign = $event"
        v-if="isShowPopupDuplicateCampaign === true"
        :campaign="selectedCampaign"
      />
      <popup-delete
        :selectedCampaign="selectedCampaign"
        @closePopup="isShowPopupDelete = $event"
        @confirmDelete="confirmDeleteCampaign($event)"
        v-if="isShowPopupDelete === true"
        title="chiến dịch"
      />
      <popup-copy
        :selectedCampaign="selectedCampaign"
        @closePopup="isShowPopupCopy = $event"
        @confirmCopy="confirmCopyCampaign($event)"
        v-if="isShowPopupCopy === true"
        @showCampaign="showCampaign"
      />
      <!-- <popup-duplicate-campaign/> -->
    </transition>
    <!-- End: Popup delete -->
  </div>
</template>

<script src="./index.script.js">
</script>

<style scoped lang="scss">
@import "./index.style";
.item {
  position: relative;
  width: 100%;
}

.item--body {
  border-bottom: 1px solid #484848;
  width: 100%;
  &-post {
    z-index: 2;
    position: absolute;
    background: #2c2d32;
  }
  &-action {
    z-index: 1;
    position: absolute;
    background: #212225;
  }
}

.swipe {
  &-left {
    transform: translateX(-7rem);
    transition: 0.5s all;
  }
  &-right {
    transform: translateX(0);
    transition: 0.5s all;
  }
}
</style>
