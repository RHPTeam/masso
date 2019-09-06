<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header d_flex align_items_center">
          <div @click="closePopup">
            <icon-base
              icon-name="arrow-down"
              class="arrow-down"
              width="20"
              height="20"
              viewBox="0 0 130 130"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
          <p class="name--modal mb_0 m_auto">Thêm vào nhóm</p>
          <div class="active mr_3" @click="addToGroup">Xong</div>
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
                <div class="text">
                  {{ item.title }}
                </div>
                <div class="custom--checkbox ml_auto mr_3">
                  <input type="checkbox"
                         v-model="selectedGroups"
                         :value="item._id"
                  />
                </div>
              </div>
            </div>
          </VuePerfectScrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.script"></script>

<style lang="scss" scoped>
@import "index.style";
</style>
