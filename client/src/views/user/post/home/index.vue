<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block position_relative">
      <breadcrumb
        nameBread="Bảng điều khiển"
        subBread="Giúp bạn quản lý nhanh các thông tin trên hệ thống."
      />
      <!-- Start: Content -->
      <div class="main--content">
        <div class="overview">
          <!--    Start total-->
          <div class="r total">
            <div class="c_xl_5 c_lg_12 c_md_12 c_sm_12 c_12 content">
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
            <div class="c_xl_7 c_lg_12 c_md_12 c_sm_12 c_12 line--chart" style="maxHeight: 367px; padding-top: 10px">
              <apexchart type=line height=350 :options="chartOptionsLine" :series="allStaticCompaign" />
            </div>
          </div>
          <!--    End total-->
          <!--    Start Order History-->
          <div class="r order--server-history">
            <div class="c_xl_6 c_lg_12 c_md_12 c_sm_12 c_12 server mb_3" style="max-height: 405px;">
              <div class="view--post-day">
                <VueApexCharts
                  type="line"
                  height="350"
                  :options="chartOptions"
                  :series="allSttPost"
                ></VueApexCharts>
              </div>
            </div>
            <div class="c_xl_6 c_lg_12 c_md_12 c_sm_12 c_12 order mb_3" style="max-height: 405px;">
              <h3 class="title--overview">Bài viết gần đây</h3>
              <div class="table-container" role="table" aria-label="Destinations">
                <div class="flex-table header" role="rowgroup">
                  <div class="flex-row first" role="columnheader">Tiêu đề</div>
                  <div class="flex-row" role="columnheader">Danh mục</div>
                  <div class="flex-row" role="columnheader">Hình ảnh</div>
                </div>
                <div v-if="allPost.length > 0">
                  <div
                    class="flex-table row"
                    role="rowgroup"
                    v-for="(item, index) in fivePost"
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
        </div>
      </div>
      <!-- End: Content -->

      <!-- Start: Notification for check key word account-->
      <add-key-word
        v-if="user.keywords && user.keywords.length === 0"
        :user="user"
        :currentTheme="currentTheme"
      >
      </add-key-word>
      <!-- End: Notification for check key word account-->

    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
export default{
  components: {
    apexchart: VueApexCharts,
  },
  data () {
    return{};
  },
  computed: {
    allPost(){
      return this.$store.getters.allPost;
    },
    fivePost(){
      if(Object.entries(this.allPost).length === 0 && this.allPost.constructor === Object) return;
      return this.allPost.slice(0,5);
    },
    allAnalysis(){
      return this.$store.getters.allAnalysis;
    },
    allStaticCompaign(){
      const mapArrCampaign = this.$store.getters.getAllStaticCampaign.map( (campaign) => {
        return campaign.amount;
      });

      return [{
        name: 'Chiến dịch',
        data: mapArrCampaign
      }];
    },
    allSttPost(){
      const campaingRecommend = [], campaignCurrent = [];


      this.$store.getters.getAllSttPost.map( (current) => {
        campaingRecommend.push(current.amount);
        campaignCurrent.push(current.recommend);
      });

      return [
        {
          name: "Số bài viết bạn nên có",
          data: campaingRecommend
        },
        {
          name: "Số bài viết của bạn",
          data: campaignCurrent
        }
      ];
    },
    chartOptionsLine() {
      const timeCampaign = this.$store.getters.getAllStaticCampaign.map( (date) => {
        return date.date;
      });

      let arrCampaign = [];
      this.$store.getters.getAllStaticCampaign.map( (amount) => {
        arrCampaign.push(amount.amount);
      });
      let maxCampaign = Math.max.apply(null, arrCampaign);
      return {
        chart: {
          type: 'line',
          shadow: {
            enabled: false,
            color: '#bbb',
            top: 3,
            left: 2,
            blur: 3,
            opacity: 1
          },
          toolbar: {
            show: false,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
              customIcons: []
            },
            autoSelected: 'zoom'
          },
        },
        stroke: {
          width: 7,
          curve: 'smooth'
        },

        xaxis: {
          type: 'datetime',
          categories: timeCampaign
        },
        title: {
          text: 'Social Media',
          align: 'left',
          style: {
            fontSize: "16px",
            color: '#666'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          },
        },
        markers: {
          size: 4,
          opacity: 0.9,
          colors: ["#FFA41B"],
          strokeColor: "#fff",
          strokeWidth: 2,

          hover: {
            size: 7,
          }
        },
        title: {
          text: "Thống kê chiến dịch",
          align: 'left',
          margin: 0,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '17px',
            color:  '#333'
          },
        }
      }
    },
    chartOptions() {
      const dayRecommandCampaign = this.$store.getters.getAllSttPost.map( (date) => {
        return `${(new Date( date.date )).getDate()}/${(new Date( date.date )).getMonth()}`;
      });
      let maxCompaign = [];
      this.$store.getters.getAllSttPost.map( (amount) => {
        maxCompaign.push(amount.recommend);
        maxCompaign.push(amount.amount);
      });
      const maxChart = Math.max.apply(null, maxCompaign) * 1.5;
      return {
        chart: {
          shadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Average High & Low Temperature',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {

          size: 6
        },
        xaxis: {
          categories: dayRecommandCampaign,
          title: {
            // text: 'Month'
          }
        },
        yaxis: {
          title: {
            // text: ''
          },
          min: 0,
          max: maxChart
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        },
        title: {
          text: "Tỉ lệ bài viết",
          align: 'left',
          margin: 0,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '17px',
            color: '$color-light'
          },
        }
      }
    }
  },
  async created() {
    await this.$store.dispatch("getAllPost");
    await this.$store.dispatch("getAllAnalysis");
    await this.$store.dispatch("getAllStaticCampagin") ;
    this.$store.dispatch("getAllSttPost");
  },
  methods: {
    goToThisPost( id ){
      this.$router.push({params: { id }, name: "update_post"})
    },
    goToFullPost(){
      this.$router.push({ name: "posts" })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "index.style";
</style>

