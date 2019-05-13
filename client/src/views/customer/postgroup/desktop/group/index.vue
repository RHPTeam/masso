<template>
  <div class="group" :data-theme="currentTheme">
    <div
      class="btn--all mr_3 mb_2"
      :class="[groupSelected === false ? 'btn--all-active' : '']"
      @click="seeAllUsers"
    >
      Xem tất cả
    </div>

    <div class="group--item mr_2 mb_2"
         :class="[currentIndex === index ? 'active' : '']"
         v-for="(postGroup, index) in postGroups"
         :key="index"
    >
      <div @click="showPostGroup( postGroup._id, index )">
        <contenteditable
          class="editable"
          tag="div"
          placeholder="Nhập tên..."
          :contenteditable="true"
          :noNL="true"
          v-model='postGroup.title'
          @keyup="upTypingText( postGroup )"
          @keydown="clearTypingTimer"
        />
      </div>
      <div class="btn--delete" @click="showDeletePopup(postGroup)">
        <icon-base
          class="icon--add mr_1"
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 26 26"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>

    <div class="group--item btn--add mb_2" @click="isShowCreateGroup = true">
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

    <!--*********** POPUP *************-->
    <transition name="popup">
      <create-group-popup
        v-if="isShowCreateGroup === true"
        :data-theme="currentTheme"
        @closePopup="isShowCreateGroup = $event"
      ></create-group-popup>
      <delete-group-popup
        v-if="isShowDeletePopup === true"
        :data-theme="currentTheme"
        title="Xoá nhóm"
        @closePopup="isShowDeletePopup = $event"
        storeActionName="deletePostGroup"
        :targetId="groupDelete._id"
        :targetName="groupDelete.title"
        typeName="nhóm"
      ></delete-group-popup>
    </transition>
  </div>
  <!-- End Segments List -->
</template>


<script src="./index.script"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
