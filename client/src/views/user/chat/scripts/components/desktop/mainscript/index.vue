<!--Template Main Scripts Desktop-->
<template>
  <div class="scripts">
    <!--Component Loading-->
    <loading-component
      v-if="this.$store.getters.statusBlocks === 'loading'"
    />
    <!--Regions Scripts Header-->
    <div v-else>
      <div class="script--header d_flex align_items_center">
        <contenteditable
          class="script--header-title"
          tag="div"
          :contenteditable="true"
          :placeholder="$t('chat.scripts.content.name.placeholder')"
          v-model="block.name"
          @keyup="upTypingText('nameblock', block)"
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
        <!-- <div
          class="script--header-delete ml_auto"
          @click="isDeleteBlock = true;"
        > -->
        <div
          class="script--header-delete ml_auto"
          @click="onDeleteBlock()"
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
      <div class="script--body">
        <div v-for="(item, index) in block.contents" :key="index">
          <!--Start: Add text-->
          <div v-if="item.typeContent === 'text'">
            <add-text :item="item" :block="block"></add-text>
          </div>
          <!--End: Add text-->
          <!--Start: add images-->
          <div v-if="item.typeContent === 'image'">
            <add-image :item="item" :block="block"></add-image>
          </div>
          <!-- End: add images-->
          <!--Start: add timer-->
          <div v-if="item.typeContent === 'time'">
            <add-timer :item="item" :block="block"></add-timer>
          </div>
          <!--End: add timer-->
          <!--Start: Add Tag-->
          <div v-if="item.typeContent === 'tag'">
            <add-tag :item="item" :content="block"></add-tag>
          </div>
          <!--End: Add Tag-->
          <!--Start: Subscribe-->
          <div v-if="item.typeContent === 'subscribe'">
            <subcrible :item="item" :block="block"></subcrible>
          </div>
          <!--End: Subscribe-->
          <!--Start: Unsubcrible-->
          <div v-if="item.typeContent === 'unsubscribe'">
            <un-subcrible :item="item" :block="block"></un-subcrible>
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
              @click="createItemBlock('text', selectedBlock)"
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
              @click="createItemBlock('image', selectedBlock)"
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
              @click="createItemBlock('time', selectedBlock)"
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
        v-if="showPopupPlugins === true"
        :content="selectedBlock._id"
        :data-theme="currentTheme"
        :popupData="showPopupPlugins"
        @closePopupPlugin="showPopupPlugins = $event"
        @showAddAttribute="showAddAttribute = $event"
        @showSubcrible="showSubcrible = $event"
        @showUnSubcrible="showUnSubcrible = $event"
        @closePopupPluginClick="showPopupPlugins = $event"
      >
      </popup-plugins>
    </transition>
   <!-- Start: Delete Item Popup-->
    <transition name="popup">
      <delete-popup
        v-if="isDeleteBlock === true"
        :data-theme="currentTheme"
        title="Delete Scripts"
        @closePopup="isDeleteBlock = $event"
        @isDeletedTarget="$emit('isDeletedBlock', $event)"
        :storeActionName="storeAction"
        :targetData="selectedData"
        typeName="Scripts"
      ></delete-popup>
    </transition>
    <!-- End: Delete Item Popup -->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
