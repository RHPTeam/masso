<template>
  <div class="user d_flex align_items_center justify_content_between mb_2 px_2">
    <div class="left mr_2" :style="{backgroundImage: 'url('+srcDefault+')'}"></div>
    <div class="main">
      <h3 class="m_0">Liu Kang</h3>
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
  data() {
    return {
      srcDefault: "https://us.123rf.com/450wm/3quarks/3quarks1707/3quarks170700113/82864525-stock-illustration-digital-3d-illustration-of-creepy-ghoul.jpg?ver=6"
    }
  },
}
</script>

<style lang="scss" scoped>
.user {
  .left {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ffba3c;
  }
  .main {
    width: calc(100% - 60px - 30px);
    h3{
      color: #000000;
      font-size: 16px;
    }
    .text {
      .desc {
        color: #666666;
        max-width: 88%;
        font-size: 13px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .time {
        font-size: 12px;
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
