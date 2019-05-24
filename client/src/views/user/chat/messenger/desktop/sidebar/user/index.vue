<template>
  <div class="user d_flex align_items_center justify_content_between mb_2">
    <div class="left mr_2"></div>
    <div class="main">
      <h3>Liu Kang</h3>
      <div class="text d_flex align_items_center">
        <div class="desc mr_2">Lorem ipsum dolor sit amet dolor sit dolor sit.</div>
        <div class="time">19:00</div>
      </div>
    </div>
    <div class="right d_flex align_items_center justify_content_center">
      <div class="icon d_none">
        <icon-base
          icon-name="menu"
          width="24"
          height="24"
          viewBox="0 0 868 868"
        >
          <icon-three-dots-horiz />
        </icon-base>
      </div>
      <div role="dot"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.user {
  .left {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ffba3c;
  }
  .main {
    width: calc(100% - 60px - 30px);
    .text {
      .desc {
        max-width: 88%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .time {
        font-size: 14px;
      }
    }
  }
  .right {
    width: 30px;
    div[role="dot"] {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #00c853;
    }
  }
}
</style>
