<template>
  <div class="main--facebook" :data-theme="currentTheme">
    <div
      class="wrapper--top d_flex align_items_center justify_content_between p_3 mb_2 position_relative"
    >
      <!-- Start: Top account-->
      <div class="account d_flex align_items_center">
        <div class="avatar mr_2">
          <img :src="fbAccountInfo.imageAvatar" alt>
        </div>
        <div class="user--info">
          <div class="name mb_1">{{ fbAccountInfo.name }}</div>
          <div class="created mb_1">Được thêm lúc {{ formatDate(fbAccountInfo.updated_at) }}</div>
          <div
            class="status d_inline"
            :class="fbAccountInfo.status ? 'active' : null"
          >{{ fbAccountInfo.status ? "Đang hoạt động" : "Ngừng hoạt động" }}</div>
        </div>
      </div>
      <div class="more position_absolute" @click="isShowAction = true">
        <icon-base
          class="icon--more"
          icon-name="Xóa tài khoản"
          width="25"
          height="20"
          viewBox="0 0 580 580"
        >
          <icon-three-dots-horiz/>
        </icon-base>
      </div>
      <div
        class="action--dropdown position_absolute"
        v-if="isShowAction === true"
        v-click-outside="closeAction"
      >
        <div class="action--dropdown-item">Cập nhật</div>
        <div class="action--dropdown-item" @click="showPopupDeleteAccount(fbAccountInfo)">Xóa tài khoản</div>
      </div>
      <!-- End: Top account -->
    </div>
    <div class="add--account">
      <div class="title mb_1">Thêm tài khoản</div>
      <div class="desc">Bạn có thể thêm tối đa 2 tài khoản facebook trên tài khoản này.</div>
    </div>

    <!-- TRANSITION POPUP -->
    <transition name="popup--mobile">
      <delete-account-popup
        v-if="isShowPopupDeleteAccount === true"
        title="Xoá tài khoản Facebook"
        @closePopup="isShowPopupDeleteAccount = $event"
        storeActionName="deleteAccount"
        :targetData="accountSelected"
        typeName="tài khoản"
      ></delete-account-popup>
    </transition>
  </div>
</template>

<script>
import DeleteAccountPopup from "./popup/delete"
export default {
  components: {
    DeleteAccountPopup
  },
  data() {
    return {
      accountSelected: {},
      isShowAction: false,
      isShowPopupDeleteAccount: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    fbAccountInfo() {
      return this.$store.getters.userInfo;
    }
  },
  async created() {
    const info = this.$store.getters.userInfo;
    if (Object.entries(info).length === 0 && info.constructor === Object) {
      const fbAccountId = this.$route.params.fbAccountId;
      await this.$store.dispatch("getFBAccountById", fbAccountId);
    }
  },
  methods: {
    formatDate(date) {
      const dateTime = new Date(date),
        hour = String(dateTime.getHours()).padStart(2, 0),
        min = String(dateTime.getMinutes()).padStart(2, 0),
        day = String(dateTime.getDate()).padStart(2, 0),
        month = String(dateTime.getMonth() + 1).padStart(2, 0),
        year = dateTime.getFullYear();

      return `${hour}:${min} ngày ${day}/${month}/${year}`;
    },
    closeAction() {
      this.isShowAction = false;
    },
    showPopupDeleteAccount(value) {
      this.isShowPopupDeleteAccount = true;
      this.accountSelected = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.main--facebook {
  .wrapper--top {
    background-color: #fff;
    border-radius: 0.625rem;
    font-size: 0.875rem;
    .account {
      .avatar {
        img {
          border-radius: 100%;
          height: 48px;
          width: 48px;
        }
      }
      .name {
        font-size: 1rem;
        font-weight: 700;
      }
      .created {
        color: #999;
        font-size: 0.8125rem;
      }
      .status {
        // border: 1px solid #f96666;
        // border-radius: 0.5rem;
        // padding: 0.25rem 0.5rem;
        color: #f96666;
        &.active {
          border-color: #43d627;
          color: #43d627;
        }
      }
    }
    .more {
      top: 1rem;
      right: 1rem;
    }
    .action--dropdown {
      top: 1.5rem;
      right: 1rem;
      background-color: #27292c;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      padding: 0.375rem 0;
      text-align: left;
      min-width: 136px;
      z-index: 99;
      &-item {
        padding: 0.375rem 0.75rem;
        &:hover,
        &:active,
        &:visited,
        &:focus {
          background-color: #2f3136;
          color: #fff;
        }
      }
    }
  }
  .add--account {
    .title {
      font-weight: bold;
    }
    .desc {
      font-size: 0.8125rem;
    }
  }
  .popup--mobile-enter {
    transform: translateY(100%);
  }

  .popup--mobile-enter-to {
    transition: transform 0.75s;
    transform: translateY(0);
  }

  .popup--mobile-leave-to {
    transition: transform 0.75s;
    transform: translateY(100%);
  }
}

// ============= CHANGE THEME
.main--facebook[data-theme="dark"] {
  .wrapper--top {
    background: #272a2c;
    color: #ccc;
  }
}
</style>