<template>
  <div class="modal--confirm-password">
    <!-- Start: Header -->
    <div class="items--header d_flex align_items_center">
      <div @click="closeKeywords">
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
      <p class="name--modal mb_0">Từ khóa</p>
      <div class="active mr_2" @click="showPopupAddKeywords">
        <icon-base class="icon-plus" width="20" height="20" viewBox="0 0 68 68">
          <icon-plus />
        </icon-base>
      </div>
    </div>
    <!-- End: Header -->
    <!-- Start: Main -->
    <div class="items--main mt_3 px_3">
      <div class="list">
        <p class="mb_2 title">Danh sách từ khóa</p>
        <ul class="p_0 m_0">
          <li v-for="keyword in user.keywords" v-bind:key="keyword.id" class="d_flex align_items_center item">
            <span>{{keyword}}</span>
            <span class="ml_auto" @click="showPopupDelete">Xóa</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- End: Main -->
    <!-- Start: Popup Mobile -->
    <transition name="popup--mobile">
      <popup-add-keywords
        @closeAddKeywords="isShowPopupAddKeywords = $event"
        v-if="isShowPopupAddKeywords === true"
      />
    </transition>
    <!-- End: Popup Mobile -->
    <!-- Start: Popup Delete -->
    <transition name="popup-delete">
      <popup-delete
        @closePopupDelete="isShowPopupDelete = $event"
        v-if="isShowPopupDelete === true"
      />
    </transition>
    <!-- End: Popup Delete -->
  </div>
</template>

<script>
import PopupDelete from "../../components/deletekeyword";
import PopupAddKeywords from "../addkeywords";
export default {
  components: {
    PopupAddKeywords,
    PopupDelete
  },
  data() {
    return {
      isShowPopupAddKeywords: false,
      isShowPopupDelete: false
    };
  },
  computed: {
    user() {
      if (
        this.$store.getters.userInfo === undefined ||
        this.$store.getters.userInfo === ""
      ) {
        return;
      }
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    closeKeywords() {
      this.$emit("closeKeywords", false);
    },
    showPopupAddKeywords() {
      this.isShowPopupAddKeywords = true;
    },
    showPopupDelete() {
      this.isShowPopupDelete = true;
    }
  }
};
</script>

<style scoped lang="scss">
// Start: Transition
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
// Popup Delete
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
// End: Transition
.modal--confirm-password {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #2f3136;
  color: #ccc;
  z-index: 10;
  font-size: 0.875rem;
  .items--header {
    padding: 0.625rem 0;
    border-bottom: 1px solid #ccc;
    .arrow-down {
      transform: rotate(90deg);
      margin-left: 0.5rem;
    }
    .name--modal {
      margin: auto;
    }
  }
  .items--main {
    .list {
      .title {
        font-size: 1rem;
      }
      .item {
        padding: 0.55rem 0;
        border-bottom: 1px solid #cccccc57;
      }
    }
  }
}
</style>
