<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <icon-base
            icon-name="modal-cookie"
            width="440.4"
            height="156.808"
            viewBox="0 0 440.4 156.808"
          >
            <icon-modal-cookie />
          </icon-base>
        </div>
        <!-- Start: Updating Data -->
        <div class="modal--body px_3 py_4"
             v-if="updateFbStatus === 'loading'"
        >
          <div class="modal--title text_center">Cập nhật tài khoản</div>
          <div class="loading--block mt_4 mb_4">
            <div class="mx_auto">
              <div class="loading--bar position_relative mx_auto">
                <div class="percent position_absolute"></div>
              </div>
            </div>
            <div class="desc text_center mt_2">Vui lòng chờ, dữ liệu đang được cập nhật...</div>
          </div>
        </div>
        <!-- End: Updating Data -->
        <!-- Start: Form -->
        <div v-else>
          <div class="modal--body">
            <div class="modal--title text_center">Cập nhật tài khoản</div>
            <div class="modal--desc">
              Dán mã kích hoạt Facebook vào ô bên dưới để cập nhật tài khoản.
            </div>
            <textarea
              placeholder="Nhập mã kích hoạt tại đây ..."
              v-model="cookie"
              @keydown.enter.exact.prevent
              @keyup.enter.exact="updateCookie"
              @keydown.enter.shift.exact="newline"
            ></textarea>
          </div>
          <div
            class="modal--footer d_flex justify_content_between align_items_center"
          >
            <button class="btn-skip" @click="closeAddPopup">HỦY</button>
            <button class="btn-add" @click="updateCookie">
              XONG
            </button>
          </div>
        </div>
        <!-- Start: Form -->
      </div>
    </div>
  </div>
</template>

<script>
import StringFunction from "@/utils/functions/string";
export default {
  props: ["item", "subBread", "nameBread"],
  data() {
    return {
      updateFbStatus: "",
      cookie: "",
      isShowAlert: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    facebookStatus() {
      return this.$store.getters.facebookStatus;
    }
  },
  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    async updateCookie() {
      const newUserId = StringFuntion.findSubString(
        this.cookie,
        "c_user=",
        ";"
      );
      const userId = this.item.userInfo.id;
      if (newUserId === userId) {
        await this.$store.dispatch("updateFacebook", {
          fbId: this.item._id,
          cookie: this.cookie
        });
        await this.$emit("closeAddPopup", false);
        this.$router.go({name: "post_fbaccount"});
      } else {
        this.isShowAlert = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../list/index.style";
.loading--block {
  .desc {
    color: #ccc;
    font-size: .875rem;
  }
  .loading--bar {
    background-color: transparent;
    border: 1px solid #444;
    border-radius: 8px;
    height: 16px;
    overflow: hidden;
    width: 320px;
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
</style>
