<template>
  <div
    class="modal--header modal--event-header p_3"
    :style="{ backgroundColor: eventDetail.color }"
  >
    <!-- Start: Header Row -->
    <div class="r header--row mx_0">
      <div class="header--row-left mr_3">
        <input
          class="event--name"
          type="text"
          placeholder="Nhập tên sự kiện"
          v-model="eventDetail.title"
          @input="changeTitle()"
        />
      </div>
      <div class="header--row-right d_flex align_items_center">
        <div class="btn--header btn--copy mr_2" @click="closePopup">
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
        <div class="btn--header btn--save" @click="updateEvent()">
          CẬP NHẬT
        </div>
      </div>
    </div>
    <!-- End: Header Row -->
    <div v-if="isShowAlert === true" class="text_danger mt_2"> Tiêu đề của event không được bỏ trống ! </div>
    <!-- Start: Header Row -->
    <div class="r header--row mx_0 justify_content_between mt_3">
      <div class="header--row-left">
        <div class="event--autopost">
          <div>
            <toggle-switch
              class="mr_2"
              :value="eventDetail.type_event === 0 ? true : false"
              @change="updateAutopost($event.value)"
              :sync="true"
              :color="{ checked: '#FFFFFF', unchecked: '#FFFFFF' }"
              :switch-color="{
                checked: '#ffa94b',
                unchecked: '#e4e4e4'
              }"
            />
            <span>
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
                  :style="{ backgroundColor: colors[index] }"
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
                  :style="{ backgroundColor: colors[index + 3] }"
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
  props: [ "colors", "eventDetail", "isShowAlert" ],
  data() {
    return {
      title: "",
      isShowColorDropdown: false
    };
  },
  computed: {
    statusError() {
      if(Object.entries(this.$store.getters.errorEvent).length === 0 && this.$store.getters.errorEvent.constructor === Object) return;
      return this.$store.getters.errorEvent;
    }
  },
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    },
    changeColor( color ) {
      this.$emit( "changeColor", color );
      this.isShowColorDropdown = false;
    },
    changeTitle( ) {
      this.$emit( "changeTitle", this.title );
    },
    updateAutopost( val ) {
      this.$emit( "updateAutopost", val );
    },
    createEvent() {
      this.$emit( "updateEvent", this.title );
      // this.$emit( "closePopup", false );
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../deletecampaign/style";
  @import "./index.style";
</style>
