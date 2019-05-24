<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title">Thêm vào nhóm</div>
        </div>
        <div class="modal--body mt_3">
          <div v-if="postGroups.length === 0"
          >Không có nhóm được tạo.</div>
          <VuePerfectScrollbar v-else class="scroll" id="groupListScroll">
            <div class="group--list px_2">
              <div class="group--list-item d_flex align_items_center"
                   v-for="( item, index ) in postGroups"
                   :key="index"
              >
                <div class="custom--checkbox mr_3">
                  <input type="checkbox"
                         v-model="selectedGroups"
                         :value="item._id"
                  />
                </div>
                <div class="text">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </VuePerfectScrollbar>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--skip"
                  @click="closePopup()"
          >HỦY</button>-
          <button class="btn--submit"
                  @click="addToGroup()"
          >XONG</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.script"></script>

<style lang="scss" scoped>
@import "../style";
@import "index.style"
</style>
