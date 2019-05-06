<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title">Thêm vào nhóm</div>
        </div>
        <div class="modal--body mt_3">
          <div class="group--create mb_2">
            <div class="btn--create py_2"
                @click="showCreateGroup"
                >
              <icon-base
                class="icon--add mr_2"
                icon-name="plus"
                width="14"
                height="14"
                viewBox="0 0 60 60"
              >
                <icon-plus /> </icon-base
              >Tạo nhóm mới
            </div>
            <div class="group--create-input d_flex align_items_center"
                  v-if="isShowCreateGroup">
              <input
                type="text"
                placeholder="Nhập tên nhóm và ấn enter"
                 ref="newGroup"
                 @keyup.enter="createGroup">
              <div class="btn--confirm" @click="createGroup">
                <icon-base
                  class="icon--check"
                  icon-name="check"
                  width="16"
                  height="16"
                  viewBox="0 20 500 400"
                >
                  <icon-check />
                </icon-base>
              </div>
              <div class="btn--cancel" @click="cancelCreateGroup">
                <icon-base
                  class="icon--cancel"
                  icon-name="cancel"
                  width="14"
                  height="14"
                  viewBox="0 0 18 18"
                >
                  <icon-cancel /> </icon-base
                >
              </div>
            </div>
          </div>
          
          <VuePerfectScrollbar class="scroll" id="groupListScroll">
            <div class="group--list px_2">
              <div
                class="group--list-item d_flex align_items_center">
                <div class="checkbox mr_3">
                  <span class="checkbox--control">
                    <input
                      type="checkbox"
                      class="checkbox--control-input"/>
                    <span class="checkbox--control-checkmark"></span>
                  </span>
                </div>
                <div class="text">
                  Mỹ phẩm và làm đẹp
                </div>
              </div>
              <div
                class="group--list-item d_flex align_items_center">
                <div class="checkbox mr_3">
                  <span class="checkbox--control">
                    <input
                      type="checkbox"
                      class="checkbox--control-input"/>
                    <span class="checkbox--control-checkmark"></span>
                  </span>
                </div>
                <div class="text">
                  Tương tác lớn
                </div>
              </div>
            </div>
          </VuePerfectScrollbar>
          
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--skip" @click="closeAddPopup">HỦY</button>-
          <button class="btn--submit">XONG</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.script"></script>

<style lang="scss" scoped>
@import "../style";
@import "./index.style"
</style>
