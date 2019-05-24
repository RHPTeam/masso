<template>
  <div class="header d_flex align_items_center justify_content_between" role="main">
    <div class="left d_flex align_items_center">
      <div role="image"></div>
      <div role="name">Chat zinbee</div>
    </div>
    <div class="right">
      <div class="icon">
        <icon-base
          icon-name="menu"
          width="24"
          height="24"
          viewBox="0 0 60 60"
        >
          <icon-location />
        </icon-base>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header[role="main"] {
  box-sizing: border-box;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  position: relative;
  text-align: center;
  z-index: 201;
  align-items: center;
  border-bottom: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .10);
  display: flex;
  height: 60px;
  justify-content: space-between;
  .left {
    > div[role="image"] {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #ffba3c;
      margin-right: .5rem;
    }
    div[role="name"] {
      font-weight: 700;
    }
  }
}
</style>
