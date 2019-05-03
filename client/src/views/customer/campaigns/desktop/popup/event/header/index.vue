<template>
  <div
    class="modal--header modal--event-header p_3"
    :style="{ backgroundColor: activeColor.code }"
  >
    <!-- Start: Header Row -->
    <div class="r header--row mx_0">
      <div class="header--row-left mr_3">
        <input
          class="event--name"
          type="text"
          placeholder="Nhập tên sự kiện"
          :value="eventData.title"
        />
      </div>
      <div class="header--row-right d_flex align_items_center">
        <div class="btn--header btn--copy mr_2">
          <icon-base
            class="ic--copy"
            icon-name="ic--copy"
            width="24"
            height="24"
            viewBox="0 0 500 500"
          >
            <icon-copy />
          </icon-base>
        </div>
        <div class="btn--header btn--delete mr_2">
          <icon-base
            class="ic--remove"
            icon-name="ic--remove"
            width="24"
            height="24"
            viewBox="0 0 16 16"
          >
            <icon-remove />
          </icon-base>
        </div>
        <div class="btn--header btn--save" @click="closePopup">
          XONG
        </div>
      </div>
    </div>
    <!-- End: Header Row -->
    <!-- Start: Header Row -->
    <div class="r header--row mx_0 justify_content_between mt_3">
      <div class="header--row-left">
        <div class="event--autopost">
          <div>
            <toggle-switch
              class="mr_2"
              @change="updateAutopost($event.value)"
              :value="true"
              :sync="true"
              :color="{ checked: '#FFFFFF', unchecked: '#FFFFFF' }"
              :switch-color="{
                checked: activeColor.code,
                unchecked: '#e4e4e4'
              }"
            />
            <span :style="[autopost ? { opacity: '1' } : { opacity: '0.8' }]">
              Tự động đăng bài trên trang cá nhân vào các khung giờ vàng.
            </span>
          </div>
        </div>
      </div>
      <div class="header--row-right">
        <div class="event--change-color">
          <div class="label--change" @click="isShowColorDropdown = true">
            Thay đổi màu sắc
          </div>
          <!-- Start: Change color dropdown -->
          <div class="dropdown--menu" v-if="isShowColorDropdown">
            <div class="r mx_0">
              <div
                class="dropdown--menu-item"
                v-for="(i, index) in 3"
                :key="index"
              >
                <div
                  class="color--box"
                  :style="{ backgroundColor: colors[index].code }"
                  @click="changeColor(colors[index])"
                ></div>
              </div>
            </div>
            <div class="r mx_0">
              <div
                class="dropdown--menu-item"
                v-for="(i, index) in 3"
                :key="index"
              >
                <div
                  class="color--box"
                  :style="{ backgroundColor: colors[index + 3].code }"
                  @click="changeColor(colors[index + 3])"
                ></div>
              </div>
            </div>
          </div>
          <!-- End: Change color dropdown -->
        </div>
      </div>
    </div>
    <!-- End: Header Row -->
  </div>
</template>

<script>
export default {
  props: [ "activeColor", "autopost", "colors", "eventData" ],
  data() {
    return {
      isShowColorDropdown: false
    };
  },
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    },
    changeColor( color ) {
      this.$emit( "changeColor", color );
      this.isShowColorDropdown = false;
    },
    updateAutopost( val ) {
      this.$emit( "updateAutopost", val );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style";
@import "./index.style";
</style>
