<template>
  <div class="main">
    <!--Desktop-->
    <div class="d_none d_md_block">
      <app-bread-crumb
        :nameBread="$t('chat.scripts.title')"
        :subBread="$t('chat.scripts.desc')"
      />
      <div class="main--content r">
        <div class="left-sidebar d_flex c_md_4 pr_0">
          <app-left-sidebar-script />
        </div>
        <div class="main--scripts d_flex c_md_8">
          <app-main-script />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AppLeftSidebarScript from "./components/desktop/leftsidebar";
import AppMainScript from "./components/desktop/mainscript";

export default {
  data() {
    return {};
  },
  computed: {},
  async created() {
    // await this.$store.dispatch("getGroupBlock");
    // await this.$store.dispatch("getSequence");
  },
  components: {
    AppLeftSidebarScript,
    AppMainScript,
    AppBreadCrumb
  }
};
</script>

<style lang="scss" scoped>
.main {
  font-family: "Open Sans", sans-serif;
  // background: #2f31368a;
  .main--content {
    border-radius: 10px;
    min-height: calc(100vh - 260px);
  }

  .main--scripts {
    > div {
      padding: 20px;
      width: 100%;
    }
  }
}

/**********************************/
/**********Change Color************/
/**********************************/
/**           Theme Light        **/
div[data-theme="light"] {
  .left-sidebar,
  .main--scripts {
  }
}

/**           Theme Dark         **/
div[data-theme="dark"] {
  .left-sidebar,
  .main--scripts {
  }
}
</style>
