<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <!-- Start: Delete Popup -->
      <div class="modal--content text_center" v-if="deleteStatus !== 'loading'">
        <div class="item mb_2 delete">
          <div class="text mb_2 pb_2">Bạn có muốn xóa tài khoản này không?</div>
          <div @click="deleteTargets()">Xóa</div>
        </div>
        <div class="item mb_2 cancel" @click="closePopup">Hủy</div>
      </div>
      <div class="modal--body" v-else>
        <div class="modal--title text_center py_2">Xóa tài khoản Facebook</div>
        <div class="loading--block mt_4 mb_4">
          <div class="mx_auto">
            <div class="loading--bar position_relative mx_auto">
              <div class="percent position_absolute"></div>
            </div>
          </div>
          <div class="desc text_center mt_2">Vui lòng chờ, tài khoản đang được xóa...</div>
        </div>
      </div>
      <!-- End: Delete Popup -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      deleteStatus: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    async deleteTargets() {
      this.deleteStatus = "loading";
      await this.$store.dispatch("deleteAccountFacebook", this.item._id);

      // remove localStorage
      await localStorage.removeItem("rid");

      // update fb pages & groups on state
      await this.$store.dispatch("getFacebookGroups");
      await this.$store.dispatch("getFacebookPages");

      this.deleteStatus = "success";

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
  z-index: 10;
  .modal--dialog {
    position: absolute;
    bottom: 0;
    width: 90vw;
    left: 5vw;
    font-size: 1rem;
    color: #cccccc;
    .modal--content {
      width: 90vw;
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
    .modal--body {
      width: 100vw;
      height: 100vh;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 10;
      background: #212225;
      .modal--title {
        font-size: 0.8315rem;
        border-bottom: 1px solid #444;
      }
      .loading--block {
        .desc {
          color: #ccc;
          font-size: 0.875rem;
        }
        .loading--bar {
          background-color: transparent;
          border: 1px solid #444;
          border-radius: 8px;
          height: 16px;
          overflow: hidden;
          width: 290px;
          .percent {
            background-color: rgb(88, 206, 65);
            background-size: 16px 16px;
            height: 100%;
            width: 40%;
            animation: animate 1.4s linear infinite;
          }
          @keyframes animate {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(200%);
            }
          }
        }
      }
    }
  }
}
</style>


