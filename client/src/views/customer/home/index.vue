<template>
  <div class="overview">
    <!--    Start total-->
    <div class="r total">
      <div class="c_5 content" style="maxHeight: 367px">
        <div class="r pd15">
          <div class="c_6 text_center">
            <div class="wrap">
              <div class="icon">
                <span>
                  <icon-base
                    icon-name="user"
                    width="18"
                    height="18"
                    viewBox="0 0 17 17"
                  >
                  <icon-user />
                </icon-base>
                </span>
              </div>
              <p class="number">21.1k</p>
              <p class="name">Total Followers</p>
              <div class="percent d_inline_flex">
                <p>
                  <icon-base
                    icon-name="sortDown"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                  >
                    <icon-sort-down />
                  </icon-base>
                </p>
                <p>
                  12.01%
                </p>
              </div>
            </div>
          </div>
          <div class="c_6 text_center">
            <div class="wrap">
              <div class="icon">
                <span>
                  <icon-base
                    icon-name="user"
                    width="18"
                    height="18"
                    viewBox="0 0 17 17"
                  >
                  <icon-user />
                </icon-base>
                </span>
              </div>
              <p class="number">21.1k</p>
              <p class="name">Total Followers</p>
              <div class="percent d_inline_flex">
                <p>
                  <icon-base
                    icon-name="sortDown"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                  >
                    <icon-sort-down />
                  </icon-base>
                </p>
                <p>
                  12.01%
                </p>
              </div>
            </div>
          </div>
          <div class="c_6 text_center">
            <div class="wrap">
              <div class="icon">
                <span>
                  <icon-base
                    icon-name="user"
                    width="18"
                    height="18"
                    viewBox="0 0 17 17"
                  >
                  <icon-user />
                </icon-base>
                </span>
              </div>
              <p class="number">21.1k</p>
              <p class="name">Total Followers</p>
              <div class="percent d_inline_flex">
                <p>
                  <icon-base
                    icon-name="sortDown"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                  >
                    <icon-sort-down />
                  </icon-base>
                </p>
                <p>
                  12.01%
                </p>
              </div>
            </div>
          </div>
          <div class="c_6 text_center">
            <div class="wrap">
              <div class="icon">
                <span>
                  <icon-base
                    icon-name="user"
                    width="18"
                    height="18"
                    viewBox="0 0 17 17"
                  >
                  <icon-user />
                </icon-base>
                </span>
              </div>
              <p class="number">21.1k</p>
              <p class="name">Total Followers</p>
              <div class="percent d_inline_flex">
                <p>
                  <icon-base
                    icon-name="sortDown"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                  >
                    <icon-sort-down />
                  </icon-base>
                </p>
                <p>
                  12.01%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="c_7 line--chart" style="maxHeight: 367px; padding-top: 10px">
        <apexchart type=line height=350 :options="chartOptionsLine" :series="seriesLine" />
      </div>
    </div>
    <!--    End total-->
    <!--    Start Order History-->
    <div class="r order--server-history">
      <div class="c_6 server" style="max-height: 405px;">
        <div class="view--post-day">
          <apexchart type=line height=350 :options="chartOptions" :series="series" />
        </div>
      </div>
      <div class="c_6 order" style="max-height: 405px;">
        <h3 class="title--overview">Order History</h3>
        <div class="table-container" role="table" aria-label="Destinations">
          <div class="flex-table header" role="rowgroup">
            <div class="flex-row first" role="columnheader">Tiêu đề</div>
            <div class="flex-row" role="columnheader">Hình ảnh</div>
            <div class="flex-row" role="columnheader">Hành động</div>
          </div>
          <div class="flex-table row" role="rowgroup" v-for="(item, index) in fivePost" :key="index">
            <div class="flex-row first"  role="cell">
              {{ item.title }}
            </div>
            <div class="flex-row" role="cell">
              <div class="d_flex">
                <span v-if="item.attachments.length === 0">Không có ảnh</span>
                <div v-else v-for="(img, index) in item.attachments" :key="`i-${index}`" class="img--select">
<!--                  <div :style="{backgroundImage: 'url('+ img.link +')'}" class="bgImg"></div>-->
                  <img :src="img.link" alt="">
                </div>
              </div>
            </div>
            <div class="flex-row" role="cell">
              <div class="d_flex justify_content_center">
                <button class="btn btn_warning" @click="goToThisPost(item._id)">Đi tới</button>
              </div>
            </div>
          </div>
        </div>
        <button class="view--all-post" @click="goToFullPost">
          <span>
            <icon-base
              icon-name="IconSortDown"
              width="18"
              height="18"
              viewBox="0 0 17 17"
            >
            <icon-sort-down />
          </icon-base>
          </span>
          <span>
            Xem tất cả các bài viết
          </span>
        </button>
      </div>
    </div>
    <!--    End Order History-->
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
export default{
  components: {
    apexchart: VueApexCharts,
  },
  data () {
    return {
      seriesLine: [{
        name: 'ChienDich',
        data: [4, 3, 10, 9, 29, 19, 22]
      }],
      chartOptionsLine: {
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
          categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000'
          ],
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
          text: "Title Chart Apex",
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
      },

      series: [
        {
          name: "Số bài viết bạn nên có",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Số bài viết của bạn",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],

      chartOptions: {
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
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          title: {
            // text: 'Month'
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        },
        title: {
          text: "Number Post A Day",
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
  computed: {
    allPost(){
      return this.$store.getters.allPost;
    },
    fivePost(){
      return this.allPost.slice(0,5);
    }
  },
  async created() {
    await this.$store.dispatch("getAllPost");
  },
  methods: {
    goToThisPost( id ){
      return this.$router.push({params: { id }, name: "update_post"})
    },
    goToFullPost(){
      return this.$router.push({ name: "posts" })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./index.style";
</style>

