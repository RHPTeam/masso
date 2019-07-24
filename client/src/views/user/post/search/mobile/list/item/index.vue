<template>
  <div v-hammer:pan="(event)=> onPan(event)" class="item">
    <div
      :class="{ 'swipe-left': isTriggerAction , 'swipe-right': !isTriggerAction }"
      class="content item--body item--body-post p_2 mb_2 d_flex align_items_center"
      @click="showPost"
    >
      <div class="right">
        <div class="title pb_1">{{ item.content }}</div>
        <div class="more d_flex align_items_center">
          <div class="mr_auto">
            <icon-base
              class="mr_1"
              icon-name="icon-like"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-like />
            </icon-base>
            <span>{{ item.like }}</span>
          </div>
          <div class="ml_auto">
            <icon-base
              class="mr_1"
              icon-name="icon-share"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-share />
            </icon-base>
            <span>{{ item.share }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="content item--body item--body-action p_2 mb_2 d_flex align_items_center"
      @click="showPost"
    >
      <div class="left action pl_2 text_center ml_auto">
        <icon-base icon-name="icon-info" viewBox="0 0 18 18">
          <icon-info />
        </icon-base>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      isTriggerAction: false
    };
  },
  methods: {
    showPost() {
      this.$emit("showPost", this.item);
    },
    addToContentStore() {
      this.showCreatePopup = true;
      this.$store.dispatch("updateDefaultPostByFbPost", {
        content: this.item.content,
        attachments: this.item.attachments
      });
    },
    onPan(event) {
      if (event.offsetDirection === 2) {
        this.isTriggerAction = true;
      }
      if (event.offsetDirection === 4) {
        this.isTriggerAction = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
// @import "../index.style";
.item--body {
  background-color: #27292d;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  overflow: hidden;
  .right {
    width: 100%;
    overflow: hidden;
  }
  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.item {
  position: relative;
  height: 3.5rem;
  width: 100%;
  margin: 0.5rem 0;
}
.item--body {
  height: 3.5rem;
  width: 100%;

  &-post {
    z-index: 2;
    position: absolute;
    // background: #2c2d32 !important;
  }
  &-action {
    z-index: 1;
    position: absolute;
    background: #212225 !important;
  }
}

.icon {
  &--delete {
    color: #ec2c49;
  }
  &--copy {
    color: white;
  }
}

.swipe {
  &-left {
    transform: translateX(-7rem);
    transition: 0.5s all;
  }
  &-right {
    transform: translateX(0);
    transition: 0.5s all;
  }
}
</style>
