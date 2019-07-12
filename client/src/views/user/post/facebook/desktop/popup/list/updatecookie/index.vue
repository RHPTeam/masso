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
              <span>Dán mã kích hoạt Facebook vào ô bên dưới để cập nhật tài khoản.</span>
              <!--<span>Dán mã kích hoạt Facebook vào ô bên dưới để cập nhật tài khoản. Xem hướng dẫn chi tiết </span>
              <a
                class="link--here"
                target="_blank"
                href="http://localhost:8080/#/help"
              >tại đây</a>
              <span>.</span>-->
            </div>
            <div class="modal--error mb_3">
              <span class="text_danger"
                    v-if="cookie.length > 0 && isStatusCookieFacebookFormat === 1"
              >Mã kích hoạt không đúng định dạng!</span>
              <span class="text_danger"
                    v-if="cookie.length > 0 && isStatusCookieFacebookFormat === 2"
              >Mã kích hoạt không phải của tài khoản này!</span>
            </div>
            <textarea
              placeholder="Nhập mã kích hoạt"
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
            <button class="btn-add" @click="updateCookie" v-if="cookie.length > 0 && isStatusCookieFacebookFormat === 3">
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
  props: [ "item" ],
  data() {
    return {
      updateFbStatus: "",
      cookie: "",
      isShowAlert: false,
      isStatusCookieFacebookFormat: 0
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
  watch: {
    cookie( newValue ) {
      const c_user = StringFunction.findSubString( newValue, "c_user=", ";" );
      if ( newValue.length > 0 && newValue.includes("sb=") &&
        newValue.includes("datr=") && newValue.includes("c_user=")
      ) {
        if ( c_user === this.item.userInfo.id ) {
          this.isStatusCookieFacebookFormat = 3; // valid cookie
        } else {
          this.isStatusCookieFacebookFormat = 2; // not match c_user
        }
      } else {
        this.isStatusCookieFacebookFormat = 1; // invalid cookie
      }
    }
  },
  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    async updateCookie() {
      this.updateFbStatus = "loading";
      const newUserId = StringFunction.findSubString(
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
        this.updateFbStatus = "success";
      } else {
        this.isShowAlert = true;
        this.updateFbStatus = "success";
        this.$emit("closeAddPopup", false);
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
.link--here {
  color: #eee;
}
</style>
