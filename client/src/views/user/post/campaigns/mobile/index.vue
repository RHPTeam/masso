<template>
  <div class="modal--main-mobile" :data-theme="currentTheme">
    <!-- Start: Search -->
    <div class="items--header mx_2 d_flex align_items_center position_relative mb_3">
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
        <input v-model="search" class="search--input" placeholder="Tìm kiếm" type="text" />
      </div>
    </div>
    <!-- End: Search -->
    <!-- Start: Main -->
    <div class="items--body d_flex justify_content_start align_items_center mx_2">
      <div
        class="item text_center"
        @click="showTabCampaign"
        :class="isShowTabCampaign === true ? 'active' : '' "
      >Danh sách</div>
      <div
        class="item text_center"
        @click="showTabCampaginDefault"
        :class="isShowTabCampaginDefault === true ? 'active' : '' "
      >Chiến dịch mẫu</div>
      <!-- <router-link
         class="item text_center"
        tag="button"
        :to="{ name: 'post_campaigns', query: { size: 25, page: 1 } }"
        active-class="active"
      >Danh sách</router-link>
      <router-link
         class="item text_center"
        tag="button"
        :to="{ name: 'campaigns_default' }"
        active-class="active"
      >Chiến dịch mẫu</router-link>-->
    </div>
    <!-- End: Main -->
    <!-- Start: list campaign -->
    <div class="list--data pl_2 mt_2">
      <VuePerfectScrollbar class="scroll-campaign" ref="scroll">
        <div class="campaign pr_2" v-if="isShowTabCampaign === true">
          <div
            class="no--campaign text_center"
            v-if="campaigns.length === 0"
          >Không có chiến dịch nào</div>
          <item-campaign
            :item="item"
            v-for="item in campaigns"
            :key="item._id"
            @showDetailPost="showPopupDetailCampaign($event)"
            @showPopupDelete="showPopupDelete($event)"
          />
        </div>
        <div class="campaign--default pr_2" v-if="isShowTabCampaginDefault === true">
          <div
            class="no--campaign text_center"
            v-if="campaignsDefault.length === 0"
          >Không có chiến dịch nào</div>
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
      <!-- <popup-search
        v-if="isShowPopupSearch === true"
        :campaigns="campaigns"
        :campaignsDefault="campaignsDefault"
        @closePopupSearch="isShowPopupSearch = $event"
        @searchKeyword="search = $event"
      />-->
      <popup-search
        v-if="isShowPopupSearch === true"
        :campaigns="campaigns"
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
      <popup-delete
        :selectedCampaign="selectedCampaign"
        @closePopup="isShowPopupDelete = $event"
        @confirmDelete="confirmDeleteCampaign($event)"
        v-if="isShowPopupDelete === true"
      />
      <popup-copy
        :selectedCampaign="selectedCampaign"
        @closePopup="isShowPopupCopy = $event"
        @confirmCopy="confirmCopyCampaign($event)"
        v-if="isShowPopupCopy === true"
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
