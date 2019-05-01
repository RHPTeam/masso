<template>
  <div class="checkin d_flex align_items_center">
    <div class="fixed text_center">Với</div>
    <div class="option position_relative">
      <input type="text" placeholder="Tag bạn bè của bạn ..." v-model="name" @click="isShowSuggest = true">
      <div class="suggest position_absolute" v-if="isShowSuggest === true">
        <div v-for="(item, index) in test" :key="index">
          <div class="item" @click="attachFriend(item)">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      isShowSuggest: false,
      test: [
        { name: "Tuấn Anh", age: 23 },
        { name: "Tuấn Em", age: 23 },
        { name: "Tuấn Minh", age: 23 }
      ]
    };
  },
  methods: {
    attachFriend( item ) {
      this.name = item.name;
      this.isShowSuggest = false;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../index.style";
  .suggest {
    background-color: $mainDefault;
    border: 1px solid $border-color;
    border-radius: calc(.5rem +2 px);
    top: 100%;
    left: 0;
    max-height: 200px;
    width: 100%;
    z-index: 99;
    .item {
      padding: 6px 8px;
      &:hover, &:active, &:focus, &:visited {
        background-color: $orange;
        color: $mainDefault;
        transition: all .5s ease;
      }
      &:first-child {
        border-top-left-radius: calc(.5rem +2 px);
        border-top-right-radius: calc(.5rem +2 px);
      }
      &:last-child {
        border-bottom-left-radius: calc(.5rem +2 px);
        border-bottom-right-radius: calc(.5rem +2 px);
      }
    }
  }
</style>
