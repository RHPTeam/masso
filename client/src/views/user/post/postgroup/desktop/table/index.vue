<template>
	<div class="postgroup--data my_3" :data-theme="currentTheme">
    <!--Start: All data-->
    <div v-if="groupSelected === false">
      <!-- Start: Table Body -->
      <div>
        <!--Start: Empty Data-->
        <div
          class="alert alert_warning text_center p_2"
          v-if="facebookPages.length === 0 && facebookGroups.length === 0"
        >
          Nếu không tìm thấy bất kì nhóm hoặc fanpage nào, hãy thử cập nhật lại!
          Nếu có điều gì đó không đúng, hãy liên lạc với bộ phận CSKH của Zinbee để được trợ giúp.
        </div>
        <!--End: Empty Data-->
        <div v-else>
          <!-- Start: Loading Component -->
          <div class="loading--block"
               v-if="facebookGroupsStatus === 'loading' || facebookPagesStatus === 'loading' "
          >
            <loading-component class="loading"></loading-component>
          </div>
          <!-- End: Loading Component-->
          <div v-else>
            <!-- Start: Profile Data -->
            <div class="mb_2" v-if="accountsFB && accountsFB.length > 0 && typeFilterSelected === 'Tất cả' || typeFilterSelected === 'Cá nhân'">
              <div
                class="item--body font_weight_bold d_flex align_items_center px_4 py_2"
              >
                Trang cá nhân
              </div>
              <div
                class="item--body d_flex align_items_center px_3 py_2"
                v-for="( item, index ) in accountsFBSearch"
                :key="`fbpf-${index}`"
              >
                <div class="col col--checkbox px_2">
                  <label class="custom--checkbox mb_0">
                    <input
                      type="checkbox"
                      v-model="selectedProfile"
                      :value="item.userInfo.id"
                    />
                  </label>
                </div>
                <div class="col col--name d_flex align_items_center pl_3">
                  <div class="avatar pr_2">
                    <img :src="item.userInfo.thumbSrc" alt="avatar" width="30px" height="30px">
                  </div>
                  <span class="col col--name-text">
                  {{ item.userInfo.name }}
                </span>
                </div>
              </div>
              <div class="no--group text_center py_3" v-if="accountsFBSearch.length === 0">Không tìm thấy trang cá nhân nào</div>
            </div>
            <!-- End: Profile Data -->
            <!-- Start: Pages Data -->
            <div class="mb_2" v-if="facebookPages.length !== 0 && typeFilterSelected === 'Tất cả' || typeFilterSelected === 'Trang' ">
              <div
                class="item--body font_weight_bold d_flex align_items_center px_4 py_2"
                v-for="(v, i) in 1"
                :key="`fbp-header${i}`"
              >
                Fanpage Facebook
              </div>
              <div class="item--body d_flex align_items_center px_3 py_2"
                   v-for="( item, index ) in facebookPagesSearch"
                   :key="`fbg-${index}`"
              >
                <div class="col col--checkbox px_2">
                  <label class="custom--checkbox mb_0">
                    <input type="checkbox"
                           v-model="postGroupPagesSelected"
                           :value="item.pageId"
                    />
                  </label>
                </div>
                <div class="col col--name d_flex align_items_center pl_3">
                  <div class="avatar pr_2">
                    <img :src="item.profile_picture" alt="avatar" width="30px" height="30px">
                  </div>
                  <span class="col col--name-text">
                  {{ item.name }}
                </span>
                  <span class="admin" v-if="item.isAdmin && item.isAdmin === true">ADMIN</span>
                </div>
              </div>
              <div class="no--group text_center py_3" v-if="facebookPagesSearch.length === 0">Không tìm thấy trang nào</div>
            </div>
            <!-- End: Pages Data -->
            <!-- Start: Groups Data -->
            <div v-if="facebookGroups.length !== 0 && typeFilterSelected === 'Tất cả' || typeFilterSelected === 'Nhóm' ">
              <div class="item--body font_weight_bold d_flex align_items_center px_4 py_2"
                   v-for="(x, j) in 1"
                   :key="`fbg-header${j}`"
              >Group Facebook</div>
              <div class="item--body d_flex align_items_center px_3 py_2"
                   v-for="( item, index ) in facebookGroupsSearch"
                   :key="`fbp-${index}`"
              >
                <div class="col col--checkbox px_2">
                  <label class="custom--checkbox mb_0">
                    <input type="checkbox"
                           v-model="postGroupGroupsSelected"
                           :value="item.groupId"
                    />
                  </label>
                </div>
                <div class="col col--name d_flex align_items_center pl_3">
                  <div class="avatar pr_2">
                    <img :src="item.profile_picture" alt="avatar" width="30px" height="30px">
                  </div>
                  <span class="col col--name-text">
                  {{ item.name }}
                </span>
                  <span class="admin ml_auto" v-if="item.isAdmin && item.isAdmin === true">ADMIN</span>
                </div>
              </div>
              <div class="no--group text_center py_3" v-if="facebookGroupsSearch.length === 0">Không tìm thấy nhóm nào</div>
            </div>
            <!-- End: Groups Data -->
          </div>
        </div>
      </div>
      <!-- End: Table Body -->
    </div>
    <!--End: All data-->
    <!--Start: Data of Group-->
    <div v-else>
      <!-- Start: Loading Component -->
      <div
        class="loading--block"
        v-if=" postGroupDetailStatus === 'loading' "
      >
        <loading-component class="loading"></loading-component>
      </div>
      <!-- End: Loading Component-->
      <!-- Start: Table Body -->
      <div v-else>
        <!--Start: Empty Data-->
        <div
          class=""
          v-if="postGroupDetail._pages.length === 0 && postGroupDetail._groups.length === 0 && postGroupDetail._timeline.length === 0"
        >
          <div class="text_center alert alert_secondary">
            <div class="mb_2">Nhóm này hiện đang trống.</div>
            <div class="add--pagegroup d_flex align_items_center justify_content_center mx_auto" @click="seeAllUsers">
              <icon-base
                class="ic--add"
                icon-name="Thêm"
                width="40"
                height="40"
                viewBox="0 0 60 60"
              >
                <icon-plus />
              </icon-base>
            </div>
          </div>
        </div>
        <!--End: Empty Data-->
        <div v-else>
          <!-- Start: Profile Data -->
          <div
            class="mb_2"
            v-if="postGroupDetail._timeline && postGroupDetail._timeline.length !== 0 && typeFilterSelected === 'Tất cả' ||
                  postGroupDetail._timeline && postGroupDetail._timeline.length !== 0 && typeFilterSelected === 'Cá nhân' ">
            <div
              class="item--body font_weight_bold d_flex align_items_center px_4 py_2"
              v-for="(v, i) in 1"
              :key="`fbpf-header${i}`"
            >
              Trang cá nhân
            </div>
            <div
              class="item--body d_flex align_items_center px_3 py_2"
              v-for="( item, index ) in postGroupDetailProfile"
              :key="`fbg-${index}`"
            >
              <div class="col col--checkbox px_2">
                <label class="custom--checkbox mb_0">
                  <input
                    type="checkbox"
                    v-model="selectedProfile"
                    :value="item.userInfo.id"
                  />
                </label>
              </div>
              <div class="col col--name d_flex align_items_center pl_3">
                <div class="avatar pr_2">
                  <img :src="item.userInfo.thumbSrc" alt="avatar" width="30px" height="30px">
                </div>
                <span class="col col--name-text">
                  {{ item.userInfo.name }}
                </span>
              </div>
            </div>
            <div class="no--group text_center py_3" v-if="postGroupDetailProfile.length === 0">Không tìm thấy trang cá nhân nào</div>
          </div>
          <!-- End: Profile Data -->

          <!-- Start: Pages Data -->
          <div class="mb_2" v-if="postGroupDetail._pages.length !== 0 && typeFilterSelected === 'Tất cả' || typeFilterSelected === 'Trang' ">
            <div
              class="item--body font_weight_bold d_flex align_items_center px_4 py_2"
              v-for="(v, i) in 1"
              :key="`fbp-header${i}`"
            >
              Fanpage Facebook
            </div>
            <div
              class="item--body d_flex align_items_center px_3 py_2"
              v-for="( item, index ) in postGroupDetailPage"
              :key="`fbg-${index}`"
            >
              <div class="col col--checkbox px_2">
                <label class="custom--checkbox mb_0">
                  <input
                    type="checkbox"
                    v-model="postGroupPagesSelected"
                    :value="item.pageId"
                  />
                </label>
              </div>
              <div class="col col--name d_flex align_items_center pl_3">
                <div class="avatar pr_2">
                  <img :src="item.profile_picture" alt="avatar" width="30px" height="30px">
                </div>
                <span class="col col--name-text">
                  {{ item.name }}
                </span>
              </div>
            </div>
            <div class="no--group text_center py_3" v-if="postGroupDetailPage.length === 0">Không tìm thấy trang nào</div>
          </div>
          <!-- End: Pages Data -->
          <!-- Start: Groups Data -->
          <div v-if="postGroupDetail._groups.length !== 0 && typeFilterSelected === 'Tất cả' || typeFilterSelected === 'Nhóm'">
            <div
              class="item--body font_weight_bold d_flex align_items_center px_4 py_2"
              v-for="(x, j) in 1"
              :key="`fbg-header${j}`"
            >
              Group Facebook
            </div>
            <div class="item--body d_flex align_items_center px_3 py_2"
                v-for="( item, index ) in postGroupDetailGroup"
                :key="`fbp-${index}`"
            >
              <div class="col col--checkbox px_2">
                <label class="custom--checkbox mb_0">
                  <input
                    type="checkbox"
                    v-model="postGroupGroupsSelected"
                    :value="item.groupId"
                  />
                </label>
              </div>
              <div class="col col--name d_flex align_items_center pl_3">
                <div class="avatar pr_2">
                  <img :src="item.profile_picture" alt="avatar" width="30px" height="30px">
                </div>
                <span class="col col--name-text">
                  {{ item.name }}
                </span>
                <span class="admin ml_auto" v-if="item.isAdmin && item.isAdmin === true">ADMIN</span>
              </div>
            </div>
            <div class="no--group text_center py_3" v-if="postGroupDetailGroup.length === 0">Không tìm thấy nhóm nào</div>
          </div>
          <!-- End: Groups Data -->
        </div>
      </div>
      <!-- End: Table Body -->
      <!-- Start: Delete Campaign Popup -->
    </div>
    <!--End: Data of Group-->
	</div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "index.style";
</style>
