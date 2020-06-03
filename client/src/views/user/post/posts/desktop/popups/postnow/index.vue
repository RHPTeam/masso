<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_4 py_4" v-click-outside="closePopup">
        <!-- Start: Modal Header -->
        <div class="modal--header">
          <div class="title">Đăng bài viết
            <span>&quot;{{ post.title }}&quot;</span>
          </div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="modal--body">
            <!-- Start: Target -->
            <target
              :postSchedule="postSchedule"
              @changeTimer ="showTimer = $event"
              @updatePostSchedule="postSchedule = $event"
            ></target>
            <!-- End: Target -->

            <!-- Start: Timer -->
            <transition name="faded">
              <timer
                class="mt_4"
                v-if="showTimer === true"
                :postSchedule="postSchedule"
                @updatePostSchedule="postSchedule = $event"
              ></timer>
            </transition>
            <!-- End: Timer -->
          </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button
            class="btn--skip"
            @click="closePopup()"
          > {{ $t('chat.common.popup.delete.cancle') }} </button>
          <button
            class="btn--submit"
            @click="postNow()"
          > ĐĂNG NGAY </button>
        </div>
        <!-- Start: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script>
import Target from  "./components/target";
import Timer from "./components/timer";

export default {
  components: {
    Target,
    Timer
  },
  props: [ "post" ],
  data() {
    return {
      showTimer: false,
      postSchedule: {
        breakPoint: 10,
        started_at: new Date(),
        _facebookId: [],
        _groupId: [],
        _fanpageId: []
      }
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    },
    postNow() {
      if(this.postSchedule._facebookId && this.postSchedule._facebookId.length > 0)  {

        const dataSender = {
          id: this.post._id,
          objSender: {
            "location": 0,
            "_facebookId": this.postSchedule._facebookId,
            "break_point": Number( this.postSchedule.breakPoint ),
            "started_at": this.postSchedule.started_at
          }
        };

        this.$store.dispatch( "postNow", dataSender );

      }

      else if(this.postSchedule._groupId && this.postSchedule._groupId.length > 0) {

        const dataSender = {
          id: this.post._id,
          objSender: {
            "location": 0,
            "_groupId": this.postSchedule._groupId.map(item => item.groupId),
            "break_point": Number( this.postSchedule.breakPoint ),
            "started_at": this.postSchedule.started_at
          }
        };

        this.$store.dispatch( "postNow", dataSender );

      }

      else if(this.postSchedule._fanpageId && this.postSchedule._fanpageId.length > 0){

        const dataSender = {
          id: this.post._id,
          objSender: {
            "location": 0,
            "_fanpageId": this.postSchedule._fanpageId.map(item => item.pageId),
            "break_point": Number( this.postSchedule.breakPoint ),
            "started_at": this.postSchedule.started_at
          }
        };

        this.$store.dispatch( "postNow", dataSender );
      }

      this.$emit( "closePopup", false );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>

