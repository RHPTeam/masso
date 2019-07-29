<template>
  <div class="main" :data-theme="currentTheme">
    <div class="d_none d_md_block">
      <app-bread-crumb
        :nameBread="$t('chat.friends.titleContent')"
        :subBread="$t('chat.friends.desc')"
      />
      <div class="main--content">
        <div
          class="alert alert_success text_left"
          v-if="this.$store.getters.friendsStatus === 'loading'"
        >
          <span>{{ $t("chat.friends.loading.name") }}</span>
          {{ $t("index.vue") }}
        </div>
        <app-segments></app-segments>
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AppSegments from "./components/desktop";
// import AppMobile from "./mobile/index_mobile";
export default {
  components: {
    AppBreadCrumb,
    AppSegments,
    // AppMobile
  },
  data() {
    return {
      currentSize: 25,
      currentPage: 1
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  font-family: "Open Sans", sans-serif;
  .main--content {
    min-height: calc(100vh - 260px);
    border-radius: 10px;
    .alert {
      font-size: 14px;
      padding: .375rem .5rem;
    }
  }
}

/* ChangeColor */
// Light
.main[data-theme="light"] {
  color: #666;
}

//Dark
.main[data-theme="dark"] {
  color: #ccc;
}
</style>
