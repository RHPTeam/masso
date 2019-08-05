<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <!-- Start: Delete Popup -->
      <div class="modal--content text_center">
        <div class="item mb_2 no--account" v-if="allAccountFB.length === 0">Vui lòng thêm tài khoản để thực hiện chức năng này!</div>
        <div class="item mb_2 delete" v-else>
          <div class="text pb_2 px_2">
            Sao chép chiến dịch mẫu <b>{{selectedCampaign.title}}</b>
          </div>
          <div class="item--selection p_2">
            <div class="title text_left">Chọn tài khoản sử dụng chiến dịch</div>
            <div class="user py_2 d_flex align_items_center" v-for="( account, index ) in allAccountFB" :key="index">
              <div class="user--holder mr_2">
                <div
                  class="user--thumbnail"
                  :style="{ backgroundImage: 'url(' + account.userInfo.thumbSrc + ')' }"
                ></div>
              </div>

              <div class="user--name">{{account.userInfo.name }}</div>
              <div class="user--checkbox">
                <label class="custom--checkbox">
                  <input class type="checkbox"
                      :value="account._id"
                      @click="chooseAccount(account._id)" />
                </label>
              </div>
            </div>
          </div>
          <div class="item--confirm" @click="duplicateCampaignSimple()">Sao chép</div>
        </div>
        <div class="item mb_2 cancel" @click="closePopup">Hủy</div>
      </div>
      <!-- End: Delete Popup -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedCampaign"],
  data() {
    return {
      setup: {
        accountId: "",
        timeStart: new Date()
      }
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allAccountFB() {
      return this.$store.getters.accountsFB;
    }
  },
  async created() {
    if (this.$store.getters.accountsFB.length === 0) {
      await this.$store.dispatch("getAccountsFB");
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    chooseAccount(val){
      this.setup.accountId = val;
    },
    duplicateCampaignSimple() {
      const dataSender = {
        campaignId: this.selectedCampaign._id,
        facebookId: this.setup.accountId
      };
      this.$store.dispatch("duplicateCampaignSimple", dataSender);
      const dataSenderCampaign = {
        size: 25,
        page: 1
      };
      this.$store.dispatch( "getCampaignsByPage", dataSenderCampaign );
      this.closePopup();
      this.$emit("showCampaign", true);
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "index.style";
.modal--wrapper {
  height: 100vh;
  width: 100vw;
  // background: #404040b0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 20;
  .modal--dialog {
    position: absolute;
    bottom: 0;
    width: 100vw;
    left: 0;
    font-size: 1rem;
    color: #cccccc;
    .modal--content {
      width: 90%;
      .no--account {
        background: #212225;
        border-radius: 0.625rem;
        padding: 0.625rem 0;
      }
      .delete {
        font-size: 0.8315rem;
        background: #212225;
        border-radius: 0.625rem;
        padding: 0.625rem 0;
        .text {
          border-bottom: 1px solid #42424296;
        }
      }
      .cancel {
        font-size: 0.8315rem;
        background: #212225;
        border-radius: 0.625rem;
        padding: 0.625rem 0;
      }
    }
  }
}
.item {
  &--selection {
    border-bottom: 1px solid #42424296;
  }

  &--confirm {
    padding-top: 0.625rem;
  }
}
.user {
  &--thumbnail {
    background-image: url("https://graph.facebook.com/100007741743381/picture?type=large");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 100%;
    height: 42px;
    width: 42px;
  }
  &--name {
    width: 20rem;
    display: flex;
    align-items: center;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &--checkbox {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
}

.custom--checkbox {
  margin-bottom: 0;
  input[type="checkbox"] {
    border-radius: 50%;
    border: solid 1.5px #8a8a8a;
    cursor: pointer;
    height: 20px;
    outline: none;
    width: 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:checked {
      background-color: #ffb94a;
      border: solid 1px #ffb94a;
      &:before {
        border-bottom: 2px solid #fff;
        border-right: 2px solid #fff;
        content: "";
        display: block;
        height: 10px;
        position: relative;
        left: 50%;
        top: 42%;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 7px;
      }
    }
  }
}
</style>


