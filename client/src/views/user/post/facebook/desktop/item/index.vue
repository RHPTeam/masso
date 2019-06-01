<template>
  <div class="card" v-if="item">
    <div class="card_body">
      <div class="card--header" @click="isDeleteItemAccount = true">
        <icon-base icon-name="remove" width="20" height="20" viewBox="0 0 15 15">
          <icon-remove />
        </icon-base>
      </div>
      <div class="card--content">
        <div class="avatar">
          <img class="picture" :src="item.userInfo.thumbSrc" />
          <span class="status" :class="item.status === true ? 'active' : ''">
          </span>
        </div>
        <h3 class="name">{{ item.userInfo.name }}</h3>
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
      <div class="card--footer">
        <div class="left">
          <p>Kết nối lần cuối</p>
          <p>{{ item.updated_at | covertDateUpdatedAt }}</p>
        </div>
      </div>
    </div>
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

      <delete-item
        v-if="isDeleteItemAccount === true"
        title="Delete Account Facebook"
        @closePopup="isDeleteItemAccount = $event"
        storeActionName="deleteAccount"
        :targetData="item"
        typeName="account"
      ></delete-item>
    </transition>
  </div>
</template>
<script>
import UpdateCookie from "../popup/updatecookie";
import DeleteItem from "../popup/delete";
export default {
  components: {
    UpdateCookie,
    DeleteItem
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
      isDeleteItemAccount: false,
      nameUpdatePopup: "Cập nhật mã kích hoạt",
      descUpdatePopup:
        "Dán mã kích hoạt Facebook vào ô bên dưới để cập nhật lại mã kích hoạt tài khoản."
    };
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
  @import "../index.style";
</style>
