<template>
  <div class="table-content">
    <div class="tbl-header">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr>
            <th></th>
            <th>Danh sách các bài viết</th>
            <th></th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="tbl-content">
      <table cellpadding="0" cellspacing="0" border="0">
        <tbody>
          <h6 v-if="postList.length === 0">Không có bài viết nào</h6>
          <post-item v-else v-for="item in postList" :key="item._id" :itemTitle="item.title" />
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
  props: ["postList", "categoryTitle"],
  computed: {}
};
</script>

<style lang="scss" scoped>
h6 {
  text-align: center;
  margin: 1.5rem;
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
  border-top: 1px solid #444;
  border-left: 1px solid #444;
  border-right: 1px solid #444;
}
.tbl-content {
  background-color: #27292c;
  min-height: 17rem;
  overflow-x: auto;
  border-bottom: 1px solid #444;
  border-left: 1px solid #444;
  border-right: 1px solid #444;
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
