<template>
  <div v-hammer:pan="(event)=> onPan(event)" class="item">
    <div
      :class="{ 'swipe-left': isTriggerAction , 'swipe-right': !isTriggerAction }"
      class="item--body item--body-post d_flex align_items_center"
    >
      <div class="col col--category pl_3 pr_2">{{ item.title }}</div>
      <div class="col col--posts text_center">{{item.postList.length}}</div>
    </div>
    <div class="item--body item--body-action d_flex align_items_center">
      <div class="action align_items_center">
        <span class="ml_2" @click="showPopupDuplicate">
          <icon-base class="icon--copy m_2" icon-name="duplicate" width="25" height="25" viewBox="0 0 520 520">
            <icon-copy />
          </icon-base>
        </span>
      </div>
    </div>
    <transition name="popup-delete">
      <popup-duplicate :deleteTargets="duplicateCategories" @closePopup="closePopupDuplicate" v-if="isShowPopupDuplicate === true" :name="item.title"/>
    </transition>
  </div>
</template>

<script>
import PopupDuplicate from "../popup/duplicate";
export default {
  props: ["item"],
  data() {
    return {
      isShowPopupDuplicate: false,
      isTriggerAction: false
    };
  },
  components: {
    PopupDuplicate
  },
  methods: {
    closePopupDuplicate() {
      this.isShowPopupDuplicate = false;
    },
    async duplicateCategories() {
      await this.$store.dispatch("duplicateCategoriesDefault", this.item._id);

      // const dataSenderCategory = {
      //   size: 25,
      //   page: 1
      // };

      // await this.$store.dispatch("getCategoriesByPage", dataSenderCategory);
      // const dataSenderPost = {
      //   size: 25,
      //   page: 1
      // };

      // await this.$store.dispatch("getPostsByPage", dataSenderPost);
      this.$emit("showCategory", false);
    },
    onPan(event) {
      if (event.offsetDirection === 2) {
        this.isTriggerAction = true;
      }
      if (event.offsetDirection === 4) {
        this.isTriggerAction = false;
      }
    },
    showPopupDuplicate() {
      this.isShowPopupDuplicate = true;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../index.style";
// Popup Duplicate
.popup-delete-enter {
  transform: translateY(100%);
}

.popup-delete-enter-to {
  transition: transform 0.2s;
  transform: translateY(0);
}

.popup-delete-leave-to {
  transition: transform 0.2s;
  transform: translateY(100%);
}

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
    background: #2c2d32 !important;
  }
  &-action {
    z-index: 1;
    position: absolute;
    background: #212225 !important;
  }
}

.action {
  margin-left: auto;
}

.icon {
  &--copy {
    color: #ffffff;
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
