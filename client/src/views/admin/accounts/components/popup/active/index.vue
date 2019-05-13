<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div class="title text_left">Kích hoạt tài khoản</div>
        </div>
        <div class="modal--body my_3">
          <div class="desc">Kích hoạt tài khoản nâng cao bằng mã kích hoạt. Vui lòng nhập đúng mã kích hoạt và thời gian gia hạn cho các tài khoản cần kích hoạt
          </div>
          <div class="content mt_3">
            <div class="form_group">
              <label><b>Áp dụng với mã kích hoạt:</b></label>
              <input
                class="modal--body-input"
                placeholder="123456"
                type="text"
                v-model="user.presenter"
              />
            </div>
            <div class="form_group">
              <label><b>Ngày gia hạn:</b></label>
              <date-picker class="date--input" placeholder="Chọn ngày gia hạn" v-model="user.expireDate" />
            </div>
          </div>
        </div>
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button
            class="btn--submit"
            @click="closePopup()"
          >HỦY</button>
          <button
            class="btn--skip"
            @click="activeAccount()"
          >KÍCH HOẠT</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        presenter: "",
        expireDate: new Date()
      }
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    activeAccount() {
      this.$store.dispatch( "activeAccount", this.user );
    },
    closePopup() {
      this.$emit( "close", false );
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "./index.style";
</style>

