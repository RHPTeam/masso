<template>
	<div class="postgroup--data my_3" :data-theme="currentTheme">
    <!--Start: All data-->
    <div v-if="groupSelected === false">
      <!-- Start: Loading Component -->
      <div class="loading--block"
           v-if="facebookGroupsStatus === 'loading' || facebookPagesStatus === 'loading' "
      >
        <loading-component class="loading"></loading-component>
      </div>
      <!-- End: Loading Component-->
      <!-- Start: Table Body -->
      <div v-else>
        <!--Start: Empty Data-->
        <div class="alert alert_warning text_center p_2"
             v-if="facebookPages.length === 0 && facebookGroups.length === 0"
        >Chúng tôi không tìm thấy bất kỳ trang hay nhóm Facebook nào của bạn.
          Nếu có điều gì đó không đúng, hãy liên lạc với bộ phận CSKH của Zinbee để được trợ giúp.
        </div>
        <!--End: Empty Data-->
        <div v-else>
          <!-- Start: Pages Data -->
          <div v-if="facebookPages.length !== 0 && typeFilterSelected === 'Tất cả' || typeFilterSelected === 'Trang' ">
            <div class="item--body font_weight_bold d_flex align_items_center px_4 py_2"
                v-for="(v, i) in 1"
                :key="`fbp-header${i}`"
            >Trang</div>
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
            >Nhóm</div>
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
              </div>
            </div>
            <div class="no--group text_center py_3" v-if="facebookGroupsSearch.length === 0">Không tìm thấy nhóm nào</div>
          </div>
          <!-- End: Groups Data -->
        </div>
      </div>
      <!-- End: Table Body -->
    </div>
    <!--End: All data-->
    <!--Start: Data of Group-->
    <div v-else>
      <!-- Start: Loading Component -->
      <div class="loading--block"
           v-if=" postGroupDetailStatus === 'loading' "
      >
        <loading-component class="loading"></loading-component>
      </div>
      <!-- End: Loading Component-->
      <!-- Start: Table Body -->
      <div v-else>
        <!--Start: Empty Data-->
        <div class="text_center"
             v-if="postGroupDetail._pages.length === 0 && postGroupDetail._groups.length === 0"
        >
          <div class="alert alert_secondary p_2">Nhóm này hiện chưa có trang hay nhóm Facebook nào.</div>
          <div class="add--pagegroup" @click="seeAllUsers">
            <icon-base
              class="ic--add mr_1"
              icon-name="Thêm"
              width="60"
              height="60"
              viewBox="0 0 60 60"
            >
              <icon-plus />
            </icon-base>
            <div>Thêm trang hoặc nhóm</div>
          </div>
        </div>
        <!--End: Empty Data-->
        <div v-else>
          <!-- Start: Pages Data -->
          <div v-if="postGroupDetail._pages.length !== 0 && typeFilterSelected === 'Tất cả' || typeFilterSelected === 'Trang' ">
            <div class="item--body font_weight_bold d_flex align_items_center px_4 py_2"
                v-for="(v, i) in 1"
                :key="`fbp-header${i}`"
            >Trang
            </div>
            <div class="item--body d_flex align_items_center px_3 py_2"
                v-for="( item, index ) in postGroupDetailPage"
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
              </div>
            </div>
            <div class="no--group text_center py_3" v-if="postGroupDetailPage.length === 0">Không tìm thấy trang nào</div>
          </div>
          <!-- End: Pages Data -->
          <!-- Start: Groups Data -->
          <div v-if="postGroupDetail._groups.length !== 0 && typeFilterSelected === 'Tất cả' || typeFilterSelected === 'Nhóm'">
            <div class="item--body font_weight_bold d_flex align_items_center px_4 py_2"
                v-for="(x, j) in 1"
                :key="`fbg-header${j}`"
            >Nhóm</div>
            <div class="item--body d_flex align_items_center px_3 py_2"
                v-for="( item, index ) in postGroupDetailGroup"
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
