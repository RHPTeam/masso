<template>
  <div class="wrapper">
    <div class="alert alert_warning text_left">
      {{ $t("chat.facebook.notification") }}
    </div>
    <div class="list r">
      <div class="addItem c_md_6 c_lg_4 c_xl_3">
        <div class="card" @click="showPopup" :class="disabledClass()">
          <div class="card_body d_flex align_items_center justify_content_center">
            <div class="item--content text_center">
              <icon-base
                class="icon--add"
                icon-name="plus"
                width="60"
                height="60"
                viewBox="0 0 60 60"
              >
                <icon-plus/>
              </icon-base>

              <p>{{ $t("chat.facebook.connect") }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Start account -->
      <div v-for="(item, index) in accountsFB" :key="index" class="item c_md_6 c_lg_4 c_xl_3">
        <item-account :item="item"/>
      </div>
      <!-- End account -->
      <div
        v-if="this.$store.getters.facebookStatus === 'loading'"
        class="item c_md_6 c_lg_4 c_xl_3"
      >
        <div class="card">
          <div class="card_body d_flex align_items_center justify_content_center">
            <loading-component/>
          </div>
        </div>
      </div>
    </div>
    <!-- ************ POPUP ************ -->
    <transition name="popup">
      <upgrade-pro-popup
        v-if="showUpgradePro === true"
        :data-theme="currentTheme"
        :showUpgradePro="showUpgradePro"
        @closeAddPopup="showUpgradePro = $event"
      />
      <add-cookie
        v-if="showModal === true"
        :popupData="showModal"
        @closeAddPopup="showModal = $event"
        :nameBread="nameBread"
        :subBread="subBread"
      />
      <existed-account-popup
        v-if="this.$store.getters.addAccountError === 'errors.js'"
        :data-theme="currentTheme"
      />
    </transition>
  </div>
</template>

<script>
import ExistedAccountPopup from "../popup/existed_account";
import UpgradeProPopup from "@/components/shared/upgradepro";
import ItemAccount from "./item";
import DeleteCampaignPopup from "@/components/popups/delete";

export default {
  components: {
    ExistedAccountPopup,
    UpgradeProPopup,
    ItemAccount,
    DeleteCampaignPopup
  },
  props: [ "accountsFB" ],
  data() {
    return {
      isDeleteItemBlock: false,
      showModal: false,
      showUpgradePro: false,
      nameBread: "Thêm tài khoản Facebook",
      subBread: "Dán mã kích hoạt Facebook vào ô bên dưới để thêm tài khoản."
    };
  },

  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    user() {
      return this.$store.getters.userInfo;
    }
  },

  methods: {
    showPopup() {
      if (this.accountsFB.length >= this.user.maxAccountFb) {
        this.showUpgradePro = true;
      } else {
        this.showModal = true;
      }
    },
    disabledClass() {
      if (this.accountsFB.length >= this.user.maxAccountFb) {
        return {
          disabled: true
        };
      } else {
        return {
          disabled: false
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
