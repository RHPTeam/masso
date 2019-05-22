<template>
  <div class="item--body d_flex align_items_center px_3 py_2">
    <div class="col col--name px_2">
      <div class="col col--name-text">
        Lorem ipsum dolor.
      </div>
    </div>
    <div class="col col--category px_2">Mỹ phẩm</div>
    <div class="col col--content px_2">
      <div class="col--content-text">
        Lorem ipsum dolor sit amet.
      </div>
    </div>
    <div class="col col--checkbox px_2">
      <label class="custom--checkbox mb_0">
        <input type="checkbox" checked />
      </label>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .col--checkbox {
    height: 20px;
    width: 5%;
  }
  .col--name {
    width: 30%;
  }
  .col--category {
    width: 30%;
  }
  .col--content {
    width: 35%;
    &-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
</style>
