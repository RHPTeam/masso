<template>
  <div class="table-content">
    <div class="tbl-header">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr>
            <th>Tên bài viết</th>
            <th>Danh mục</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="tbl-content">
      <table cellpadding="0" cellspacing="0" border="0">
        <tbody>
          <h6 v-if="allPost.length === 0">Không có bài viết nào</h6>
          <template v-else>
            <post-item
              v-for="item in allPost"
              :key="item._id"
              :item="item"
              :itemOptions="'Xem chi tiết'"
              :emitCanContinue="emitCanContinue"
              :selectedPost="selectedPost"
            />
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PostItem from "./PostItem";

export default {
  components: {
    PostItem
  },
  props: ["emitCanContinue", "selectedPost"],
  computed: {
    allPost() {
      return this.$store.getters.allPost;
    }
  },
  created() {
    const dataSender = {
      size: 1000,
      page: 1
    };
    this.$store.dispatch("getPostsByPage", dataSender);
  },
  beforeDestroy(){
    this.disableConitnue();
  },
  methods: {
    disableConitnue() {
      this.emitCanContinue(false);
    }
  }
};
</script>

<style lang="scss" scoped>
h6 {
  text-align: center;
  margin: 1.5rem;
}

.table-content {
  border-radius: 2.2rem;
}

table {
  width: 100%;
  table-layout: fixed;
}
thead {
  background-color: #1e1f23;
  color: #999;
}
.tbl-header {
}
.tbl-content {
  background-color: #242629;
  height: 17rem;
  overflow-x: auto;
}
th {
  padding: 1rem;
  text-align: left;
  font-weight: 500;
  &:nth-child(1) {
    width: 70%;
  }
  &:nth-child(2) {
    width: 30%;
    text-align: left;
  }
}
</style>
