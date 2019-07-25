<template>
  <div class="main">
    <!--Desktop-->
    <div class="d_none d_md_block">
      <app-bread-crumb :nameBread="$t('chat.scripts.title')" :subBread="$t('chat.scripts.desc')" />
      <div class="main--content r">
        <div class="left-sidebar d_flex c_md_4 pr_0">
          <app-left-sidebar-script
            :selectedBlock="selectedBlock"
            @selectedBlock="onSelectBlock($event)"
            @isDeletedBlock="onDeleteBlock($event)"
            @isDeletedGroupBlock="onDeleteGroupBlock($event)"
            @isShowBlock="onShowBlock($event)"
            @isCreateBlock="isCreateBlock = $event"
          />
        </div>
        <div class="main--scripts d_flex c_md_8">
          <app-main-script
            v-if="!isShowWelcome"
            :selectedBlock="selectedBlock"
            @isDeletedBlock="onDeleteBlock($event)"
            @isCreateBlock="isCreateBlock = $event"
            :isCreateBlock="isCreateBlock"
          />
          <div v-else class="main--welcome">
            <welcome-screen />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AppLeftSidebarScript from "./components/desktop/leftsidebar";
import AppMainScript from "./components/desktop/mainscript";
import WelcomeScreen from "./components/desktop/mainscript/default";

export default {
  components: {
    AppLeftSidebarScript,
    AppMainScript,
    AppBreadCrumb,
    WelcomeScreen
  },
  data() {
    return {
      isShowWelcome: true,
      isDeletedTarget: false,
      selectedBlock: {},
      isCreateBlock: false
    };
  },
  computed: {
    block() {
      return this.$store.getters.block;
    },
    groupBlock() {
      return this.$store.getters.groups;
    }
  },
  async created() {
    await this.$store.dispatch("getGroupBlock");
    await this.$store.dispatch("getAllSequenceScript");
  },
  watch: {
  },
  methods: {
    onDeleteBlock(event) {
      this.isShowWelcome = event;
    },
    onDeleteGroupBlock(event) {
      // Show welcome screen when delete Group Block if current Selected Block is in Deleted Group Block
      if (this.block._groupBlock === event.group._id) {
        this.isShowWelcome = event.status; // event.status = true
      }
    },
    onShowBlock(event) {
      this.isShowWelcome = event; // event = false
    },
    onSelectBlock(event) {
      this.selectedBlock = event;
    }
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
