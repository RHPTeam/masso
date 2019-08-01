<template>
  <div class="card">
    <div class="card--type">{{currentCard.type}}</div>
    <div class="card--price">{{currentCard.price}}</div>
    <div class="card--fbaccount">
      Tài khoản:
      <b>{{currentCard.fbaccount}}</b>
    </div>
    <div class="card--page">
      Page:
      <b>{{currentCard.page}}</b>
    </div>
    <div class="card--group">
      Group:
      <b>{{currentCard.group}}</b>
    </div>
    <div class="card--find-trending-content">Tìm nội dung hot</div>
    <div class="card--auto-post">Tự động đăng bài</div>
    <div class="card--auto-like">Tự động like</div>
    <div class="card--auto-addfriend">Tự động thêm bạn</div>
    <div class="card--auto-unfriend">Tự động huỷ kết bạn</div>
    <button class="card--btn-buy">Đăng ký</button>
  </div>
</template>
<script>
export default {
  props: ["currentCard"]
}
</script>

<style lang="scss" scoped>
.card {
  width: 100vw;
  background-color: #27292d;
  padding: 0.5rem 1.5rem;
  margin: 0 1rem;
  border: none;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  > * {
    text-align: center;
    padding: 0.35rem 0;
    font-size: 2.2vh;
  }
  &--type {
    font-size: 2.5vh;
    font-weight: bold;
    text-transform: uppercase;
    color: #ffb94a;
    padding-bottom: 0;
  }
  &--price {
    display: flex;
    justify-content: center;
    font-size: 5vh;
    font-weight: bold;
    color: #ffb94a;
    &::after {
      content: 'đ';
      font-size: 1.3rem;
    }
  }
  &--auto-unfriend {
    margin-bottom: auto;
  }
  &--btn-buy {
    background-color: #27292d;
    color: #ffb94a;
    border-radius: 50px;
    border: 2px solid #ffb94a;
    outline: none;
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
  }
}
</style>

