<!--Template Main Scripts Desktop-->
<template>
  <div class="scripts">
    <!--Component Loading-->
    <loading-component
    />
    <!--Regions Scripts Header-->
    <div>
      <div class="script--header d_flex align_items_center">
        <contenteditable
          class="script--header-title"
          tag="div"
          :contenteditable="true"
          :placeholder="$t('chat.scripts.content.name.placeholder')"
          v-model="inforBlockGroup.name"
          @keyup="upTypingText('nameblock', inforBlockGroup)"
          @keydown="clear"
        />
        <div class="script--header-copy-link disabled--icon">
          <!-- <icon-base
            class="disable"
            icon-name="copy"
            width="26"
            height="26"
            viewBox="0 0 482.8 482.8"
          >
            <icon-copy />
          </icon-base>
          <icon-base
            class="disable"
            icon-name="link"
            width="26"
            height="26"
            viewBox="0 0 482.8 482.8"
          >
            <icon-link />
          </icon-base> -->
        </div>
        <div
          class="script--header-delete ml_auto"
          @click="isDeleteItemBlock = true"
        >
          <icon-base
            icon-name="remove"
            width="26"
            height="26"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </div>
        <div class="script--header-dropdown d_none ml_auto position_relative">
          <div
            class="icon--dropdown"
          >
            <icon-base
              icon-name="remove"
              width="26"
              height="26"
              viewBox="0 0 15 15"
            >
              <icon-remove />
            </icon-base>
            <ul
              class="header--dropdown-wrap d_none position_absolute text_left p_0 m_0"
            >
              <li class="disabled--icon">
                <icon-base
                  class="icon--base"
                  width="16"
                  height="16"
                  viewBox="0 0 482.8 482.8"
                >
                  <icon-copy />
                </icon-base>
                <span class="ml_2">Sao chép</span>
              </li>
              <li class="disabled--icon">
                <icon-base
                  class="icon--base"
                  width="16"
                  height="16"
                  viewBox="0 0 482.8 482.8"
                >
                  <icon-link />
                </icon-base>
                <span class="ml_2">Sao chép link</span>
              </li>
              <li>
                <icon-base
                  icon-name="remove"
                  width="16"
                  height="16"
                  viewBox="0 0 15 15"
                >
                  <icon-remove />
                </icon-base>
                <span class="ml_2">Xóa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Start: Regions Scripts Body-->
      <div class="script--body d_none">
        <div>
          <!--Start: Add text-->
          <div>
            <add-text />
          </div>
          <!--End: Add text-->
          <!--Start: add images-->
          <div>
            <add-image />
          </div>
          <!-- End: add images-->
          <!--Start: add timer-->
          <add-timer />
          <!--Start: add timer-->
          <!--Start: Add Tag-->
          <div>
            <add-tag />
          </div>
          <!--End: Add Tag-->
          <!--Start: Subscribe-->
          <div>
            <subcrible
            />
          </div>
          <!--End: Subscribe-->
          <!--Start: Unsubcrible-->
          <div>
            <un-subcrible />
          </div>
          <!--End: Unsubcrible-->
        </div>
      </div>
      <!--Regions Script Footer-->
      <div class="script--footer">
        <div class="script--footer-addelm">
          <div class="title">{{ $t("chat.common.card.add.title") }}</div>
          <div class="gr-addelm d_flex align_items_center">
            <div
              class="addelm-item d_flex align_items_center justify_content_center flex_column"
            >
              <icon-base
                class="icon-text"
                width="20"
                height="20"
                viewBox="0 0 13.53 20.11"
              >
                <icon-text /> </icon-base
              >{{ $t('chat.common.card.add.text') }}
            </div>

            <div
              class="addelm-item d_flex align_items_center justify_content_center flex_column"
            >
              <icon-base
                class="icon-image"
                width="20"
                height="20"
                viewBox="0 0 26 26"
              >
                <icon-image /> </icon-base
              >{{ $t('chat.common.card.add.images') }}
            </div>

            <div
              class="addelm-item d_flex align_items_center justify_content_center flex_column"
            >
              <icon-base
                class="icon-sand-clock"
                width="20"
                height="20"
                viewBox="0 0 14.41 20.14"
              >
                <icon-sand-clock /> </icon-base
              >{{ $t('chat.common.card.add.time') }}
            </div>

            <div
              class="addelm-item d_flex align_items_center justify_content_center flex_column"
              @click="showPopupPlugins = true"
            >
              <icon-base
                class="icon--add"
                icon-name="plus"
                width="20"
                height="20"
                viewBox="0 0 60 60"
              >
                <icon-plus /> </icon-base
              >{{ $t('chat.common.card.add.add') }}
            </div>
          </div>
        </div>
        <div class="script--footer-syntax d_none">
          <div class="title">Cú pháp</div>
          <div class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <textarea
            name
            id
            cols="100"
            rows="6"
            placeholder="Nhập các cụm từ tại đây"
          ></textarea>
        </div>
      </div>
    </div>
    <!--Popup filter Attribute-->
    <transition name="popup">
      <popup-plugins
        v-if="showPopupPlugins == true"
        :data-theme="currentTheme"
        :popupData="showPopupPlugins"
        @closePopupPlugin="showPopupPlugins = $event"
        @showAddAttribute="showAddAttribute = $event"
        @showSubcrible="showSubcrible = $event"
        @showUnSubcrible="showUnSubcrible = $event"
        @closePopupPluginClick="showPopupPlugins = $event"
      />
    </transition>
   <!-- Start: Delete Item Popup-->
    <transition name="popup">
      <delete-campaign-popup
        v-if="isDeleteItemBlock === true"
        :data-theme="currentTheme"
        title="Delete Scripts"
        @closePopup="isDeleteItemBlock = $event"
        storeActionName="deleteScripts"
        typeName="Scripts"
      ></delete-campaign-popup>
    </transition>
    <!-- End: Delete Item Popup -->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
