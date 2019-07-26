<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <VuePerfectScrollbar class="scroll-area" ref="scroll">
        <div class="modal--content">
          <div class="modal--header d_flex align_items_center">
            <!-- <icon-base
            icon-name="modal-cookie"
            width="100%"
            height="156.808"
            viewBox="0 0 440.4 156.808"
          >
            <icon-modal-cookie />
            </icon-base>-->
            <div @click="closeAddPopup" v-if="addFbStatus !== 'loading'">
              <icon-base
                icon-name="arrow-down"
                class="arrow-down"
                width="20"
                height="20"
                viewBox="0 0 130 130"
              >
                <icon-arrow-down />
              </icon-base>
            </div>
            <p class="name--modal mb_0">Thêm tài khoản</p>
            <div
              @click="addCookie"
              v-if="cookie.length > 0 && isStatusCookieFacebookFormat === true && !addFbStatus"
              class="active mr_3"
            >Xong</div>
          </div>
          <div class="modal--body px_3 py_4" v-if="addFbStatus === 'loading'">
            <div class="modal--title">Thêm tài khoản Facebook</div>
            <div class="loading--block mt_4 mb_4">
              <div class="mx_auto">
                <div class="loading--bar position_relative mx_auto">
                  <div class="percent position_absolute"></div>
                </div>
              </div>
              <div class="desc text_center mt_2">Vui lòng chờ, dữ liệu đang được cập nhật...</div>
            </div>
          </div>
          <div v-else class="modal--body">
            <div class="modal--title">Thêm tài khoản Facebook</div>
            <div class="modal--desc">Dán mã kích hoạt Facebook vào ô bên dưới để thêm tài khoản.</div>
            <div class="modal--error mb_3">
              <span
                class="text_danger"
                v-if="cookie.length > 0 && isStatusCookieFacebookFormat === false"
              >Mã kích hoạt facebook không đúng định dạng!</span>
            </div>
            <textarea
              placeholder="Nhập mã kích hoạt tại đây ..."
              v-model="cookie"
              @keydown.enter.exact.prevent
              @keyup.enter.exact="addCookie"
              @keydown.enter.shift.exact="newline"
            ></textarea>
          </div>
        </div>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import ExistedAccountPopup from "@/views/user/post/facebook/mobile/popup/alert/index";
export default {
  components: {
    VuePerfectScrollbar,
    ExistedAccountPopup
  },
  data() {
    return {
      addFbStatus: "",
      cookie: "",
      isStatusCookieFacebookFormat: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    cookie(newValue) {
      this.isStatusCookieFacebookFormat = !!(
        newValue.length > 0 &&
        newValue.includes("sb=") &&
        newValue.includes("datr=") &&
        newValue.includes("c_user=")
      );
    }
  },
  methods: {
    async addCookie() {
      this.addFbStatus = "loading";
      await this.$store.dispatch("addCookie", this.cookie);
      this.addFbStatus = "success";
      this.closeAddPopup();
    },
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "../index.style";
.modal--wrapper {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: #212529;
  .modal--content {
    width: 100%;
    .modal--header {
      padding: 0.625rem 0;
      border-bottom: 1px solid #444;
      .arrow-down {
        transform: rotate(90deg);
        margin-left: 0.5rem;
      }
      .name--modal {
        margin: auto;
      }
    }
  }
  .modal--dialog {
    textarea {
      color: #f7f7f7;
      width: 100%;
      height: 164px;
      padding: 15px 20px;
      border-radius: 10px;
      font-size: 14px;
      border: 0;
      resize: none;
      outline: none;
      background: #2f3136;
      &::placeholder {
        color: #666;
      }
    }
    .modal--body {
      padding: 1rem;
      .modal--title {
        font-size: 1rem;
        font-weight: 700;
      }
      .modal--desc {
        font-size: 0.875rem;
        color: #999999;
        margin: 15px 0 20px 0;
      }
      .error--desc {
        color: #f7f7f7;
      }
    }
  }
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

.scroll-area{
  width: 100%;
}
</style>
