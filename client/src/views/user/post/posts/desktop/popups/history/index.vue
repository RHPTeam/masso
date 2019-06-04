<template>
  <div class="modal--wrapper">
    <!-- Start: Modal Header -->
    <div class="modal--header d_flex align_items_center justify_content_between">
      <div class="title">Lịch sử đăng bài</div>
      <div class="btn--close"
           @click="close"
      >
        <icon-base
          class="icon--close"
          width="14px"
          height="14px"
          viewBox="0 0 18 18"
        >
          <icon-cancel></icon-cancel>
        </icon-base>
      </div>
    </div>
    <!-- End: Modal Header -->
    <!-- Start: Modal Body -->
    <vue-perfect-scrollbar class="modal--scroll">
      <div class="modal--body p_3">
        <div class="history--list">
          <div class="history--list-item"
               v-for="( item, index ) in history"
               :key="index"
          >
            <!-- Start: Post title -->
            <div class="post--title mb_2">
              <span class="post--status uploading mr_1">
                Đang tải lên
              </span>
              <span>{{ item.postTitle }}</span>
            </div>
            <!-- End: Post title -->
            <!-- Start: Account group -->
            <div class="account--group mb_1">
              <div class="account--list">
                <div class="account--list-item"
                     v-for="( account, i ) in item.timeline"
                     :key="i"
                >
                  <img class="avatar" :src="account.thumbSrc" alt="">
                  <div class="name">{{ account.name }}</div>
                </div>
              </div>
            </div>
            <!-- End: Account group -->
            <!-- Start: Post time & status-->
            <div class="post--time">
              Lúc {{ dateTimeFormat( item.createdAt ) }}
            </div>
            <!-- End: Post time & status-->
          </div>
        </div>
      </div>
    </vue-perfect-scrollbar>
    <!-- End: Modal Body -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: [
        {
          postTitle: "Bún cá hải sản",
          createdAt: "2019-05-30T11:32:53.014+00:00",
          timeline: [
            {
              name: "Đặng Yến",
              thumbSrc: "http://graph.facebook.com/100006388800120/picture?type=large"
            },
            {
              name: "Hoàng Ngân",
              thumbSrc: "http://graph.facebook.com/100006388800120/picture?type=large"
            }
          ]
        },
        {
          postTitle: "Cho tôi một vé đi tuổi thơ",
          createdAt: "2019-06-01T08:08:53.014+00:00",
          timeline: [
            {
              name: "Đặng Yến",
              thumbSrc: "http://graph.facebook.com/100006388800120/picture?type=large"
            },
            {
              name: "Hoàng Ngân",
              thumbSrc: "http://graph.facebook.com/100006388800120/picture?type=large"
            }
          ]
        },
        {
          postTitle: "Bún cá hải sản",
          createdAt: "2019-05-30T11:32:53.014+00:00",
          timeline: [
            {
              name: "Đặng Yến",
              thumbSrc: "http://graph.facebook.com/100006388800120/picture?type=large"
            },
            {
              name: "Hoàng Ngân",
              thumbSrc: "http://graph.facebook.com/100006388800120/picture?type=large"
            }
          ]
        },
        {
          postTitle: "Cho tôi một vé đi tuổi thơ",
          createdAt: "2019-06-01T08:08:53.014+00:00",
          timeline: [
            {
              name: "Đặng Yến",
              thumbSrc: "http://graph.facebook.com/100006388800120/picture?type=large"
            },
            {
              name: "Hoàng Ngân",
              thumbSrc: "http://graph.facebook.com/100006388800120/picture?type=large"
            }
          ]
        },
        {
          postTitle: "Bún cá hải sản",
          createdAt: "2019-05-30T11:32:53.014+00:00",
          timeline: [
            {
              name: "Đặng Yến",
              thumbSrc: "http://graph.facebook.com/100006388800120/picture?type=large"
            },
            {
              name: "Hoàng Ngân",
              thumbSrc: "http://graph.facebook.com/100006388800120/picture?type=large"
            }
          ]
        },
        {
          postTitle: "Cho tôi một vé đi tuổi thơ",
          createdAt: "2019-06-01T08:08:53.014+00:00",
          timeline: [
            {
              name: "Đặng Yến",
              thumbSrc: "http://graph.facebook.com/100006388800120/picture?type=large"
            },
            {
              name: "Hoàng Ngân",
              thumbSrc: "http://graph.facebook.com/100006388800120/picture?type=large"
            }
          ]
        }
      ]
    }
  },
  computed: {
    allPostSchedules() {
      return this.$store.getters.allPostSchedules;
    }
  },
  async created() {
    await this.$store.dispatch( "getAllPostSchedules" );
  },
  methods: {
    dateTimeFormat( date ) {
      const dateTime = new Date( date ),
            hour = String( dateTime.getHours() ).padStart( 2, 0 ),
            min = String( dateTime.getMinutes() ).padStart( 2, 0 ),
            day = String( dateTime.getDate() ).padStart( 2, 0 ),
            month = String( dateTime.getMonth() + 1 ).padStart( 2, 0 ),
            year = dateTime.getFullYear();

      return `${hour}:${min}, ${day}/${month}/${year}`;
    },
    close() {
      this.$emit( "close", false );
    }
  }
}
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
