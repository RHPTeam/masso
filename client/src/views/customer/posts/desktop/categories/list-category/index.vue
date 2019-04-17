<template>
  <div class="category--data my_3">
    <div class="item--header d_flex align_items_center px_3 py_2">
      <div class="col--checkbox px_2">
        <label class="custom--checkbox mb_0">
          <input type="checkbox">
        </label>
      </div>
      <div class="col--category px_2">Tên danh mục</div>
      <div class="col--posts px_2">Số bài viết</div>
      <div class="col--description px_2">Mô tả</div>
      <div class="col--action px_4">Hành động</div>
    </div>
    <div class="item--body d_flex align_items_center px_3 py_2">
      <div class="col--checkbox px_2">
        <label class="custom--checkbox mb_0">
          <input type="checkbox">
        </label>
      </div>
      <div class="col--category px_2">Mỹ phẩm</div>
      <div class="col--posts px_2">12</div>
      <div class="col--description px_2">
        <div class="col--description-text">Lorem ipsum dolor sit amet, consectetur tempor incid ...</div>
      </div>
      <div class="col--action px_4 text_center">
        <span class="mx_1">
          <icon-base icon-name="icon-edit" viewBox="0 0 20 20">
            <icon-edit/>
          </icon-base>
        </span>
        <span class="mx_1">
          <icon-base icon-name="remove" width="20" height="20" viewBox="0 0 15 15">
            <icon-remove/>
          </icon-base>
        </span>
      </div>
    </div>
    <div class="item--body d_flex align_items_center px_3 py_2">
      <div class="col--checkbox px_2">
        <label class="custom--checkbox mb_0">
          <input type="checkbox" checked>
        </label>
      </div>
      <div class="col--category px_2">Mỹ phẩm</div>
      <div class="col--posts px_2">12</div>
      <div class="col--description px_2">
        <div class="col--description-text">Lorem ipsum dolor sit amet, consectetur tempor incid ...</div>
      </div>
      <div class="col--action px_4 text_center">
        <span class="mx_1">
          <icon-base icon-name="icon-edit" viewBox="0 0 20 20">
            <icon-edit/>
          </icon-base>
        </span>
        <span class="mx_1">
          <icon-base icon-name="remove" width="20" height="20" viewBox="0 0 15 15">
            <icon-remove/>
          </icon-base>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.category--data {
  font-size: 0.875rem;
  .item--header {
    background-color: #ffffff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #666666;
    font-weight: 600;
    height: 48px;
  }
  .item--body {
    background-color: #fafafa;
    min-height: 48px;
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
  .col--checkbox {
    height: 20px;
    width: calc(20px + 1rem);
  }
  .col--category {
    width: 25%;
  }

  .col--posts {
    width: 15%;
  }
  .col--description {
    width: calc(60% - 95px - 4rem);
    &-text {
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
    }
  }

  .col--action {
    width: calc(75px + 3rem);
    svg {
      color: #999;
      cursor: pointer;
      transition: all 0.4s ease;
      &:hover {
        color: #ffb94a;
      }
    }
  }
}
.custom--checkbox {
  input[type="checkbox"] {
    border-radius: 6px;
    border: solid 1.5px #cccccc;
    cursor: pointer;
    height: 20px;
    outline: none;
    width: 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:checked {
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

// RESPONSIVE
@media only screen and (max-width: 1366px) {
  .category--data {
    .col--category {
      width: calc(100% - 220px - 3rem);
    }

    .col--posts {
      width: 125px;
    }
    .col--description {
      display: none;
    }
    .col--action {
      width: calc(75px + 2rem);
      padding: 0 1rem !important;
    }
  }
}
@media only screen and (max-width: 1200px) {
  .category--data {
    .col--category {
      width: 25%;
    }
    .col--posts {
      width: 105px;
    }
    .col--description {
      display: block;
      width: calc(75% - 200px - 2rem);
    }
    .col--action {
      width: calc(75px + 1rem);
      padding: 0 0.5rem !important;
    }
  }
}
@media only screen and (max-width: 1024px) {
  .category--data {
    .col--category {
      width: calc(100% - 190px - 2rem);
    }

    .col--posts {
      width: 95px;
    }
    .col--description {
      display: none;
    }
  }
}
</style>
