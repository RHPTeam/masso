<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog">
      <div class="modal--content">
        <!-- Start: Modal Header -->
        <div class="modal--header d_flex align_items_center">
          <div @click="closePopup">
            <icon-base
              icon-name="arrow-down"
              class="arrow-down"
              width="20"
              height="20"
              viewBox="0 0 130 130"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
          <p class="name--modal mb_0">Đăng bài viết</p>
          <div class="button--done active mr_3" @click="postNow()">
            Đăng
          </div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="modal--body px_3">
          <div class="name--post mb_3">
            Tên bài viết:
            <b>{{ post.title }}</b>
          </div>

          <!-- Start: Target -->
          <app-timeline :postSchedule="postSchedule" @openTimer="showTimer = $event" @updatePostSchedule="postSchedule = $event"/>
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
      </div>
    </div>
  </div>
</template>

<script>
import AppTimeline from "./components/target/timline";
import Target from "./components/target";
import Timer from "./components/timer";

export default {
  components: {
    AppTimeline,
    Target,
    Timer
  },
  props: ["post"],
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
      this.$emit("closePopup", false);
    },
    postNow() {
      if (
        this.postSchedule._facebookId &&
        this.postSchedule._facebookId.length > 0
      ) {
        const dataSender = {
          id: this.post._id,
          objSender: {
            location: 0,
            _facebookId: this.postSchedule._facebookId,
            break_point: Number(this.postSchedule.breakPoint),
            started_at: this.postSchedule.started_at
          }
        };

        this.$store.dispatch("postNow", dataSender);
      } else if (
        this.postSchedule._groupId &&
        this.postSchedule._groupId.length > 0
      ) {
        const dataSender = {
          id: this.post._id,
          objSender: {
            location: 0,
            _groupId: this.postSchedule._groupId.map(item => item.groupId),
            break_point: Number(this.postSchedule.breakPoint),
            started_at: this.postSchedule.started_at
          }
        };

        this.$store.dispatch("postNow", dataSender);
      } else if (
        this.postSchedule._fanpageId &&
        this.postSchedule._fanpageId.length > 0
      ) {
        const dataSender = {
          id: this.post._id,
          objSender: {
            location: 0,
            _fanpageId: this.postSchedule._fanpageId.map(item => item.pageId),
            break_point: Number(this.postSchedule.breakPoint),
            started_at: this.postSchedule.started_at
          }
        };

        this.$store.dispatch("postNow", dataSender);
      }

      this.$emit("closePopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>

