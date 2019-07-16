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
      >Chiến dịch mẫu</router-link> -->
    </div>
    <!-- End: Main -->
    <!-- Start: list campaign -->
    <div class="list--data pl_2 mt_2">
      <VuePerfectScrollbar class="scroll-campaign" ref="scroll">
        <div class="campaign pr_2" v-if="isShowTabCampaign === true">
          <div
            class="item d_flex align_items_center"
            v-for="( campaign, index ) in campaigns"
            :key="`cp-${index}`"
            @click="selectCampaign(campaign)"
          >
            <div class="content d_flex align_items_center" @click="showPopupDetailCampaign">
              <div class="left">
                <p class="mb_0 name">{{ campaign.title }}</p>
                <p class="mb_0 date">{{ formatDate(campaign.started_at) }}</p>
              </div>
              <div class="right ml_auto">
                <span :class="[ campaign.status ? 'active' : 'deactive' ]"></span>
              </div>
            </div>
            <div class="action d_flex align_items_center ml_auto">
              <p class="mb_0 mr_1" @click="showPopupCopy">Copy</p>
              <p class="mb_0" @click="showPopupDelete(campaign)">Xoa</p>
            </div>
          </div>
        </div>
        <div class="campaign--default pr_2" v-if="isShowTabCampaginDefault === true">
          <div
            class="item d_flex align_items_center"
            v-for="( campaign, index ) in campaignsDefault"
            :key="`cp-${index}`"
            @click="selectCampaign(campaign)"
          >
            <div class="left">
              <p class="mb_0 name">{{ campaign.title }}</p>
            </div>
            <div class="right ml_auto">
              <span :class="[ campaign.status ? 'active' : 'deactive' ]"></span>
            </div>
            <div class="action d_flex align_items_center">
              <p class="mb_0 mr_1" @click="showPopupCopy">Copy</p>
            </div>
          </div>
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
      /> -->
      <popup-search
        v-if="isShowPopupSearch === true"
        :campaigns="campaigns"
        :campaignsDefault="campaignsDefault"
        @closePopupSearch="onClosePopupSearch($event)"
        @searchKeyword="search = $event"
      />
      <popup-detail-campaign
        v-if="isShowPopupDetailCampaign === true"
        @closePopup="isShowPopupDetailCampaign = $event"
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
</style>
