<template>
  <div class="item--body d_flex align_items_center">
    <div class="col col--category p_2" @click="showPopupEdit">
      <div class="">{{ item.title }}</div>
      <div class="desc">{{ item.description }}</div>
    </div>
    <div class="col col--posts text_center ml_auto">{{ item.totalPosts }}</div>
    <div class="action align_items_center">
      <div class="ml_2 mr_1" @click="showDeletePopup(item)">
        <icon-base icon-name="Xóa" width="20" height="20" viewBox="0 0 15 15">
          <icon-remove />
        </icon-base>
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
      <popup-edit-category @closePopup="isShowPopupEdit = $event" v-if="isShowPopupEdit === true" :item="item"
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
      isShowPopupEdit: false
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";

.item--body {
  min-height: 48px;
  border-bottom: 1px solid #484848;
  &:last-child {
    // border-bottom-left-radius: 0.625rem;
    // border-bottom-right-radius: 0.625rem;
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
