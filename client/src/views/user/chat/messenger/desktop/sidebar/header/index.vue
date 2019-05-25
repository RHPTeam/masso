<template>
  <div class="header d_flex align_items_center justify_content_between">
    <div class="left" :style="{backgroundImage: 'url('+srcDefault+')'}">
    </div>
    <div class="desc">Messenger</div>
    <div class="right d_flex align_items_center">
      <div class="icon mr_2">
        <icon-base
          icon-name="menu"
          width="24"
          height="24"
          viewBox="0 0 265 265"
        >
          <icon-setting />
        </icon-base>
      </div>
      <div class="icon">
        <icon-base
          icon-name="menu"
          width="24"
          height="24"
          viewBox="0 0 23 23"
        >
          <icon-edit />
        </icon-base>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      srcDefault: "https://images-na.ssl-images-amazon.com/images/I/81fd-3Fdc5L.jpg"
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
