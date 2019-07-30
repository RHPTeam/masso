<template>
  <div class="user--wrapper px_2" :data-theme="currentTheme">
    <div class="user--content d_flex align_items_center justify_content_between"
         :class="[ mess.name === selectedUser ? 'user--active' : null ]"
    >
      <!-- Start: Avatar User -->
      <div class="left mr_2" :style="{backgroundImage: 'url( ' +  mess.avatar + '  )'}"></div>
      <!-- End: Avatar User -->
      <!-- Start: Infomation User -->
      <div class="main"
           :class="[ mess.status ? null : 'not--read' ]"
      >
        <div class="name">{{mess.name}}</div>
        <div class="text d_flex align_items_center">
          <div class="desc mr_2">{{mess.content}}</div>
          <div class="time">{{mess.time}}</div>
        </div>
      </div>
      <!-- End: Infomation User -->
      <!-- Start: Right -->
      <div class="right d_flex align_items_center justify_content_center position_relative"
           @click="showActionDropdown"
           v-click-outside="closeActionDropdown"
      >
        <!-- Start: Icon open option -->
        <div class="icon" :class="[ isShowAction ? 'active' : null ]">
          <icon-base
            class="icon--more"
            icon-name="menu"
            width="20"
            height="18"
            viewBox="0 0 720 720"
          >
            <icon-three-dots-horiz />
          </icon-base>
        </div>
        <!-- End: Icon open option -->
        <!-- Start: Status check mess readed -->
        <div class="position_absolute"
          v-if="mess.status === false && isShowAction === false" role="dot"
        ></div>
        <!-- End: Status check mess readed -->
        <!-- Start: Delete Messenger-->
        <div class="action--dropdown position_absolute"
             v-if="isShowAction"
        >
          <div class="item" @click="isShowAction = false">Xoá cuộc trò chuyện</div>
          <div class="item" @click="isShowAction = false">Tùy chỉnh</div>
        </div>
        <!-- End: Delete Messenger-->
      </div>
      <!-- End: Right -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mess: Object,
    currentTheme: String
  },
  data() {
    return {
      isShowAction: false,
      selectedUser: "Ngọc Hân"
    }
  },
  methods: {
    closeActionDropdown() {
      this.isShowAction = false;
    },
    showActionDropdown() {
      this.isShowAction = true;
    }
  },
}
</script>

<style lang="scss" scoped>
.user--wrapper {
  cursor: pointer;
  .user--content {
    padding: .5rem;
    border-radius: .625rem;
    &.user--active {
     background-color: #F5F5F5;
    }
    &:hover, &:focus, &:active, &:visited {
      .right {
        .icon {
          opacity: 1;
        }
        div[role="dot"] {
          opacity: 0;
        }
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
      &.not--read {
        .name {
          font-weight: bold;
        }
        .text {
          .desc {
            color: #444;
            font-weight: bold;
          }
        }
      }
      width: calc(100% - 60px - 30px);
      .name{
        color: #444;
        font-size: .925rem;
      }
      .text {
        .desc {
          color: #999;
          max-width: 88%;
          font-size: .8rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .time {
          color: #999;
          font-size: .75rem;
        }
      }
    }
    .right {
      width: 24px;
      .icon {
        height: 100%;
        opacity: 0;
        svg {
          margin-top: 15px;
          transition: all .4s ease;
        }
        &.active {
          opacity: 1;
        }
        .icon--more {
          vertical-align: text-bottom;
        }
      }
      div[role="dot"] {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #85CFFF;
        transition: all .4s ease;
      }
      .action--dropdown  {
        background: #ffffff;
        border: 1px solid #e4e4e4;
        border-radius: .625rem;
        box-shadow: 0 0 8px rgba(0, 0, 0, .15);
        font-size: .875rem;
        padding: .375rem 0;
        right: 0;
        top: 24px;
        transition: all .4s ease;
        width: 200px;
        z-index: 999;
        .item {
          padding: .375rem .75rem;
          transition: background-color .4s ease;
          &:hover {
            background-color: #F7F7F7;
          }
        }
      }
    }
  }
}
.user--wrapper[data-theme="dark"] {
  background-color: #2f3136;
  color: #fff;
  .user--content {
    &.user--active {
      background-color: #27292d;
    }
    .main {
      &.not--read {
        .name {
          color: #fff;
          font-weight: bold;
        }
        .text {
          .desc {
            color: #fff;
          }
          .time {
            color: #fff;
          }
        }
      }
      .name{
        color: #999;
        font-size: .925rem;
        /*font-weight: bold;*/
      }
      .text {
        .desc {
          color: #999;
        }
        .time {
          color: #999;
        }
      }
    }
    .right {
      div[role="dot"] {
        background-color: #ffb94a;
      }
      .action--dropdown {
        background-color: #27292d;
        border-color: #27292d;
        .item {
          &:hover {
            background-color: #2F3136;
          }
        }
      }
    }
  }
}
</style>
