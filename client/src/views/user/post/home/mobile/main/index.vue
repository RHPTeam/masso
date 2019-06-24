<template>
  <div class="mobile--dashboard d_block d_md_none position_relative p_3">
    <!-- Start: Content -->
    <div class="main--content">
      <div class="overview">
        <!-- Start: General Analytics-->
        <div class="total">
          <div class="content align_items_center d_flex r mx_0">
            <div class="c_sm_12 mb_sm_3 px_0 mb_3 align_items_center d_flex">
              <div class="align_items_center text_center items posts">
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
                <div class="number ml_auto">{{ allAnalysis.post }}</div>
                <div class="name">Bài đăng</div>
              </div>
              <div class="align_items_center text_center items campaign">
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
                <div class="number ml_auto">{{ allAnalysis.campaign }}</div>
                <div class="name">Chiến dịch</div>
              </div>
            </div>
            <div class="c_sm_12 px_0 align_items_center d_flex">
              <div class="align_items_center text_center items group">
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
                <div class="number ml_auto">{{ allAnalysis.group }}</div>
                <div class="name">Nhóm</div>
              </div>
              <div class="align_items_center text_center items page">
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
                <div class="number ml_auto">{{ allAnalysis.page }}</div>
                <div class="name">Trang</div>
              </div>
            </div>
          </div>
          <div class="c_sm_12 line--chart mt_3 pt_2">
            <VueApexCharts
              type="line"
              height="350"
              :options="chartOptionsLine"
              :series="allStaticCompaign"
            ></VueApexCharts>
          </div>
        </div>
        <!-- End: General Analytics-->
        <!-- Start Post Analytics -->
        <div class="order--server-history mx_0 mt_3 r">
          <div class="server px_0 c_sm_12 px_0">
            <div class="view--post-day">
              <VueApexCharts type="line" height="350" :options="chartOptions" :series="allSttPost"></VueApexCharts>
            </div>
          </div>
          <!-- <div class="order c_sm_12 mt_3 pt_3">
            <div class="top d_flex justify_content_between align_items_center mt_1 mb_2">
              <h3 class="title--overview">Bài viết gần đây</h3>
              <router-link class="view--all" :to="{ name: 'post_posts' }">Xem tất cả</router-link>
            </div>
            <div class="table-container" role="table" aria-label="Destinations">
              <div class="flex-table header" role="rowgroup">
                <div class="flex-row first" role="columnheader">Tiêu đề</div>
                <div class="flex-row d_none d_sm_block" role="columnheader">Danh mục</div>
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
                  <div class="flex-row d_none d_sm_block" role="cell">
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
          </div>-->
          <!-- End: Content -->
        </div>
        <!-- End: Post Analytics -->

        <!-- Start: Friend Follow -->
        <!-- <friends-follow
            :currentTheme="currentTheme"
          >
        </friends-follow>-->
        <!-- End: Friend Follow -->
      </div>
    </div>
    <!-- End: Content -->
  </div>
</template>

<script src="./index.script">
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>