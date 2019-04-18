<template>
  <div class="category--wrap">
    <div class="ct_f">
      <div class="r">
        <div class="c_12 c_lg_12 c_xl_4 mb_0 mb_md_5">
          <!-- Start: Add New -->
          <app-new />
          <!-- End: Add New -->
        </div>
        <div class="c_12 c_lg_12 c_xl_8">
          <!-- Start: Action -->
          <app-action />
          <!-- End: Action -->
          <!-- Start: Data List -->
          <app-list />
          <!-- End: Data List -->
          <!-- Start: Info -->
          <app-info />
          <!-- Start: Info -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppNew from "./add-category/index";
import AppAction from "../layouts/action/index";
import AppInfo from "../layouts/info/index";
import AppList from "./list-category/index";

export default {
  components: {
    AppNew,
    AppAction,
    AppInfo,
    AppList
  }
};
</script>

<style lang="scss" scoped></style>
