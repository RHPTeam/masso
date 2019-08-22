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
        <vue-perfect-scrollbar class="modal--scroll my_3">
          <div class="modal--body">
            <!-- Start: Timer -->
            <timer
              :postSchedule="postSchedule"
              @updatePostSchedule="postSchedule = $event"
            ></timer>
            <!-- End: Timer -->
            <!-- Start: Target -->
            <target
              :postSchedule="postSchedule"
              @updatePostSchedule="postSchedule = $event"
            ></target>
            <!-- End: Target -->
          </div>
        </vue-perfect-scrollbar>
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
      postSchedule: {
        breakPoint: 10,
        _facebookId: []
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
      const dataSender = {
        id: this.post._id,
        dataSender: {
          "location": 0,
          "_facebookId": this.postSchedule._facebookId,
          "break_point": Number( this.postSchedule.breakPoint )
        }
      };
      this.$store.dispatch( "postNow", dataSender );
      this.$emit( "closePopup", false );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>

