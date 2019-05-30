<template>
  <div class="option p_3">
    <div class="title">Tùy chọn</div>
    <div class="option--item d_flex justify_content_start align_items_center">
      <div class="option--item-name">Tìm kiếm tin nhắn</div>
      <div class="option--item-icon ml_auto">
        <icon-base
          class="icon--search"
          icon-name="input-search"
          width="20"
          height="20"
          viewBox="0 0 16.772 17.287"
        >
          <icon-input-search />
        </icon-base>
      </div>
    </div>
    <div class="option--item d_flex justify_content_start align_items_center"
    >
      <div class="option--item-name">Thay đổi màu</div>
      <div class="option--item-icon ml_auto">
        <div class="icon--color"
              :style="{ borderColor: '#ffb94a' }"
        >
        </div>
      </div>
    </div>
    <div class="option--item d_flex justify_content_start align_items_center"
         @click="notificationStatus = !notificationStatus"
    >
      <div class="option--item-name">Thông báo</div>
      <div class="option--item-icon ml_auto">
        <icon-base
          v-if="!notificationStatus"
          class="icon--bell"
          icon-name="bell"
          width="20"
          height="20"
          viewBox="0 0 500 500"
        >
          <icon-bell-off />
        </icon-base>
        <icon-base
          v-if="notificationStatus"
          class="icon--bell"
          icon-name="bell"
          width="20"
          height="20"
          viewBox="0 0 500 500"
        >
          <icon-bell />
        </icon-base>
      </div>
    </div>
    <div class="option--item d_flex justify_content_start align_items_center"
    >
      <div class="option--item-name">Xóa cuộc trò chuyện</div>
      <div class="option--item-icon ml_auto">
        <icon-base
          class="icon--remove"
          icon-name="remove"
          width="21"
          height="21"
          viewBox="0 0 16.772 17.287"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>
    <!--*********** POPUP *************-->
<!--    <transition name="popup">-->
<!--      <delete-conversation-popup-->
<!--        v-if="isShowDeletePopup === true"-->
<!--        :data-theme="currentTheme"-->
<!--        :isShowDeletePopup="isShowDeletePopup"-->
<!--        @closeAddPopup="isShowDeletePopup = $event"-->
<!--      />-->
<!--    </transition>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      notificationStatus: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .option {
    border-bottom: 1px solid #e4e4e4;
    .title {
      color: #999;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      margin-top: -5px;
      text-transform: uppercase;
    }
    .option--item {
      cursor: pointer;
      font-size: 14px;
      margin-top: 20px;
      .option--item-icon {
        margin-right: 10px;
        height: 20px;
        svg {
          color: #ffb94a;
          stroke: #FFB94A;
        }
        .icon--bell {
          stroke-width: 12;
        }
        .icon--color {
          border: 5px solid;
          border-radius: 50%;
          height: 20px;
          width: 20px;
        }
        .icon--search {
          stroke-width: .3;
        }
        .icon--remove {
          margin-right: -2px;
          stroke-width: .2;
        }
      }
      .option--item-name {
        font-size: 14px;
      }
    }
  }
  /* ChangeColor */
  // Light
  .option[data-theme="light"] {
    border-color: #e4e4e4;
    .option--desc {
      color: #999;
    }
    .option--item-name {
      color: #444;
    }
  }

  //Dark
  .option[data-theme="dark"] {
    border-color: #444;
    .option--desc {
      color: #ccc;
    }
    .option--item-name {
      color: #f7f7f7;
    }
  }
</style>
