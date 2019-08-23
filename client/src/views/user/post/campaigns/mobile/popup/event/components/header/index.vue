<template>
  <div v-if="event" class="header d_flex align_items_start">
    <!-- Start: Left -->
    <div class="header--left position_relative mr_2">
      <div class="icon--color" :style="{ backgroundColor: event.color }">
      </div>
      <div class="btn--edit position_absolute text_center"
           @click="isShowColorDropdown = !isShowColorDropdown"
      >
        <icon-base
          class="icon--edit"
          icon-name="Thay đổi màu sắc"
          height="14px"
          width="14px"
          viewBox="0 0 26 26">
          <icon-edit-info></icon-edit-info>
        </icon-base>
      </div>
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
    <!-- End: Left -->
    <!-- Start: Right -->
    <div class="header--right">
      <input class="title"
             type="text"
             v-model="event.title"
             placeholder="Nhập tên sự kiện"
      >
    </div>
    <!-- End: Right -->
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
      error: false,
      errorData: [],
      isDeleteEvent: false
    }
  },
  computed: {
    categories() {
      return this.$store.getters.allCategories;
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
      this.isShowColorDropdown = false;
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
        } else if ( this.event.target_custom.length === 0 &&
          !this.event.target_category &&
          this.event.timeline.length === 0
        ) {
          this.errorData.push( "Vui lòng chọn nơi đăng để hoàn tất việc tạo sự kiện!" );
          return false;
        } else if ( this.event.hasOwnProperty( "post_category" ) ) {
          const categoryFilter = this.categories.filter( ( item ) => {
            return item._id === this.event.post_category._id;
          } );

          if ( categoryFilter[0].totalPosts === 0 ) {
            this.errorData.push( "Danh mục đã chọn không có bài viết nào!" );
            return false;
          }
        }
      }

      // Convert event timeline to accounts id array
      let fbAccounts  = [];
      this.event.timeline.forEach( ( account ) => {
        fbAccounts.push( account._id );
      } );
      this.event.timeline = fbAccounts;

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
        value: 1
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

      this.$store.dispatch( "setEventReset" );
    },
    changeStatusDelete(val){
      this.isDeleteEvent = val;
      this.close();
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
        } else if ( this.event.target_custom.length === 0 &&
          !this.event.target_category &&
          this.event.timeline.length === 0
        ) {
          this.errorData.push( "Vui lòng chọn nơi đăng để hoàn tất việc tạo sự kiện!" );
          return false;
        } else if ( this.event.hasOwnProperty( "post_category" ) ) {
          const categoryFilter = this.categories.filter( ( item ) => {
            return item._id === this.event.post_category._id;
          } );

          if ( categoryFilter[0].totalPosts === 0 ) {
            this.errorData.push( "Danh mục đã chọn không có bài viết nào!" );
            return false;
          }
        }
      }

      // Convert event timeline to accounts id array
      let fbAccounts  = [];
      this.event.timeline.forEach( ( account ) => {
        fbAccounts.push( account._id );
      } );
      this.event.timeline = fbAccounts;
      console.log( this.event.timeline );

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
        value: 1
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

      this.$store.dispatch( "setEventReset" );
    }
  }
}
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
