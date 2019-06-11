<template>
  <div class="auto">
    <div class="header d_flex align_items_center">
      <div class="tabs mr_3" @click="showAutoLike">Auto Like</div>
      <div class="tabs" @click="showFilterFriend">Filter Friend</div>
    </div>
    <div class="body">
      <!-- Start: Auto Like-->
      <div class="like" v-if="isShowDefault === true">
        <h3>Auto Like</h3>
        <div class="py_2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, veniam?</div>
        <div class="control action d_flex align_items_center">
          <div class="btn--choose checked text_center m_auto"
          ></div>
          <div class="btn--choose text_center m_auto"
          ></div>
          <div>Bạn có muốn bật chế độ auto like không ?</div>
        </div>
        <div class="info">
          <div>Danh sách bạn bè</div>
          <div class="result d_flex align_items_center mt_3 px_3 py_2">
            <div class="name text_left pr_3">Tên bài viết</div>
            <div class="categories text_left">Danh mục</div>
            <div class="content text_left">Nội dung</div>
            <div class="action text_center">
              Hành động
            </div>
          </div>
          <div class="result--item d_flex align_items_center px_3 py_2">
            <div class="name text_left pr_3">
              <div class="name--text">post.title}}</div>
            </div>
            <div class="categories text_left pr_3">
                <span>
                      cate.title
                </span>
            </div>
            <div class="content text_left">
              <div class="content--text">post.content}}</div>
            </div>
            <div class="action">
              <div class="btn--choose checked text_center m_auto"
              ></div>
              <div class="btn--choose text_center m_auto"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Auto Like-->
      <!-- Start: Filter friend-->
      <div class="filter" v-if="isShowDefault === false">
        <h3>Filter Friend</h3>
        <div class="py_2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, veniam?</div>
        <div class="info">
          <div>Danh sách bạn bè</div>
          <div class="result d_flex align_items_center mt_3 px_3 py_2">
            <div class="name text_left pr_3">Tên bài viết</div>
            <div class="categories text_left">Danh mục</div>
            <div class="content text_left">Nội dung</div>
            <div class="action text_center">
              Hành động
            </div>
          </div>
          <div class="result--item d_flex align_items_center px_3 py_2">
            <div class="name text_left pr_3">
              <div class="name--text">post.title}}</div>
            </div>
            <div class="categories text_left pr_3">
                <span>
                      cate.title
                </span>
            </div>
            <div class="content text_left">
              <div class="content--text">post.content}}</div>
            </div>
            <div class="action">
              <div class="btn--choose checked text_center m_auto"
              ></div>
              <div class="btn--choose text_center m_auto"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Filter friend-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowDefault: true
    }
  },
  methods: {
    showAutoLike() {
      this.isShowDefault = true;
    },
    showFilterFriend() {
      this.isShowDefault = false;
    }
  },
}
</script>
<style lang="scss" scoped>
  .auto {
    .header {
      .tabs {
        border: 1px solid #e4e4e4;
        border-radius: .625rem;
        cursor: pointer;
        padding: .5rem 2rem;
      }
    }
    .body {
      .result {
        background-color: #ffffff;
        border-top-left-radius: .5rem;
        border-top-right-radius: .5rem;
        color: #999;
        font-weight: 600;
        height: 38px;
      }
      .result--item {
        background-color: #fafafa;
        &.empty {
          color: #999;
          font-size: .825rem;
        }
        &:hover {
          background-color: #fff;
        }
        &:last-child {
          border-bottom-left-radius: .5rem;
          border-bottom-right-radius: .5rem;
        }
      }
      .name {
        width: 25%;
        &--text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .categories {
        width: 25%;
      }
      .content {
        width: 35%;
        &--text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .action {
        width: 15%;
        .btn--choose {
          border: 2px solid #ccc;
          border-radius: 6px;
          cursor: pointer;
          height: 20px;
          padding: .35rem .5rem;
          width: 20px;
          &.checked {
            background-color: #ffb94a;
            border: solid 1px #ffb94a;
            &:before {
              border-bottom: 2px solid #fff;
              border-right: 2px solid #fff;
              content: "";
              display: block;
              height: 10px;
              position: relative;
              left: 50%;
              top: 42%;
              transform: translate(-50%, -50%) rotate(45deg);
              width: 7px;
            }
          }
        }
      }
    }
  }
</style>
