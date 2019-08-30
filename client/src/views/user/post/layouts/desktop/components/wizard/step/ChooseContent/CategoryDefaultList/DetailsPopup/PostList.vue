<template>
  <div class="table-content">
    <div class="tbl-header">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr>
            <th></th>
            <th>Các bài viết có sẵn trong <b>{{categoryTitle}}</b></th>
            <th></th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="tbl-content">
      <table cellpadding="0" cellspacing="0" border="0">
        <tbody>
          <h6 v-if="postList.length === 0">Không có bài viết nào</h6>
          <post-item
            v-else
            v-for="item in postList"
            :key="item._id"
            :itemTitle="item.title"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PostItem from "./PostItem";

export default {
  props: ["postList", "categoryTitle"],
  components: {
    PostItem
  },
  computed: {
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
    width: 10%;
  }
  &:nth-child(2) {
    width: 80%;
    text-align: center;
  }
  &:nth-child(3) {
    width: 10%;
    text-align: center;
  }
}
</style>
