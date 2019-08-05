<template>
  <div class="modal--search-mobile">
    <div class="modal--content">
      <!-- Start: Header - Search -->
      <div class="items--header d_flex align_items_center mb_3">
        <div @click="closePopup" v-if="isShowActionSave === false">
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
        <div class="save pl_2" v-else @click="upTypingText( postGroupDetail )">Lưu</div>
        <!-- <p class="">{{ postGroupDetail.title }}</p> -->
        <contenteditable
          class="name--modal mb_0 m_auto text_center"
          tag="div"
          placeholder="Nhập tên..."
          :contenteditable="true"
          :noNL="true"
          v-model="postGroupDetail.title"
          @keyup.enter="upTypingText( postGroupDetail )"
          @keydown="clearTypingTimer"
          @click="showActionSave"
          v-click-outside="closeActiveSave"
        />
        <div class="active mr_2" @click="showPopupDeletePostGroup">Xóa</div>
        <!-- <div class="active mr_2">
          <icon-base class="icon-plus" width="20" height="20" viewBox="0 0 68 68">
            <icon-plus />
          </icon-base>
        </div>-->
      </div>
      <!-- End: Header - Search -->
      <!-- Start: Search Near -->
      <!-- <div class="near px_3">
        <h6>Tìm kiếm gần đây</h6>
        <div class="list">
          <ul class="p_0 m_0" v-if="keyPopular && keyPopular.length > 0">
            <li v-for="(item, index) in keyPopular" :key="index">{{ item }}</li>
          </ul>
          <p v-else>Bạn chưa tìm gì.</p>
        </div>
      </div>-->
      <!-- End: Search Near -->
      <!-- Start: Main - Search -->
      <div class="items--body px_2">
        <!-- Start: List Content -->
        <vue-perfect-scrollbar class="infinite">
          <!-- <div v-for="(item, index) in listPostFacebookDefault" :key="index">
          <app-item :item="item"/>
        </div>
        <div v-if="this.$store.getters.listPostFacebookStatus === 'loading'" class="mt_3">
          <loading-component></loading-component>
        </div>
        <div
          v-if="this.$store.getters.listPostFacebookStatus === 'success' && listPostFacebookDefault.length === 0"
          class="item--body empty--data d_flex align_items_center justify_content_center px_2 py_2"
          >Không có dữ liệu</div>-->
          <div class="item d_flex align_items_center">
            <div
              class="profile tab"
              :class="isShowPopupProfile === true ? 'active' : ''"
              @click="showPopupProfile"
            >Trang cá nhân</div>
            <div
              class="fanpage tab"
              :class="isShowPopupFanpage === true ? 'active' : ''"
              @click="showPopupFanpage"
            >Fanpage</div>
            <div
              class="group tab"
              :class="isShowPopupGroup === true ? 'active' : ''"
              @click="showPopupGroup"
            >Group</div>
          </div>
          <div class="content mt_2">
            <!-- Start: Profile -->
            <div class="profile" v-if="isShowPopupProfile === true">
              <div
                class="py_2 text_center"
                v-if="postGroupDetailProfile.length === 0"
              >Không có trang cá nhân nào!!!</div>
              <div
                v-else
                class="item--content d_flex align_items_center py_2"
                v-for="profile in postGroupDetailProfile"
                :key="profile.userInfo.id"
                :for="profile.userInfo.id"
              >
                <div class="col col--name d_flex align_items_center">
                  <div class="avatar px_2">
                    <img alt="avatar" width="30px" height="30px" :src="profile.userInfo.thumbSrc" />
                  </div>
                  <span class="col col--name-text">{{ profile.userInfo.name }}</span>
                </div>
                <div class="col col--checkbox pr_3 ml_auto">
                  <label class="custom--checkbox mb_0">
                    <input
                      type="checkbox"
                      v-model="postGroupProfileSelected"
                      :value="profile.userInfo.id"
                    />
                  </label>
                </div>
              </div>
            </div>
            <!-- Start: Fanpage -->
            <div class="fanpage" v-if="isShowPopupFanpage === true">
              <div
                class="py_2 text_center"
                v-if="postGroupDetailPage.length === 0"
              >Không có trang nào!!!</div>
              <div
                v-else
                class="item--content d_flex align_items_center py_2"
                v-for="fanpage in postGroupDetailPage"
                :key="fanpage.pageId"
                :for="fanpage.pageId"
              >
                <div class="col col--name d_flex align_items_center">
                  <div class="avatar px_2">
                    <img alt="avatar" width="30px" height="30px" :src="fanpage.profile_picture" />
                  </div>
                  <span class="col col--name-text">{{ fanpage.name }}</span>
                </div>
                <div class="col col--checkbox pr_3 ml_auto">
                  <label class="custom--checkbox mb_0">
                    <input type="checkbox" v-model="postGroupPagesSelected" :value="fanpage.pageId" :id="fanpage.pageId" />
                  </label>
                </div>
              </div>
            </div>
            <!-- Start: Group -->
            <div class="group" v-if="isShowPopupGroup === true">
              <div
                class="py_2 text_center"
                v-if="postGroupDetailGroup.length === 0"
              >Không có nhóm nào!!!</div>
              <div
                v-else
                class="item--content d_flex align_items_center py_2"
                v-for="group in postGroupDetailGroup"
                :key="group.groupId"
                :for="group.groupId"
              >
                <div class="col col--name d_flex align_items_center">
                  <div class="avatar px_2">
                    <img alt="avatar" width="30px" height="30px" :src="group.profile_picture" />
                  </div>
                  <span class="col col--name-text">{{ group.name }}</span>
                </div>
                <div class="col col--checkbox pr_3 ml_auto">
                  <label class="custom--checkbox mb_0">
                    <input type="checkbox" v-model="postGroupGroupsSelected" :value="group.groupId" :id="group.groupId" />
                  </label>
                </div>
              </div>
            </div>
            <!-- Start: Post group -->
          </div>
        </vue-perfect-scrollbar>
        <!-- Start: List Content -->
      </div>
      <div
        class="items--footer d_flex align_items_center p_2"
        v-if="postGroupGroupsSelected.length > 0 || postGroupPagesSelected.length > 0 || postGroupProfileSelected.length > 0"
      >
        <div class="cancel mr_auto" @click="showDeletePopupPageGroup">Xóa khỏi nhóm</div>
        <div class="add ml_auto" @click="showPopupAddToGroup">Thêm vào nhóm</div>
      </div>
      <!-- End: Main - Search -->
    </div>
    <!-- Start: Transition -->
    <transition name="popup">
      <add-to-group
        v-if="isShowAddToGroup === true"
        @closePopupAddGroup="isShowAddToGroup = $event"
      />
    </transition>
    <!-- End: Transition -->
    <!-- Start: Popup delete -->
    <transition name="popup--delete">
      <popup-delete-page-group
        @closePopup="isShowPopupDeletePageGroup = $event"
        v-if="isShowPopupDeletePageGroup === true"
        title="trang cá nhân, nhóm và trang"
        storeActionName="deletePagesNGroupsFromPostGroup"
        :targetData="targetDeletePopupData"
      />
      <popup-delete-post-group
        title="nhóm"
        :name="postGroupDetail.title"
        v-if="isShowPopupDeletePostGroup === true"
        @closePopup="isShowPopupDeletePostGroup = $event"
        storeActionName="deletePostGroup"
        :targetData="{ id: postGroupDetail._id }"
      />
    </transition>
    <!-- End: Popup delete -->
  </div>
</template>

<script>
import AddToGroup from "../popup/addgroup";
import PopupDeletePageGroup from "../popup/delete";
import PopupDeletePostGroup from "@/components/popups/mobile/delete";

let typingTimer;
export default {
  components: {
    AddToGroup,
    PopupDeletePageGroup,
    PopupDeletePostGroup
  },
  data() {
    return {
      targetDeletePopupData: {},
      isShowPopupFanpage: false,
      isShowPopupGroup: false,
      isShowAddToGroup: false,
      isShowPopupDeletePageGroup: false,
      isShowPopupDeletePostGroup: false,
      isShowPopupProfile: true,
      isShowActionSave: false
    };
  },
  computed: {
    postGroupDetail() {
      return this.$store.getters.postGroupDetail;
    },
    postGroupDetailProfile() {
      return this.postGroupDetail._timeline;
    },
    postGroupDetailPage() {
      return this.postGroupDetail._pages;
    },
    postGroupDetailGroup() {
      return this.postGroupDetail._groups;
    },
    postGroupDetailStatus() {
      return this.$store.getters.postGroupDetailStatus;
    },
    postGroupGroupsSelected: {
      get() {
        return this.$store.getters.postGroupGroupsSelected;
      },
      set(val) {
        this.$store.dispatch("postGroupGroupsSelected", val);
      }
    },
    postGroupProfileSelected: {
      get() {
        return this.$store.getters.postProfileSelected;
      },
      set(val) {
        this.$store.dispatch("postProfileSelected", val);
      }
    },
    postGroupPagesSelected: {
      get() {
        return this.$store.getters.postGroupPagesSelected;
      },
      set(val) {
        this.$store.dispatch("postGroupPagesSelected", val);
      }
    }
  },
  methods: {
    clearTypingTimer() {
      clearTimeout(typingTimer);
    },
    closePopup() {
      this.$emit("closePopup", false);
    },
    closeActiveSave() {
      this.isShowActionSave = false;
    },
    showActionSave() {
      this.isShowActionSave = true;
    },
    showPopupProfile() {
      this.isShowPopupProfile = true;
      this.isShowPopupFanpage = false;
      this.isShowPopupGroup = false;
    },
    showDeletePopupPageGroup() {
      this.targetDeletePopupData = {
        id: this.postGroupDetail._id,
        _pages: this.postGroupPagesSelected,
        _groups: this.postGroupGroupsSelected,
        _timeline: this.postGroupProfileSelected
      };
      this.isShowPopupDeletePageGroup = true;
    },
    showPopupFanpage() {
      this.isShowPopupFanpage = true;
      this.isShowPopupGroup = false;
      this.isShowPopupProfile = false;
    },
    showPopupGroup() {
      this.isShowPopupFanpage = false;
      this.isShowPopupGroup = true;
      this.isShowPopupProfile = false;
    },
    showPopupAddToGroup() {
      this.isShowAddToGroup = true;
    },
    showPopupDeletePostGroup() {
      this.isShowPopupDeletePostGroup = true;
    },
    async upTypingText(gr) {
      await clearTimeout(typingTimer);

      typingTimer = await setTimeout(this.updatePostGroup(gr), 1000);
      this.isShowActionSave = false;
    },
    updatePostGroup(gr) {
      const objSender = {
        postGroupId: gr._id,
        title: gr.title,
        _pages: [],
        _groups: [],
        _timeline: []
      };
      this.$store.dispatch("updateTitlePostGroup", objSender);
    }
  }
};
</script>

<style scoped lang="scss">
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
    .items--header {
      padding: 0.625rem 0;
      border-bottom: 1px solid #484848;
      .arrow-down {
        transform: rotate(90deg);
        margin-left: 0.5rem;
      }
      .name--modal {
        font-size: 1.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 50%;
        outline: none;
      }
      .active {
        color: #e62b33;
      }
    }
    .items--body {
      .avatar {
        img {
          border-radius: 100%;
        }
      }
      .item {
        .tab {
          text-align: center;
          flex: 1;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #444;
          &.active {
            color: #ffb94a;
            border-color: #ffb94a;
          }
        }
      }
    }
    .near {
      .list {
        li {
          list-style: none;
          border-bottom: 1px solid #444;
          padding: 0.5rem 0;
        }
      }
    }
    .items--footer {
      position: fixed;
      border-top: 1px solid #454545;
      bottom: 0;
      left: 0;
      width: 100%;
      .cancel {
        color: #e62b33;
      }
    }
  }
}
.profile,
.fanpage,
.group,
.post--group {
  .item--content {
    border-bottom: 1px solid #484848;
  }
  .col--checkbox {
    height: 20px;
  }
  .custom--checkbox {
    input[type="checkbox"] {
      border-radius: 50%;
      border: solid 1.5px #cccccc;
      cursor: pointer;
      height: 20px;
      outline: none;
      width: 20px;
      -webkit-appearance: none;
      -moz-appearance: none;
      &:checked {
        background-color: #ffb94a;
        border: solid 1px #ffb94a;

        &:before {
          border-bottom: 2px solid #fff;
          border-right: 2px solid #fff;
          content: "";
          display: block;
          height: 10px;
          position: relative;
          left: 50%;
          top: 42%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 7px;
        }
      }
    }
  }
  .col--name {
    width: 100%;
    overflow: hidden;
    .avatar .img {
      border-radius: 50%;
    }
    &-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90%;
    }
  }
}
.infinite {
  max-height: calc(100vh - 112px);
}
.infinite--control-block {
  width: 100%;
  #scrollTrigger {
    height: 30px;
  }
  .circle--loading {
    animation: animate 1.5s infinite linear;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top: 3px solid #fff;
    height: 30px;
    margin-left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
  }

  @keyframes animate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
}
.popup-enter {
  transform: translateY(100%);
}

.popup-enter-to {
  transition: transform 0.5s;
  transform: translateY(0);
}

.popup-leave-to {
  transition: transform 0.5s;
  transform: translateY(100%);
}
</style>
