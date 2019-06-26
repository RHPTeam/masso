<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <!-- Start: Modal Header -->
    <div class="modal--header d_flex align_items_center justify_content_between">
      <div class="title">Lịch sử sự kiện</div>
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
               v-for="( item, index ) in campaignDetail"
               :key="index"
          >
            <!-- Start: Post title -->
            <div class="post--title mb_2">
              <span>{{item.message}}</span>
              <a class="link--post ml_1" @click="redirectPostInFacebook(item)">Xem thêm</a>
            </div>
            <!-- End: Post title -->
            <!-- Start: Post time & status-->
            <div class="post--time">
              Thời gian tạo {{ item.createdAt | dateTimeFormat }}
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
import FunctionString from "@/utils/functions/string";
export default {
  filters: {
    dateTimeFormat( date ) {
      let dateTime = new Date( date );
      dateTime.setMinutes(dateTime.getMinutes() + 1);

      const hour = String( dateTime.getHours() ).padStart( 2, 0 ),
            min = String( dateTime.getMinutes() ).padStart( 2, 0 ),
            day = String( dateTime.getDate() ).padStart( 2, 0 ),
            month = String( dateTime.getMonth() + 1 ).padStart( 2, 0 ),
            year = dateTime.getFullYear();

      return `${hour}:${min}, ${day}/${month}/${year}`;
    }
  },
  props: ["currentTheme"],
  computed: {
    campaignDetail(){
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.$store.getters.campaignDetail.logs.content.reverse();
    }
  },
  methods: {
    close() {
      this.$emit( "close", false );
    },
    redirectPostInFacebook(value){
      let res = FunctionString.findSubString(value.message, "ID: ");
      console.log(typeof res);
      console.log(res.length);
      if(res.length < 20) {
        console.log(res);
      } else {
        const route = 'https://facebook.com/' + res;

        window.open(route, '_blank');
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "index.style";
</style>
