<template>
  <div class="list--wrap mt_3">
    <app-table/>
    <app-pagination/>
  </div>
</template>

<script>
import AppTable from "./table";
import AppPagination from "./pagination";
export default {
  components: {
    AppTable,
    AppPagination
  }
};
</script>

<style lang="scss" scoped>

</style>
