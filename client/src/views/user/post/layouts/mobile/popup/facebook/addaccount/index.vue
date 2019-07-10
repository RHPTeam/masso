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
          </icon-base> -->
          <div @click="closeAddPopup">
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
          <div class="active mr_3">Xong</div>
        </div>
        <div class="modal--body">
          <div class="modal--title">Thêm tài khoản Facebook</div>
          <div class="modal--desc">
            Dán mã kích hoạt Facebook vào ô bên dưới để thêm tài khoản.
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
export default {
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      cookie: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeAddPopup() {
      this.$emit( "closeAddPopup", false );
    },
    async addCookie() {
      await this.$emit( "closeAddPopup", false );
      await this.$store.dispatch( "addCookie", this.cookie );
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../index.style";
</style>
