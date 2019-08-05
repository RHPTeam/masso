<template>
  <div class="main--top d_flex align_items_center p_3" :data-theme="currentTheme">
    <div class="exp--account" v-if="user">
      Tài khoản hết hạn: {{ user.expireDate | formatDate }}
    </div>
    <div class="renewed--account text_center ml_auto">
      <button @click="showPopupRenewed">Gia hạn</button>
    </div>
    <!-- Start: Popup Gia hạn -->
    <transition name="popup">
      <popup-renewed v-if="isShowPopupRenewed === true" @closePopup="isShowPopupRenewed = $event"/>
    </transition>
    <!-- End: Popup Gia hạn -->
  </div>
</template>

<script>
import PopupRenewed from "../popup/renewed";
export default {
  filters: {
    formatDate( d ) {
      const newDate = new Date( d ),
            year = newDate.getFullYear(),
            month = newDate.getMonth() + 1,
            date = newDate.getDate();

      let minutes = newDate.getMinutes();

      if ( minutes < 10 ) {
        minutes = `0${minutes}`;
      }
      return `${date}/${month}/${year}`;
    }
  },
  props: [ "user" ],
  components: {
    PopupRenewed
  },
  data() {
    return {
      isShowPopupRenewed: false
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    showPopupRenewed() {
      this.isShowPopupRenewed = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.main--top {
  background-color: #ffffff;
  border-radius: 0.625rem;
  .exp--account {
    color: #ff9e4a;
    font-weight: 600;
    font-size: 0.875rem;
  }
  .renewed--account {
    button {
      background-color: #ffb94a;
      border: 0;
      border-radius: 0.625rem;
      color: #ffffff;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      &:active,
      &:focus,
      &:hover,
      &:visited {
        background-color: #ff9e4a;
        box-shadow: none;
        outline: 0;
      }
    }
  }
  button:disabled,
  button[disabled] {
    background-color: #dddddd;
    border-radius: 0.625rem;
    color: #ffffff;
    cursor: not-allowed;
    &:hover {
      background: #dddddd;
    }
  }
}

//CHANGE BACKGROUND COLOR THEME

//LIGHT

.main--top[data-theme="light"] {

}

//DARK

.main--top[data-theme="dark"] {
  background: $mainDark;
  button:disabled,
  button[disabled] {
    background-color: #282a2d;
    border: 1px solid #484848;
    color: #ccc;
  }
}

</style>
