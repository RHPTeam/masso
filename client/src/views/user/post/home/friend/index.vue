<template>
  <div class="friend" :data-theme="currentTheme">
    <div class="filter d_flex align_items_center mt_4">
      <div class="ml_auto position_relative">
        <div class="desc" @click="isShowFilter = true">Tất cả</div>
        <div class="account position_absolute" v-if="isShowFilter === true" v-click-outside="close">
          <div class="item">Tất cả</div>
          <div class="item">Liu Kang</div>
          <div class="item">Liu Lang</div>
        </div>
      </div>
    </div>
    <div class="r">
      <div class="c_6">
        <div class="result d_flex align_items_center mt_3 px_3 py_2">
          <div class="name text_left pr_3">Tên bài viết</div>
          <div class="content text_left">Nội dung</div>
          <div class="action text_center">
            <div class="btn--choose checked text_center m_auto d_none"

            ></div>
            <div class="btn--choose text_center m_auto"

            ></div>
          </div>
        </div>
        <div class="result--item d_flex align_items_center px_3 py_2">
          <div class="name text_left pr_3">
            <div class="name--text">Liu Kang</div>
          </div>

          <div class="content text_left">
            <div class="content--text">123</div>
          </div>
          <div class="action d_flex align_items_center justify_content_center">
            <icon-base
              icon-name="remove"
              width="20"
              height="20"
              viewBox="0 0 15 15"
            >
              <icon-remove />
            </icon-base>
          </div>
        </div>
      </div>
      <div class="c_6 pl_0">
        <div class="result d_flex align_items_center mt_3 px_3 py_2">
          <div class="name text_left pr_3">Tên bài viết</div>
          <div class="content text_left">Nội dung</div>
          <div class="action text_center">
            <div class="btn--choose checked text_center m_auto d_none"

            ></div>
            <div class="btn--choose text_center m_auto"

            ></div>
          </div>
        </div>
        <div class="result--item d_flex align_items_center px_3 py_2">
          <div class="name text_left pr_3">
            <div class="name--text">Ha Noi</div>
          </div>

          <div class="content text_left">
            <div class="content--text">123</div>
          </div>
          <div class="action d_flex align_items_center justify_content_center">
            <icon-base
              icon-name="remove"
              width="20"
              height="20"
              viewBox="0 0 15 15"
            >
              <icon-remove />
            </icon-base>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTheme: String
  },
  data() {
    return {
      isShowFilter: false
    }
  },
  methods: {
    close() {
      this.isShowFilter = false;
    }
  },
}
</script>

<style lang="scss" scoped>
  .friend {
    .filter {
      cursor: pointer;
      .desc {
        border: 1px solid #e4e4e4;
        border-radius: .625rem;
        padding: .5rem 1rem;
      }
      .account {
        background-color: #fafafa;
        border-radius: .625rem;
        top: 0;
        right: 0;
        width: 150px;
        z-index: 9;
        .item {
          padding: .25rem .5rem;
        }
      }
    }
    .c_6 {
      font-size: .85rem;
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
        cursor: pointer;
        width: 45%;
        &--text {
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .content {
        cursor: pointer;
        width: 30%;
        &--text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .action {
        cursor: pointer;
        width: 25%;
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

  .friend[data-theme="dark"] {
    .c_6 {
      .result {
        background-color: #27292d;
      }
      .result--item {
        background-color: #2f3136;
        &:hover, &:focus, &:active, &:visited {
          background-color: #444444;
        }
      }
    }
  }
</style>
