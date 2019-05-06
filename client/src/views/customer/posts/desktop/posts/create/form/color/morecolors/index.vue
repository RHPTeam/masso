<template>
  <div class="more position_absolute">
    <div class="wrapper">
      <div class="desc p_2">
        Chọn phông nền cho bài viết của bạn
      </div>
      <div class="body">
        <VuePerfectScrollbar class="show">
          <div class="item p_2">
            <div class="header">Kiểu mới</div>
            <div class="content">
              <div class="option"></div>
            </div>
          </div>
          <div class="item p_2">
            <div class="header">Kiểu mới</div>
            <div class="content">
              <div class="option"></div>
            </div>
          </div>
        </VuePerfectScrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  }
}
</script>

<style lang="scss" scoped>
  .more {
    background-color: #ffffff;
    border: 1px solid #e4e4e4;
    border-radius: calc(.5rem + 2px);
    top: 105%;
    right: 0;
    width: 315px;
    z-index: 99;
    .desc {
      border-bottom: 1px solid #e4e4e4;
    }
    .show {
      max-height: 250px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .item {
      .header {
        font-weight: 600;
        padding: .5rem 0;
      }
      .content {
        .option {
          display: inline-block;
          margin: 0 4px;
          width: 64px;
          height: 64px;
          border: 1px solid #e4e4e4;
          border-radius: .5rem;
        }
      }
    }
  }
</style>
