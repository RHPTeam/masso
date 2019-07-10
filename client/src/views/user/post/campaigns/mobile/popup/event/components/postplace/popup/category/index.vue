<template>
  <div class="group">
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
    <div class="title mt_3 mb_2 px_2">Chọn nhóm bạn muốn đăng</div>
    <div class="body px_2">
      <div class="row--group">
        <div class="main">
          <multiselect
            label="title"
            placeholder="Chọn nhóm muốn đăng"
            :value="event.target_category"
            :clearable="false"
            :options="allPostGroups"
            @input="selectFacebookGroup"
          />
        </div>
        <div class="desc mt_1 px_2">
          Bao gồm
          <span>{{ selectedGroups !== undefined && selectedGroups._pages !== undefined ? selectedGroups._pages.length : 0 }} trang</span> và
          <span>{{ selectedGroups !== undefined && selectedGroups._groups !== undefined ? selectedGroups._groups.length : 0 }} nhóm</span> được chọn.
        </div>
      </div>
      <div class="mt_3 bottom px_2">
        <div class="title mb_2">Chọn tài khoản bạn muốn đăng lên trang cá nhân</div>
        <div class="account--list">
          <div
            class="account--list-item d_flex align_items_center"
            v-for="( account, index ) in allAccountFB"
            :key="index"
          >
            <!-- Start: Avatar Account -->
            <div
              class="left"
              :style="{ backgroundImage: 'url(' + account.userInfo.thumbSrc + ')' }"
            ></div>
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
                <input type="checkbox" :value="account._id" v-model="event.timeline" />
              </label>
            </div>
            <!-- End: Action -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewFeed from "../newfeed";
export default {
  components: {
    NewFeed
  },
  data() {
    return {
      postTargetCategory: [],
      selectedGroups: {}
    };
  },
  computed: {
    allAccountFB() {
      return this.$store.getters.accountsFB;
    },
    event() {
      return this.$store.getters.event;
    },
    allPostGroups() {
      return this.$store.getters.postGroups;
    }
    // selectedGroups() {
    //   if ( this.event.target_category ) {
    //     const group = this.allPostGroups.filter( ( item ) => {
    //       return item._id === this.event.target_category._id;
    //     } );
    //     return group[0];
    //   } else {
    //     return false;
    //   }
    // }
  },
  async created() {
    if (this.allPostGroups.length === 0) {
      await this.$store.dispatch("getAllPostGroups");
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    selectFacebookGroup(value) {
      this.selectedGroups = value;
      this.$store.dispatch("setEvent", {
        key: "target_category",
        value: {
          _id: value._id,
          title: value.title
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.group {
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
  .title {
    color: #ccc;
  }
  .body {
    width: 100%;
    .row--group {
      // width: 50%;
    }
    .main {
      // border: 1px solid $border-color;
      border: 1px solid #484848;
      border-radius: calc(0.5rem + 2px);
    }
    .desc {
      color: #999;
      font-size: 0.825rem;
      span {
        color: #f7f7f7;
        font-weight: 600;
      }
    }
  }
  .bottom {
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
  }
}
</style>
