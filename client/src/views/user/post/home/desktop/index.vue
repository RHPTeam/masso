<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="position_relative">
      <breadcrumb
        nameBread="Bảng điều khiển"
        subBread="Giúp bạn quản lý nhanh các thông tin trên hệ thống."
      />
      <!-- Start: Content -->
      <div class="main--content">
        <div class="overview">
          <!-- Start: General Analytics-->
          <div class="r total mx_0">
            <div class="c_md_12 c_lg_12 c_xl_5 content px_0 pr_xl_3">
              <div class="r pd15">
                <!-- Start: Posts -->
                <div class="c_6 items text_center">
                  <div class="wrap">
                    <div class="icon">
                      <icon-base
                        class="icon--post"
                        icon-name="user"
                        width="18"
                        height="18"
                        viewBox="0 0 580 580"
                      >
                        <icon-post/>
                      </icon-base>
                    </div>
                    <div class="number">{{ allAnalysis.post }}</div>
                    <div class="name">Bài đăng</div>
                  </div>
                </div>
                <!-- End: Posts -->
                <!-- Start: Campaigns -->
                <div class="c_6 items text_center">
                  <div class="wrap">
                    <div class="icon">
                      <icon-base
                        class="icon--broadcast"
                        icon-name="user"
                        width="20"
                        height="18"
                        viewBox="0 0 22 22"
                      >
                        <icon-broadcast/>
                      </icon-base>
                    </div>
                    <div class="number">{{ allAnalysis.campaign }}</div>
                    <div class="name">Chiến dịch</div>
                  </div>
                </div>
                <!-- End: Campaigns -->
                <!-- Start: Groups -->
                <div class="c_6 items text_center">
                  <div class="wrap">
                    <div class="icon">
                      <icon-base
                        class="icon--group"
                        icon-name="user"
                        width="20"
                        height="20"
                        viewBox="0 0 500 500"
                      >
                        <icon-group/>
                      </icon-base>
                    </div>
                    <div class="number">{{ allAnalysis.group }}</div>
                    <div class="name">Nhóm</div>
                  </div>
                </div>
                <!-- End: Groups -->
                <!-- Start: Pages -->
                <div class="c_6 items text_center">
                  <div class="wrap">
                    <div class="icon">
                      <icon-base
                        class="icon--page"
                        icon-name="user"
                        width="18"
                        height="18"
                        viewBox="0 0 480 500"
                      >
                        <icon-page/>
                      </icon-base>
                    </div>
                    <div class="number">{{ allAnalysis.page }}</div>
                    <div class="name">Trang</div>
                  </div>
                </div>
                <!-- End: Pages -->
              </div>
            </div>
            <div class="order c_md_12 c_lg_12 c_xl_7 pt_3">
              <div class="top d_flex justify_content_between align_items_center mt_1 mb_2">
                <h3 class="title--overview">Bài viết gần đây</h3>
                <router-link class="view--all" :to="{ name: 'post_posts', query: {size: 25, page: 1} }">Xem tất cả</router-link>
              </div>
              <div class="table-container" role="table" aria-label="Destinations">
                <div class="flex-table header" role="rowgroup">
                  <div class="flex-row first" role="columnheader">Tiêu đề</div>
                  <div class="flex-row" role="columnheader">Danh mục</div>
                  <div class="flex-row" role="columnheader">Hình ảnh</div>
                </div>
                <div v-if="newestPost.length > 0">
                  <div
                    class="flex-table row"
                    role="rowgroup"
                    v-for="(item, index) in newestPost"
                    :key="index"
                    @click="goToThisPost(item._id)"
                  >
                    <div class="flex-row first" role="cell">{{ item.title.length > 0 ? item.title : "Bài viết chưa có tiêu đề" }}</div>
                    <div class="flex-row" role="cell">
                      <span
                        v-for="(category, index) in item._categories"
                        :key="`c-${index}`"
                      >{{ category.title + [ index === item._categories.length - 1 ? '' : ', ' ] }}</span>
                    </div>
                    <div class="flex-row" role="cell">
                      <div class="d_flex">
                        <span v-if="item.attachments.length === 0">Không có ảnh</span>
                        <div
                          v-else
                          v-for="(img, index) in item.attachments.slice(0, 3)"
                          :key="`i-${index}`"
                          class="img--select"
                        >
                          <img class="img--bg" v-if="img.typeAttachment === 1" :src="img.link">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="noPost text_center mt_3 mb_3">Chưa có bài viết nào !</div>
              </div>
            </div>
          </div>
          <!-- End: General Analytics-->
          <!-- Start Post Analytics -->
          <div class="order--server-history mx_0 mt_3 r">
            <div class="server px_0 c_md_12 c_lg_12 c_xl_6 px_0 pr_xl_3">
              <div class="view--post-day pt_3">
                <VueApexCharts
                  type="line"
                  height="350"
                  :options="postRecommendDataChart"
                  :series="allSttPost"
                ></VueApexCharts>
              </div>
            </div>
            <div class="c_md_12 c_lg_12 c_xl_6 line--chart">
              <div class="pt_3">
                <VueApexCharts
                  type="line"
                  height="350"
                  :options="campaignDataChart"
                  :series="allStaticCampaign"
                ></VueApexCharts>
              </div>
            </div>
            <!-- End: Content -->
          </div>
          <!-- End: Post Analytics -->

          <!-- Start: Event schedules -->
          <div class="events--schedule mt_3">
            <div class="content p_3">
              <div class="items--header">
                <h4>Event schedules</h4>
              </div>
              <div class="items--body">
                <div class="table-container" role="table" aria-label="Destinations">
                  <div class="flex-table header" role="rowgroup">
                    <div class="flex-row first" role="columnheader">Thời gian bắt đầu</div>
                    <div class="flex-row" role="columnheader">Tên bài viết</div>
                    <div class="flex-row campaign" role="columnheader">Chiến dịch</div>
                    <div class="flex-row" role="columnheader">Trạng thái</div>
                    <div class="flex-row" role="columnheader">Hành động</div>
                  </div>
                  <div v-if="newestPost.length > 0">
                    <div
                      class="flex-table row"
                      role="rowgroup"
                    >
                      <div class="flex-row first" role="cell">10:10 26-09-1097</div>
                      <div class="flex-row" role="cell">Tên bài viết Tên bài viết Tên bài viết Tên bài viết Tên bài viết Tên bài viết</div>
                      <div class="flex-row campaign" role="cell">Chiến dịch Chiến dịch Chiến dịch Chiến dịch Chiến dịch</div>
                      <div class="flex-row" role="cell">
                        <div class="status d_flex align_items_center">
                          <span class="prepare item--status"></span>
                          <span class="desc--status pl_2">Đăng thành công</span>
                        </div>
                      </div>
                      <div class="flex-row" role="cell">
                        Xóa
                      </div>
                    </div>
                  </div>
                  <div v-else class="noPost text_center mt_3 mb_3">Chưa có bài viết nào !</div>
                </div>
              </div>
            </div>
          </div>
          <!-- End: Event schedules -->

          <!-- Start: Friend Follow -->
          <!-- <friends-follow
            :currentTheme="currentTheme"
          >
          </friends-follow> -->
          <!-- End: Friend Follow -->
        </div>
      </div>
      <!-- End: Content -->

      <!-- Start: Notification for check key word account-->
      <add-key-word
        v-if="user && user.keywords && user.keywords.length === 0"
        :user="user"
        :currentTheme="currentTheme"
      />
      <!-- Replace AddKeyword to Wizard in App.vue-->
      <!-- End: Notification for check key word account-->

      <!-- Start: Notification version updated-->
      <version-popup v-if="isStatusVersionNotification === false" @close="isReadVersionNotification = $event"></version-popup>
      <!-- End: Notification version updated-->

    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
  @import "./index.style";
</style>
