<template>
  <div class="keyword--wrapper p_3">
    <div class="wrapper--top mb_3">
      <div class="title mb_1">Từ khóa sản phẩm dịch vụ</div>
      <div class="desc">
        Chúng tôi sẽ dựa trên những từ khóa này để gợi ý các nội dung phù hợp
        nhất với bạn.
      </div>
    </div>
    <div class="wrapper--content">
      <taggle class="taggle" v-model="user.keywords" @input="updateKey" placeholder="Nhập từ khóa của bạn ..." />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {

    };
  },
  methods: {
    updateKey( val ){
      this.user.keywords = val;
      this.$store.dispatch( "updateUser", this.user );
    }
  }
};
</script>

<style lang="scss" scoped>
.keyword--wrapper {
  background-color: #fff;
  border-radius: 0.625rem;
  .wrapper--top {
    .desc {
      color: #999;
      font-size: 0.8rem;
    }
    .title {
      font-size: 0.875rem;
      font-weight: 600;
    }
  }
  .wrapper--content {
    .taggle {
      border-radius: calc( .5rem + 2px );
    }
  }
}
</style>
