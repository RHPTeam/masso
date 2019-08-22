<template>
  <div class="modal--search-mobile">
    <div class="modal--content">
      <!-- Start: Header - Search -->
      <div class="items--header d_flex align_items_center p_3">
        <div class="list--input d_flex justify_content_between align_items_center">
          <span class="ml_3 mt_1">
            <icon-base icon-name="Tìm kiếm" width="20" height="20" viewBox="0 0 20 20">
              <icon-input-search />
            </icon-base>
          </span>
          <input type="text" placeholder="Tìm kiếm thành viên" v-model="keyword" @keydown.enter="searchMemberOfAgency" />
        </div>
        <div class="cancel ml_auto" @click="closePopup">Hủy</div>
      </div>
      <!-- End: Header - Search -->
      <!-- Start: Main -->
      <div v-if="!infoMember" class="text_center my_2">Không có kết quả tìm kiếm!</div>
      <div class="items--body mx_3" v-else>
        <app-item :member="infoMember" @openEdit="isShowPopupDetail = $event"/>
      </div>
      <!-- End: Main -->
    </div>
    <transition name="popup--mobile">
      <popup-detail v-if="isShowPopupDetail === true" @closePopup="isShowPopupDetail = $event"/>
    </transition>
  </div>
</template>

<script>
import AppItem from "../../item";
import PopupDetail from "../detail";
export default {
  components: {
    AppItem,
    PopupDetail
  },
  data() {
    return {
      keyword: "",
      isShowPopupDetail: false
    };
  },
  computed: {
    infoMember() {
      return this.$store.getters.infoOfMember[0];
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    searchMemberOfAgency() {
      this.$store.dispatch("searchMemberByAgency", this.keyword);
    }
  }
};
</script>

<style scoped lang="scss">
  .modal--search-mobile {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #2f3136;
  z-index: 10;
  .modal--content {
    font-size: 0.875rem;
  }
  .items--header {
    .list--input {
      border-radius: 10px;
      font-size: 0.875rem;
      height: 40px;
      background: #27292d;
      width: calc(100vw - 2rem - 35px);
      > input[type="text"] {
        background-color: transparent;
        border: 0;
        color: #fff;
        height: 100%;
        outline: none;
        width: calc(100% - 48px);
        padding-right: 15px;
        &::placeholder {
          color: #666;
        }
      }
      svg {
        color: #999;
      }
    }
  }
  .items--body {
    background-color: #272a2c;
    color: #F7F7F7;
    min-height: 48px;
    transition: background-color .4s ease;
  
    .info {
      width: 100%;
    }
    .col--category {
      white-space: nowrap; 
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .col--action {
      // width: 20%;
      text-align: center;
      svg {
        color: #999;
        cursor: pointer;
        transition: all 0.4s ease;
        &:hover {
          color: #ffb94a;
        }
      }
    }
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
}
</style>
