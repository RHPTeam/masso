<template>
  <div v-hammer:pan="(event)=> onPan(event)" class="item">
    <div
      :class="{ 'swipe-left': isTriggerAction , 'swipe-right': !isTriggerAction }"
      class="item--body item--body-post d_flex align_items_center py_2 pl_2"
    >
      <div class="content" @click="showDetailPost">
        <div
          class="title"
        >{{ item.title !== undefined && item.title.length > 0 ? item.title : "Bài viết chưa có tiêu đề" }}</div>
      </div>
      <div class="status ml_auto">
        <span :class="[ item.status ? 'active' : 'deactive' ]"></span>
      </div>
    </div>
    <!-- Start: action posts -->
    <div class="item--body item--body-action d_flex align_items_center py_2 pl_2">
      <div class="d_flex ml_auto align_items_center justify_content_center pr_3 text_center">
        <span class="icon m_2" @click="showPopupCopy">
          <icon-base
            class="icon--copy"
            icon-name="duplicate"
            width="25"
            height="25"
            viewBox="0 0 520 520"
          >
            <icon-copy />
          </icon-base>
        </span>
      </div>
    </div>
    <!-- End: action posts -->
  </div>
</template>

<script>
export default {
  components: {},
  props: ["item"],

  data() {
    return {
      isTriggerAction: false
    };
  },
  computed: {},
  methods: {
    formatDate(d) {
      const dateTime = new Date(d);
      const date = String(dateTime.getDate()).padStart(2, "0");
      const month = String(dateTime.getMonth() + 1).padStart(2, "0");
      const year = dateTime.getFullYear();

      return `${date}/${month}/${year}`;
    },
    onPan(event) {
      if (event.offsetDirection === 2) {
        this.isTriggerAction = true;
      }
      if (event.offsetDirection === 4) {
        this.isTriggerAction = false;
      }
    },
    showDetailPost() {
      this.$emit("showDetailPost", this.item);
    },
    showPopupDelete() {
      this.$emit("showPopupDelete", this.item);
    },
    showPopupCopy() {
      this.$emit("showPopupCopy", this.item);
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  position: relative;
  height: 3.5rem;
  width: 100%;
}
.item--body {
  border-bottom: 1px solid #484848;
  height: 3.5rem;
  width: 100%;

  &-post {
    z-index: 2;
    position: absolute;
    background: #2c2d32;
  }
  &-action {
    z-index: 1;
    position: absolute;
    background: #212225;
  }
  .content {
    width: 100%;
    max-width: 90%;
    font-size: 0.875rem;
    overflow: hidden;
    .category--parent {
      font-size: 0.8125rem;
      color: #999;
    }
    .title {
    }
    .date {
      font-size: 0.8125rem;
      color: #999;
    }
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

.active {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: green;
  display: block;
  margin-right: 0.625rem;
}
.deactive {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: gray;
  display: block;
  margin-right: 0.625rem;
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
