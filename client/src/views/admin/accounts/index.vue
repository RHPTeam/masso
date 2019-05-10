<template>
  <div class="account text_left px_4 py_4">
    <div class="account--title mb_4">Quản lý tài khoản</div>
    <div class="account--content card card_body p_4">
      <app-top
        :isGrid="isGrid"
        @changeLayout="isGrid = $event"
      />
      <div v-if="isGrid" class="account--grid">
        <app-grid-view />
      </div>
      <div v-else class="list--content">
        <app-list-view />
      </div>
      <app-paginate />
    </div>
  </div>
</template>
<script>
import AppTop from "./components/top/index";
import AppGridView from "./components/views/grid/index";
import AppListView from "./components/views/list/index";
import AppPaginate from "./components/paginate/index";

export default {
  components: {
    AppTop,
    AppGridView,
    AppListView,
    AppPaginate
  },
  data() {
    return {
      isGrid: true
    };
  },
  computed: {
  },
  async created() {
    await this.$store.dispatch( "getUsers" );

    const data = this.$store.getters.users;

    await this.$store.dispatch( "getUsersFilter", data );
  }
};
</script>

<style scoped lang="scss">
  .account {
    .account--title {
      color: #666;
      font-size: 18px;
      font-weight: bold;
    }
    .account--content {
      border: 0;
      border-radius: 8px;
    }
  }
</style>
