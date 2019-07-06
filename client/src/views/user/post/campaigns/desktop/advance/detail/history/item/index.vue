<template>
  <div class="history--list-item">
    <!-- Start: Post title -->
    <div class="post--title mb_2">
      <span>{{item.message}}</span>
      <a
        v-if="redirectPostInFacebook && redirectPostInFacebook !== 0"
        class="link--post ml_1"
        @click="redirectPostFacebook"
      >
        Xem thêm
      </a>
    </div>
    <!-- End: Post title -->
    <!-- Start: Post time & status-->
    <div class="post--time">
      Thời gian tạo {{ item.createdAt | dateTimeFormat }}
    </div>
    <!-- End: Post time & status-->
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
  props: ["item"],
  data() {
    return {
      hrefDefault: ""
    }
  },
  computed: {
    redirectPostInFacebook(){
      let result = 1;
      if(this.item && this.item.message) {

        const res = FunctionString.findSubString(this.item.message, "ID: ");
        const postId = parseInt(res);

        if(isNaN(postId)) {
          result = 0;
        } else {
          result = postId;
        }
      }
      return result;
    }
  },
  methods: {
    redirectPostFacebook(){
      const route = 'https://facebook.com/' + this.redirectPostInFacebook;
      window.open(route, '_blank');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../index.style";
</style>
