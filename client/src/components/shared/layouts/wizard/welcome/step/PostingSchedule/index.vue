<template>
  <div class="main">
    <div class="left-side">
      <post-time />
    </div>

    <div class="right-side">
      <div class="title-message">
        Bài viết sẽ được đăng trên Trang cá nhân của
        <b>{{accountsFB[0].userInfo.name}}</b>
      </div>
      <post-list class="post-list" v-if="categoryToCopy" :postList="categoryToCopy.postList" />
    </div>
  </div>
</template>

<script>
import PostTime from "./PostTime";
import PostList from "./PostList";
export default {
  components: {
    PostTime,
    PostList
  },
  computed: {
    finishedStep() {
      return this.$store.getters.finishedStep;
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
    }
  },
  watch: {
    async finishedStep() {
      if (this.finishedStep === "Bước 4") {
        await this.$store.dispatch("selectCategoryThenCreateNewCampaign");
        const event = {
          title: "",
          color: "#85CFFF",
          type_event: 0,
          break_point: 15,
          started_at: this.campaignStartDate,
          post_custom: [],
          post_category: {
            _id: this.defaultSelectedCategory.category._id,
            title: this.defaultSelectedCategory.category.title
          },
          target_custom: [],
          timeline: this.accountsFB,
          plugins: ""
        };

        this.$store.dispatch("createEvent", {
          campaignId: this.createdCampaign._id,
          event: event
        });
      }
    }
  },
  mounted() {
    this.$emit("can-continue", { value: true });
  }
};
</script>

<style lang="scss" scoped>
.main {
  min-height: 27rem;
  overflow-y: auto;
  padding: 0.5rem 2rem;
  display: flex;
}
.left-side {
  padding: 0 1rem;
}
.right-side {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}
.title-message {
  font-size: .875rem;
  text-align: center;
  padding: 1rem;
  background-color: #1e1f23;
  border: 1px solid #444;
  max-height: 5rem;
}
.post-list {
  margin-top: auto;
}
</style>
