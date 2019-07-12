<template>
  <div class="group" :data-theme="currentTheme">
    <!-- <div
      class="btn--all mr_3 mb_2"
      :class="[groupSelected === false ? 'btn--all-active' : '']"
      @click="seeAllUsers"
    >
      Xem tất cả
    </div>-->
    <VuePerfectScrollbar class="all--group">
      <div class="group--block d_flex align_items_center">
        <div class="group--item btn--add mb_2 mr_2" @click="isShowCreateGroup = true">
          <icon-base
            class="icon--add"
            icon-name="Tạo nhóm mới"
            width="14"
            height="14"
            viewBox="0 0 60 60"
          >
            <icon-plus/>
          </icon-base>
        </div>

        <div
          class="group--item mr_2 mb_2"
          :class="[currentIndex === index ? 'active' : '']"
          v-for="(postGroup, index) in postGroups"
          :key="index"
        >
          <div @click="showPostGroup( postGroup._id, index )">
            <div class="editable">{{ postGroup.title }}</div>
          </div>
        </div>
      </div>
    </VuePerfectScrollbar>
    <!--*********** POPUP *************-->
    <transition name="popup--mobile">
      <create-group-popup
        v-if="isShowCreateGroup === true"
        :data-theme="currentTheme"
        @closePopup="isShowCreateGroup = $event"
      ></create-group-popup>
    </transition>
  </div>
  <!-- End Segments List -->
</template>


<script src="./index.script"></script>

<style scoped lang="scss">
@import "index.style";
</style>
