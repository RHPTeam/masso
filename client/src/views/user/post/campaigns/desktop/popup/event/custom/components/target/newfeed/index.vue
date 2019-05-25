<template>
  <div class="profile">
    <div class="body">
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
            <!-- Start: Action -->
            <div class="action ml_auto">
              <label class="custom--checkbox mr_2">
                <input type="checkbox" />
              </label>
            </div>
            <!-- End: Action -->
          </div>
          <!-- Start: Name Account + Action -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    allAccountFB() {
      return this.$store.getters.allAccountFb;
    }
  },
  async created() {
    await this.$store.dispatch( "getAllAccountFb" );
  },
}
</script>

<style lang="scss" scoped>
.profile {
  .body {
    .account--list {
      .account--list-item {
        margin-top: .75rem;
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
            font-weight: 600;
          }
          .action {
            .custom--checkbox {
              input[type="checkbox"] {
                border-radius: 6px;
                border: solid 1.5px #cccccc;
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
        }
      }
    }
    .title {
      color: #999;
      font-size: .825rem;
    }
  }
}
</style>
