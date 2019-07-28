<template>
  <div class="main">
    <!--Start: Desktop Component-->
    <app-desktop></app-desktop>
    <!--End: Desktop Component-->

    <!--Start: Mobile Component-->
    <div class="d_block d_md_none">
      <app-mobile />
    </div>
    <!--End: Mobile Component-->
  </div>
</template>

<script>
import AppDesktop from "./desktop";
import AppMobile from "./mobile/list"

export default {
  components: {
    AppDesktop,
    AppMobile
  }
}
</script>

<style scoped lang="scss">

</style>
