<template>
  <div class="content">
    <div class="content--header">
      <div class="d_flex justify_content_between mb_3">
        <div class="left">
          <div class="d_flex">
            <button class="btn btn_success">Viết bài đăng mới</button>
            <form class="ml_3" role="search-post">
              <input class="form_control" type="text" placeholder="Tìm kiếm">
            </form>
          </div>
        </div>
        <div class="right">
          <multiselect v-model="isFilterTime" />
        </div>
      </div>
    </div>
    <div class="content--body">
      <div class="table-container" role="table" aria-label="Destinations">
        <div class="flex-table header" role="rowgroup">
          <div class="flex-row first" role="columnheader">Nội dung</div>
          <div class="flex-row" role="columnheader">Hình ảnh</div>
          <div class="flex-row" role="columnheader">Ngày tạo</div>
          <div class="flex-row" role="columnheader">Hành động</div>
        </div>
        <div class="flex-table row" role="rowgroup">
          <div class="flex-row first"  role="cell">Lorem ipsum dolor sit amet, perferendis rerum similique</div>
          <div class="flex-row" role="cell">
            <div class="d_flex">
              <span>Không có ảnh</span>
            </div>
          </div>
          <div class="flex-row" role="cell">23 Sep, 1:30p.m.</div>
          <div class="flex-row" role="cell">
            <div class="d_flex justify_content_center">
              <button class="btn btn_warning">Sửa</button>
              <button class="btn btn_danger ml_3">Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFilterTime: "Không sắp xếp"
    }
  }
}
</script>

<style lang="scss" scoped>
  $table-header: #ffb94a;
  $table-header-border: #fff6f4;
  $table-border: #d9d9d9;
  $row-bg: #f4f2f1;

  .table-container {
    display: block;
    margin: auto;
    width: 100%;
    max-width: 100%;
  }

  .flex-table {
    display: flex;
    flex-flow: row wrap;
    border-left: solid 1px $table-border;
    transition: 0.5s;
    &:first-of-type {
      border-top: solid 1px $table-header-border;
      border-left: solid 1px $table-header-border;
    }
    &:first-of-type .flex-row {
      background: $table-header;
      color: white;
      border-color: $table-header-border;
    }
    &.row:nth-child(odd) .flex-row {
      background: $row-bg;
    }
    &:hover {
      background: #F5F5F5;
      transition: 500ms;
    }
    .flex-row {
      overflow: hidden;
      width: calc(100% / 4);
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0.5em 0.5em;
      border-right: solid 1px $table-border;
      border-bottom: solid 1px $table-border;
    }
  }
</style>
