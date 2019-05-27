<template>
  <div class="user d_flex align_items_center justify_content_between mb_2 px_3">
    <!-- Start: Avatar User -->
    <div class="left mr_2" :style="{backgroundImage: 'url( ' +  mess.avatar + '  )'}"></div>
    <!-- End: Avatar User -->

    <!-- Start: Infomation User -->
    <div class="main">
      <h3 class="m_0">{{mess.name}}</h3>
      <div class="text d_flex align_items_center">
        <div class="desc mr_2">{{mess.content}}</div>
        <div class="time">{{mess.time}}</div>
      </div>
    </div>
    <!-- End: Infomation User -->
    <div class="right d_flex align_items_center justify_content_center position_relative">
      <!-- Start: Icon open option -->
      <div class="icon" v-if="mess.status === false" @click="isShowAction = true">
        <icon-base
          icon-name="menu"
          width="24"
          height="24"
          viewBox="0 0 868 868"
        >
          <icon-three-dots-horiz />
        </icon-base>
      </div>
      <!-- End: Icon open option -->

      <!-- Start: Status check mess readed -->
      <div v-if="mess.status === true" role="dot"></div>
      <!-- End: Status check mess readed -->

      <!-- Start: Delete Messenger-->
      <div class="action position_absolute" v-if="isShowAction === true" v-click-outside="close">
        <div class="item">
          Xoá cuộc trò chuyện
        </div>
        <div class="item">Tùy chỉnh</div>
      </div>
      <!-- End: Delete Messenger-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mess: Object
  },
  data() {
    return {
      isShowAction: false
    }
  },
  methods: {
    close() {
      this.isShowAction = false;
    }
  },
}
</script>

<style lang="scss" scoped>
.user {
  cursor: pointer;
  &:hover, &:focus, &:active, &:visited {
    > .right .icon {
      opacity: 1;
    }
  }
  .left {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ffba3c;
  }
  .main {
    width: calc(100% - 60px - 30px);
    h3{
      color: #000000;
      font-size: 16px;
    }
    .text {
      .desc {
        color: #666666;
        max-width: 88%;
        font-size: 13px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .time {
        font-size: 12px;
      }
    }
  }
  .right {
    width: 30px;
    .icon {
      opacity: 0;
      svg {
        margin-top: 15px;
      }
    }
    div[role="dot"] {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #00c853;
    }
    .action {
      background: #ffffff;
      border: 1px solid #e4e4e4;
      border-radius: .625rem;
      font-size: 14px;
      top: 0;
      right: 100%;
      width: 200px;
      z-index: 999;
      .item {
        padding: .5rem 1rem;
      }
    }
  }
}
</style>
