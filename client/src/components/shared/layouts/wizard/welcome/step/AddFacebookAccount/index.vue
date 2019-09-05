<template>
  <div class="wrapper">
    <h5>
      Vui lòng thêm cookies facebook trước khi để sử dụng, xem hướng dẫn tại
      <a href="https://www.google.com.vn/" target="_blank">đây</a> .
    </h5>
    <div class="list r">
      <!-- Start: Add Account Item -->
      <div v-if="isShowAddAccount" class="addItem c_md_6 c_lg_4 c_xl_3 c_sm_6">
        <div class="card" @click="showPopup">
          <div class="card_body d_flex align_items_center justify_content_center">
            <div class="item--content">
              <icon-base
                class="icon--add"
                icon-name="Thêm facebook"
                width="60"
                height="60"
                viewBox="0 0 60 60"
              >
                <icon-plus />
              </icon-base>

              <p>Kết nối với Facebook</p>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Add Account Item -->
      <!-- Start: Account Items Loop -->
      <template v-if="this.accountsFB.length > 0">
        <div
          class="item c_md_6 c_lg_4 c_xl_3 c_sm_6"
          v-for="(item, index) in accountsFB"
          :key="index"
        >
          <div class="card" v-if="facebookStatus === 'loading'">
            <div class="card_body text_center d_flex align_items_center justify_content_center">
              <loading-component />
            </div>
          </div>
          <item-account v-else :item="item" />
        </div>
      </template>
      <!-- End: Account Items Loop -->
    </div>
    <transition name="popup">
      <existed-account-popup
        v-if="this.$store.getters.addAccountError === 'error'"
        :data-theme="currentTheme"
      />
    </transition>
    <transition name="popup">
      <add-account-popup v-if="showModal === true" @closeAddPopup="showModal = $event"></add-account-popup>
    </transition>
    <transition name="popup">
      <update-cookie
        :item="accountSelected"
        v-if="isShowUpdatePopup === true"
        @closeAddPopup="isShowUpdatePopup = $event"
      ></update-cookie>
    </transition>
  </div>
</template>
<script>
import AddAccountPopup from "@/views/user/post/facebook/desktop/popup/list/addaccount";
import ExistedAccountPopup from "@/views/user/post/facebook/desktop/popup/list/alert";
import UpdateCookie from "@/views/user/post/facebook/desktop/popup/list//updatecookie";

import ItemAccount from "./item/index";

export default {
  components: {
    AddAccountPopup,
    ExistedAccountPopup,
    UpdateCookie,
    ItemAccount
  },
  data() {
    return {
      accountSelected: {},
      isShowUpdatePopup: false,
      isShowAddAccount: true,
      showModal: false
    };
  },
  computed: {
    accountsFB() {
      return this.$store.getters.accountsFB;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    user() {
      return this.$store.getters.userInfo;
    },
    facebookStatus() {
      return this.$store.getters.facebookStatus;
    }
  },
  async created() {
    await this.$store.dispatch("getAccountsFB");
  },
  watch: {
    accountsFB() {
      if (this.accountsFB.length === 1) {
        this.isShowAddAccount = false;
        this.$emit("can-continue", { value: true });
      } else {
        this.isShowAddAccount = true;
        this.$emit("can-continue", { value: false });
      }
    }
  },
  methods: {
    showPopup() {
      this.showModal = true;
    }
  }
};
</script>

.<style lang="scss" scoped>
@import "./index.style";
.wrapper {
  height: 27rem;
  padding: 0.5rem;
}
</style>
