<template>
  <div class="mobile--dashboard position_relative p_3">
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
