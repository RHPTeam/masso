<template>
  <div class="card" v-if="item">
    <div class="card_body">
      <!-- Start: Card Header -->
      <div class="card--header d_flex align_items_center justify_content_between">
        <div></div>
        <div class="btn--setting" v-if="false" @click="viewDetail">
          <icon-base
            class="icon--setting"
            icon-name="Thiết lập tài khoản"
            height="20px"
            width="20px"
            viewBox="0 0 280 280"
          >
            <icon-setting
            ></icon-setting>
          </icon-base>
        </div>
        <div class="btn--remove" @click="deleteAccount()">
          <icon-base
            class="icon--remove"
            icon-name="Xóa tài khoản"
            width="20"
            height="20"
            viewBox="0 0 15 15">
            <icon-remove />
          </icon-base>
        </div>
      </div>
      <!-- End: Card Header -->
      <!-- Start: Card Content -->
      <div class="card--content">
        <div class="avatar"
             v-if="item.userInfo.thumbSrc && item.userInfo.thumbSrc.length > 0"
             @click=viewDetail
        >
          <img class="picture" :src="item.userInfo.thumbSrc" />
          <span class="status" :class="item.status === true ? 'active' : ''">
          </span>
        </div>
        <h3 class="name"
            @click="viewDetail"
        >{{ item.userInfo.name }}</h3>
        <button class="btn btn--connect" v-if="item.status === true">
          Đang hoạt động
        </button>
        <!-- if cookie dont use show button-->
        <button
          v-else
          class="btn btn--update"
          @click="isModalUpdateCookie = true"
        >
          Cập nhật
        </button>
      </div>
      <!-- End: Card Content -->
      <!-- Start: Card Footer -->
      <div class="card--footer">
        <div class="left">
          <p>Kết nối lần cuối</p>
          <p>{{ item.updated_at | covertDateUpdatedAt }}</p>
        </div>
      </div>
      <!-- End: Card Footer-->
    </div>

    <!--****************POPUP*****************-->
    <transition name="popup">
      <update-cookie
        :item="item"
        v-if="isModalUpdateCookie === true"
        :popupData="isModalUpdateCookie"
        @closeAddPopup="isModalUpdateCookie = $event"
        :nameBread="nameUpdatePopup"
        :subBread="descUpdatePopup"
      >
      </update-cookie>
    </transition>

  </div>
</template>
<script>
import UpdateCookie from "../../popup/list/updatecookie/index";

export default {
  components: {
    UpdateCookie
  },
  filters: {
    covertDateUpdatedAt(d) {
      const newDate = new Date(d);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const date = newDate.getDate();
      const hour = newDate.getHours();
      let minutes = newDate.getMinutes();
      if (minutes < 10) minutes = minutes + "0";
      return `${hour}:${minutes}, ${date}/${month}/${year}`;
    }
  },
  props: ["item"],
  data() {
    return {
      isModalUpdateCookie: false,
      nameUpdatePopup: "Cập nhật mã kích hoạt",
      descUpdatePopup:
        "Dán mã kích hoạt Facebook vào ô bên dưới để cập nhật lại mã kích hoạt tài khoản."
    };
  },
  methods: {
    deleteAccount() {
      this.$emit( "showDeletePopup", this.item );
    },
    viewDetail() {
      this.$store.dispatch( "getFBAccountById", this.item._id );
      this.$router.push( { name: "post_fbaccount_detail",
                           params: { fbAccountId: this.item._id } } );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../index.style";
</style>
