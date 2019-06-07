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
        <div class="data--empty text_center"
             v-if="allPostSchedules.length === 0"
        >Hiện tại chưa có lịch sử đăng bài.</div>
        <div v-else class="history--list">
          <div class="history--list-item"
               v-for="( item, index ) in allPostSchedules"
               :key="index"
          >
            <!-- Start: Post title -->
            <div class="post--title mb_2">
              <span class="post--status mr_1"
                    :class="item.post.status === false ? 'success' : 'uploading' "
              >
                {{ item.post.status === false ? "Đã Đăng" : "Chờ tải lên" }}
              </span>
              <span>{{ item.post._post.title }}</span>
            </div>
            <!-- End: Post title -->
            <!-- Start: Account group -->
            <div class="account--group mb_1">
              <div class="account--list">
                <div class="account--list-item">
                  <img class="avatar" :src="item.facebookInfo.userInfo.thumbSrc" alt="">
                  <div class="name">{{ item.facebookInfo.userInfo.name }}</div>
                </div>
              </div>
            </div>
            <!-- End: Account group -->
            <!-- Start: Post time & status-->
            <div class="post--time">
              Lúc {{ dateTimeFormat( item.post.started_at ) }}
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
    }
  },
  computed: {
    allPostSchedules() {
      return this.$store.getters.allPostSchedules.reverse();
    }
  },
  async created() {
    await this.$store.dispatch( "getAllPostSchedules" );
  },
  methods: {
    dateTimeFormat( date ) {
      let dateTime = new Date( date );
      dateTime.setMinutes(dateTime.getMinutes() + 1);

      const hour = String( dateTime.getHours() ).padStart( 2, 0 ),
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
