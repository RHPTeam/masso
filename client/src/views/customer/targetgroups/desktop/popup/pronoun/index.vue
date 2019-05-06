<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title">Danh xưng</div>
          <div class="desc mt_2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <div class="modal--body mt_3">
          <input type="text"
                  class="modal--body-input"
                  placeholder="Nhập danh xưng"
                  @click.stop="showSuggestion"
                  v-model="pronounInput"/>
          <div class="suggestion--list"
                v-if="isShowSuggestion && filterSuggestionList.length > 0"
          >
            <VuePerfectScrollbar class="scroll">
              <div
                class="suggestion--list-item"
                v-for="(item, index) in filterSuggestionList"
                :key="index"
                @click="selectPronoun(item)"
              >
                {{ item }}
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
          <button class="btn-submit">
            LƯU
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "../popup";
@import "./index.style"
</style>
