<template>
  <!--Section option hours-->
  <div class="timer--wrapper" :data-theme="currentTheme" >
    <div class="title mb_2">Thời gian đăng</div>
    <div class="input--group d_flex">
      <!-- Start: Input Time -->
      <div class="input--time mr_3">
        <time-picker
          class="time--picker-custom"
          v-model="postTime"
          @change="updatePostTime($event)"
        />
      </div>
      <!-- End: Input Time -->
      <!-- Start: Input Date -->
      <div class="input--date">
        <date-picker
          class=""
          placeholder="Chọn ngày"
          v-model="postDate"
          format="DD/MM/YYYY"
          @change="updatePostDate($event)"
        ></date-picker>
      </div>
      <!-- End: Input Date -->
      <!-- Start: Infor timer -->
      <div class="infor pl_3 d_flex">
          <div class="name--info">Information time Information time Information time</div>
          <div class="icon--info d_flex ml_auto">
            <icon-base
              icon-name="info"
              width="14"
              height="14"
              viewBox="0 0 18 18"
            >
              <icon-info/>
            </icon-base>
          </div>
      </div>
      <!-- End: Infor timer -->
    </div>
  </div>
  <!--End Section option hours-->
</template>

<script>
export default {
  data() {
    return {
      postDate: new Date(),
      postTime: {
        HH: new Date().getHours(),
        mm: new Date().getMinutes()
      },
      isActiveHeightPopupTimer: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },

  methods: {
    updatePostDate( date ) {
      this.postDate = date;
    },
    updatePostTime( val ) {
      this.postTime = val;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>

