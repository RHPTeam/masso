<template>
  <div class="friend--block d_flex align_items_center justify_content_between px_3">
    <div class="friend--info d_flex align_items_center">
      <div class="avatar mr_2">
        <img :src="friend.thumbSrc" alt="">
      </div>
      <div class="name">{{ friend.name }}</div>
    </div>
    <div class="checkbox--control">
      <input type="checkbox">
    </div>
  </div>
</template>

<script>
export default {
  props: [ "friend" ]
}
</script>

<style scoped lang="scss">
.friend--block {
  padding: .5rem 0;
  &:hover {
    background-color: #F7F7F7;
  }
  .checkbox--control {
    input[type="checkbox"] {
      border-radius: 50%;
      border: solid 1.5px #cccccc;
      cursor: pointer;
      height: 18px;
      outline: none;
      width: 18px;
      -webkit-appearance: none;
      -moz-appearance: none;
      transition: all .4s ease;
      &:before {
        background-color: #ccc;
        content: "";
        display: block;
        height: 2px;
        position: relative;
        left: 3px;
        top: 48%;
        transition: all .4s ease;
        width: 8px;
      }
      &:hover {
        border-color: #f96666;
        &:before {
          background-color: #f96666;
        }
      }
      &:checked {
        background-color: #f96666;
        border: solid 1px #f96666;
        &:before {
          background-color: #fff;
          content: "";
          display: block;
          height: 2px;
          position: relative;
          left: 4px;
          top: 48%;
          width: 8px;
        }
      }
    }
  }
  .friend--info {
    .avatar {
      img {
        border-radius: 100%;
        height: 36px;
        width: 36px;
      }
    }
    .name {
      font-weight: 600;
    }
  }
}
</style>
