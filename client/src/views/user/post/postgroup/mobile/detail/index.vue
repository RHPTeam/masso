<template>
  <div class="modal--search-mobile">
    <div class="modal--content">
      <!-- Start: Header - Search -->
      <div class="items--header d_flex align_items_center mb_3">
        <div @click="closePopup">
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
        <p class="name--modal mb_0 m_auto">{{ postGroupDetail.title }}</p>
        <div class="active mr_2" @click="showPopupDelete">Xóa</div>
        <!-- <div class="active mr_2">
          <icon-base class="icon-plus" width="20" height="20" viewBox="0 0 68 68">
            <icon-plus />
          </icon-base>
        </div> -->
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
          </div>
          <div class="content mt_2">
            <!-- Start: Fanpage -->
            <div class="fanpage" v-if="isShowPopupFanpage === true">
              <div class="item--content d_flex align_items_center py_2" v-for="(fanpage, index) in postGroupDetailPage" :key="`f+${index}`">
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
              <div class="item--content d_flex align_items_center py_2" v-for="(group, index) in postGroupDetailGroup" :key="`g+${index}`">
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
            <!-- Start: Group -->
            <!-- Start: Post group -->
          </div>
        </vue-perfect-scrollbar>
        <!-- Start: List Content -->
      </div>
      <div class="items--footer d_flex align_items_center p_2">
        <div class="cancel mr_auto" @click="showDeletePopup">Xóa khỏi nhóm</div>
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
      <popup-delete @closePopup="isShowPopupDelete = $event" v-if="isShowPopupDelete === true"/>
    </transition>
    <!-- End: Popup delete -->
  </div>
</template>

<script>
import AddToGroup from "../popup/addgroup";
import PopupDelete from "../popup/delete";
export default {
  components: {
    AddToGroup,
    PopupDelete
  },
  computed: {
    postGroupDetail() {
      return this.$store.getters.postGroupDetail;
    },
    postGroupDetailPage(){
      // return this.postGroupDetail._pages.filter( ( item ) => {
      //   return item.name.toString().toLowerCase().includes( this.search.toString().toLowerCase() );
      // } );
      return this.postGroupDetail._pages;
    },
    postGroupDetailGroup(){
      // return this.postGroupDetail._groups.filter( ( item ) => {
      //   return item.name.toString().toLowerCase().includes( this.search.toString().toLowerCase() );
      // } );
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
    postGroupPagesSelected: {
      get() {
        return this.$store.getters.postGroupPagesSelected;
      },
      set(val) {
        this.$store.dispatch("postGroupPagesSelected", val);
      }
    },  
  },
  data() {
    return {
      targetDeletePopupData: {},
      isShowPopupFanpage: true,
      isShowPopupGroup: false,
      isShowAddToGroup: false,
      isShowPopupDelete: false
    };
  },
  methods: {
    showDeletePopup() {
      this.targetDeletePopupData = {
        id: this.postGroupDetail._id,
        _pages: this.postGroupPagesSelected,
        _groups: this.postGroupGroupsSelected
      };
      this.$store.dispatch("deletePagesNGroupsFromPostGroup", this.targetDeletePopupData);
    },
    showPopupFanpage() {
      this.isShowPopupFanpage = true;
      this.isShowPopupGroup = false;
    },
    showPopupGroup() {
      this.isShowPopupFanpage = false;
      this.isShowPopupGroup = true;
    },
    showPopupAddToGroup() {
      this.isShowAddToGroup = true;
    },
    closePopup() {
      this.$emit("closePopup", false);
    },
    showPopupDelete() {
      this.isShowPopupDelete = true;
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
      border-bottom: 1px solid #ccc;
      .arrow-down {
        transform: rotate(90deg);
        margin-left: 0.5rem;
      }
      .title {
        font-size: 1.25rem;
        font-weight: 600;
        text-align: center;
      }
      .desc {
        color: #999999;
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