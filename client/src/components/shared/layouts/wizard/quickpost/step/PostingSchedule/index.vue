<template>
  <div class="main">
    <div class="left-side">
      <post-time />
    </div>
    <div class="right-side">
      <div class="postlocation-section">
        <post-location />
      </div>
    </div>
  </div>
</template>

<script>
import PostTime from "./PostTime";
import PostList from "./PostList";
import PostLocation from "./PostLocation";
export default {
  components: {
    PostTime,
    PostList,
    PostLocation
  },
  data() {
    return {};
  },
  computed: {
    finishedStep() {
      return this.$store.getters.finishedStep;
    },
    chooseContentCurrentComponentTab() {
      return this.$store.getters.chooseContentCurrentComponentTab;
    },
    accountsFB() {
      return this.$store.getters.accountsFB;
    },
    categoryToCopy() {
      return this.$store.getters.categoryToCopy;
    },
    defaultSelectedCategory() {
      return this.$store.getters.defaultSelectedCategory;
    },
    createdCampaign() {
      return this.$store.getters.createdCampaign;
    },
    campaignStartDate() {
      return this.$store.getters.event.started_at;
    },
    event() {
      return this.$store.getters.event;
    },
    selectedCampaign() {
      return this.$store.getters.selectedCampaign;
    },
    chooseContentCurrentComponentTab() {
      return this.$store.getters.chooseContentCurrentComponentTab;
    },
    selectedCategoryInListTab() {
      return this.$store.getters.selectedCategoryInListTab;
    },
    selectedPostInListTab() {
      return this.$store.getters.selectedPostInListTab;
    }
  },
  watch: {
    finishedStep() {
      if (this.finishedStep === "Bước 4") {
      }
    },
    event: {
      handler: function(value, oldValue) {
        if (
          value.target_category === null &&
          value.timeline.length === 0 &&
          value.target_custom.length === 0
        ) {
          this.$emit("can-continue", { value: false });
        } else {
          this.$emit("can-continue", { value: true });
        }
      },
      deep: true
    },
    selectedCampaign() {
      if (this.selectedCampaign === null) {
        this.$emit("can-continue", { value: false });
      } else if (this.selectedCampaign) {
        this.$emit("can-continue", { value: true });
      }
      console.log("selectedCampaign", this.selectedCampaign);
    }
  },
  created() {
    this.$emit("can-continue", { value: true });
  },
  async beforeDestroy() {
    if (this.finishedStep === "Bước 4") {
      this.$store.getters.event.started_at = this.campaignStartDate;

      if (this.chooseContentCurrentComponentTab === "category-default-list") {
        this.$store.getters.event.post_category = {
          _id: this.defaultSelectedCategory.category._id,
          title: this.defaultSelectedCategory.category.title
        };
      }
      if (this.chooseContentCurrentComponentTab === "category-list") {
        this.$store.getters.event.post_category = {
          _id: this.selectedCategoryInListTab._id,
          title: this.selectedCategoryInListTab.title
        };
      }
      if (this.chooseContentCurrentComponentTab === "post-list") {
        this.$store.getters.event.post_custom = this.selectedPostInListTab;
      }

      await this.$store.dispatch("createEvent", {
        campaignId: this.selectedCampaign._id,
        event: this.event
      });
      this.$store.dispatch("setEventReset");
      this.$store.dispatch("removeAllSelectedPostInListTab");
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 27rem;
  overflow-y: scroll;
  padding: 0.5rem 2rem;
  display: flex;
}
.left-side {
  padding: 0 1rem;
}
.right-side {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  overflow-y: scroll;
}
.title-message {
  text-align: center;
  padding: 1rem;
  background-color: #1e1f23;
  border: 1px solid #444;
  max-height: 5rem;
  overflow: scroll;
}
.post-list {
  margin-top: auto;
}
</style>
