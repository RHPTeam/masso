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
          <input type="text" placeholder="Tìm kiếm" v-model="search" />
        </div>
        <div class="cancel ml_auto" @click="closePopupSearch">Hủy</div>
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
              class="fanpage tab"
              :class="isShowPopupFanpage === true ? 'active' : ''"
              @click="showPopupFanpage"
            >Fanpage</div>
            <div
              class="group tab"
              :class="isShowPopupGroup === true ? 'active' : ''"
              @click="showPopupGroup"
            >Group</div>
            <div
              class="postgroup tab"
              :class="isShowPopupPostGroup === true ? 'active' : ''"
              @click="showPopupPostGroup"
            >Post Group</div>
          </div>
          <div class="content mt_2">
            <!-- Start: Fanpage -->
            <div class="fanpage" v-if="isShowPopupFanpage === true">
              <div
                class="item--content text_center"
                v-if="facebookPagesSearch.length === 0"
              >Không có Fanpage nào!</div>
              <div
                v-else
                class="item--content d_flex align_items_center py_2"
                v-for="(fanpage, index) in facebookPagesSearch"
                :key="`f+${index}`"
              >
                <div class="col col--name d_flex align_items_center">
                  <div class="avatar px_2">
                    <img alt="avatar" width="30px" height="30px" :src="fanpage.profile_picture" />
                  </div>
                  <span class="col col--name-text">{{ fanpage.name }}</span>
                </div>
                <div class="col col--checkbox pr_3 ml_auto">
                  <label class="custom--checkbox mb_0">
                    <input type="checkbox" v-model="postGroupPagesSelected" :value="fanpage.pageId" />
                  </label>
                </div>
              </div>
            </div>
            <div class="group" v-if="isShowPopupGroup === true">
              <div
                class="item--content text_center"
                v-if="facebookGroupsSearch.length === 0"
              >Không có Group nào!</div>
              <div
                v-else
                class="item--content d_flex align_items_center py_2"
                v-for="(group, index) in facebookGroupsSearch"
                :key="`g+${index}`"
              >
                <div class="col col--name d_flex align_items_center">
                  <div class="avatar px_2">
                    <img alt="avatar" width="30px" height="30px" :src="group.profile_picture" />
                  </div>
                  <span class="col col--name-text">{{ group.name }}</span>
                </div>
                <div class="col col--checkbox pr_3 ml_auto">
                  <label class="custom--checkbox mb_0">
                    <input type="checkbox" v-model="postGroupGroupsSelected" :value="group.groupId" />
                  </label>
                </div>
              </div>
            </div>
            <div class="post--group" v-if="isShowPopupPostGroup === true">
              <div
                class="item--content text_center"
                v-if="postGroupsSearch.length === 0"
              >Không có nhóm được tạo nào!</div>
              <div
                v-else
                class="item--content d_flex align_items_center py_2"
                v-for="(postgroup, index) in postGroupsSearch"
                :key="`pg+${index}`"
                @click="showPopupDetailPostgroup(postgroup._id, index)"
              >
                <div class="col col--name d_flex align_items_center">
                  <div class="avatar px_2">
                    <!-- <img alt="avatar" width="30px" height="30px"> -->
                  </div>
                  <span class="col col--name-text">{{ postgroup.title }}</span>
                </div>
                <div class="col col--checkbox ml_auto">
                  <icon-base
                    icon-name="arrow-down"
                    class="icon--arrow-right"
                    width="10"
                    height="10"
                    viewBox="0 0 130 130"
                  >
                    <icon-arrow-down />
                  </icon-base>
                </div>
              </div>
            </div>
            <!-- Start: Group -->
            <!-- Start: Post group -->
          </div>
        </vue-perfect-scrollbar>
        <!-- Start: List Content -->
      </div>
      <div
        class="items--footer d_flex align_items_center p_2"
        v-if="postGroupGroupsSelected.length > 0 || postGroupPagesSelected.length > 0"
      >
        <!-- <div class="cancel mr_auto">Hủy</div> -->
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
    <transition name="popup--mobile">
      <popup-detail-group @closePopup="isShowPopupDetailGroup = $event" v-if="isShowPopupDetailGroup === true && postGroupDetail._id"/>
    </transition>
    <!-- End: Transition -->
  </div>
</template>

<script>
import AddToGroup from "../addgroup";
import PopupDetailGroup from "../../detail";
export default {
  components: {
    AddToGroup,
    PopupDetailGroup
  },
  data() {
    return {
      currentIndex: null,
      search: "",
      isShowPopupFanpage: true,
      isShowPopupGroup: false,
      isShowPopupPostGroup: false,
      isShowAddToGroup: false,
      isShowPopupDetailGroup: false
    };
  },
  computed: {
    facebookPages() {
      return this.$store.getters.facebookPages;
    },
    facebookGroups() {
      return this.$store.getters.facebookGroups;
    },
    facebookGroupsSearch() {
      return this.facebookGroups.filter(item => {
        return item.name
          .toString()
          .toLowerCase()
          .includes(this.search.toString().toLowerCase());
      });
    },
    facebookPagesSearch() {
      return this.facebookPages.filter(item => {
        return item.name
          .toString()
          .toLowerCase()
          .includes(this.search.toString().toLowerCase());
      });
    },
    postGroupDetail() {
      return this.$store.getters.postGroupDetail;
    },
    postGroupGroupsSelected: {
      get() {
        return this.$store.getters.postGroupGroupsSelected;
      },
      set(val) {
        this.$store.dispatch("postGroupGroupsSelected", val);
      }
    },
    postGroupPagesSelected: {
      get() {
        return this.$store.getters.postGroupPagesSelected;
      },
      set(val) {
        this.$store.dispatch("postGroupPagesSelected", val);
      }
    },
    postGroups() {
      return this.$store.getters.postGroups;
    },
    postGroupsSearch() {
      return this.postGroups.filter(item => {
        return item.title
          .toString()
          .toLowerCase()
          .includes(this.search.toString().toLowerCase());
      });
    }
  },
  created() {
    const postGroupsNo = this.$store.getters.postGroups;
    if (postGroupsNo.length === 0) {
      this.$store.dispatch("getAllPostGroups");
    }
  },
  methods: {
    closePopupSearch() {
      this.$emit("closePopupSearch", false);
    },
    showPopupDetailPostgroup(id, index) {
      this.currentIndex = index;
      this.$store.dispatch( "getPostGroupById", id );
      this.$store.dispatch( "postGroupGroupsSelected", [] );
      this.$store.dispatch( "postGroupPagesSelected", [] );
      this.$store.dispatch( "postProfileSelected", [] );
      this.isShowPopupDetailGroup = true;
    },
    showPopupFanpage() {
      this.isShowPopupFanpage = true;
      this.isShowPopupGroup = false;
      this.isShowPopupPostGroup = false;
    },
    showPopupGroup() {
      this.isShowPopupFanpage = false;
      this.isShowPopupGroup = true;
      this.isShowPopupPostGroup = false;
    },
    showPopupPostGroup() {
      this.isShowPopupFanpage = false;
      this.isShowPopupGroup = false;
      this.isShowPopupPostGroup = true;
    },
    showPopupAddToGroup() {
      this.isShowAddToGroup = true;
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
      .item {
        .tab {
          text-align: center;
          flex: 1;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #ccc;
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
          border-bottom: 1px solid #ccc;
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
    }
  }
}
.fanpage,
.group,
.post--group {
  .item--content {
    border-bottom: 1px solid #484848;
    &:last-child {
      border: 0;
    }
  }
  .col--checkbox {
    height: 20px;
    .icon--arrow-right {
      transform: rotate(-90deg);
    }
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
    .avatar {
      img {
        border-radius: 100%;
      }
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
