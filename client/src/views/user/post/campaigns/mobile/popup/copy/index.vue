<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <!-- Start: Delete Popup -->
      <div class="modal--content text_center">
        <div class="item mb_2 delete">
          <div class="text mb_2 pb_2">
            Bạn có muốn sao chép
            <b>{{selectedCampaign.title}}</b> này không?
          </div>
          <div class="item--selection">
            <div class="user" v-for="( account, index ) in allAccountFB" :key="index">
              <div class="user--holder">
                <div
                  class="user--thumbnail"
                  :style="{ backgroundImage: 'url(' + account.userInfo.thumbSrc + ')' }"
                ></div>
              </div>

              <div class="user--name">{{account.userInfo.name }}</div>
              <div class="user--checkbox">
                <label class="custom--checkbox">
                  <input class type="checkbox" />
                </label>
              </div>
            </div>
          </div>
          <div class="item--confirm" @click="confirmCopy()">Sao chép</div>
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
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allAccountFB() {
      console.log("😀😀😁", this.$store.getters.accountsFB);
      return this.$store.getters.accountsFB;
    }
  },
  async created() {
    if (this.allAccountFB.length === 0) {
      await this.$store.dispatch("getAccountsFB");
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    confirmCopy() {
      console.log("😀", this.selectedCampaign);
      this.$emit("confirmCopy", true);
      this.closePopup();
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
    color: #333;
    .modal--content {
      width: 90%;
      .delete {
        border: 1px solid #ccc;
        background: #fff;
        border-radius: 0.625rem;
        padding: 0.625rem 0;
        .text {
          border-bottom: 1px solid #ccc;
        }
      }
      .cancel {
        border: 1px solid #ccc;
        background: #fff;
        border-radius: 0.625rem;
        padding: 0.625rem 0;
      }
    }
  }
}
.item {
  &--selection {
    border-bottom: 1px solid #ccc;
  }

  &--confirm {
    padding-top: 0.625rem;
  }
}
.user {
  display: flex;
  margin: 0 2rem;
  > * {
    margin: 0.75rem 0 0.75rem 0.75rem;
  }
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
    border: solid 1.5px #27292d;
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


