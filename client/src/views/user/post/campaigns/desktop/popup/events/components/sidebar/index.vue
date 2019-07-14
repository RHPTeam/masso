<template>
  <div class="sidebar pl_4 mt_4">
    <!-- Start: Add to event -->
    <div class="list--group">
      <div class="title mb_2">Thêm vào sự kiện</div>
      <div class="list--group-item position_relative">
        <div class="item--content d_flex align_items_center" @click="showAdvanceContentPopup">
          <icon-base
            class="mr_2"
            height="14px"
            width="14px"
            viewBox="0 0 20 20"
          >
            <icon-user></icon-user>
          </icon-base>
          <div class="name">Nội dung nâng cao</div>
        </div>
        <transition name="popup">
          <advance-content-popup
            v-if="isShowAdvanceContentPopup"
            @closePopup="isShowAdvanceContentPopup = $event"
          ></advance-content-popup>
        </transition>
      </div>
    </div>
    <!-- End: Add to event -->
    <!-- Start: Actions -->
    <div class="list--group mt_4">
      <div class="title mb_2">Hành động</div>
      <div class="list--group-item position_relative">
        <div class="item--content d_flex align_items_center" @click="showDuplicatePopup">
          <icon-base
            class="icon icon--copy mr_2"
            height="14px"
            width="14px"
            viewBox="0 0 500 500"
          >
            <icon-copy></icon-copy>
          </icon-base>
          <div class="name">Sao chép</div>
        </div>
        <transition name="popup">
          <duplicate-popup
            v-if="isShowDuplicatePopup"
            @closePopup="isShowDuplicatePopup = $event"
          ></duplicate-popup>
        </transition>
      </div>
      <div class="list--group-item mt_2">
        <div class="item--content d_flex align_items_center position_relative">
          <icon-base
            class="icon icon--watch mr_2"
            height="14px"
            width="14px"
            viewBox="0 0 280 280"
          >
            <icon-watch></icon-watch>
          </icon-base>
          <div class="name">Theo dõi</div>
          <div class="status text_center position_absolute">
            <icon-base
              class="icon--check"
              height="10px"
              width="10px"
              viewBox="0 0 500 500"
            >
              <icon-check></icon-check>
            </icon-base>
          </div>
        </div>
      </div>
      <div class="list--group-item btn--delete mt_2"
           @click="showDeletePopup"
      >
        <div class="item--content d_flex align_items_center">
          <icon-base
            class="icon icon--remove mr_2"
            height="14px"
            width="14px"
            viewBox="0 0 16 16"
          >
            <icon-remove></icon-remove>
          </icon-base>
          <div class="name">Xóa</div>
        </div>
      </div>
    </div>
    <!-- End: Actions -->
    <!-- Start: Btn submit -->
    <div class="btn--submit mt_4"
         :style="{ backgroundColor: event.color }"
         v-if="event._id"
         @click="updateEvent"
    >
      Cập nhật
    </div>
    <div class="btn--submit mt_4"
         v-else
         @click="createNewEvent"
    >
      Tạo mới
    </div>
    <!-- End: Btn submit -->
  </div>
</template>

<script>
import AdvanceContentPopup from  "../popup/advancecontent";
import DuplicatePopup from "../popup/duplicate";

export default {
  components: {
    AdvanceContentPopup,
    DuplicatePopup
  },
  props: [ "errorLocation" ],
  data() {
    return {
      isShowAdvanceContentPopup: false,
      isShowDuplicatePopup: false
    }
  },
  computed: {
    event() {
      return this.$store.getters.event;
    }
  },
  methods: {
    close(){
      this.$store.dispatch( "setCaseEvent", {
        key: "popup",
        value: false
      } );
    },
    async createNewEvent() {
      if ( this.event.post_custom.length === 0 && !this.event.post_category ) {
        this.errorPost = true;
        return false;
      } else if ( this.event.target_custom.length === 0 &&
        !this.event.target_category &&
        this.event.timeline.length === 0
      ) {
        this.errorLocation = true;
        return false;
      }

      // Close popup
      this.close();

      await this.$store.dispatch( "createEvent", {
        campaignId: this.$route.params.campaignId,
        event: this.event
      } );

      this.$store.dispatch( "setEventReset" );
    },
    showAdvanceContentPopup() {
      this.isShowAdvanceContentPopup = true;
      this.isShowDuplicatePopup = false;
    },
    showDuplicatePopup() {
      this.isShowDuplicatePopup = true;
      this.isShowAdvanceContentPopup = false;
    },
    showDeletePopup() {
      this.$emit( "showDeletePopup", true );
    },
    async updateEvent() {
      // Close popup
      this.close();

      // Convert event timeline to accounts id array
      let fbAccounts  = [];
      this.event.timeline.forEach( ( account ) => {
        fbAccounts.push( account._id );
      } );
      this.event.timeline = fbAccounts;

      await this.$store.dispatch( "updateEvent", {
        campaignId: this.$route.params.campaignId,
        event: this.event
      } );

      this.$store.dispatch( "setEventReset" );
    }
  }
}
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
