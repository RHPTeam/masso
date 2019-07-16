<template>
  <div class="section mt--5">
    <div class="section--header d_flex align_items_start justify_content_between">
      <div class="left d_flex">
        <div class="icon mr_4">
          <icon-base
            class="icon--activity"
            icon--name="Nơi đăng"
            height="20px"
            width="20px"
            viewBox="0 0 480 480"
          >
            <icon-activity></icon-activity>
          </icon-base>
        </div>
        <div class="title">Hoạt động</div>
      </div>
      <div class="right">
        <div class="btn--detail"
             @click="isShowDetail = !isShowDetail"
        >
          {{ isShowDetail ? 'Ẩn chi tiết' : 'Hiện chi tiết' }}
        </div>
      </div>
    </div>
    <div class="section--body">
      <div class="list--group" v-if="false">
        <div class="list--group-item">
          <div class="item--content mb_1">
            Cập nhật sự kiện "Màu tím" thành công.
          </div>
          <div class="item--time">{{ formatTime( new Date() ) }}</div>
        </div>
        <div class="list--group-item">
          <div class="item--content mb_1">
            Cập nhật sự kiện "Màu tím" thành công.
          </div>
          <div class="item--time">{{ formatTime( new Date() ) }}</div>
        </div>
        <div class="list--group-item">
          <div class="item--content mb_1">
            Cập nhật sự kiện "Màu tím" thành công.
          </div>
          <div class="item--time">{{ formatTime( new Date() ) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDetail: false
    }
  },
  methods: {
    formatTime( d ) {
      const dateTime = new Date( d ),
            hour = String( dateTime.getHours() ).padStart( 2 , "0" ),
            min = String( dateTime.getMinutes() ).padStart( 2 , "0" ),
            date = String( dateTime.getDate() ).padStart( 2 , "0" ),
            month = String( dateTime.getMonth() + 1 ).padStart( 2 , "0" ),
            year = dateTime.getFullYear();

      return `lúc ${hour}:${min} ngày ${date}/${month}/${year}`
    },
  }
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
