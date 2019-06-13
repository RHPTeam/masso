<template>
  <div class="profile" :data-theme="currentTheme">
    <div class="body">
      <div class="title mb_2">Chọn tài khoản bạn muốn đăng lên trang cá nhân</div>
      <div class="account--list">
        <div class="account--list-item d_flex align_items_center justify_content_between"
             v-for="( account, index ) in allAccountFB"
             :key="index"
        >
          <!-- Start: Avatar Account -->
          <!-- Start: Name Account + Action -->
          <div class="right d_flex align_items_center">
            <!-- Start: Name Account + Action -->
            <div class="left">
              <!-- Start: Action -->
              <div class="action ml_auto">
                <label class="custom--checkbox mb_0 mr_2">
                  <input
                    type="checkbox"
                    :value="account._id"
                    v-model="postSchedule._facebookId"
                    @input="updatePostSchedule"
                  />
                </label>
              </div>
              <!-- End: Action -->
            </div>
            <!-- End: Avatar Account -->
            <div class="avatar"
                 :style="{ backgroundImage: 'url(' + account.userInfo.thumbSrc + ')' }"
            ></div>
            <!-- Start: Name Account -->
            <div class="name ml_2">{{ account.userInfo.name }}</div>
            <!-- End: Name Account -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "postSchedule" ],
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
    await this.$store.dispatch( "getAccountsFB" );
  },
  methods: {
    updatePostSchedule() {
      this.$emit( "updatePostSchedule", this.postSchedule );
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    .body {
      .account--list {
        .account--list-item {
          margin-top: .75rem;
          .left {
            .action {
              height: 20px;
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
          .right {
            .name {
              font-weight: 600;
            }
            .avatar {
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
              border-radius: 100%;
              height: 42px;
              width: 42px;
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

  // ============ CHANGE THEME 

  .profile[data-theme="dark"] {
    .title {
      color: #ccc;
    }
  }
</style>
