<template>
  <div class="list--wrapper">
    <div class="r px_3 m_0">
      <app-search/>
    </div>
    <div class="r m_0">
      <div class="c_md_3 pl_0">
        <!-- Start: App Sidebar-->
        <app-sidebar></app-sidebar>
        <!-- End: App Sidebar -->
      </div>
      <div class="c_md_9 pr_0">
        <!-- Start: App Data-->
        <app-data></app-data>
        <!-- End: App Data -->
      </div>
    </div>
  </div>
</template>

<script>
import AppData from "./main";
import AppSearch from "./search";
import AppSidebar from  "./sidebar";

export default {
  components: {
    AppData,
    AppSearch,
    AppSidebar
  }
}
</script>

<style scoped lang="scss">

</style>
