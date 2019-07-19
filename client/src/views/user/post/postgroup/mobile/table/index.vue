<template>
  <div class="table--mobile">
    <div class="tab--page-group d_flex align_items_center text_center">
      <div
        class="profile items"
        @click="showTabprofile"
        :class="isShowTabProfile === true ? 'active' : '' "
      >Trang cá nhân</div>
      <div
        class="page items"
        @click="showTabFanpage"
        :class="isShowTabFanpage === true ? 'active' : '' "
      >Fanpage</div>
      <div
        class="group items"
        @click="showTabGroup"
        :class="isShowTabGroup === true ? 'active' : '' "
      >Group</div>
    </div>
    <div class="content--table">
      <VuePerfectScrollbar class="scroll-page--group" ref="scroll">
        <!-- Start: Profile Data -->
        <div class="profile" v-if="isShowTabProfile === true">
          <div class="mb_2" v-if="accountsFB && accountsFB.length > 0">
            <div
              class="item--body d_flex align_items_center py_2"
              v-for="( item, index ) in accountsFB"
              :key="`fbpf-${index}`"
            >
              <div class="col col--name d_flex align_items_center">
                <div class="avatar px_2">
                  <img :src="item.userInfo.thumbSrc" alt="avatar" width="30px" height="30px" />
                </div>
                <span class="col col--name-text">{{ item.userInfo.name }}</span>
              </div>
              <div class="col col--checkbox pr_3">
                <label class="custom--checkbox mb_0">
                  <input type="checkbox" v-model="selectedProfile" :value="item.userInfo.id" />
                </label>
              </div>
            </div>
            <div
              class="no--group text_center py_3"
              v-if="accountsFB.length === 0"
            >Không tìm thấy trang cá nhân nào</div>
          </div>
        </div>
        <!-- End: Profile Data -->
        <!-- Start: Fanpage -->
        <div class="page" v-if="isShowTabFanpage === true">
          <div
            class="item--body d_flex align_items_center py_2"
            v-for="(fanpage, index) in facebookPages"
            :key="index"
          >
            <div class="col col--name d_flex align_items_center">
              <div class="avatar px_2">
                <img alt="avatar" width="30px" height="30px" :src="fanpage.profile_picture" />
              </div>
              <span class="col col--name-text">{{ fanpage.name }}</span>
            </div>
            <div class="col col--checkbox pr_3">
              <label class="custom--checkbox mb_0">
                <input type="checkbox" v-model="postGroupPagesSelected" :value="fanpage.pageId" />
              </label>
            </div>
          </div>
          <div
            class="no--group text_center py_3"
            v-if="facebookPages.length === 0"
          >Không tìm thấy trang nào</div>
        </div>
        <!-- End: Fanpage -->
        <!-- Start: Group -->
        <div class="group" v-if="isShowTabGroup === true">
          <div
            class="item--body d_flex align_items_center py_2"
            v-for="(group, index) in facebookGroups"
            :key="`g+${index}`"
          >
            <div class="col col--name d_flex align_items_center">
              <div class="avatar px_2">
                <img alt="avatar" width="30px" height="30px" :src="group.profile_picture" />
              </div>
              <div class="col--name-text">{{ group.name }}</div>
            </div>
            <div class="col col--checkbox pr_3">
              <label class="custom--checkbox mb_0">
                <input type="checkbox" v-model="postGroupGroupsSelected" :value="group.groupId" />
              </label>
            </div>
          </div>
          <div
            class="no--group text_center py_3"
            v-if="facebookGroups.length === 0"
          >Không tìm thấy nhóm nào</div>
        </div>
        <!-- End: Group -->
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script src="./index.script">
</script>

<style lang="scss" scoped>
@import "./index.style";
.table--mobile {
  .scroll-page--group {
    max-height: calc(100vh - 270px);
  }
}
</style>