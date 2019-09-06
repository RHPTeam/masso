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
      </div>
      <!-- End: Header - Search -->

      <!-- Start: Main - Search -->
      <div class="items--body px_2">
        <!-- Start: List Content -->
        <vue-perfect-scrollbar class="infinite">
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
              <label
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
              </label>
            </div>
            <!-- Start: Fanpage -->
            <div class="fanpage" v-if="isShowPopupFanpage === true">
              <div
                class="py_2 text_center"
                v-if="postGroupDetailPage.length === 0"
              >Không có trang nào!!!</div>
              <label
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
              </label>
            </div>
            <!-- Start: Group -->
            <div class="group" v-if="isShowPopupGroup === true">
              <div
                class="py_2 text_center"
                v-if="postGroupDetailGroup.length === 0"
              >Không có nhóm nào!!!</div>
              <label
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
              </label>
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
@import "./index.style";
</style>
