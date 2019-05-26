<template>
  <div class="main--header d_flex align_items_center">
    <div class="d_flex name--campaign">
      <h1 class="title">Chiến dịch theo bộ hẹn</h1>
      <div class="action--l d_flex align_items_center">
        <div class="action--item copy d_none">
          <icon-base
            class="icon disable"
            icon-name="icon-copy"
            width="26"
            height="26"
            viewBox="0 0 482.8 482.8"
          >
            <icon-copy/>
          </icon-base>
        </div>
        <div class="action--item live">
          <icon-base icon-name="icon-copy" width="14" height="16" viewBox="0 0 13.955 16">
            <icon-copy/>
          </icon-base>
          <span class="ml_2">Start</span>
        </div>
      </div>
    </div>
    <div class="action--r ml_auto" @click="isDeleteItemBlock = true">
      <icon-base class="icon" icon-name="remove" width="26" height="26" viewBox="0 0 15 15">
        <icon-remove/>
      </icon-base>
    </div>
    <!-- Start: Delete Item Popup-->
    <transition name="popup">
      <delete-campaign-popup
        v-if="isDeleteItemBlock === true"
        :data-theme="currentTheme"
        title="Delete Property"
        @closePopup="isDeleteItemBlock = $event"
        storeActionName="deleteProperty"
        typeName="Property"
      ></delete-campaign-popup>
    </transition>
    <!-- End: Delete Item Popup -->
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";

@media only screen and (max-width: 1045px) and (min-width: 768px){
    .name--campaign{
        flex-direction: column;
    }
}
</style>
