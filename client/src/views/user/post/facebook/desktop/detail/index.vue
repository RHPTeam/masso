<template>
  <div class="wrapper" v-if="fbAccountInfo.userInfo !== undefined">
    <!-- Start: Top -->
    <div class="wrapper--top d_flex align_items_center justify_content_between p_3 mb_4">
      <!-- Start: Top Left-->
      <div class="left d_flex align_items_center">
        <div class="avatar mr_2">
          <img :src="fbAccountInfo.userInfo.thumbSrc" alt="">
        </div>
        <div class="user--info">
          <div class="name">{{ fbAccountInfo.userInfo.name }}</div>
          <div class="created">Được thêm lúc {{ formatDate(fbAccountInfo.created_at) }}</div>
        </div>
      </div>
      <!-- End: Top Left -->
      <!-- Start: Top Right -->
      <div class="right">
        <div class="status"
             :class="fbAccountInfo.status ? 'active' : null"
        >
          {{ fbAccountInfo.status ? "Đang hoạt động" : "Ngừng hoạt động" }}
        </div>
      </div>
      <!-- End: Top Right -->
    </div>
    <!-- End: Top -->
    <!-- Start: Content -->
    <div class="wrapper--content p_3">
      <div class="title mb_3">Thiết lập tài khoản</div>
      <!-- Start: Setting Item -->
      <div class="setting--item d_flex mb_3">
        <div class="left">
          <toggle-switch></toggle-switch>
        </div>
        <div class="right ml_3">
          <div class="right--label mb_1">Tự động thích bài viết của bạn bè</div>
          <div class="exception d_flex">
            <div class="exception d_flex">
              <div class="desc mr_1">Ngoại trừ:</div>
              <div v-if="exceptionFriends.length !== 0">
              <span v-for="( item, index ) in exceptionFriends.slice(0, 5)"
                    :key="index"
              >{{ item }}{{ index === 4 ? null : ', ' }}</span>
                <span v-if="exceptionFriends.length > 5">
                và {{ exceptionFriends.length - 5 }} người khác.
              </span>
              </div>
              <div v-else>Không có ai.</div>
              <div class="btn--edit ml_1"
                   @click="showLikeExceptionPopup"
              >
                <icon-base
                  name="Chỉnh sửa"
                  class="icon--edit"
                  viewBox="0 0 26 26"
                >
                  <icon-edit></icon-edit>
                </icon-base>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Setting Item -->
      <!-- Start: Setting Item -->
      <div class="setting--item d_flex mb_3">
        <div class="left">
          <toggle-switch></toggle-switch>
        </div>
        <div class="right ml_3">
          <div class="right--label mb_1">Tự động lọc bạn bè ít tương tác</div>
          <div class="exception d_flex">
            <div class="desc mr_1">Ngoại trừ:</div>
            <div v-if="exceptionFriends.length !== 0">
              <span v-for="( item, index ) in exceptionFriends.slice(0, 5)"
                    :key="index"
              >{{ item }}{{ index === 4 ? null : ', ' }}</span>
              <span v-if="exceptionFriends.length > 5">
                và {{ exceptionFriends.length - 5 }} người khác.
              </span>
            </div>
            <div v-else>Không có ai.</div>
            <div class="btn--edit ml_1"
                 @click="showFilterExceptionPopup"
            >
              <icon-base
                name="Chỉnh sửa"
                class="icon--edit"
                viewBox="0 0 26 26"
              >
                <icon-edit></icon-edit>
              </icon-base>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Setting Item -->
    </div>
    <!-- End: Content -->

    <!-- ***************POPUP*************** -->
    <transition name="popup">
      <exception-popup
        v-if="isShowLikeExceptionPopup"
        @closePopup="isShowLikeExceptionPopup = $event"
      ></exception-popup>
    </transition>
    <transition name="popup">
      <exception-popup
        v-if="isShowFilterExceptionPopup"
        @closePopup="isShowFilterExceptionPopup = $event"
      ></exception-popup>
    </transition>
  </div>
</template>

<script>
import ExceptionPopup from "../popup/detail/exception";

export default {
  components: {
    ExceptionPopup
  },
  data() {
    return {
      isShowLikeExceptionPopup: false,
      isShowFilterExceptionPopup: false,
      exceptionFriends: [
        "Đặng Yến", "Phạm Học", "Lê Khang", "Trần Toản", "Hương Giang", "Bùi Thực", "Nam Anh"
      ]
    }
  },
  computed: {
    fbAccountInfo() {
      return this.$store.getters.fbAccountInfo;
    }
  },
  async created() {
    const fbAccountId = this.$route.params.fbAccountId;
    await this.$store.dispatch( "getFBAccountById", fbAccountId );
  },
  methods: {
    formatDate( date ) {
      const dateTime = new Date( date ),
            hour = String( dateTime.getHours() ).padStart( 2, 0 ),
            min = String( dateTime.getMinutes() ).padStart( 2, 0 ),
            day = String( dateTime.getDate() ).padStart( 2, 0 ),
            month = String( dateTime.getMonth() + 1 ).padStart( 2, 0 ),
            year = dateTime.getFullYear();

      return `${hour}:${min} ngày ${day}/${month}/${year}`;
    },
    showLikeExceptionPopup() {
      this.isShowLikeExceptionPopup = true;
    },
    showFilterExceptionPopup() {
      this.isShowFilterExceptionPopup = true;
    }
  }
}
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
