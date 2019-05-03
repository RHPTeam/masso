<template>
  <div class="checkin d_flex align_items_center">
    <div class="fixed text_center">Với</div>
    <div class="option position_relative">
      <input type="text" placeholder="Tag bạn bè của bạn ..." v-model="name" v-click-outside="close">
      <div class="suggest position_absolute" v-if="isShowSuggest === true">
        <VuePerfectScrollbar class="show">
          <div v-for="(item, index) in filteredUser" :key="index">
            <div class="item--tag" @click="attachFriend(item)">
              {{ item.name }}
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
  },
  data() {
    return {
      name: "",
      isShowSuggest: false,
      listCategories: [],
      test: [
        { name: "Tuấn Anh", age: 23 },
        { name: "Tuấn Em", age: 23 },
        { name: "Tuấn Minh", age: 23 },
        { name: "Lan", age: 23 },
        { name: "Minh", age: 23 },
        { name: "Toan", age: 23 },
        { name: "Khien", age: 23 },
        { name: "Khon", age: 23 },
        { name: "Loc", age: 23 },
        { name: "Hanh", age: 23 }
      ]
    };
  },
  computed: {
    filteredUser() {
      return this.test.filter(user => {
        user.name.toString().toLowerCase().includes(this.name.toString().toLowerCase());
      })
    }
  },
  watch: {
    "name"(value) {
      if( value.length !== 0 ) this.isShowSuggest  = true;
    }
  },
  methods: {
    attachFriend( item ) {
      this.name = item.name;
      this.isShowSuggest = false;
    },
    close () {
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
    border-radius: calc(.25rem + 2px);
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 99;
    .show {
      max-height: 200px;
      overflow-x: hidden;
      overflow-y: auto;
      width: 100%;
    }
    .item--tag {
      padding: 6px 8px;
      width: 100%;
      &:hover, &:active, &:focus, &:visited {
        background-color: $orange;
        color: $mainDefault;
        transition: all .5s ease;
      }
    }
  }
</style>
