<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <!-- Start: Delete Popup -->
      <div class="modal--content text_center">
        <div class="item mb_2 delete">
          <div class="text mb_2 pb_2">Bạn có muốn xóa tài khoản này không?</div>
          <div>Xóa</div>
        </div>
        <div class="item mb_2 cancel" @click="closePopup">Hủy</div>
      </div>
      <!-- End: Delete Popup -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: ""
    },
    multiple: {
      type: Boolean,
      default: false
    },
    storeActionName: {
      type: String,
      default: ""
    },
    targetData: {
      type: Object
    },
    targetName: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    typeName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      deleteConfirm: false,
      deleteText: "",
      deleteStatus: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    deleteText() {
      this.deleteConfirm = this.deleteText === "DELETE";
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    async deleteTargets() {
      this.deleteStatus = "loading";

      await this.$store.dispatch("deleteAccountFacebook", this.targetData._id);

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
    background: #404040b0;
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
    color: #333;
    .modal--content {
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
</style>


