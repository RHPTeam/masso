<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_md_block d_none position_relative">
      <breadcrumb
        nameBread="Bảng điều khiển"
        subBread="Giúp bạn quản lý nhanh các thông tin trên hệ thống."
      />
      <!-- Start: Content -->
      <div class="main--content">
        <div class="overview">
          <!-- Start: General Analytics-->
          <div class="r total mx_0">
            <div class="c_md_12 c_lg_12 c_xl_5 content px_0 pr_xl_3 mb_lg_3" style="maxHeight: 367px">
              <div class="r pd15">
                <!-- Start: Posts -->
                <div class="c_6 text_center">
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
                <div class="c_6 text_center">
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
                <div class="c_6 text_center">
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
                <div class="c_6 text_center">
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
            <div class="c_md_12 c_lg_12 c_xl_7 line--chart mt_md_3 mt_lg_0 pt_3" style="maxHeight: 367px">
              <VueApexCharts
                type="line"
                height="350"
                :options="campaignDataChart"
                :series="allStaticCampaign"
              ></VueApexCharts>
            </div>
          </div>
          <!-- End: General Analytics-->
          <!-- Start Post Analytics -->
          <div class="order--server-history mx_0 mt_3 r">
            <div class="server px_0 c_md_12 c_lg_12 c_xl_6 px_0 pr_xl_3" style="max-height: 405px;">
              <div class="view--post-day">
                <VueApexCharts
                  type="line"
                  height="350"
                  :options="postRecommendDataChart"
                  :series="allSttPost"
                ></VueApexCharts>
              </div>
            </div>
            <div class="order mt_md_3 mt_lg_0 c_md_12 c_lg_12 c_xl_6 mt_md_3 pt_3" style="max-height: 405px;">
              <div class="top d_flex justify_content_between align_items_center mt_1 mb_2">
                <h3 class="title--overview">Bài viết gần đây</h3>
                <router-link class="view--all" :to="{ name: 'post_posts' }">Xem tất cả</router-link>
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
                    <div class="flex-row first" role="cell">{{ item.title }}</div>
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
            <!-- End: Content -->
          </div>
          <!-- End: Post Analytics -->

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
      >
      </add-key-word>
      <!-- End: Notification for check key word account-->

      <!-- Start: Notification version updated-->
      <version-popup v-if="isStatusVersionNotification === false" @close="isReadVersionNotification = $event"></version-popup>
      <!-- End: Notification version updated-->

      <!-- Start: Notification guide for user -->
      <guide-popup
        v-if="variableControlGuide === 1"
      >
      </guide-popup>
      <!-- End: Notification guide for user-->

    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
  @import "./index.style";
</style>
