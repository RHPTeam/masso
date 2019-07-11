<template>
  <div class="main--facebook" :data-theme="currentTheme">
    <div
      class="wrapper--top d_flex align_items_center justify_content_between p_3 mb_2 position_relative"
    >
      <!-- Start: Top account-->
      <div class="account">
        <div class="item d_flex align_items_center" @click="showPopupActiveAccount">
          <div class="avatar mr_2">
            <!-- <img :src="accountsFB.userInfo.thumbSrc" alt /> -->
          </div>
          <div class="user--info">
            <div class="name mb_1">{{ accountsFB.userInfo.name }}</div>
            <div class="created mb_1">Được thêm lúc {{ formatDate(accountsFB.updated_at) }}</div>
            <div
              class="status d_inline"
              :class="accountsFB.status ? 'active' : null"
            >{{ accountsFB.status ? "Đang hoạt động" : "Ngừng hoạt động" }}</div>
          </div>
          <div class="more position_absolute">
            <icon-base
              class="icon--more"
              icon-name="Xóa tài khoản"
              width="25"
              height="20"
              viewBox="0 0 580 580"
            >
              <icon-three-dots-horiz />
            </icon-base>
          </div>
        </div>
      </div>
      <!-- End: Top account -->
    </div>

    <!-- TRANSITION POPUP -->
    <transition name="popup--more">
      <div class="action--dropdown text_center" v-if="isShowAction === true">
        <div class="content">
          <div class="action--dropdown-item update mb_2" @click="showPopupUpdateCookie">Cập nhật</div>
          <div
            class="action--dropdown-item delete mb_2"
            @click="showPopupDeleteAccount"
          >Xóa tài khoản</div>
          <div class="action--dropdown-item cancel mb_2" @click="closePopupActiveAccount">Hủy</div>
        </div>
      </div>
    </transition>
    <transition name="popup--more">
      <delete-account-popup
        @closePopup="isShowPopupDeleteAccount = $event"
        v-if="isShowPopupDeleteAccount === true"
      />
    </transition>
    <!-- Update Popup -->
    <transition name="popup">
      <update-account-by-cookie
        v-if="isShowPopupUpdateCookie === true"
        @closePopupUpdateCookie="isShowPopupUpdateCookie = $event"
      />
    </transition>
    <!-- Start: Transition Popup Alert Exist Account -->
    <transition name="popup-alert">
      <!-- <popup-alert-account-exist/> -->
      <!-- <upgrade-pro-popup :data-theme="currentTheme" /> -->
    </transition>
    <!-- End: Transition Popup Alert Exist Account -->
  </div>
</template>

<script>
import DeleteAccountPopup from "./popup/delete";
import UpdateAccountByCookie from "./popup/updatecookie";
import PopupAlertAccountExist from "./popup/alert";
import UpgradeProPopup from "@/components/shared/layouts/upgradepro";
export default {
  components: {
    DeleteAccountPopup,
    UpdateAccountByCookie,
    PopupAlertAccountExist,
    UpgradeProPopup
  },
  data() {
    return {
      accountSelected: {},
      isShowAction: false,
      isShowPopupDeleteAccount: false,
      isShowPopupUpdateCookie: false
    };
  },
  computed: {
    accountsFB() {
      return this.$store.getters.accountsFB;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    fbAccountInfo() {
      return this.$store.getters.userInfo;
    }
  },
  async created() {
    await this.$store.dispatch( "getAccountsFB" );
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
    closePopupActiveAccount() {
      this.isShowAction = false;
    },
    showPopupActiveAccount() {
      this.isShowAction = true;
    },
    showPopupUpdateCookie() {
      this.isShowPopupUpdateCookie = true;
      this.isShowAction = false;
    },
    showPopupDeleteAccount() {
      this.isShowPopupDeleteAccount = true;
      this.isShowAction = false;
    }
  }
};
</script>

<style lang="scss" scoped>
// Start: Transition
.popup--more-enter {
  transform: translateY(100%);
}

.popup--more-enter-to {
  transition: transform 0.3s;
  transform: translateY(0);
}

.popup--more-leave-to {
  transition: transform 0.3s;
  transform: translateY(100%);
}

.popup-enter {
  transform: translateX(100%);
}

.popup-enter-to {
  transition: transform 0.75s;
  transform: translateX(0);
}

.popup-leave-to {
  transition: transform 0.75s;
  transform: translateX(100%);
}

.popup-alert-enter-active,
.popup-alert-leave-active {
  transition: opacity 0.5s;
}
.popup-alert-enter,
.popup-alert-leave-to {
  opacity: 0;
}
// End: Transition
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
  }
  .action--dropdown {
    height: 100vh;
    width: 100vw;
    background: #404040b0;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    .content {
      position: absolute;
      bottom: 0;
      width: 90vw;
      left: 5vw;
      font-size: 1rem;
    }
    &-item {
      color: #333;
      background: #fff;
      padding: 0.375rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 0.625rem;
    }
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