<template>
  <div class="group" :data-theme="currentTheme">
    <div
      class="btn--all mr_3 mb_2"
      :class="[isActive === false ? 'btn--all-active' : '']"
      @click="seeAllUsers"
    >
      Xem tất cả
    </div>

    <div class="group--item mr_2 mb_2">
      <contenteditable
        class="editable"
        tag="div"
        placeholder="Nhập tên..."
        :contenteditable="true"
        v-model='groupFriend[0]'/>
      <div class="btn--delete" @click="showDeletePopup()">
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
    <div class="group--item mr_2 mb_2">
      <contenteditable
        class="editable"
        tag="div"
        placeholder="Nhập tên..."
        :contenteditable="true"
        v-model='groupFriend[1]'/>
      <div class="btn--delete" @click="showDeletePopup()">
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
    <div class="group--item mr_2 mb_2">
      <contenteditable
        class="editable"
        tag="div"
        placeholder="Nhập tên..."
        :contenteditable="true"
        v-model='groupFriend[2]'/>
      <div class="btn--delete" @click="showDeletePopup()">
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

    <div class="group--item btn--add mb_2" @click="createGroup">
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
      <delete-group-popup
        v-if="isShowDeletePopup === true"
        :data-theme="currentTheme"
        title="Xoá nhóm"
        :isShowDeletePopup="isShowDeletePopup"
        @closeAddPopup="isShowDeletePopup = $event"
        groupTarget="Khách Hàng Tiềm Năng"
      />
    </transition>
  </div>
  <!-- End Segments List -->
</template>


<script src="./index.script"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
