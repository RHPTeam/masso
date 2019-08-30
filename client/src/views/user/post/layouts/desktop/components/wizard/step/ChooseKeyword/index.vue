<template>
  <div class="main">
    <div class="row">
      <keyword
        v-for="keyword in keywords.slice(0, 3)"
        :key="keyword.title"
        :keyword="keyword"
        @selectedKeyword="updateSelectedKeywordList($event)"
      />
    </div>
    <div class="row">
      <keyword
        v-for="keyword in keywords.slice(3, 6)"
        :key="keyword.title"
        :keyword="keyword"
        @selectedKeyword="updateSelectedKeywordList($event)"
      />
    </div>
    <div class="row">
      <keyword
        v-for="keyword in keywords.slice(6, 9)"
        :key="keyword.title"
        :keyword="keyword"
        @selectedKeyword="updateSelectedKeywordList($event)"
      />
    </div>
    <div class="row">
      <keyword
        v-for="keyword in keywords.slice(10, 13)"
        :key="keyword.title"
        :keyword="keyword"
        @selectedKeyword="updateSelectedKeywordList($event)"
      />
    </div>
  </div>
</template>
<script>
import Keyword from "./Keyword";
export default {
  components: { Keyword },
  data() {
    return {
      keywords: [
        {
          title: "Đời sống",
          backgroundColor: "#CC0000"
        },
        {
          title: "Công Nghệ",
          backgroundColor: "#562765"
        },
        {
          title: "Sức khỏe",
          backgroundColor: "#F53900"
        },
        {
          title: "Du lịch",
          backgroundColor: "#234A84"
        },
        {
          title: "Học đường",
          backgroundColor: "#1992BF"
        },
        {
          title: "Ciné",
          backgroundColor: "#CC342D"
        },
        {
          title: "Thể thao",
          backgroundColor: "#56a036"
        },
        {
          title: "Fashion",
          backgroundColor: "#6c00b9"
        },
        {
          title: "Ẩm thực",
          backgroundColor: "#41B883"
        },
        {
          title: "TV Show",
          backgroundColor: "#444444"
        },
        {
          title: "Drama",
          backgroundColor: "#F54D27"
        },
        {
          title: "Musik",
          backgroundColor: "#44474c"
        },
        {
          title: "Xã hội",
          backgroundColor: "#BF1942"
        }
      ],
      selectedKeywordList: []
    };
  },
  computed: {
    userInfo() {
      if (
        this.$store.getters.userInfo === undefined ||
        this.$store.getters.userInfo === ""
      ) {
        return;
      }
      return this.$store.getters.userInfo;
    },
    finishedStep() {
      return this.$store.getters.finishedStep;
    }
  },
  watch: {
    finishedStep() {
      if (this.finishedStep === "Bước 1") {
        this.updateUserKeyword();
      }
    }
  },
  methods: {
    updateSelectedKeywordList(keyword) {
      // Add keyword to list
      if (keyword.isSelected === true) {
        this.selectedKeywordList.push(keyword.title);
      }

      // Remove keyword from list
      if (keyword.isSelected === false) {
        const index = this.selectedKeywordList.indexOf(keyword.title);
        if (index !== -1) this.selectedKeywordList.splice(index, 1);
      }

      if (this.selectedKeywordList.length > 0) {
        this.$emit("can-continue", { value: true });
      } else {
        this.$emit("can-continue", { value: false });
      }
    },

    updateUserKeyword() {
      this.userInfo.keywords = [...this.userInfo.keywords, ...this.selectedKeywordList];
      this.$store.dispatch("updateUser", this.userInfo);
    }
  }
};
</script>

.<style lang="scss" scoped>
.main {
  height: 27rem;
  overflow-y: scroll;
  padding: 0.5rem;
}
.row {
  display: flex;
}
</style>
