<template>
  <div class="emoji position_absolute p_3">
    <div class="top">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.emoji {
  background-color: #27292d;
  border-radius: .625rem;
  bottom: 110%;
  right: 5%;
  width: 286px;
  height: 300px;
  z-index: 99;
  .top {
    .item {
      width: 36px;
      height: 32px;
      background-color: #0c5460;
      display: inline-block;
      margin: 0 3px;
    }
  }
}
</style>
