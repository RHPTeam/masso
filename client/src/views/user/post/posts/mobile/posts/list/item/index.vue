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
        <div class="category--parent">
          <span
            v-for="(category, index) in item._categories"
            :key="`c-${index}`"
          >{{ category.title + [ index === item._categories.length - 1 ? '' : ', ' ] }}</span>
        </div>
      </div>
    </div>
    <!-- Start: action posts -->
    <div class="item--body item--body-action d_flex align_items_center py_2 pl_2">
      <div
        class="col col--action d_flex align_items_center justify_content_center pr_3 text_center"
      >
        <span class="icon m_2" @click="showPopupDelete">
          <icon-base
            class="icon--delete"
            icon-name="Xóa"
            width="25"
            height="25"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </span>
        <span class="icon m_2">
          <icon-base
            class="icon--post-now"
            icon-name="Đăng ngay"
            width="25"
            height="25"
            viewBox="0 0 506 506"
          >
            <icon-post-now />
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
    showDetailPost() {
      this.$emit("showDetailPost", this.item);
    },
    showPopupDelete() {
      this.$emit("showPopupDelete", this.item);
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
.item {
  position: relative;
  height: 4rem;
  width: 100%;
}
.item--body {
  border-bottom: 1px solid #484848;
  height: 4rem;
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
    .title,
    .category--parent {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.icon {
  &--delete {
    color: #ec2c49;
  }
  &--post-now {
    color: #ff923c;
  }
}

.col {
  &--action {
    margin-left: auto;
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
