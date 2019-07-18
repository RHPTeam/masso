<template>
  <div v-hammer:pan="(event)=> onPan(event)" class="item">
    <div
      :class="{ 'swipe-left': isTriggerAction , 'swipe-right': !isTriggerAction }"
      class="item--body item--body-post d_flex align_items_center"
    >
      <div class="col col--category p_2" @click="showPopupEdit">
        <div class>{{ item.title }}</div>
        <div class="desc">{{ item.description }}</div>
      </div>
      <div class="col col--posts text_center ml_auto">{{ item.totalPosts }}</div>
    </div>
    <div class="item--body item--body-action d_flex align_items_center">
      <div class="action align_items_center">
        <div class="ml_2 mr_1" @click="showDeletePopup(item)">
          <icon-base class="icon--delete m_2" icon-name="Xóa" width="25" height="25" viewBox="0 0 15 15">
            <icon-remove />
          </icon-base>
        </div>
      </div>
    </div>
    <!-- Start: Transition Popup Delete Category -->
    <transition name="popup--delete">
      <popup-delete
        title="danh mục"
        :name="item.title"
        v-if="isShowPopupDelete === true"
        @closePopup="isShowPopupDelete = $event"
        storeActionName="deleteCategory"
        :targetData="targetDataDelete"
      />
    </transition>
    <!-- End: Transition Popup Delete Category -->
    <!-- Start: Transition Popup Edit Category -->
    <transition name="popup--mobile">
      <popup-edit-category
        @closePopup="isShowPopupEdit = $event"
        v-if="isShowPopupEdit === true"
        :item="item"
      />
    </transition>
    <!-- End: Transition Popup Edit Category -->
  </div>
</template>

<script>
import PopupEditCategory from "./edit";
import PopupDelete from "@/components/popups/mobile/delete";
export default {
  components: {
    PopupDelete,
    PopupEditCategory
  },
  props: ["item"],
  data() {
    return {
      targetDataDelete: {},
      isShowPopupDelete: false,
      isShowPopupEdit: false,
      isTriggerAction: false
    };
  },
  methods: {
    updateCategory() {
      this.$emit("updateCategory", this.item);
    },
    showDeletePopup(category) {
      this.categoryDelete = category;
      this.targetDataDelete = {
        id: category._id,
        size: 25,
        page: 1
      };
      this.isShowPopupDelete = true;
    },
    showPopupEdit() {
      this.isShowPopupEdit = true;
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

<style lang="scss" scoped>
@import "../index.style";
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
  &--delete {
    color: #ec2c49;
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
// Popup Delete
.popup--delete-enter {
  transform: translateY(100%);
}

.popup--delete-enter-to {
  transition: transform 0.2s;
  transform: translateY(0);
}

.popup--delete-leave-to {
  transition: transform 0.2s;
  transform: translateY(100%);
}

.popup--mobile-enter {
  transform: translateX(100%);
}

.popup--mobile-enter-to {
  transition: transform 0.75s;
  transform: translateX(0);
}

.popup--mobile-leave-to {
  transition: transform 0.75s;
  transform: translateX(100%);
}
</style>
