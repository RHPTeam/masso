<template>
  <div
    v-if="event"
    class="box p_3"
    :style="{ backgroundColor: event.color }"
  >
    <!-- Start: Row -->
    <div class="r mx_0">
      <div class="left mr_3">
        <input
          type="text"
          :class="[ error ? 'input--error' : null ]"
          v-model="event.title"
          :placeholder="[ error ? 'Tên sự kiện không được bỏ trống!' : 'Nhập tên sự kiên' ]"
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
        <div class="button save mr_2" @click.prevent="close">HUỶ</div>
        <div class="button save" v-if="event._id" @click.prevent="updateEvent">
          CẬP NHẬT
        </div>
        <div v-else class="button save" @click.prevent="createEvent">
          TẠO MỚI
        </div>
      </div>
    </div>
    <!-- End: Row -->
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
              checked: event.color,
              unchecked: '#e4e4e4'
            }"
          />
          <span>
            Tự động đăng bài trên trang cá nhân vào các khung giờ vàng
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
    <!-- Start: Row -->
    <div class="r mx_0 justify_content_between mt_3">
      <header-time></header-time>
    </div>
    <!-- End: Row -->
    <!-- Start: Row -->
    <div v-if="errorData.length > 0">
      <div class="errors" v-for="error in errorData" :key="error">
        <div class="text_danger mt_3" v-text="error"></div>
      </div>
    </div>
    <!-- End: Row -->
  </div>
</template>

<script>
import HeaderTime from "./time";

export default {
  components: {
    HeaderTime
  },
  props: {
    event: Object
  },
  data() {
    return {
      colors: [ "#85CFFF", "#BE92E3", "#7BD48A", "#999999", "#FFB94A", "#FF8787" ],
      isShowColorDropdown: false,
      error: false,
      errorData: []
    }
  },
  methods: {
    close(){
      this.$store.dispatch( "setCaseEvent", {
        key: "popup",
        value: false
      } );
      this.$store.dispatch( "setEventReset" );
    },
    closeColorGrid() {
      this.isShowColorDropdown = false;
    },
    changeColor( value ){
      this.$store.dispatch( "setEvent", {
        key: "color",
        value: value
      } )
    },
    changeStatus(status) {
      this.$store.dispatch( "setEvent", {
        key: "type_event",
        value: 0
      } );
      this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: 0
      } );
      this.$store.dispatch( "setCaseEvent", {
        key: "target",
        value: 0
      } );
      this.$store.dispatch( "setEvent", {
        key: "break_point",
        value: 15
      } );
      this.$store.dispatch( "setEvent", {
        key: "post_custom",
        value: []
      } );
      this.$store.dispatch( "setEvent", {
        key: "target_custom",
        value: []
      } );

      this.$store.dispatch( "setEvent", {
        key: "type_event",
        value: status === true ? 1 : 0
      } );
    },
    async createEvent() {
      this.error = false;
      this.errorData = [];
      // Check validator
      if ( this.event.title.length === 0 ) {
        this.error = true;
        return false;
      }

      if ( this.event.type_event === 1 ) {
        this.$store.dispatch( "setEventRemove", "break_point" );
        this.$store.dispatch( "setEventRemove", "post_custom" );
        this.$store.dispatch( "setEventRemove", "target_custom" );
      } else if ( this.event.type_event === 0 ) {
        if ( this.event.post_custom.length === 0 && !this.event.post_category ) {
          this.errorData.push( "Vui lòng chọn bài đăng để hoàn tất việc tạo sự kiện!" );
          return false;
        } else if ( this.event.target_custom.length === 0 && !this.event.target_category ) {
          this.errorData.push( "Vui lòng chọn nơi đăng để hoàn tất việc tạo sự kiện!" );
          return false;
        }
      }

      // Close popup
      this.close();

      await this.$store.dispatch( "createEvent", {
        campaignId: this.$route.params.campaignId,
        event: this.event
      } );

      // Return popup start
      this.$store.dispatch( "setEvent", {
        key: "title",
        value: ""
      } );
      this.$store.dispatch( "setEvent", {
        key: "type_event",
        value: 0
      } );
      this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: 0
      } );
      this.$store.dispatch( "setEvent", {
        key: "break_point",
        value: 15
      } );
      this.$store.dispatch( "setEvent", {
        key: "post_custom",
        value: []
      } );
      this.$store.dispatch( "setEvent", {
        key: "target_custom",
        value: []
      } );

    },
    async updateEvent() {
      this.error = false;
      this.errorData = [];
      // Check validator
      if ( this.event.title.length === 0 ) {
        this.error = true;
        return false;
      }

      if ( this.event.type_event === 1 ) {
        this.$store.dispatch( "setEventRemove", "break_point" );
        this.$store.dispatch( "setEventRemove", "post_custom" );
        this.$store.dispatch( "setEventRemove", "target_custom" );
      } else if ( this.event.type_event === 0 ) {
        if ( this.event.post_custom.length === 0 && !this.event.post_category ) {
          this.errorData.push( "Vui lòng chọn bài đăng để hoàn tất việc tạo sự kiện!" );
          return false;
        } else if ( this.event.target_custom.length === 0 && !this.event.target_category ) {
          this.errorData.push( "Vui lòng chọn nơi đăng để hoàn tất việc tạo sự kiện!" );
          return false;
        }
      }

      // Close popup
      this.close();

      await this.$store.dispatch( "updateEvent", {
        campaignId: this.$route.params.campaignId,
        event: this.event
      } );

      // Return popup start
      this.$store.dispatch( "setEvent", {
        key: "title",
        value: ""
      } );
      this.$store.dispatch( "setEvent", {
        key: "type_event",
        value: 0
      } );
      this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: 0
      } );
      this.$store.dispatch( "setEvent", {
        key: "break_point",
        value: 15
      } );
      this.$store.dispatch( "setEvent", {
        key: "post_custom",
        value: []
      } );
      this.$store.dispatch( "setEvent", {
        key: "target_custom",
        value: []
      } );
    }
  }
}
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
