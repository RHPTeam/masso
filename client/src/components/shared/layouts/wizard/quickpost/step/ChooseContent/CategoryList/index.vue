<template>
  <div class="table-content">
    <div class="tbl-header">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr>
            <th>Tên danh mục</th>
            <th>Số bài viết</th>
            <th></th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="tbl-content">
      <table cellpadding="0" cellspacing="0" border="0">
        <tbody v-click-outside="disableConitnue">
          <h6 v-if="allCategories.length === 0">Không có bài viết nào</h6>
          <template v-else>
            <category-item
              v-for="item in allCategories"
              :key="item._id"
              :item="item"
              :itemOptions="'Xem chi tiết'"
              :emitCanContinue="emitCanContinue"
              :selectedCategory="selectedCategory"
            />
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CategoryItem from "./CategoryItem";

export default {
  props: ["emitCanContinue", "selectedCategory"],
  components: {
    CategoryItem
  },
  computed: {
    allCategories() {
      return this.$store.getters.allCategories;
    }
  },
  created(){
    this.$store.dispatch("getAllCategories")
  },
  beforeDestroy() {
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
    width: 60%;
  }
  &:nth-child(2) {
    width: 20%;
    text-align: center;
  }
  &:nth-child(3) {
    width: 20%;
    text-align: center;
  }
}
</style>
