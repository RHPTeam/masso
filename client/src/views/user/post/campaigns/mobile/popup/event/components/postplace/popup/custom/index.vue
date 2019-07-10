<template>
  <div class="page">
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
    <div class="title mb_3 px_2">Tùy chọn đăng vào các nhóm và trang mà bạn có mặt trên facebook.</div>
    <div class="body px_2">
      <!-- Start: Pages Selected -->
      <div class="item d_flex mb_3">
        <div class="icon mr_2">
          <icon-base class="icon--page" height="20px" width="20px" viewBox="0 0 500 500">
            <icon-page></icon-page>
          </icon-base>
        </div>
        <div class="content">
          <div class="main">
            <multiselect
              multiple
              label="name"
              placeholder="Chọn trang muốn đăng"
              :value="convertTargetCustomPages"
              :options="facebookPages"
              @input="selectPageFacebook"
            />
          </div>
          <div class="desc px_2 mt_1">
            Bao gồm
            <span>{{ event.target_custom.filter( target => target.typeTarget === 1 ).length }} trang</span> được chọn.
          </div>
        </div>
      </div>
      <!-- End: Pages Selected -->
      <!-- Start: Groups Selected -->
      <div class="item d_flex">
        <div class="icon mr_2">
          <icon-base class="icon--group" height="22px" width="22px" viewBox="0 0 500 500">
            <icon-group></icon-group>
          </icon-base>
        </div>
        <div class="content">
          <div class="main">
            <multiselect
              multiple
              label="name"
              placeholder="Chọn nhóm muốn đăng"
              :value="convertTargetCustomGroups"
              :options="facebookGroups"
              @input="selectGroupFacebook"
            />
          </div>
          <div class="desc px_2 mt_1">
            Bao gồm
            <span>{{ event.target_custom.filter( target => target.typeTarget === 0 ).length }} nhóm</span> được chọn.
          </div>
        </div>
      </div>
      <!-- End: Groups Selected -->
    </div>
    <div class="bottom mt_3 px_2">
      <div class="title mb_2">Chọn tài khoản bạn muốn đăng lên trang cá nhân</div>
      <div class="account--list">
        <div
          class="account--list-item d_flex align_items_center"
          v-for="( account, index ) in allAccountFB"
          :key="index"
        >
          <!-- Start: Avatar Account -->
          <div class="left" :style="{ backgroundImage: 'url(' + account.userInfo.thumbSrc + ')' }"></div>
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
</template>

<script>
import NewFeed from "../newfeed";
export default {
  components: {
    NewFeed
  },
  data() {
    return {
      custom: []
    };
  },
  computed: {
    allAccountFB() {
      return this.$store.getters.accountsFB;
    },
    event() {
      return this.$store.getters.event;
    },
    facebookGroups() {
      return this.$store.getters.facebookGroups;
    },
    facebookPages() {
      return this.$store.getters.facebookPages;
    },
    convertTargetCustomGroups() {
      return this.event.target_custom
        .filter(target => target.typeTarget === 0)
        .map(item => {
          if (item.target) {
            return {
              groupId: item.target.groupId,
              name: item.target.name
            };
          }
        });
    },
    convertTargetCustomPages() {
      return this.event.target_custom
        .filter(target => target.typeTarget === 1)
        .map(item => {
          if (item.target) {
            return {
              pageId: item.target.pageId,
              name: item.target.name
            };
          }
        });
    }
  },
  async created() {
    if (this.facebookPages.length === 0) {
      await this.$store.dispatch("getFacebookPages");
    }
    if (this.facebookGroups.length === 0) {
      await this.$store.dispatch("getFacebookGroups");
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    selectGroupFacebook(value) {
      const groupListSelect = value.map(group => {
        return {
          typeTarget: 0,
          target: {
            groupId: group.groupId,
            name: group.name
          }
        };
      });

      this.$store.dispatch("setEventSpecial", {
        key: "target_custom",
        typeTarget: 0,
        value: groupListSelect
      });
    },
    selectPageFacebook(value) {
      const pageListSelect = value.map(page => {
        return {
          typeTarget: 1,
          target: {
            pageId: page.pageId,
            name: page.name
          }
        };
      });

      this.$store.dispatch("setEventSpecial", {
        key: "target_custom",
        typeTarget: 1,
        value: pageListSelect
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
