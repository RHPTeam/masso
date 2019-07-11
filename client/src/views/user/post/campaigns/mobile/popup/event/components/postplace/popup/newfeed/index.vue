<template>
  <div class="profile" :data-theme="currentTheme">
    <div class="header mb_2 d_flex align_items_center">
      <div @click="closePopup">
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
      <p class="name--modal mb_0 m_auto">Chọn nơi đăng</p>
      <div class="active mr_3">Xong</div>
    </div>
    <div class="body px_2">
      <div class="title mb_2">Chọn tài khoản bạn muốn đăng lên trang cá nhân</div>
      <div class="account--list">
        <div class="account--list-item d_flex align_items_center"
             v-for="( account, index ) in allAccountFB"
             :key="index"
        >
          <!-- Start: Avatar Account -->
          <div class="left"
               :style="{ backgroundImage: 'url(' + account.userInfo.thumbSrc + ')' }"
          >
          </div>
          <!-- End: Avatar Account -->
          <!-- Start: Name Account + Action -->
          <div class="right d_flex align_items_center">
            <!-- Start: Name Account -->
            <div class="name ml_2">{{ account.userInfo.name }}</div>
            <!-- End: Name Account -->
          </div>
          <!-- Start: Name Account + Action -->
          <!-- Start: Action -->
          <div class="action ml_auto">
            <label class="custom--checkbox mr_3">
              <input
                type="checkbox"
                :value="account._id"
                v-model="event.timeline"
              />
            </label>
          </div>
          <!-- End: Action -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allAccountFB() {
      return this.$store.getters.accountsFB;
    },
    event() {
      return this.$store.getters.event;
    }
  },
  async created() {
    if ( this.allAccountFB.length === 0 ) {
      await this.$store.dispatch( "getAccountsFB" );
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    }
  },
}
</script>

<style lang="scss" scoped>
.profile {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #2f3136;
  color: #ccc;
  z-index: 10;
  font-size: 0.875rem;
  .header {
    padding: 0.625rem 0;
    border-bottom: 1px solid #ccc;

    .arrow-down {
      transform: rotate(90deg);
      margin-left: 0.5rem;
    }
  }
  .body {
    .account--list {
      .account--list-item {
        margin-top: .75rem;
        .action {
          .custom--checkbox {
            input[type="checkbox"] {
              border-radius: 50%;
              border: solid 1.5px #999;
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
        }
        .left {
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          border-radius: 100%;
          height: 42px;
          width: 42px;
        }
        .right {
          width: calc(100% - 51px);
          .name {
            color: #F7F7F7;
            font-size: 0.875rem;
            font-weight: 600;
          }
        }
      }
    }
    .title {
      color: #444;
      font-size: .875rem;
    }
  }
}


// ========================= CHANGE THEME

// dark
.profile[data-theme="dark"] {
  color: #ccc;
  .title {
    color: #ccc;
  }
}
</style>
