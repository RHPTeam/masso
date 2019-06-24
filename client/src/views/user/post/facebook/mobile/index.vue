<template>
  <div class="main--facebook" :data-theme="currentTheme">
    <div class="wrapper--top d_flex align_items_center justify_content_between p_3 mb_2">
      <!-- Start: Top Left-->
      <div class="left d_flex align_items_center">
        <div class="avatar mr_2">
          <img :src="fbAccountInfo.imageAvatar" alt>
        </div>
        <div class="user--info">
          <div class="name mb_1">{{ fbAccountInfo.name }}</div>
          <div class="created mb_1">Được thêm lúc {{ formatDate(fbAccountInfo.updated_at) }}</div>
        <div
          class="status d_inline"
          :class="fbAccountInfo.status ? 'active' : null"
        >{{ fbAccountInfo.status ? "Đang hoạt động" : "Ngừng hoạt động" }}</div>
        </div>
      </div>
      <!-- End: Top Left -->
    </div>
    <div class="add--account">
      <div class="title mb_1">Thêm tài khoản</div>
      <div class="desc">Bạn có thể thêm tối đa 2 tài khoản facebook trên tài khoản này.</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    fbAccountInfo() {
      return this.$store.getters.userInfo;
    }
  },
  async created() {
    const info = this.$store.getters.userInfo;
    if (Object.entries(info).length === 0 && info.constructor === Object) {
      const fbAccountId = this.$route.params.fbAccountId;
      await this.$store.dispatch("getFBAccountById", fbAccountId);
    }
  },
  methods: {
    formatDate(date) {
      const dateTime = new Date(date),
        hour = String(dateTime.getHours()).padStart(2, 0),
        min = String(dateTime.getMinutes()).padStart(2, 0),
        day = String(dateTime.getDate()).padStart(2, 0),
        month = String(dateTime.getMonth() + 1).padStart(2, 0),
        year = dateTime.getFullYear();

      return `${hour}:${min} ngày ${day}/${month}/${year}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.main--facebook {
  .wrapper--top {
    background-color: #fff;
    border-radius: 0.625rem;
    font-size: 0.875rem;
    .left {
      .avatar {
        img {
          border-radius: 100%;
          height: 48px;
          width: 48px;
        }
      }
      .name {
        font-size: 1rem;
        font-weight: 700;
      }
      .created {
        color: #999;
        font-size: 0.8125rem;
      }
      .status {
        // border: 1px solid #f96666;
        // border-radius: 0.5rem;
        // padding: 0.25rem 0.5rem;
        color: #f96666;
        &.active {
          border-color: #43d627;
          color: #43d627;
        }
      }
    }
  }
  .add--account {
    .title {
      font-weight: bold;
    }
    .desc {
      font-size: 0.8125rem;
    }
  }
}

// ============= CHANGE THEME 
.main--facebook[data-theme="dark"] {
  .wrapper--top {
    background: #272a2c;
    color: #ccc;
  }
}
</style>