<template>
  <div class="main--list py_2">
    <!-- Start: List post -->
    <div class="item--header py_2 pl_2">Tên bài viết</div>
    <VuePerfectScrollbar class="list--post-group">
      <div class="item--body d_flex align_items_center py_2">
        <!-- Start: action posts -->
        <div
          class="col d_flex align_items_center justify_content_center col--action pr_2 text_center"
        >
          <span class="mr_1">
            <icon-base icon-name="Xóa" width="20" height="20" viewBox="0 0 15 15">
              <icon-remove/>
            </icon-base>
          </span>
          <span class="mx_1">
            <icon-base class="icon--post-now" icon-name="Đăng ngay" viewBox="0 0 506 506">
              <icon-post-now/>
            </icon-base>
          </span>
        </div>
        <!-- End: action posts -->
        <div class="content">
          <div class="title">Bài đăng chưa có tiêu đề</div>
          <div class="category--parent">Chưa phân loại</div>
        </div>
      </div>
    </VuePerfectScrollbar>
    <!-- End: List post -->
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss" scoped>
.main--list {
  .item--header {
    background: #27292d;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 0.875rem;
  }
  .list--post-group {
    max-height: 53vh;
    .item--body {
      border-bottom: 1px solid #484848;
      .content {
        max-width: 90%;
        font-size: 0.875rem;
        .category--parent {
          font-size: 0.8125rem;
          color: #999;
        }
        .title, .category--parent {
          white-space: nowrap; 
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>