<template>
  <div
    v-if="event"
    class="box p_3"
  >
    <!-- Start: Row -->
    <div class="r mx_0">
      <div class="left mr_3">
        <input
          type="text"
          v-model="event.title"
          placeholder="Nhập tên sự kiện"
        />
      </div>
      <div class="right d_flex align_items_center">
        <div class="button copy mr_2">
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
        <div class="button remove mr_2">
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
        <div class="button save" @click.prevent="createEvent">
          TẠO MỚI
        </div>
<!--        <div class="button save" @click.prevent="updateEventById">-->
<!--          CẬP NHẬT-->
<!--        </div>-->
      </div>
    </div>
    <!-- End: Row -->
    <div class="text_danger mt_2" v-if="error === true"> Tiêu đề của event không được bỏ trống ! </div>
    <!-- Start: Row -->
    <div class="r mx_0 justify_content_between mt_3">
      <div class="left">
        <div class="d_flex">
          <toggle-switch
            class="mr_2"
            :value="event.type_event === 0 ? false : true"
            @change="changeStatus($event.value)"
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
      <div class="right">
        <div class="action" aria-label="Change Color">
          <div role="color" @click="isShowColorDropdown = !isShowColorDropdown">
            <span>Thay đổi màu sắc</span>
            <!-- Start: Change color dropdown -->
            <div class="dropdown--menu" v-if="isShowColorDropdown" v-click-outside="closeColorGrid">
              <div class="r mx_0">
                <div
                  class="dropdown--menu-item"
                  v-for="(i, index) in 3"
                  :key="index"
                >
                  <div
                    class="grid"
                    :style="{ backgroundColor: colors[index] }"
                    @click="changeColor(colors[index])"
                  ></div>
                </div>
              </div>
              <div class="r mx_0">
                <div
                  class="dropdown--menu-item"
                  v-for="(i, index) in 3"
                  :key="`s-${index}`"
                >
                  <div
                    class="grid"
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
    </div>
    <!-- End: Row -->
  </div>
</template>

<script>
export default {
  props: {
    event: Object
  },
  data() {
    return {
      colors: [ "#85CFFF", "#BE92E3", "#7BD48A", "#999999", "#FFB94A", "#FF8787" ],
      isShowColorDropdown: false,
      error: false
    }
  },
  methods: {
    close(){
      this.$emit( "close", false );
    },
    closeColorGrid() {
      this.isShowColorDropdown = false;
    },
    changeColor( val ){
      localStorage.setItem( "color", val );
    },
    changeStatus(status) {
      this.$store.dispatch( "setEvent", {
        key: "type_event",
        value: status === true ? 1 : 0
      } );
    },
    createEvent() {
      // Check validator
      if ( this.event.title.length === 0 ) {
        this.error = true;
        return false;
      }

      // Check info before send to server
      this.close();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
