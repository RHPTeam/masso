<template>
  <div class="keyword--wrapper p_3">
    <div class="wrapper--top mb_3">
      <div class="title mb_1">Từ khóa sản phẩm dịch vụ</div>
      <div class="desc">
        Chúng tôi sẽ dựa trên những từ khóa này để gợi ý các nội dung phù hợp
        nhất với bạn.
      </div>
    </div>
    <div class="wrapper--content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      contentOther: "",
      keywordsArr: [ "Du lịch", "Mỹ phẩm" ]
    };
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
}
</style>
