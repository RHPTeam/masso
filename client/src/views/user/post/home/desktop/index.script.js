import VueApexCharts from 'vue-apexcharts';
import AddKeyWord from "./keywords";
import FriendFollow from "./friends";
import VersionPopup from "./version";
import WizardWelcome from "@/components/shared/layouts/wizard/welcome";

export default {
  components: {
    AddKeyWord,
    VueApexCharts,
    FriendFollow,
    VersionPopup,
    WizardWelcome
  },
  data () {
    return {
      isStatusVersionNotification: !!(localStorage.getItem("version") && localStorage.getItem("version") === "1.0.3"),
      isShowGuidePopup: true
    };
  },
  computed: {
    isShowWizard() {
      return this.$store.getters.isShowWizard;
    },
    isReadVersionNotification: {
      set( newValue ) {
        this.isStatusVersionNotification = newValue;
      },
      get() {
        return this.isStatusVersionNotification
      }
    },
    user(){
      return this.$store.getters.userInfo;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    newestPost() {
      return this.$store.getters.newestPost;
    },
    allAnalysis() {
      return this.$store.getters.allAnalysis;
    },
    allStaticCampaign() {
      const mapArrCampaign = this.$store.getters.getAllStaticCampaign.map( (campaign) => {
        return campaign.amount;
      });

      return [{
        name: 'Chiến dịch',
        data: mapArrCampaign
      }];
    },
    allSttPost(){
      const campaignRecommended = [], campaignCurrent = [];

      this.$store.getters.getAllSttPost.map( ( current ) => {
        campaignRecommended.push( current.recommend );
        campaignCurrent.push( current.amount );
      });

      return [
        {
          name: "Số bài viết bạn nên có",
          data: campaignRecommended
        },
        {
          name: "Số bài viết của bạn",
          data: campaignCurrent
        }
      ];
    },
    campaignDataChart() {
      const timeCampaign = this.$store.getters.getAllStaticCampaign.map( ( date ) => {
        return date.date;
      } );

      let arrCampaign = [];
      this.$store.getters.getAllStaticCampaign.map( ( amount ) => {
        arrCampaign.push( amount.amount );
      });
      let maxCampaign = Math.max.apply(null, arrCampaign);

      // Light theme Custom
      if ( this. currentTheme === "light" ) {
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
            },
            locales: [{
              "name": "vn",
              "options": {
                "months": [ "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
                "shortMonths": [ "Thg 1", "Thg 2", "Thg 3", "Thg 4", "Thg 5", "Thg 6",
                  "Thg 7", "Thg 8", "Thg 9", "Thg 10", "Thg 11", "Thg 12"],
                "days": [ "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy" ],
                "shortDays": ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
                "toolbar": {
                  "exportToSVG": "Tải xuống SVG",
                  "exportToPNG": "Tải xuống PNG",
                  "menu": "Menu",
                  "selection": "Vùng chọn",
                  "selectionZoom": "Phóng to vùng chọn",
                  "zoomIn": "Phóng to",
                  "zoomOut": "Thu nhỏ",
                  "pan": "Panning",
                  "reset": "Đặt lại"
                }
              }
            }],
            defaultLocale: "vn"
          },
          tooltip: {
            theme: "light"
          },
          stroke: {
            width: 7,
            curve: 'smooth'
          },
          colors: [ "#16afd4" ],
          grid: {
            borderColor: '#e4e4e4'
          },
          xaxis: {
            type: 'datetime',
            categories: timeCampaign,
            labels: {
              style: {
                colors: [ "#444", "#444", "#444", "#444", "#444", "#444" ]
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                color: "#444"
              }
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: [ "#57d45a" ],
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
            colors: [ "#ffab29" ],
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
              fontSize:  "17px",
              fontWeight: "bold",
              color:  "#444"
            }
          },
        }
      }
      // Dark theme custom
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
          },
          locales: [{
            "name": "vn",
            "options": {
              "months": [ "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
              "shortMonths": [ "Thg 1", "Thg 2", "Thg 3", "Thg 4", "Thg 5", "Thg 6",
                "Thg 7", "Thg 8", "Thg 9", "Thg 10", "Thg 11", "Thg 12"],
              "days": [ "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy" ],
              "shortDays": ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
              "toolbar": {
                "exportToSVG": "Tải xuống SVG",
                "exportToPNG": "Tải xuống PNG",
                "menu": "Menu",
                "selection": "Vùng chọn",
                "selectionZoom": "Phóng to vùng chọn",
                "zoomIn": "Phóng to",
                "zoomOut": "Thu nhỏ",
                "pan": "Panning",
                "reset": "Đặt lại"
              }
            }
          }],
          defaultLocale: "vn"
        },
        tooltip: {
          theme: "dark"
        },
        stroke: {
          width: 7,
          curve: 'smooth'
        },
        colors: [ "#16afd4" ],
        grid: {
          borderColor: '#444'
        },
        xaxis: {
          type: 'datetime',
          categories: timeCampaign,
          labels: {
            style: {
              colors: [ "#ccc", "#ccc", "#ccc", "#ccc", "#ccc", "#ccc" ]
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              color: "#cccccc"
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: [ "#57d45a" ],
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
          colors: [ "#ffab29" ],
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
            fontSize:  "17px",
            fontWeight: "bold",
            color:  "#f7f7f7"
          }
        },
      }
    },
    postRecommendDataChart() {
      const dayRecommendCampaign = this.$store.getters.getAllSttPost.map( ( date ) => {
        return date.date.slice( 0, 10 );
      });
      let maxCampaign = [];
      this.$store.getters.getAllSttPost.map( ( amount ) => {
        maxCampaign.push( amount.recommend );
        maxCampaign.push( amount.amount );
      });
      const maxChart = Math.max.apply(null, maxCampaign ) * 1.5;

      // Light theme custom
      if ( this.currentTheme === "light" ) {
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
          colors: [ "#ef625a", "#77B6EA" ],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          grid: {
            borderColor: '#e4e4e4',
            row: {
              colors: ['#f7f7f7', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {

            size: 6
          },
          tooltip: {
            theme: "light"
          },
          xaxis: {
            categories: dayRecommendCampaign,
            labels: {
              style: {
                colors: [ "#444", "#444", "#444", "#444", "#444", "#444", "#444" ]
              },
              formatter: function ( d ) {
                const date = new Date( d ),
                  dd = String( date.getDate() ).padStart( 2, 0 ),
                  mm = String( date.getMonth() + 1 ).padStart( 2, 0 ),
                  yyyy = date.getFullYear();

                return `${dd}/${mm}/${yyyy}`;
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                color: "#444"
              }
            },
            min: 0,
            max: maxChart
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
            labels: {
              colors: "#444"
            },
          },
          title: {
            text: "Tỉ lệ bài viết",
            align: 'left',
            margin: 0,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: "17px",
              fontWeight: "bold",
              color: "#444"
            },
          }
        }
      }
      // Dark theme custom
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
        colors: [ "#ef625a", "#77B6EA" ],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        grid: {
          borderColor: '#444',
          row: {
            colors: ['#2f3136', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {

          size: 6
        },
        tooltip: {
          theme: "dark"
        },
        xaxis: {
          categories: dayRecommendCampaign,
          labels: {
            style: {
              colors: [ "#ccc", "#ccc", "#ccc", "#ccc", "#ccc", "#ccc", "#ccc" ]
            },
            formatter: function ( d ) {
              const date = new Date( d ),
                dd = String( date.getDate() ).padStart( 2, 0 ),
                mm = String( date.getMonth() + 1 ).padStart( 2, 0 ),
                yyyy = date.getFullYear();

              return `${dd}/${mm}/${yyyy}`;
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              color: "#cccccc"
            }
          },
          min: 0,
          max: maxChart
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5,
          labels: {
            colors: "#ccc"
          },
        },
        title: {
          text: "Tỉ lệ bài viết",
          align: 'left',
          margin: 0,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "17px",
            fontWeight: "bold",
            color: "#f7f7f7"
          },
        }
      }
    }
  },
  methods: {
    async goToThisPost( id ) {
      await this.$store.dispatch( "getPostById", id );
    }
  }
}
