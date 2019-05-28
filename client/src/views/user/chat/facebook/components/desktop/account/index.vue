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
      <div class="addItem c_md_6 c_lg_4 c_xl_3 users">
        <div class="card">
          <div class="card_body d_flex align_items_center justify_content_center position_relative">
            <div class="item--content text_center">
              <div class="position_absolute icon--delete" @click="isDeleteItemBlock = true">
                <icon-base
                  class="icon--delete"
                  icon-name="delete"
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                >
                  <icon-remove/>
                </icon-base>
              </div>
              <div class="mb_2 img--users position_relative">
                <img src="@/assets/images/broadcast_null.png" alt="" height="70" width="70">
                <div class="position_absolute status--user"></div>
              </div>
              <div class="name--user mb_2">I need Food</div>
              <div class="status--active-true">{{ $t("chat.facebook.active") }}</div>
              <div class="status--active-false" @click="showModal = true">{{ $t("chat.facebook.update") }}</div>
            </div>
            <div class="card--header">
              <!-- Start: Delete Item Popup-->
              <transition name="popup">
                <delete-campaign-popup
                    v-if="isDeleteItemBlock === true"
                    :data-theme="currentTheme"
                    title="Delete User"
                    @closePopup="isDeleteItemBlock = $event"
                    storeActionName="deleteUser"
                    typeName="User"
                ></delete-campaign-popup>
              </transition>
              <!-- End: Delete Item Popup -->
            </div>
          </div>
        </div>
      </div>
      <!-- End account -->
      <div v-for="(item, index) in accountsFB" :key="index" class="item c_md_6 c_lg_4 c_xl_3">
        <item-account :item="item"/>
      </div>
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
    <transition name="popup">
      <upgrade-pro-popup
        v-if="showUpgradePro == true"
        :data-theme="currentTheme"
        :showUpgradePro="showUpgradePro"
        @closeAddPopup="showUpgradePro = $event"
      />

      <add-cookie
        v-if="showModal == true"
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
  props: ["accountsFB"],

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
  },
  components: {
    ExistedAccountPopup,
    UpgradeProPopup,
    ItemAccount,
    DeleteCampaignPopup
  }
};
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
